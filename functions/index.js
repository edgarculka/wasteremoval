const { randomUUID } = require("node:crypto");
const admin = require("firebase-admin");
const { onRequest } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions");

admin.initializeApp();

const db = admin.firestore();
const CONTACT_EMAIL = "contact@dbs-waste.co.uk";
const MAIL_COLLECTION = "mail";
const BOOKINGS_COLLECTION = "bookings";
const ALLOWED_LOAD_IDS = new Set(["min", "mini", "small", "large", "full"]);
const ALLOWED_TIME_IDS = new Set(["morning", "afternoon", "evening"]);

function jsonResponse(res, status, body) {
  res.set("Content-Type", "application/json");
  res.status(status).send(JSON.stringify(body));
}

function readString(value, maxLength) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function normalizeEmail(value) {
  return readString(value, 160).toLowerCase();
}

function normalizePostcode(value) {
  return readString(value, 16).replace(/\s+/g, " ").toUpperCase();
}

function validateBookingPayload(payload) {
  const load = payload && typeof payload.load === "object" ? payload.load : null;
  const time = payload && typeof payload.time === "object" ? payload.time : null;

  const booking = {
    load: {
      id: readString(load?.id, 32),
      name: readString(load?.name, 80),
      ribbon: readString(load?.ribbon, 80),
      price: readString(load?.price, 32),
    },
    date: readString(payload?.date, 10),
    time: {
      id: readString(time?.id, 32),
      label: readString(time?.label, 80),
      description: readString(time?.description, 80),
    },
    postcode: normalizePostcode(payload?.postcode),
    addressLine1: readString(payload?.addressLine1, 160),
    name: readString(payload?.name, 120),
    phone: readString(payload?.phone, 40),
    email: normalizeEmail(payload?.email),
  };

  const errors = [];
  if (!ALLOWED_LOAD_IDS.has(booking.load.id)) errors.push("Choose a valid load size.");
  if (!booking.load.name || !booking.load.price) errors.push("Load details are missing.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(booking.date)) errors.push("Choose a valid collection date.");
  if (!ALLOWED_TIME_IDS.has(booking.time.id)) errors.push("Choose a valid arrival window.");
  if (!/^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/.test(booking.postcode)) errors.push("Enter a valid UK postcode.");
  if (booking.addressLine1.length < 3) errors.push("Enter the first line of the collection address.");
  if (booking.name.length < 2) errors.push("Enter your full name.");
  if (!/^[+\d][\d\s()-]{6,}$/.test(booking.phone)) errors.push("Enter a valid phone number.");
  if (!/^\S+@\S+\.\S+$/.test(booking.email)) errors.push("Enter a valid email address.");

  return { booking, errors };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/London",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

function bookingLines(booking, bookingId) {
  return [
    ["Booking reference", bookingId],
    ["Name", booking.name],
    ["Email", booking.email],
    ["Phone", booking.phone],
    ["Collection address", `${booking.addressLine1}, ${booking.postcode}`],
    ["Load size", `${booking.load.name} (${booking.load.ribbon})`],
    ["Estimated price", booking.load.price],
    ["Preferred date", formatDate(booking.date)],
    ["Preferred time", `${booking.time.label}${booking.time.description ? ` (${booking.time.description})` : ""}`],
  ];
}

function buildHtml(title, intro, lines) {
  const rows = lines
    .map(
      ([label, value]) => `
        <tr>
          <th style="padding:10px 12px;text-align:left;border-bottom:1px solid #e5e7eb;color:#111827;white-space:nowrap;">${escapeHtml(label)}</th>
          <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#374151;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,sans-serif;color:#111827;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f4f5;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:2px solid #111827;border-radius:18px;overflow:hidden;">
            <tr>
              <td style="padding:24px;background:#facc15;color:#111827;border-bottom:2px solid #111827;">
                <h1 style="margin:0;font-size:26px;line-height:1.2;">${escapeHtml(title)}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:24px;">
                <p style="margin:0 0 18px;font-size:16px;line-height:1.6;color:#374151;">${escapeHtml(intro)}</p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e7eb;border-radius:12px;border-collapse:separate;border-spacing:0;overflow:hidden;">
                  ${rows}
                </table>
                <p style="margin:18px 0 0;font-size:14px;line-height:1.6;color:#6b7280;">DBS Waste will contact you if anything needs to be confirmed before dispatch.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildText(title, intro, lines) {
  return `${title}\n\n${intro}\n\n${lines.map(([label, value]) => `${label}: ${value}`).join("\n")}\n\nDBS Waste will contact you if anything needs to be confirmed before dispatch.`;
}

exports.createBooking = onRequest(
  {
    region: "us-central1",
    cors: false,
    maxInstances: 10,
  },
  async (req, res) => {
    if (req.method !== "POST") {
      return jsonResponse(res, 405, { error: "Method not allowed" });
    }

    const { booking, errors } = validateBookingPayload(req.body);
    if (errors.length) {
      return jsonResponse(res, 400, { error: "Invalid booking", details: errors });
    }

    const bookingId = randomUUID().slice(0, 8).toUpperCase();
    const lines = bookingLines(booking, bookingId);
    const createdAt = admin.firestore.FieldValue.serverTimestamp();
    const batch = db.batch();

    const bookingRef = db.collection(BOOKINGS_COLLECTION).doc(bookingId);
    batch.set(bookingRef, {
      ...booking,
      bookingId,
      status: "new",
      createdAt,
      source: "quote-form",
    });

    const customerTitle = "Your DBS Waste booking request has been received";
    const customerIntro = "Thanks for booking with DBS Waste. We have received your collection request and the team will review the details shortly.";
    batch.set(db.collection(MAIL_COLLECTION).doc(), {
      to: [booking.email],
      replyTo: CONTACT_EMAIL,
      message: {
        subject: `${customerTitle} (${bookingId})`,
        text: buildText(customerTitle, customerIntro, lines),
        html: buildHtml(customerTitle, customerIntro, lines),
      },
      bookingId,
      createdAt,
    });

    const teamTitle = "New DBS Waste booking request";
    const teamIntro = "A customer submitted the quote booking form. Follow up using the details below.";
    batch.set(db.collection(MAIL_COLLECTION).doc(), {
      to: [CONTACT_EMAIL],
      replyTo: booking.email,
      message: {
        subject: `${teamTitle}: ${booking.name} (${bookingId})`,
        text: buildText(teamTitle, teamIntro, lines),
        html: buildHtml(teamTitle, teamIntro, lines),
      },
      bookingId,
      createdAt,
    });

    try {
      await batch.commit();
      return jsonResponse(res, 201, { bookingId });
    } catch (error) {
      logger.error("Failed to create booking", error);
      return jsonResponse(res, 500, { error: "Unable to create booking" });
    }
  },
);
