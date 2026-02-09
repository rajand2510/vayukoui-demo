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
- [@vayuko/ui](https://github.com/rajand2510) (local or published package)

## Run locally

```bash
# Install dependencies (requires @vayuko/ui — see below)
npm install

# Dev server
npm run dev

# Build
npm run build

# Preview production build
npm run preview
```

### Using the UI library

This demo depends on `@vayuko/ui`. Either:

1. **Local:** Clone the [Vayuko UI](https://github.com/rajand2510/Vayuko-UI) repo as a sibling folder named `vayukoui`, then run `npm install` in this repo.
2. **npm:** If `@vayuko/ui` is published, install it with `npm install @vayuko/ui` and update `package.json` to use it instead of `file:../vayukoui`.

## License

Same as the Vayuko UI project.
