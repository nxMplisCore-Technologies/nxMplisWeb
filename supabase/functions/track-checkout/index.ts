import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const ALLOWED_EVENTS = new Set([
  "page_viewed",
  "product_viewed",
  "product_added_to_cart",
  "cart_viewed",
  "checkout_started",
  "checkout_contact_info_submitted",
  "checkout_address_info_submitted",
  "checkout_shipping_info_submitted",
  "payment_info_submitted",
  "checkout_completed",
  "alert_displayed",
  "ui_extension_errored",
]);

const MAX_BODY_BYTES = 64 * 1024;
const PIXEL_KEY = "anvaya-funnel-v1";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  { auth: { persistSession: false } },
);

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "content-type",
};

type Json = Record<string, any>;

const num = (v: unknown) => {
  const n = typeof v === "string" ? parseFloat(v) : typeof v === "number" ? v : NaN;
  return Number.isFinite(n) ? n : null;
};

const str = (v: unknown, max = 500) =>
  typeof v === "string" && v.length ? v.slice(0, max) : null;

// Keep only location fields from addresses; never store names, emails, phones or street lines.
function scrubAddress(a: Json | null | undefined) {
  if (!a) return null;
  return { city: a.city ?? null, province: a.province ?? a.provinceCode ?? null, zip: a.zip ?? null, countryCode: a.countryCode ?? null };
}

function scrubCheckout(c: Json | null | undefined) {
  if (!c) return null;
  const { email, phone, billingAddress, shippingAddress, ...rest } = c;
  return { ...rest, shippingAddress: scrubAddress(shippingAddress) };
}

function products(data: Json) {
  const lines = data.checkout?.lineItems ?? data.cart?.lines ?? (data.cartLine ? [data.cartLine] : null);
  if (Array.isArray(lines) && lines.length) {
    return lines.map((l: Json) => ({
      title: l.title ?? l.merchandise?.product?.title ?? null,
      variant: l.variant?.title ?? l.merchandise?.title ?? null,
      qty: l.quantity ?? null,
      price: num(l.variant?.price?.amount ?? l.merchandise?.price?.amount ?? l.cost?.totalAmount?.amount),
    }));
  }
  const v = data.productVariant;
  if (v) return [{ title: v.product?.title ?? null, variant: v.title ?? null, qty: 1, price: num(v.price?.amount) }];
  return null;
}

function toRow(e: Json, ua: string | null) {
  const data: Json = e.data ?? {};
  const c: Json = data.checkout ?? {};
  const addr: Json = c.shippingAddress ?? {};
  const delivery = c.delivery?.selectedDeliveryOptions?.[0];
  const shippingLine = c.shippingLine;
  const tx = Array.isArray(c.transactions) ? c.transactions[0] : null;
  const utm: Json = e.utm ?? {};

  return {
    event_id: str(e.id, 200),
    event_name: e.name,
    occurred_at: e.timestamp ?? new Date().toISOString(),
    client_id: str(e.clientId, 200),
    checkout_token: str(c.token, 200),
    page_url: str(e.context?.document?.location?.href, 1000),
    utm_source: str(utm.utm_source, 200),
    utm_medium: str(utm.utm_medium, 200),
    utm_campaign: str(utm.utm_campaign, 200),
    utm_content: str(utm.utm_content, 200),
    products: products(data),
    value: num(c.totalPrice?.amount ?? data.cart?.cost?.totalAmount?.amount ?? data.cartLine?.cost?.totalAmount?.amount ?? data.productVariant?.price?.amount),
    currency: str(c.currencyCode ?? data.cart?.cost?.totalAmount?.currencyCode, 10),
    has_contact: c.email || c.phone ? true : c.token ? false : null,
    city: str(addr.city, 120),
    province: str(addr.province ?? addr.provinceCode, 120),
    zip: str(addr.zip, 20),
    country: str(addr.countryCode, 5),
    shipping_title: str(delivery?.title ?? shippingLine?.title, 200),
    shipping_price: num(delivery?.cost?.amount ?? shippingLine?.price?.amount),
    payment_gateway: str(tx?.gateway ?? tx?.paymentMethod?.name, 200),
    alert_type: str(data.alert?.type, 100),
    alert_message: str(data.alert?.message ?? data.error?.message, 1000),
    user_agent: str(ua, 500),
    raw: { ...data, checkout: scrubCheckout(data.checkout) },
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (req.method !== "POST") return new Response("method not allowed", { status: 405, headers: CORS });
  if (new URL(req.url).searchParams.get("k") !== PIXEL_KEY) return new Response("forbidden", { status: 403, headers: CORS });

  const body = await req.text();
  if (body.length > MAX_BODY_BYTES) return new Response("too large", { status: 413, headers: CORS });

  let payload: Json;
  try {
    payload = JSON.parse(body);
  } catch {
    return new Response("bad json", { status: 400, headers: CORS });
  }

  const events = (Array.isArray(payload) ? payload : [payload])
    .filter((e) => e && ALLOWED_EVENTS.has(e.name) && typeof e.id === "string")
    .slice(0, 20);
  if (!events.length) return new Response("no valid events", { status: 400, headers: CORS });

  const rows = events.map((e) => toRow(e, req.headers.get("user-agent")));
  const { error } = await supabase.from("checkout_events").upsert(rows, { onConflict: "event_id", ignoreDuplicates: true });
  if (error) {
    console.error("insert failed", error.message);
    return new Response("db error", { status: 500, headers: CORS });
  }
  return new Response("ok", { status: 200, headers: CORS });
});
