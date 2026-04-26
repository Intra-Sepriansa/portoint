# Testing the Portfolio Website

## Local Dev Setup

1. Start the Laravel server: `php artisan serve --host=0.0.0.0 --port=8000`
2. Start Vite dev server: `npm run dev` (may use port 5173 or 5174 if 5173 is in use)
3. Alternatively: `composer run dev` runs both concurrently
4. Database: SQLite at `database/database.sqlite` — ensure it exists (`touch database/database.sqlite`) and run `php artisan migrate --no-interaction`

## Available Routes

| Route | Page | Controller Method |
|-------|------|------------------|
| `/` | Homepage (all sections) | `PortfolioController::home` |
| `/projects` | Projects index | `PortfolioController::projects` |
| `/projects/{slug}` | Project case study | `PortfolioController::projectShow` |
| `/contact` | Contact page | `PortfolioController::contact` |

Project slugs: `kawa-ai`, `smanten-portal`, `linguapath`, `majormind`

## Homepage Sections (in order)

1. Hero — label "FULL-STACK WEB DEVELOPER", heading with gradient text, 3 CTA buttons, particle canvas background, floating tech cards
2. About — 3 highlight cards (Clean Interface, Scalable Backend, Real Product Workflow)
3. What I Build — 8 category cards
4. Tech Stack — category filter buttons (All, Frontend, Backend, Database, Mobile, Visualization, Tools), tech badges
5. Featured Projects — 4 project cards with tech badges and "View Case Study" CTAs
6. Development Approach — 6 step cards
7. Timeline — vertical timeline with connecting line
8. Services — 9 service cards
9. Contact — form (Name/Email/Message) + social links + copy email button
10. Footer — name, role, nav links, social icons, copyright

## Key Interactive Features to Test

### Command Palette
- Open with **Ctrl+K** (not Cmd+K on Linux)
- Search input filters command items in real-time
- 11 items: 6 navigation (#home, #about, #skills, #projects, #services, #contact), 4 projects (navigate to case study page), 1 action (Copy Email)
- Keyboard navigation: Arrow Up/Down to select, Enter to execute, Escape to close
- Available on all pages (Home, Projects Index, Project Show, Contact)

### Navbar
- Sticky with blur effect on scroll (appears after scrollY > 50)
- Active section highlight based on scroll position
- Smooth scroll navigation to anchored sections
- Mobile hamburger menu at `md` breakpoint and below (< 768px)
- Desktop shows: nav buttons, ⌘K button, "Let's Talk" CTA
- Mobile shows: hamburger icon only → opens slide-down menu

### Scroll Progress
- Fixed gradient bar at very top of viewport
- Width proportional to scroll position (indigo-to-violet gradient)

### Contact Form
- Opens `mailto:` link with pre-filled subject and body — does NOT submit to backend
- Required fields: name, email, message
- Copy email button copies `intrasepriansaa@gmail.com` to clipboard

## Testing Mobile Responsiveness

- Use Chrome DevTools device toggle (F12 → click device icon) to simulate mobile viewport
- Set width to 375-400px for mobile testing
- Verify: desktop nav hidden, hamburger visible, Let's Talk hidden, ⌘K hidden
- Click hamburger to open mobile menu with all nav items + Let's Talk CTA

## CI Notes

- `quality` job runs lint + format + typecheck — this should always pass
- `ci (8.3)` may fail due to `composer.lock` requiring PHP 8.4+ — this is a known pre-existing issue
- Lint: `npm run lint` (eslint), `vendor/bin/pint --dirty --format agent` (PHP)
- Format: `npm run format` (prettier)
- Typecheck: `npm run types:check` (tsc --noEmit)
- Build: `npm run build`

## Devin Secrets Needed

No secrets required for local testing. The portfolio is a static content site with no authentication or external API dependencies.
