/**
 * audioProcessor.ts
 *
 * Lightweight browser-native audio processing pipeline for the Cry Analyzer.
 * No external dependencies — uses only Web Audio API (OfflineAudioContext).
 *
 * Pipeline:
 *   Raw Blob (WebM/OGG/MP4) → decode → validate → mono → resample 22050Hz → WAV File
 *
 * The output is a standard 16-bit PCM WAV accepted by the existing backend.
 * Backend, ML pipeline, and API remain completely unchanged.
 */

/** Target sample rate expected by the ML preprocessing pipeline (librosa.load sr=22050) */
const TARGET_SR = 22050;

/** Minimum recording duration accepted (seconds) */
const MIN_DURATION_S = 1.5;

/** Maximum recording duration to process (seconds) — long files are trimmed to this */
const MAX_DURATION_S = 30;

/** RMS energy below this threshold is considered silence */
const SILENCE_RMS_THRESHOLD = 0.004;

export interface AudioProcessingError {
  code: 'SILENT' | 'TOO_SHORT' | 'DECODE_FAILED' | 'UNSUPPORTED';
  message: string;
}

export type AudioProcessingResult =
  | { ok: true; file: File }
  | { ok: false; error: AudioProcessingError };

/**
 * Processes a raw audio Blob from MediaRecorder into a clean 22050 Hz mono WAV File.
 *
 * @param blob  - Raw audio blob from MediaRecorder (any format the browser produced)
 * @returns     - AudioProcessingResult: either a ready-to-upload File or a typed error
 */
export async function processRecordedAudio(blob: Blob): Promise<AudioProcessingResult> {
  // 1. Decode the raw blob into an AudioBuffer using the browser's native decoders.
  //    This transparently handles WebM/Opus, OGG/Opus, MP4/AAC — whatever the browser produced.
  let decoded: AudioBuffer;
  try {
    const arrayBuffer = await blob.arrayBuffer();
    const decodeCtx = new AudioContext();
    decoded = await decodeCtx.decodeAudioData(arrayBuffer);
    await decodeCtx.close();
  } catch {
    return {
      ok: false,
      error: {
        code: 'DECODE_FAILED',
        message: 'Could not decode the recorded audio. Please try again.',
      },
    };
  }

  // 2. Validate duration
  if (decoded.duration < MIN_DURATION_S) {
    return {
      ok: false,
      error: {
        code: 'TOO_SHORT',
        message: `Recording is too short (${decoded.duration.toFixed(1)}s). Please record at least ${MIN_DURATION_S} seconds of your baby's cry.`,
      },
    };
  }

  // 3. Extract mono channel data (mix down if stereo)
  const monoData = toMono(decoded);

  // 4. Silence check — compute RMS on the mono signal
  const rms = computeRMS(monoData);
  if (rms < SILENCE_RMS_THRESHOLD) {
    return {
      ok: false,
      error: {
        code: 'SILENT',
        message: 'The recording appears to be silent. Please check your microphone and try again.',
      },
    };
  }

  // 5. Trim to MAX_DURATION_S if needed (keeps first MAX_DURATION_S seconds)
  const maxSamples = Math.floor(MAX_DURATION_S * decoded.sampleRate);
  const trimmed = monoData.length > maxSamples ? monoData.slice(0, maxSamples) : monoData;

  // 6. Resample to TARGET_SR (22050 Hz) using OfflineAudioContext.
  //    This is the highest-quality resampler available in the browser — far better than
  //    what librosa's SoX backend would do on already-compressed Opus audio.
  let resampled: Float32Array;
  try {
    resampled = await resampleAudio(trimmed, decoded.sampleRate, TARGET_SR);
  } catch {
    return {
      ok: false,
      error: {
        code: 'DECODE_FAILED',
        message: 'Audio resampling failed. Please try again.',
      },
    };
  }

  // 7. Encode as 16-bit PCM WAV and return as File
  const wavBlob = encodeWAV(resampled, TARGET_SR);
  const file = new File([wavBlob], 'recording.wav', { type: 'audio/wav' });

  return { ok: true, file };
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

/** Mix down all channels to a single mono Float32Array. */
function toMono(buffer: AudioBuffer): Float32Array {
  if (buffer.numberOfChannels === 1) {
    return buffer.getChannelData(0).slice(); // copy
  }
  const length = buffer.length;
  const mono = new Float32Array(length);
  for (let ch = 0; ch < buffer.numberOfChannels; ch++) {
    const channel = buffer.getChannelData(ch);
    for (let i = 0; i < length; i++) {
      mono[i] += channel[i];
    }
  }
  const nch = buffer.numberOfChannels;
  for (let i = 0; i < length; i++) {
    mono[i] /= nch;
  }
  return mono;
}

/** Compute RMS (Root Mean Square) energy of a Float32Array. */
function computeRMS(data: Float32Array): number {
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += data[i] * data[i];
  }
  return Math.sqrt(sum / data.length);
}

/** Resample Float32Array from sourceSR to targetSR using OfflineAudioContext. */
async function resampleAudio(
  data: Float32Array,
  sourceSR: number,
  targetSR: number,
): Promise<Float32Array> {
  if (sourceSR === targetSR) return data;

  const targetLength = Math.ceil((data.length * targetSR) / sourceSR);
  const offlineCtx = new OfflineAudioContext(1, targetLength, targetSR);

  // Create a source AudioBuffer at the original sample rate
  const sourceBuffer = offlineCtx.createBuffer(1, data.length, sourceSR);
  sourceBuffer.copyToChannel(data, 0);

  const source = offlineCtx.createBufferSource();
  source.buffer = sourceBuffer;
  source.connect(offlineCtx.destination);
  source.start(0);

  const rendered = await offlineCtx.startRendering();
  return rendered.getChannelData(0);
}

/**
 * Encode a mono Float32Array as a 16-bit PCM WAV Blob.
 * WAV format: 44-byte RIFF header + raw Int16 samples.
 */
function encodeWAV(samples: Float32Array, sampleRate: number): Blob {
  const numSamples = samples.length;
  const bytesPerSample = 2; // 16-bit
  const blockAlign = bytesPerSample; // mono
  const byteRate = sampleRate * blockAlign;
  const dataSize = numSamples * bytesPerSample;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  // RIFF chunk descriptor
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(view, 8, 'WAVE');

  // fmt sub-chunk
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);       // sub-chunk size
  view.setUint16(20, 1, true);        // PCM format
  view.setUint16(22, 1, true);        // mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true);       // bits per sample

  // data sub-chunk
  writeString(view, 36, 'data');
  view.setUint32(40, dataSize, true);

  // PCM samples: clamp Float32 to [-1, 1] then scale to Int16
  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    const clamped = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, Math.round(clamped * 32767), true);
    offset += 2;
  }

  return new Blob([buffer], { type: 'audio/wav' });
}

function writeString(view: DataView, offset: number, str: string): void {
  for (let i = 0; i < str.length; i++) {
    view.setUint8(offset + i, str.charCodeAt(i));
  }
}
