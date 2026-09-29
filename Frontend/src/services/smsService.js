import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;

let twilioClient = null;

if (accountSid && authToken) {
  twilioClient = twilio(accountSid, authToken);
}

function normalizeIndianNumber(phone) {
  const value = String(phone || "").trim();

  if (value.startsWith("+")) {
    return value;
  }

  const digits = value.replace(/\D/g, "");

  if (digits.length === 10) {
    return `+91${digits}`;
  }

  return value;
}

export async function sendSosSms({
  contacts,
  emergencyType,
  latitude,
  longitude
}) {
  if (!twilioClient || !fromNumber) {
    return {
      configured: false,
      sent: [],
      failed: [],
      message: "Twilio SMS is not configured."
    };
  }

  const locationText =
    latitude != null && longitude != null
      ? `https://www.google.com/maps?q=${latitude},${longitude}`
      : "Location unavailable";

  const smsBody =
    `🚨 ASHRAYA SOS ALERT\n` +
    `Emergency: ${emergencyType}\n` +
    `An emergency has been activated.\n` +
    `Location: ${locationText}\n` +
    `Please contact the person immediately.`;

  const sent = [];
  const failed = [];

  for (const contact of contacts) {
    const toNumber = normalizeIndianNumber(contact.phone);

    try {
      const message = await twilioClient.messages.create({
        body: smsBody,
        from: fromNumber,
        to: toNumber
      });

      sent.push({
        contactId: contact._id,
        name: contact.name,
        phone: toNumber,
        messageSid: message.sid,
        status: message.status
      });

      console.log(
        `✅ SOS SMS sent to ${contact.name}: ${message.sid}`
      );
    } catch (error) {
      failed.push({
        contactId: contact._id,
        name: contact.name,
        phone: toNumber,
        error: error.message
      });

      console.error(
        `❌ SOS SMS failed for ${contact.name}:`,
        error.message
      );
    }
  }

  return {
    configured: true,
    sent,
    failed,
    message: `${sent.length} SMS sent, ${failed.length} failed.`
  };
}