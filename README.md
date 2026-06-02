# Waste Removal

Nuxt 4 static site for a waste removal service, with a component-driven design system and static generation.

## Development

Install dependencies:

```bash
npm ci
```

Run the local development server:

```bash
npm run dev
```

Generate the static site:

```bash
npm run generate
```

The generated site is written to `.output/public`.

## Deployment

GitHub Actions deploys the generated static site and the booking-email backend whenever `main` or `master` is updated. The workflow lives in `.github/workflows/deploy-static.yml` and deploys:

- Firebase Hosting, including the `/api/bookings` rewrite;
- the `createBooking` Cloud Function;
- Firestore rules;
- the `firebase/firestore-send-email` extension configuration.

The workflow requires a repository Actions secret named `FIREBASE_SERVICE_ACCOUNT_WASTEREMOVAL_3276` containing the Firebase service account JSON for project `wasteremoval-3276`. A fallback secret named `FIREBASE_SERVICE_ACCOUNT` is also supported.

Before the workflow can complete successfully:

- update `app/utils/company.ts` with verified phone, address, and waste carrier registration details;
- create the Firebase secret `firestore-send-email-SMTP_PASSWORD` with the sending mailbox app password;
- grant the service account enough Firebase/Google Cloud IAM permissions to deploy Hosting, Functions, Firestore rules, Extensions, and Secret Manager-backed extension configuration.

To deploy manually from a local machine with Firebase configured:

```bash
npm run deploy
```

See `docs/firebase-email-bookings.md` for the full booking email setup and smoke-test checklist.
