# Contributing to Datexia Lurnex LMS

Thanks for helping make this free curriculum better. This guide covers local setup, how to propose changes, and where to start.

## Prerequisites

- Node.js 20 or newer
- npm
- Git

## Setup

```bash
git clone https://github.com/bibeksarkar001/Datexia-Lurnex-LMS.git
cd Datexia-Lurnex-LMS
npm install
npm run dev     # local dev server
npm test        # run tests
npm run build   # production build
```

### Optional: your own Firebase project

The app runs in guest mode without any Firebase setup. To test sign-in and cloud progress sync against your own project:

1. Copy `.env.example` to `.env.local`.
2. Fill in the `VITE_FIREBASE_*` values from your Firebase console.
3. Restart `npm run dev`.

Never commit `.env.local`.

## Proposing a course or link change

Course data lives in `src/data/curriculum.js` (the `JOBS`, `PROJECTS`, and `CURRICULUM` arrays).

- Keep every `id` field stable. Learners' saved progress is keyed by these ids, so changing an id silently breaks their checkboxes.
- To add a course, append a new entry with a new, unique id.
- To replace a dead link, keep the same id and change only the URL and title.

## Branches, pull requests, and commits

1. Fork the repo and create a branch from `main`, e.g. `fix/broken-link-month-12` or `feat/rag-project-idea`.
2. Make a focused change. One topic per pull request.
3. Run `npm test` and `npm run build` before opening the PR.
4. Open a PR against `main` and fill in the PR template.

Commit messages use the imperative mood with a short subject line (about 72 characters or fewer):

```
Fix dead link in Month 12 RAG course
Add free alternative for CUDA basics
```

## Good first contributions

- Report a dead course link using the **Broken link** issue form.
- Suggest a free alternative to a paid or gated course.
- Add or improve translations.
- Fix accessibility issues (contrast, labels, keyboard navigation).
- Propose a new project idea for an existing month.

Questions? Open a GitHub issue.
