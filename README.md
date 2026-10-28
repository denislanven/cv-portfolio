# Denis Lanven · CV & Portfolio

Multilingual CV, portfolio and eight interactive HR demos.

## Website

Publish with GitHub Pages: **Settings → Pages → Deploy from a branch → main → /docs**.
Expected project address: https://denislanven.github.io/cv-portfolio/

- `docs/index.html`: CV
- `docs/portfolio.html`: portfolio and case studies
- `docs/org-design.html`, `payroll-planner.html`, `retention.html`, `hrbp-simulator.html`: HR demos
- `docs/people-economics.html`, `pulselink.html`, `pepe.html`, `release.html`: interactive tools
- `docs/assets/`: embedded photographs extracted without re-encoding
- `docs/booking-link.js`: language-aware links to Open Dialogue

Languages: Russian, English, Polish, Spanish and Ukrainian. The tools inherit the portfolio language and offer a standalone language switcher. Translation dictionaries are bundled for offline use.

Meeting booking uses a separately hosted service with Google Calendar, Google Meet and Yandex Telemost. No booking credentials or server secrets are stored here. HR Lab uses synthetic examples and author-written exercises. PulseLink is an unconnected workflow prototype. User edits and gameplay are local to the browser session; downloads are generated locally. These tools are separate from real meeting bookings.

Source material and photographs remain the property of their respective owners. No license is granted by publication of this repository.

## HR Lab models and checks

See [model methodology](docs/lab-methodology.md) for data provenance, formulas and limitations. Shared deterministic calculations live in `docs/hr-lab-domain.js`; application views in `docs/hr-lab.js`; shared design in `docs/hr-lab.css`. The pixel game retains its own renderer and uses `docs/release-lab.css`.

Run `node --test tests/*.test.cjs`. The offline UI fixture tests logic and translations; it does not render a browser.

Pepe includes a welcome page, role plans and a demo HR workspace with current-session history, architecture and a JSON scenario editor. Public demo credentials (`hr` / `onboard2026`) only switch the interface; they do not secure personal data. Reloading clears answers and scenario edits.

The release game supports physical WASD keys across keyboard layouts and arrow keys. Its original procedural chiptune score is opt-in, has a volume control, changes during combat and pauses when the page is hidden. No external audio files are loaded. Gallery covers share current product titles and descriptions, with versioned demo URLs.
