# Jude Rebamonte — AI Video Editor Portfolio V1

A static, responsive portfolio built for GitHub Pages. No build system or package manager is required.

## Structure

- `index.html` — page structure
- `styles.css` — responsive visual design
- `script.js` — filters, lazy autoplay previews, modals, mobile navigation
- `portfolio-data.js` — project inventory
- `featured-data.js` — featured project IDs
- `.nojekyll` — GitHub Pages compatibility
- `assets/profile/` — Jude's actual portrait
- `assets/thumbnails/` — static frames extracted from the real videos
- `assets/videos/previews/` — six-second silent autoplay preview clips
- `assets/videos/full/` — web-optimized full videos used in the playback modal

## Contact details in V1

- Email: rebamontejudee@gmail.com
- WhatsApp: +63 953 352 8096
- Location: Davao City, Philippines · GMT+8
- Working hours: 8:00 PM – 3:00 AM
- Availability: Full-time opportunities

## Updating the portfolio

Keep this as one evolving website. For a new project, add its media files under `assets/`, then add one object to `portfolio-data.js`. If it should be featured, add its `id` to `featured-data.js`.

## GitHub Pages deployment

1. Create a repository such as `ai-video-portfolio`.
2. Upload the **contents of this folder** to the repository root. Do not upload only the ZIP, and do not place `index.html` inside another folder.
3. Commit to `main`.
4. Open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select `main` and `/(root)`, then save.
7. After GitHub publishes the site, test images, previews, full video playback, filters, mobile layout, email, and WhatsApp again on the live URL.

The bundled videos have been converted to smaller web-friendly MP4 files so no individual media file in this V1 build exceeds GitHub's 100 MB per-file limit. The live deployment still needs to be tested after upload.
