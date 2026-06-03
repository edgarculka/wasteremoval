# Firebase booking email setup

This project uses the official Firebase **Trigger Email from Firestore** extension (`firebase/firestore-send-email`) for booking confirmations and internal booking notifications.

## What is implemented

1. The quote page submits the booking form to `/api/bookings`.
2. Firebase Hosting rewrites `/api/bookings` to the `createBooking` Cloud Function in `us-central1`.
3. The function validates the booking payload, stores a private `bookings/{bookingId}` document, and creates two `mail` documents:
   - one confirmation email to the customer email from the form;
   - one internal notification email to `contact@dbs-waste.co.uk`.
4. The Trigger Email extension watches the `mail` collection in the default Firestore database and sends those email documents through Google Workspace SMTP.
5. Replies are handled by Google Workspace inboxes:
   - customer confirmation emails use `contact@dbs-waste.co.uk` as `replyTo`;
   - internal notification emails use the customer's submitted email as `replyTo`, so replying from the internal mailbox replies directly to the customer.

> The Firebase extension sends outbound email. It does not ingest inbound email into Firestore. “Receiving emails” for this booking flow means receiving replies and internal notifications in the configured Google Workspace mailbox.

## Google Workspace credentials

A Google Account by itself is not enough for a deployed Firebase extension to send mail. The extension needs a non-interactive SMTP credential for the Workspace mailbox because there is no browser login during Cloud Function execution.

Use a dedicated Workspace mailbox or alias for `contact@dbs-waste.co.uk`. For this project, the simplest fully functional path is **Google Workspace Gmail SMTP + a Google App Password**. The app password is the only email password Firebase needs.

### Passwords and secrets checklist

| Item | Where it comes from | Where it goes | Commit it? |
| --- | --- | --- | --- |
| Google Account password | The normal password for the Workspace user that owns `contact@dbs-waste.co.uk` | Only used by the owner to sign in to Google and enable 2-Step Verification | No |
| Google App Password | Google Account security page for the `contact@dbs-waste.co.uk` Workspace user, after 2-Step Verification is enabled | Paste into the Firebase secret named `firestore-send-email-SMTP_PASSWORD` | No |
| Firebase secret resource path | Firebase/Google Secret Manager after the secret is created | Already referenced by `SMTP_PASSWORD` in `extensions/firestore-send-email.env` | Yes, only the resource path |

### Create the Google App Password

1. Sign in as the Google Workspace user that will send booking emails: `contact@dbs-waste.co.uk`.
2. Open the Google Account security page: <https://myaccount.google.com/security>.
3. Enable **2-Step Verification** for that user if it is not already enabled. Google requires 2-Step Verification before app passwords can be created.
4. Open **App passwords** directly: <https://myaccount.google.com/apppasswords>.
5. Create an app password named `Firebase Trigger Email` or `DBS Waste Firebase SMTP`.
6. Copy the generated 16-character app password immediately. Google only shows it once. This is the value to paste into Firebase Secret Manager.

If **App passwords** is missing, check these first:

- The signed-in user is the actual sending mailbox user, not only a personal/admin account.
- 2-Step Verification is enabled for that user.
- The Google Workspace admin has not disabled app passwords for the organisation or organisational unit.
- The account is not configured in a way that blocks app passwords, such as security-key-only 2-Step Verification.

Recommended SMTP settings for the app-password path:

- SMTP host: `smtp.gmail.com`
- Port/security: `465` with `smtps://`
- Username: `contact@dbs-waste.co.uk`
- Authentication type: `UsernamePassword`
- Password: the 16-character Google App Password stored in Firebase Secret Manager

Create or update the Firebase secret before deploying the extension:

```bash
npm run firebase:email-secret
```

That script runs:

```bash
npx -y firebase-tools@latest functions:secrets:set firestore-send-email-SMTP_PASSWORD --project wasteremoval-3276
```

When prompted, paste the 16-character Google App Password. Do not paste your normal Google Account password, and do not commit the app password.

The committed extension config already points to that secret:

```env
SMTP_PASSWORD=projects/${param:PROJECT_NUMBER}/secrets/firestore-send-email-SMTP_PASSWORD/versions/latest
```

### If Google App Passwords are unavailable

Use one of these alternatives instead of the app-password path:

1. **Google Workspace SMTP relay** — configure SMTP relay in Google Admin for your Workspace, then update `SMTP_CONNECTION_URI` and the secret value to match the relay/auth settings. This is usually the best Workspace-admin-managed alternative.
2. **OAuth2 for the Firebase extension** — change `AUTH_TYPE` to `OAuth2`, then provide OAuth2 credentials/secrets required by the extension (`CLIENT_ID`, `CLIENT_SECRET`, and `REFRESH_TOKEN`) in Secret Manager.
3. **Transactional email provider** — use SendGrid, Mailgun, Postmark, or a similar provider, then replace `SMTP_CONNECTION_URI`, `DEFAULT_FROM`, and the stored secret with the provider's SMTP settings.

## Extension configuration

The extension manifest is pinned in `firebase.json` and the parameter values live in `extensions/firestore-send-email.env`.

Important committed parameters:

- `DATABASE=(default)` — watches the default Firestore database.
- `DATABASE_REGION=us-central1` — matches the existing Firestore database location for project `wasteremoval-3276`.
- `MAIL_COLLECTION=mail` — must match the `MAIL_COLLECTION` constant in `functions/index.js`.
- `AUTH_TYPE=UsernamePassword` — uses the SMTP URI plus the Secret Manager password.
- `DEFAULT_FROM=contact@dbs-waste.co.uk` and `DEFAULT_REPLY_TO=contact@dbs-waste.co.uk` — default sender/reply settings for generated email.

## Firebase CLI setup and deployment

The repo has npm scripts for the Firebase CLI commands needed to connect the booking form, Cloud Function, Firestore rules, Hosting rewrite, and Trigger Email extension.

Run these from the repository root:

```bash
npm run firebase:version
npm run firebase:login
npm run firebase:use
npm run firebase:firestore:list
npm run firebase:functions:list
npm run firebase:extensions:list
npm run firebase:email-secret:check
npm run firebase:email-secret
npm run firebase:deploy:email
```

What each command does:

- `npm run firebase:version` verifies that the Firebase CLI can be downloaded and executed.
- `npm run firebase:login` signs in with the Google account that has access to Firebase project `wasteremoval-3276`.
- `npm run firebase:use` selects Firebase project `wasteremoval-3276`.
- `npm run firebase:firestore:list` checks whether the default Firestore database already exists.
- `npm run firebase:functions:list` checks whether Cloud Functions API is enabled and whether `createBooking` is deployed.
- `npm run firebase:extensions:list` checks whether the `firestore-send-email` extension instance is installed.
- `npm run firebase:email-secret:check` checks metadata for the SMTP password secret without printing the secret value.
- `npm run firebase:email-secret` creates or updates the Secret Manager value used by the extension for Gmail SMTP. Paste the 16-character Google App Password when prompted.
- `npm run firebase:deploy:email` deploys Functions, Firestore rules, Hosting rewrites, and Extensions for the email booking flow.

The extension configuration is committed in `extensions/firestore-send-email.env`; the secret value itself is stored in Google Secret Manager.

If `npm run firebase:version` fails with an npm registry or proxy error, Firebase CLI cannot be installed in that environment. Fix the local network/proxy/npm registry access first, then rerun the commands above.

## Current live project status

These checks were last run against Firebase project `wasteremoval-3276` from the Firebase CLI on 2026-06-03:

- Firebase CLI auth is working for `culkaedgar@gmail.com`.
- Hosting site `wasteremoval-3276` exists at `https://wasteremoval-3276.web.app`.
- The default Firestore database exists in native mode at `us-central1`.
- Firebase extension `firebase/firestore-send-email` is installed as instance `firestore-send-email`, version `0.2.9`, and is `ACTIVE`.
- Secret `firestore-send-email-SMTP_PASSWORD` exists with version `1` enabled.
- Extension function `ext-firestore-send-email-processqueue` is deployed in `us-central1`.
- The custom booking function `createBooking` is deployed in `us-central1`.
- Firebase Hosting rewrites `/api/bookings` to `createBooking` on both `https://wasteremoval-3276.web.app` and `https://dbs-waste.co.uk`.
- Smoke test booking `8995F8FC` returned `201` from `/api/bookings`.
- The Trigger Email extension delivered both generated `mail` documents for booking `8995F8FC`; Cloud Function logs showed `accepted: 1 rejected: 0 pending: 0` for both SMTP sends.

The required live setup order is:

1. Upgrade Firebase project `wasteremoval-3276` to the Blaze pay-as-you-go plan: <https://console.firebase.google.com/project/wasteremoval-3276/usage/details>.
2. Create the default Firestore database in `us-central1`. This location is not changeable later. The repo command is:

   ```bash
   npm run firebase:firestore:create
   ```

3. Create the Google App Password for the sending mailbox and store it in the Firebase secret:

   ```bash
   npm run firebase:email-secret
   ```

4. Deploy the backend, rules, hosting rewrite, and extension:

   ```bash
   npm run firebase:deploy:email
   ```

5. Re-check `/api/bookings`. A GET request should return JSON `405 Method not allowed`, proving the Hosting rewrite reaches `createBooking`.

## GitHub Actions deployment setup

The default-branch workflow in `.github/workflows/deploy-static.yml` deploys Hosting, Functions, Firestore rules, and Extensions with the Firebase CLI. It needs a repository secret containing a Google Cloud service account JSON key.

Create or review the service account here:

- Service accounts: <https://console.cloud.google.com/iam-admin/serviceaccounts?project=wasteremoval-3276>
- IAM permissions: <https://console.cloud.google.com/iam-admin/iam?project=wasteremoval-3276>

Add the JSON key to GitHub here:

- Repository Actions secrets: <https://github.com/edgarculka/wasteremoval/settings/secrets/actions>

Use this secret name:

```text
FIREBASE_SERVICE_ACCOUNT_WASTEREMOVAL_3276
```

The workflow supports `FIREBASE_SERVICE_ACCOUNT` as a fallback, but the project-specific name is preferred.

The service account must be able to deploy the same Firebase targets as the manual command:

- Firebase Hosting;
- Cloud Functions for Firebase;
- Firestore rules;
- Firebase Extensions;
- extension configuration that references Secret Manager.

The current GitHub Actions service account is:

```text
github-action-deploy@wasteremoval-3276.iam.gserviceaccount.com
```

It needs these project-level roles:

- `roles/firebasehosting.admin` (`Firebase Hosting Admin`);
- `roles/firebase.admin` (`Firebase Admin`);
- `roles/cloudbuild.builds.editor` (`Cloud Build Editor`);
- `roles/iam.serviceAccountUser` (`Service Account User`);
- `roles/secretmanager.admin` (`Secret Manager Admin`).

`roles/firebase.admin` includes Service Usage inspection permissions such as `serviceusage.services.get`, which the Firebase CLI uses when it checks that required APIs, including `firestore.googleapis.com`, are enabled before deployment.

For initial setup, a project Owner can run the first manual deploy. For CI, grant only the roles required by the deployed targets. Firebase's current docs call out:

- Firebase Extensions install/manage access: Owner, Editor, or Firebase Admin.
- Cloud Functions deployment: Cloud Functions Admin plus Service Account User, or a project Owner.
- Firebase CLI deploy support for Hosting, Functions, Firestore rules, and other configured Firebase resources.

Useful console links for this project:

- Firebase project: <https://console.firebase.google.com/project/wasteremoval-3276/overview>
- Firebase Hosting: <https://console.firebase.google.com/project/wasteremoval-3276/hosting/sites>
- Cloud Functions: <https://console.firebase.google.com/project/wasteremoval-3276/functions>
- Firestore: <https://console.firebase.google.com/project/wasteremoval-3276/firestore>
- Extensions: <https://console.firebase.google.com/project/wasteremoval-3276/extensions>
- Secret Manager: <https://console.cloud.google.com/security/secret-manager?project=wasteremoval-3276>

## Credentials needed to finish live setup

To finish the live Firebase connection, the person running the commands needs:

1. **Firebase project access** — a Google account with permission to deploy Hosting, Cloud Functions, Firestore rules, Extensions, and Secret Manager secrets for project `wasteremoval-3276`.
2. **Sending mailbox access** — ability to sign in as the Google Workspace mailbox that sends email, currently configured as `contact@dbs-waste.co.uk`.
3. **A Google App Password for that mailbox** — generated after enabling 2-Step Verification on `contact@dbs-waste.co.uk`; this is pasted into `npm run firebase:email-secret`.
4. **Workspace admin access if app passwords are unavailable** — needed only to enable app passwords, configure Workspace SMTP relay, or approve OAuth2/SMTP alternatives.

Never paste the normal Google Account password into Firebase, and never commit any email password or app password.

## Smoke test

After deployment, submit `/quote/` with a real email address. Confirm that:

- a `bookings/{bookingId}` document exists;
- two `mail` documents are created;
- the customer receives the confirmation email;
- `contact@dbs-waste.co.uk` receives the internal notification email;
- replying to the customer confirmation goes to `contact@dbs-waste.co.uk`;
- replying to the internal notification goes to the customer's submitted email.

Latest smoke test evidence from 2026-06-03:

- `GET https://wasteremoval-3276.web.app/api/bookings` returned JSON `405 Method not allowed`.
- `GET https://dbs-waste.co.uk/api/bookings` returned JSON `405 Method not allowed`.
- `POST https://wasteremoval-3276.web.app/api/bookings` with a valid booking payload returned `201` and booking reference `8995F8FC`.
- Extension logs showed two successful SMTP deliveries for the generated `mail` documents: `mail/12SJfqEYLPdHKYGFnHK4` and `mail/bQ4hLAp4dXopIzVXfCOR`.

## Official references

- Firebase Trigger Email extension usage: <https://firebase.google.com/docs/extensions/official/firestore-send-email>
- Firebase Extensions manifest deployment: <https://firebase.google.com/docs/extensions/manifest>
- Firebase CLI deploy reference: <https://firebase.google.com/docs/cli>
- Firebase IAM permissions: <https://firebase.google.com/docs/projects/iam/permissions>
- Google App Passwords: <https://support.google.com/mail/answer/185833>
- Google Workspace SMTP relay: <https://support.google.com/a/answer/176600>

## Troubleshooting

- If `mail` documents are created but no emails arrive, open the `mail/{id}` document and inspect the extension's `delivery` field for SMTP errors.
- If deployment prompts for required extension values, confirm `DATABASE`, `DATABASE_REGION`, `MAIL_COLLECTION`, and `AUTH_TYPE` are present in `extensions/firestore-send-email.env`.
- If Gmail rejects authentication, confirm the secret contains the 16-character Google App Password, not the normal Google Account password, then rotate `firestore-send-email-SMTP_PASSWORD` and redeploy extensions.
- If Google does not show **App passwords**, use the checklist above to enable 2-Step Verification and confirm Workspace admin policy allows app passwords, or switch to Workspace SMTP relay/OAuth2.
- If Firestore TTL cleanup is desired, set `TTL_EXPIRE_TYPE` to a duration such as `month`, redeploy the extension, then configure a Firestore TTL policy for the `delivery.expireAt` field on the `mail` collection group.
