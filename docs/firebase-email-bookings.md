# Firebase booking email setup

This project uses the official Firebase **Trigger Email from Firestore** extension (`firebase/firestore-send-email`) for booking confirmations.

## Flow

1. The quote page submits the booking form to `/api/bookings`.
2. Firebase Hosting rewrites `/api/bookings` to the `createBooking` Cloud Function in `europe-west2`.
3. The function validates the booking payload, stores a private `bookings/{bookingId}` document, and creates two `mail` documents:
   - one confirmation email to the customer email from the form;
   - one internal notification email to `contact@dbs-waste.co.uk`.
4. The Trigger Email extension watches the `mail` collection and sends the email documents through Gmail Workspace SMTP.

## Gmail Workspace credentials

Use a dedicated Workspace mailbox or alias for `contact@dbs-waste.co.uk`.

Recommended SMTP settings:

- SMTP host: `smtp.gmail.com`
- Port/security: `465` with `smtps://`
- Username: `contact@dbs-waste.co.uk`
- Password: a Google app password or SMTP relay credential stored in Secret Manager

Create or update the secret before deploying the extension:

```bash
npx -y firebase-tools@latest functions:secrets:set firestore-send-email-SMTP_PASSWORD --project wasteremoval-3276
```

Paste the Gmail Workspace app password when prompted. Do not commit the password.

## Deploy

After authenticating with Firebase CLI, deploy the function, Firestore rules, Hosting rewrite, and extension manifest:

```bash
npx -y firebase-tools@latest login --no-localhost
npx -y firebase-tools@latest deploy --only functions,firestore,hosting,extensions --project wasteremoval-3276
```

The extension configuration is committed in `extensions/firestore-send-email.env`; the secret value itself is stored in Google Secret Manager.

## Smoke test

After deployment, submit `/quote/` with a real email address. Confirm that:

- a `bookings/{bookingId}` document exists;
- two `mail` documents are created;
- the customer receives the confirmation email;
- `contact@dbs-waste.co.uk` receives the internal notification email.
