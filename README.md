# Afnane's portfolio

My personal portfolio, built with React and Vite. Feel free to fork it and make it yours.

## Run it

```bash
npm install
npm run dev
```

## Make it yours

- **Projects:** edit the `projects` array at the top of `src/components/Projects.jsx`. Drop your images, videos and logos in `public/`.
- **Colours:** everything is in `src/styles/Global.css`. Change the values and the whole site follows.
- **Text:** the rest of the content lives in `src/components/`.
- **Tab title and icon:** `index.html` and `public/favicon.svg`.

Please swap out all my personal content (name, photos, project media, texts). Those are mine.

## Deploy

It deploys to GitHub Pages on every push to `main` through `.github/workflows/deploy.yml`.

1. In your repo, go to Settings → Pages and set the source to **GitHub Actions**.
2. If your repo isn't named `<username>.github.io`, set `base: "/<repo-name>/"` in `vite.config.js`.
3. Push.
