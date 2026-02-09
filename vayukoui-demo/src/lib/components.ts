export const DEMOS_BASE = "/demos";

export const GETTING_STARTED = {
  path: `${DEMOS_BASE}/getting-started`,
  label: "Getting started",
  slug: "getting-started",
  subtitle: "Install & setup",
} as const;

export const COMPONENTS = [
  { path: DEMOS_BASE, label: "Overview", slug: "overview", subtitle: "All components" },
  GETTING_STARTED,
  { path: `${DEMOS_BASE}/theme-provider`, label: "ThemeProvider", slug: "theme-provider", subtitle: "Light / dark mode" },
  { path: `${DEMOS_BASE}/button`, label: "Button", slug: "button", subtitle: "Primary & secondary" },
  { path: `${DEMOS_BASE}/slider`, label: "Slider", slug: "slider", subtitle: "Single value" },
  { path: `${DEMOS_BASE}/range-slider`, label: "RangeSlider", slug: "range-slider", subtitle: "From – to range" },
  { path: `${DEMOS_BASE}/dropdown`, label: "Dropdown", slug: "dropdown", subtitle: "Searchable select" },
  { path: `${DEMOS_BASE}/date-picker`, label: "DatePicker", slug: "date-picker", subtitle: "Single date" },
  { path: `${DEMOS_BASE}/date-range-picker`, label: "DateRangePicker", slug: "date-range-picker", subtitle: "Date range" },
  { path: `${DEMOS_BASE}/radio-group`, label: "RadioGroup", slug: "radio-group", subtitle: "Pill & card variants" },
  { path: `${DEMOS_BASE}/voice-recorder`, label: "VoiceRecorder", slug: "voice-recorder", subtitle: "Mic recording" },
  { path: `${DEMOS_BASE}/notification`, label: "Notification", slug: "notification", subtitle: "Toasts" },
  { path: `${DEMOS_BASE}/progress`, label: "Progress", slug: "progress", subtitle: "Stepper, linear & circular" },
  { path: `${DEMOS_BASE}/tabs`, label: "Tabs", slug: "tabs", subtitle: "Tab & segment controls" },
  { path: `${DEMOS_BASE}/modal`, label: "Modal", slug: "modal", subtitle: "Dialog overlay" },
  { path: `${DEMOS_BASE}/drawer`, label: "Drawer", slug: "drawer", subtitle: "Side panel" },
  { path: `${DEMOS_BASE}/accordion`, label: "Accordion", slug: "accordion", subtitle: "Expand / collapse" },
] as const;

export const COMPONENT_ITEMS = COMPONENTS.filter((c) => c.path !== DEMOS_BASE && c.path !== GETTING_STARTED.path);
