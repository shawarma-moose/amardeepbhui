# Image assets to save

The code references these exact paths. Save the supplied images to them, then the
logo and portrait appear automatically (no code changes needed).

| Save to (exact path) | Image | Used in |
| -------------------- | ----- | ------- |
| `public/images/logo.png` | The **Mortgage Alliance** logo (green "M" + maple leaf + purple "i" + ALLIANCE banner) | Header + Footer |
| `public/images/amarpreet-portrait.png` | The **clean professional headshot** (turban, dark suit, white shirt, striped/red tie, soft background) | About, About-preview ("Meet your broker") — clean rectangular frame |
| `public/images/hero.jpg` | A **real licensed lifestyle photo** — warm Canadian home exterior, keys in hand, a couple at their front door, or a bright modern living space. **~1600×1000+ (landscape), not AI-generated.** A dark-to-transparent overlay sits on the left for text contrast. | Home **hero** (full-bleed). After saving, flip `heroSrc` in `lib/site.ts` from `/images/hero.svg` to `/images/hero.jpg`. |

Per-service feature photos (each shows a distinct labelled placeholder now):
- `public/images/services/<slug>.jpg` for each of: `mortgage-renewal`, `commercial-mortgages`,
  `self-employed-mortgages`, `refinance`, `first-time-homebuyer`, `investment-property`,
  `home-equity-loan` — a real licensed photo related to that service (~1600×900, landscape).
  After saving, change the `.svg` to `.jpg` in `app/services/[slug]/page.tsx` (one line).

Optional:
- `public/images/amarpreet-portrait-dark.png` — the dramatic dark studio portrait, if you
  later want it for a specific section. (Note: it carries a "Meta AI" watermark, so the clean
  headshot is the better default for the conservative white design.)

Until the PNGs are saved, those spots will show a broken image. The old SVG placeholders
(`logo.svg`, `amarpreet-portrait.svg`) are still in the folder as fallbacks if you want to
point `lib/site.ts` back to them temporarily.
