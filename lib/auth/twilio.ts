import twilio from "twilio";

const sid = process.env.TWILIO_ACCOUNT_SID;
const token = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SID;

let _client: ReturnType<typeof twilio> | null = null;
function client() {
  if (!sid || !token || !verifySid) {
    throw new Error(
      "Twilio env vars missing (TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SID)",
    );
  }
  _client ??= twilio(sid, token);
  return _client;
}

/** Normalize an Indian phone number to E.164 (+91XXXXXXXXXX). */
export function normalizeIndianPhone(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  if (digits.length === 10) return `+91${digits}`;
  if (digits.length === 12 && digits.startsWith("91")) return `+${digits}`;
  if (input.startsWith("+") && digits.length >= 10 && digits.length <= 15) return `+${digits}`;
  return null;
}

export async function sendOtp(phoneE164: string): Promise<{ sid: string }> {
  const v = await client().verify.v2
    .services(verifySid!)
    .verifications.create({ to: phoneE164, channel: "sms" });
  return { sid: v.sid };
}

export async function checkOtp(phoneE164: string, code: string): Promise<boolean> {
  const r = await client().verify.v2
    .services(verifySid!)
    .verificationChecks.create({ to: phoneE164, code });
  return r.status === "approved";
}
