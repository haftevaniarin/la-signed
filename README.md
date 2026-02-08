```markdown
# la-signed

This repository hosts the static site for la-signed.com, deployed with GitHub Pages.

What I changed
- Added a `CNAME` file with your custom domain (`la-signed.com`) so GitHub Pages will serve the site at that domain.
- Fixed a small typo in the viewport meta tag in `index.html`.
- Implemented a contact form wired for Formspree (client-side submit). See the Formspree section below.

Next steps you should do in Wix (DNS)
- Add four A records for the apex (`@`) pointing to GitHub Pages:
  - 185.199.108.153
  - 185.199.109.153
  - 185.199.110.153
  - 185.199.111.153
- Add a CNAME for `www` pointing to `haftevaniarin.github.io`.
- Ensure DNS records are DNS-only (disable any Wix proxy/forwarding).

Contact form (Formspree)
- The contact form in `index.html` is wired to submit to Formspree using AJAX. The form action currently uses a placeholder `https://formspree.io/f/YOUR_FORM_ID`.
- To enable submissions:
  1. Create a free form at https://formspree.io and get your form endpoint (it looks like `https://formspree.io/f/abcdxyzw`).
  2. Edit `index.html` and replace `YOUR_FORM_ID` in the form action with your form ID (so the `action` becomes the full URL Formspree gave you).
  3. Test the form by serving the site locally and submitting a message (see verification below).

Verification (run locally in terminal)
```bash
dig +short A la-signed.com
dig +short CNAME www.la-signed.com
curl -I https://la-signed.com
```

To test the contact form locally:
```bash
python3 -m http.server 8000
# then open http://localhost:8000 in your browser and submit the contact form
```

If Formspree is configured correctly, you should receive a confirmation or an email per your Formspree settings.

Rollback
- Remove the `CNAME` file or delete the DNS records in the Wix DNS manager to revert to the previous site.

If you want, I can:
- Generate a ready-to-copy zone file for backups.
- Add a GitHub Action to build/publish (not required for plain static sites).
- Help you verify DNS and confirm Formspree submissions after you configure the form — paste `dig` output or a Formspree test result and I'll confirm.

---

```
