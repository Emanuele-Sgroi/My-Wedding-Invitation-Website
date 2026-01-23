# Copilot Instructions for My Wedding Invitation Website

## Project Overview
- **Framework:** Next.js (App Router, see `src/app/`)
- **Styling:** Tailwind CSS, SCSS modules (see `src/styles/`)
- **Backend/DB:** Firebase (Firestore, Auth, Admin SDK in `src/firebase/`)
- **Integrations:** Spotify (music suggestions), EmailJS (notifications)
- **Multilingual:** Language auto-detection and translation via `src/utils/translations.js` and `LanguageDetector`

## Key Architectural Patterns
- **Pages/Routes:** All routes are in `src/app/` (e.g., `page.js`, `admin/page.js`, API routes under `api/`)
- **Components:** Modular, grouped by feature in `src/components/` (e.g., `Homepage/`, `Admin/`, `ui/`)
- **State/Logic:** Minimal global state; most logic is local to components or handled via hooks (see `src/hooks/`)
- **Data Flow:**
  - Guest/RSVP and payment data via Firestore (see `src/firebase/` and Firestore structure in README)
  - Music suggestions use Spotify API (see `src/utils/spotifyClient.js`)
  - Email notifications via EmailJS (`src/utils/send-email.js`)
- **Admin Panel:** Google Auth protected, email allowlist via env var, see `src/app/admin/page.js`
- **Password Protection:** Bank details/registry section is password-protected (see `check-password` API route)

## Developer Workflows
- **Start Dev Server:** `npm run dev` (Next.js)
- **Build:** `npm run build`
- **Lint:** `npm run lint`
- **Environment:** All secrets in `.env.local` (see README for required vars)
- **Firestore:** Collections/fields must match README structure for full functionality

## Project-Specific Conventions
- **Translations:** Use `src/utils/translations.js` and `LanguageDetector` for all user-facing text
- **Component Import:** Use `src/components/index.js` for central exports
- **UI Components:** Use/extend primitives in `src/components/ui/` for consistency
- **Images/Assets:** Import via `src/utils/imagesImport.js` for homepage sections
- **Admin Auth:** Only emails in `NEXT_PUBLIC_ALLOWED_ADMIN_EMAIL` env var can access admin panel

## Integration Points
- **Spotify:** All music search/add flows use `src/utils/spotifyClient.js` and related API routes
- **EmailJS:** All RSVP and notification emails use `src/utils/send-email.js`
- **Firebase:** All guest/payment data CRUD via `src/firebase/` modules

## Examples
- **Add new language:** Update `src/utils/translations.js` and `LanguageDropdown`
- **Add homepage section:** Create component in `src/components/Homepage/`, import in `src/components/index.js`, and use in `src/app/page.js`
- **Add admin feature:** Extend `src/app/admin/page.js` and related `Admin/` components

## References
- See [README.md](../README.md) for setup, env vars, and Firestore schema
- See `src/firebase/` for all backend logic
- See `src/app/api/` for API endpoints

---
For any unclear patterns or missing documentation, review the README and key files above, or ask for clarification in a pull request.
