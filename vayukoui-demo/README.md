# Vayuko UI Demo

A live demo and documentation site for **[Vayuko UI](https://github.com/rajand2510)** — a React component library.

## Demo includes

- **Getting started** — Install and setup
- **ThemeProvider** — Light / dark mode
- **Button** — Primary & secondary
- **Slider** — Single value
- **RangeSlider** — From–to range
- **Dropdown** — Searchable select
- **DatePicker** — Single date
- **DateRangePicker** — Date range
- **RadioGroup** — Pill & card variants
- **VoiceRecorder** — Mic recording
- **Notification** — Toasts
- **Progress** — Stepper, linear & circular
- **Tabs** — Tab & segment controls
- **Modal** — Dialog overlay
- **Drawer** — Side panel
- **Accordion** — Expand / collapse

## Tech stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4
- React Router 7
- [@vayuko/ui](https://www.npmjs.com/package/@vayuko/ui) (from npm)

## Run locally

```bash
npm install

# Dev server
npm run dev

# Build
npm run build

# Preview production build
npm run preview
```

### Using the UI library

This demo depends on `@vayuko/ui` from npm. Install with:

```bash
npm install @vayuko/ui
```

For **local development** with the library source, use a sibling clone and set `"@vayuko/ui": "file:../vayukoui"` in `package.json`, then run `npm install`.

## Deploy on Vercel

Deploy from the **Vayuko-UI monorepo** so the demo uses the library from the repo (no npm publish needed):

1. In [Vercel](https://vercel.com), import the repo **[Vayuko-UI](https://github.com/rajand2510/Vayuko-UI)** (not a standalone demo repo).
2. Set **Root Directory** to `vayukoui-demo` (Project Settings → General → Root Directory).
3. Enable **Include source files outside of the Root Directory** (so the build can access `../vayukoui`).
4. The project’s `vercel.json` builds the UI library first, then the demo. Leave **Output Directory** as `dist`.
5. Deploy. The app uses `@vayuko/ui` from `file:../vayukoui` in the same repo.

## License

Same as the Vayuko UI project.
