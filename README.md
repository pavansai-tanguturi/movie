
# ChillMovies - Next.js Movie App

This project is a movie browser and favorites app, originally built with React and now migrated to [Next.js](https://nextjs.org) for improved routing, performance, and developer experience.

## Features

- Search and view movie details using the OMDb API
- Add or remove movies from your favorites (stored in localStorage)
- Responsive UI with custom styles
- Built with Next.js 14 (App Router)
- Uses browser-native `fetch` for API calls (no axios required)

---

## Getting Started


## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

You can start editing the main page by modifying `app/page.js` or add new routes in the `app/` directory. The page auto-updates as you edit the file.

---

## Migration Notes

- This app was migrated from Create React App to Next.js 14 using the App Router.
- All React components were moved to the `app/` directory and adapted for Next.js routing.
- Static assets from the old `public/` folder are now in the Next.js `public/` directory.
- All API calls use the browser-native `fetch` API for maximum compatibility.

---


## Customization

- OMDb API key is hardcoded in the code for demo purposes. For production, use environment variables.
- Favorites are stored in browser localStorage.

---


## Learn More about Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
