const { randomUUID } = require("node:crypto");
const admin = require("firebase-admin");
const { onRequest } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions");

admin.initializeApp();

const db = admin.firestore();
const CONTACT_EMAIL = "contact@dbs-waste.co.uk";
const MAIL_COLLECTION = "mail";
const BOOKINGS_COLLECTION = "bookings";
const PHOTO_STORAGE_BUCKET = "wasteremoval-3276.firebasestorage.app";
const MAX_PHOTOS = 4;
const MAX_PHOTO_BYTES = 750 * 1024;
const MAX_THUMBNAIL_BYTES = 140 * 1024;
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

function readPhotoPayload(value, errors) {
  if (typeof value === "undefined" || value === null) return [];
  if (!Array.isArray(value)) {
    errors.push("Photos must be sent as a list.");
    return [];
  }

  if (value.length > MAX_PHOTOS) {
    errors.push(`Upload no more than ${MAX_PHOTOS} photos.`);
  }

  return value.slice(0, MAX_PHOTOS).flatMap((item, index) => {
    const dataUrl = readString(item?.dataUrl, MAX_PHOTO_BYTES * 2);
    const thumbnailDataUrl = readString(
      item?.thumbnail?.dataUrl,
      MAX_THUMBNAIL_BYTES * 2,
    );
    const width = Number(item?.width);
    const height = Number(item?.height);
    const thumbnailWidth = Number(item?.thumbnail?.width);
    const thumbnailHeight = Number(item?.thumbnail?.height);
    const file = {
      id: readString(item?.id, 80) || `photo-${index + 1}`,
      name: readString(item?.name, 120) || `quote-photo-${index + 1}.jpg`,
      mimeType: readString(item?.mimeType, 40),
      width,
      height,
      dataUrl,
      thumbnail: {
        dataUrl: thumbnailDataUrl,
        width: thumbnailWidth,
        height: thumbnailHeight,
      },
    };

    const photoPrefix = `Photo ${index + 1}`;
    if (file.mimeType !== "image/jpeg") {
      errors.push(`${photoPrefix} must be an optimised JPEG image.`);
    }
    if (!/^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(file.dataUrl)) {
      errors.push(`${photoPrefix} is missing image data.`);
    }
    if (!/^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(file.thumbnail.dataUrl)) {
      errors.push(`${photoPrefix} is missing thumbnail data.`);
    }
    if (!Number.isFinite(width) || width < 1 || width > 2000) {
      errors.push(`${photoPrefix} has invalid image dimensions.`);
    }
    if (!Number.isFinite(height) || height < 1 || height > 2000) {
      errors.push(`${photoPrefix} has invalid image dimensions.`);
    }
    if (
      !Number.isFinite(thumbnailWidth) ||
      thumbnailWidth < 1 ||
      thumbnailWidth > 600 ||
      !Number.isFinite(thumbnailHeight) ||
      thumbnailHeight < 1 ||
      thumbnailHeight > 600
    ) {
      errors.push(`${photoPrefix} has invalid thumbnail dimensions.`);
    }

    const imageBuffer = decodeDataUrl(file.dataUrl);
    const thumbnailBuffer = decodeDataUrl(file.thumbnail.dataUrl);
    if (!imageBuffer || imageBuffer.length > MAX_PHOTO_BYTES) {
      errors.push(`${photoPrefix} is too large.`);
    }
    if (!thumbnailBuffer || thumbnailBuffer.length > MAX_THUMBNAIL_BYTES) {
      errors.push(`${photoPrefix} thumbnail is too large.`);
    }

    return [
      {
        ...file,
        buffer: imageBuffer,
        thumbnail: {
          ...file.thumbnail,
          buffer: thumbnailBuffer,
        },
      },
    ];
  });
}

function validateBookingPayload(payload) {
  const load = payload && typeof payload.load === "object" ? payload.load : null;
  const time = payload && typeof payload.time === "object" ? payload.time : null;
  const errors = [];

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
    photos: readPhotoPayload(payload?.photos, errors),
  };

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

function decodeDataUrl(dataUrl) {
  const match = /^data:image\/jpeg;base64,([A-Za-z0-9+/=]+)$/.exec(dataUrl);
  if (!match) return null;
  return Buffer.from(match[1], "base64");
}

function sanitizeFileName(value) {
  const baseName = value.replace(/\.[^.]+$/, "");
  return (
    baseName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || "quote-photo"
  );
}

function storageDownloadUrl(bucketName, filePath, token) {
  return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(filePath)}?alt=media&token=${token}`;
}

async function saveBookingPhotos(bookingId, photos) {
  if (!photos.length) return [];

  const bucket = admin.storage().bucket(PHOTO_STORAGE_BUCKET);
  const uploadedPhotos = [];

  for (const [index, photo] of photos.entries()) {
    const fileName = `${String(index + 1).padStart(2, "0")}-${sanitizeFileName(photo.name)}-${randomUUID().slice(0, 8)}.jpg`;
    const filePath = `bookings/${bookingId}/photos/${fileName}`;
    const thumbnailPath = `bookings/${bookingId}/photos/thumbnails/${fileName}`;
    const token = randomUUID();
    const thumbnailToken = randomUUID();

    await bucket.file(filePath).save(photo.buffer, {
      contentType: "image/jpeg",
      resumable: false,
      metadata: {
        cacheControl: "private, max-age=31536000",
        metadata: {
          bookingId,
          originalName: photo.name,
          firebaseStorageDownloadTokens: token,
        },
      },
    });
    await bucket.file(thumbnailPath).save(photo.thumbnail.buffer, {
      contentType: "image/jpeg",
      resumable: false,
      metadata: {
        cacheControl: "private, max-age=31536000",
        metadata: {
          bookingId,
          originalName: photo.name,
          firebaseStorageDownloadTokens: thumbnailToken,
        },
      },
    });

    uploadedPhotos.push({
      id: photo.id,
      name: photo.name,
      contentType: "image/jpeg",
      width: photo.width,
      height: photo.height,
      size: photo.buffer.length,
      path: filePath,
      url: storageDownloadUrl(bucket.name, filePath, token),
      thumbnail: {
        width: photo.thumbnail.width,
        height: photo.thumbnail.height,
        size: photo.thumbnail.buffer.length,
        path: thumbnailPath,
        url: storageDownloadUrl(bucket.name, thumbnailPath, thumbnailToken),
      },
    });
  }

  return uploadedPhotos;
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

function bookingLines(booking, bookingId, photos = []) {
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
    ["Photos", photos.length ? `${photos.length} uploaded` : "None uploaded"],
  ];
}

function buildPhotoHtml(photos) {
  if (!photos.length) return "";

  const rows = [];
  for (let index = 0; index < photos.length; index += 2) {
    const rowPhotos = photos.slice(index, index + 2);
    rows.push(
      `<tr>${rowPhotos
        .map(
          (photo, offset) => `
        <td style="width:50%;padding:6px;vertical-align:top;">
          <a href="${escapeHtml(photo.url)}" style="display:block;text-decoration:none;color:#111827;">
            <img src="${escapeHtml(photo.thumbnail.url)}" width="250" alt="${escapeHtml(`Uploaded quote photo ${index + offset + 1}`)}" style="display:block;width:100%;max-width:250px;height:auto;border:1px solid #d1d5db;border-radius:10px;" />
            <span style="display:block;margin-top:6px;font-size:13px;line-height:1.4;color:#374151;">Photo ${index + offset + 1}: view full image</span>
          </a>
        </td>`,
        )
        .join("")}</tr>`,
    );
  }

  return `
                <h2 style="margin:22px 0 10px;font-size:18px;line-height:1.3;color:#111827;">Uploaded photos</h2>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  ${rows.join("")}
                </table>`;
}

function buildHtml(title, intro, lines, photos = []) {
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
                ${buildPhotoHtml(photos)}
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

function buildText(title, intro, lines, photos = []) {
  const photoLines = photos.length
    ? `\n\nUploaded photos:\n${photos.map((photo, index) => `Photo ${index + 1}: ${photo.url}`).join("\n")}`
    : "";

  return `${title}\n\n${intro}\n\n${lines.map(([label, value]) => `${label}: ${value}`).join("\n")}${photoLines}\n\nDBS Waste will contact you if anything needs to be confirmed before dispatch.`;
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
    let uploadedPhotos = [];
    try {
      uploadedPhotos = await saveBookingPhotos(bookingId, booking.photos);
    } catch (error) {
      logger.error("Failed to upload booking photos", error);
      return jsonResponse(res, 500, { error: "Unable to upload booking photos" });
    }

    const lines = bookingLines(booking, bookingId, uploadedPhotos);
    const createdAt = admin.firestore.FieldValue.serverTimestamp();
    const batch = db.batch();

    const bookingRef = db.collection(BOOKINGS_COLLECTION).doc(bookingId);
    batch.set(bookingRef, {
      ...booking,
      photos: uploadedPhotos,
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
        text: buildText(customerTitle, customerIntro, lines, uploadedPhotos),
        html: buildHtml(customerTitle, customerIntro, lines, uploadedPhotos),
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
        text: buildText(teamTitle, teamIntro, lines, uploadedPhotos),
        html: buildHtml(teamTitle, teamIntro, lines, uploadedPhotos),
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
