# Admin Firestore Rules Findings

## Codebase Analysis

- Languages and framework: Nuxt 4, Vue 3 Composition API, Firebase Functions for quote submission, Firebase Firestore for booking/mail storage.
- Firestore collections found:
  - `bookings`: written by `functions/index.js` through Admin SDK in `createBooking`; also created by the browser quote-form fallback if the HTTPS function is unavailable. Browser admin reads, updates, and deletes documents after Firebase Auth sign-in.
  - `mail`: written by `functions/index.js` for the firestore-send-email extension. No browser access is required.
- Firestore queries found:
  - Admin page listens to `collection(db, "bookings")`, then sorts client-side by collection date ascending so the next upcoming bookings appear first.
  - The booking function checks duplicate `submissionId`, but it uses Admin SDK and bypasses browser rules.
- Authentication pattern:
  - Browser admin uses Firebase Auth Google sign-in.
  - The admin UI limits access by configured email domain before mounting booking reads/writes. Firestore itself treats any signed-in Firebase Auth user as admin for booking read, update, and delete so admin edits are not blocked by stale field allow-lists.
- Business operation:
  - Browser admins move quotes through `quote-received`, `quote-sent`, `job-booked`, `job-completed`, and `job-paid`.
  - Existing `new` statuses remain valid for backwards compatibility and display as `quote-received`.
  - Browser admins can edit customer contact fields, collection details, load summary, time summary, and estimated total. Every write must also include `updatedAt` and `updatedBy`.
  - Browser admins can delete quote documents after an in-app confirmation prompt.

## Devil's Advocate Review

- Public list exploit: unauthenticated reads are denied; signed-in users can list bookings by design for admin operation.
- Unauthorized read/write: unauthenticated booking reads, updates, and deletes are denied. Signed-in Firebase Auth users can read, update, and delete booking documents by design.
- Update bypass: signed-in users can update any booking field by design. This avoids repeat admin failures caused by stale Firestore field allow-lists when the app's booking schema changes.
- Create/delete abuse: public creates are allowed for the quote-form fallback; deletes require Firebase Auth sign-in. Browser access to `mail` remains denied.
- Schema pollution: Firestore does not restrict signed-in booking updates by field by design. Keep schema validation in the admin UI and server booking function.
- Invalid status: Firestore does not restrict signed-in booking status values by design. Keep status options constrained in the admin UI.
- Timestamp manipulation: Firestore does not force `updatedAt` to equal `request.time` for signed-in admin updates by design.
- Privilege escalation: no browser-writable admin role collection exists; authority comes from Firebase Auth token email/email_verified.
- Query support: the admin list query is allowed for verified domain admins; date grouping and ordering happen client-side.

These rules intentionally keep booking administration permissive for signed-in Firebase users. The repo also includes `npm run verify:admin-rules` to catch accidental reintroduction of restrictive booking update rules.
