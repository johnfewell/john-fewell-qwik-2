# johnfewell.com

Personal site and blog of John Fewell, built with **[Astro](https://astro.build/) + React + [Tailwind CSS](https://tailwindcss.com/)** and deployed as a static site to Cloudflare Pages.

Originally based on the [Qwind](https://github.com/onwidget/qwind) Qwik template; migrated to Astro with React islands.

## Project structure

```
/
├── public/              # Static assets (favicon, robots.txt, _headers, images, resume)
├── src/
│   ├── assets/          # Fonts, images, global.css, prism.css
│   ├── components/
│   │   ├── common/      # Logo, ToggleTheme, ToggleMenu (React islands)
│   │   ├── icons/       # SVG icon components (React)
│   │   └── widgets/     # Header (React island), Hero/About (static .astro)
│   ├── content/post/    # Blog posts (markdown content collection)
│   ├── layouts/         # Layout.astro, MarkdownLayout.astro
│   ├── pages/           # index, about, 404, privacy, terms, blog/
│   ├── config.mjs       # Site name/title/description/origin
│   └── content.config.ts
└── astro.config.mjs
```

Only the header (scroll state, theme toggle, mobile menu) hydrates client-side; everything else ships as static HTML. Blog posts are rendered with markdown-it + Prism for code highlighting.

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Installs dependencies                        |
| `npm run dev`     | Starts local dev server                      |
| `npm run build`   | Build production site to `./dist/` (+ jampack) |
| `npm run preview` | Preview the build locally                    |
| `npm run build.types` | Type-check (`astro check`)               |
| `npm run fmt`     | Format with Prettier                         |

## License

MIT — see [LICENSE.md](./LICENSE.md). Based on Qwind by [onWidget](https://onwidget.com).
