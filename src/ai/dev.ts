import { config } from 'dotenv';
config();

import '@/ai/flows/content-recommendations.ts';
import '@/ai/flows/google-drive-flow.ts';
import '@/ai/flows/upload-image-flow.ts';
import '@/ai/flows/get-local-images-flow.ts';
import '@/ai/flows/pitch-deck-flow.ts';
