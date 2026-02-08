# la-signed

This repository hosts the static site for la-signed.com, deployed with GitHub Pages.

What I changed
- Added a `CNAME` file with your custom domain (`la-signed.com`) so GitHub Pages will serve the site at that domain.
- Fixed a small typo in the viewport meta tag in `index.html`.

Next steps you should do in Wix (DNS)
- Add four A records for the apex (`@`) pointing to GitHub Pages:
  - 185.199.108.153
  - 185.199.109.153
  - 185.199.110.153
  - 185.199.111.153
- Add a CNAME for `www` pointing to `aftevaniarinh.github.io`.
- Ensure DNS records are DNS-only (disable any Wix proxy/forwarding).

Verification (run locally in terminal)
```bash
dig +short A la-signed.com
dig +short CNAME www.la-signed.com
curl -I https://la-signed.com
```

If DNS is correct, the `dig` commands will show the GitHub IPs and the CNAME; GitHub will provision HTTPS automatically within minutes to a few hours.

Rollback
- Remove the `CNAME` file or delete the DNS records in the Wix DNS manager to revert to the previous site.

If you want, I can:
- Generate a ready-to-copy zone file for backups.
- Add a GitHub Action to build/publish (not required for plain static sites).
- Help you verify DNS after you make the changes — paste `dig` output and I'll confirm.

---
