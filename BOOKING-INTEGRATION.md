# Open Dialogue booking integration

The public booking experience is served separately from this static CV/portfolio repository:

https://lanven-open-dialogue.livelyprawn258.chatgpt.site/

## Production boundaries

- The CV lives at `docs/index.html`, and the portfolio at `docs/portfolio.html`.
- Both pages use `docs/booking-link.js` for the "Book a meeting" CTA. Keep this link pointed at the deployed booking service and pass the selected language with `?lang=`.
- The booking app owns Google Calendar availability, meeting creation and confirmations. Do not embed calendar credentials, service tokens or server-side booking logic in GitHub Pages.
- The separately deployed booking page was updated on October 28, 2026. Its visual direction is Bold Executive: large typography, strong calendar/date/time-slot hierarchy, smooth step transitions, clear confirmation and responsive mobile layouts.
- Supported interface languages are `ru`, `en`, `pl`, `es` and `uk`.
- The portfolio and CV use shared `motion-design.css` / `motion-design.js` for editorial typography and motion. Booking should visually follow the same Obsidian / Electric Blue / Acid Lime direction, while retaining accessible focus states and reduced-motion behavior.

## Release checks

1. Confirm links from CV, portfolio header and footer reach the booking service and preserve the chosen language.
2. On the booking deployment, verify live available slots, timezone, booking completion and confirmation without using test events in a real calendar.
3. Check desktop and narrow mobile layouts, keyboard navigation, and reduced motion.
4. Publish the booking service through its own deployment workflow. A push to this GitHub Pages repository **does not** publish the booking application's source code or backend.
