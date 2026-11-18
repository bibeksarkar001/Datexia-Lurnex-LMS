# Security Policy

## Public Firebase configuration

The Firebase web configuration in the source code is public by design. It identifies the Firebase project to the browser and is not a secret. Access is controlled by Firestore Security Rules and Firebase Authentication, not by hiding these values. See [Firebase API keys](https://firebase.google.com/docs/projects/api-keys) for details.

## How user data is protected

- Progress is stored in Firestore under `datexia-lms/{userId}`.
- The rules in [`/firestore.rules`](./firestore.rules) allow each signed-in user to read and write only their own progress document. All other access is denied.
- The app stores only the checkbox state for course progress, plus the Google profile details that Firebase Auth provides at sign-in.
- The app does not store passwords, payment details, or other personal data.

If you find a way around these rules, please report it as described below.

## Reporting a vulnerability

Please do not open a public issue for security problems.

Use GitHub private vulnerability reporting:

1. Go to the repository's **Security** tab.
2. Select **Report a vulnerability**.
3. Describe the issue, the steps to reproduce it, and its potential impact.

Reports are handled on a best-effort basis. Please allow reasonable time for a fix before public disclosure.

## Supported versions

Only the latest version on the `main` branch is supported.
