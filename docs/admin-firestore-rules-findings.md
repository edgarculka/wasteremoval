# Admin Firestore Rules Findings

## Codebase Analysis

- Languages and framework: Nuxt 4, Vue 3 Composition API, Firebase Functions for quote submission, Firebase Firestore for booking/mail storage.
- Firestore collections found:
  - `bookings`: written by `functions/index.js` through Admin SDK in `createBooking`. Browser admin reads documents and updates `status`, `updatedAt`, and `updatedBy`.
  - `mail`: written by `functions/index.js` for the firestore-send-email extension. No browser access is required.
- Firestore queries found:
  - Admin page listens to `collection(db, "bookings")`, then sorts client-side by collection date ascending so the next upcoming bookings appear first.
  - The booking function checks duplicate `submissionId`, but it uses Admin SDK and bypasses browser rules.
- Authentication pattern:
  - Browser admin uses Firebase Auth Google sign-in.
  - Admin authorization is based on a verified Google email whose domain is `dbs-waste.co.uk`.
- Business operation:
  - Browser admins move quotes through `quote-received`, `quote-sent`, `job-booked`, `job-completed`, and `job-paid`.
  - Existing `new` statuses remain valid for backwards compatibility and display as `quote-received`.
  - Browser admins can edit customer contact fields, collection details, load summary, time summary, and estimated total. Every write must also include `updatedAt` and `updatedBy`.
  - Browser admins can delete quote documents after an in-app confirmation prompt.

## Devil's Advocate Review

- Public list exploit: denied because `/bookings` read requires `isVerifiedDbsWasteAdmin()`.
- Unauthorized read/write: denied for unauthenticated users, users from other domains, and unverified emails.
- Update bypass: admin updates can only affect explicitly allowed quote fields plus `updatedAt` and `updatedBy`; arbitrary field updates are denied.
- Create/delete abuse: browser creates are denied for `bookings`; deletes are allowed only to verified domain admins. Browser access to `mail` remains denied.
- Schema pollution: arbitrary fields are denied by `changed.hasOnly(...)` on booking updates.
- Invalid status: status must be one of the allowed pipeline values.
- Timestamp manipulation: `updatedAt` must equal `request.time`.
- Privilege escalation: no browser-writable admin role collection exists; authority comes from Firebase Auth token email/email_verified.
- Query support: the admin list query is allowed for verified domain admins; date grouping and ordering happen client-side.

These rules are a domain-gated prototype for the requested admin workflow.
