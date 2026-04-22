import crypto from "node:crypto";
import Razorpay from "razorpay";

let _client: Razorpay | null = null;
export function rzp(): Razorpay {
  if (_client) return _client;
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_id || !key_secret) {
    throw new Error("Razorpay env missing (RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET)");
  }
  _client = new Razorpay({ key_id, key_secret });
  return _client;
}

/** Verify the signature returned by checkout.js to the browser. */
export function verifyCheckoutSignature(args: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) throw new Error("RAZORPAY_KEY_SECRET missing");
  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${args.orderId}|${args.paymentId}`)
    .digest("hex");
  return timingSafeEqual(expected, args.signature);
}

/** Verify the X-Razorpay-Signature header on an incoming webhook body (raw text). */
export function verifyWebhookSignature(rawBody: string, signature: string): boolean {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) throw new Error("RAZORPAY_WEBHOOK_SECRET missing");
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  return timingSafeEqual(expected, signature);
}

function timingSafeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}
