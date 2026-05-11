# Fakestore E-Commerce — CI/CD Pipeline Checklist

## What changed

New files:
- `src/test/setup.js` — Vitest setup with jest-dom matchers and sessionStorage polyfill
- `src/features/cart/cartSlice.test.js` — unit tests for the cart reducer (8 tests)
- `.github/workflows/ci.yml` — lint, test, build on every push and PR
- `.github/workflows/deploy.yml` — runs tests then deploys to Netlify on push to master
- `netlify.toml` — build config and SPA redirect rule

Modified files:
- `package.json` — added Vitest, Testing Library, jsdom, plus `test` and `test:watch` scripts
- `vite.config.js` — added the Vitest config block

## Step 1 — Install the new dev dependencies locally

```
cd C:\path\to\fakestore-ecommerce
npm install
npm test
```

You should see 8 tests pass. If they don't, do not push yet — let me know what failed.

## Step 2 — Commit and push

```
git add .
git status
git commit -m "Add testing setup and CI/CD pipeline"
git push origin master
```

## Step 3 — Set up Netlify (skip if you already have a site for this repo)

1. Go to https://app.netlify.com and click Add new site > Import existing project.
2. Connect GitHub, select `milovato2002-glitch/fakestore-ecommerce`.
3. Build settings should auto-detect from `netlify.toml`. Confirm:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy. Copy the site URL once it's live — this goes in your submission.

## Step 4 — Wire GitHub Actions to Netlify

You need three secrets in GitHub. Go to https://github.com/milovato2002-glitch/fakestore-ecommerce/settings/secrets/actions

1. **NETLIFY_AUTH_TOKEN**
   - In Netlify: User settings > Applications > Personal access tokens > New access token
   - Copy the value, paste into GitHub secret

2. **NETLIFY_SITE_ID**
   - In Netlify: open your fakestore-ecommerce site > Site configuration > Site information
   - Copy the API ID, paste into GitHub secret

3. `GITHUB_TOKEN` is provided automatically — no action needed.

## Step 4 — Verify

1. GitHub Actions tab shows CI workflow green (lint + 8 tests + build).
2. Deploy workflow runs after CI, succeeds, posts a Netlify URL in the logs.
3. Visit the Netlify URL — the app loads.

## Rubric coverage

| Rubric item | Where it lives |
|---|---|
| Testing library installed | `package.json` (vitest, @testing-library/react, @testing-library/jest-dom, jsdom) |
| Tests written | `src/features/cart/cartSlice.test.js` |
| GitHub Actions workflow | `.github/workflows/ci.yml` |
| Deployment | `.github/workflows/deploy.yml` + `netlify.toml` |

## Notes

- I targeted the cart slice for unit tests because it's pure Redux logic (no Firebase, no fetch, no React rendering). Fast, deterministic, real coverage of real business logic. If the rubric specifically requires component rendering tests, ping me and I'll add a couple of those too.
- The deploy workflow runs tests again before deploying. Belt and suspenders, but it means a flaky network during CI doesn't ship a broken build.
- If the rubric specifically requires Vercel instead of Netlify, swap the deploy step. The CI workflow stays the same either way.
