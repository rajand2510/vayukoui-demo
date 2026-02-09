# @vayuko/ui

[![npm version](https://img.shields.io/npm/v/@vayuko/ui.svg)](https://www.npmjs.com/package/@vayuko/ui)
[![npm license](https://img.shields.io/npm/l/@vayuko/ui.svg)](https://www.npmjs.com/package/@vayuko/ui)

Modern React UI component library with theming and accessible components. Built with TypeScript and Vite. Requires **React 18 or 19**.

---

## Install

```bash
npm install @vayuko/ui
```

---

## Quick start

**1.** Import styles in your app entry (e.g. `main.tsx`):

```tsx
import "@vayuko/ui/dist/ui.css";
```

**2.** Wrap your app with `ThemeProvider` and optionally `NotificationProvider`:

```tsx
import { ThemeProvider, NotificationProvider } from "@vayuko/ui";

function App() {
  return (
    <ThemeProvider mode="light">
      <NotificationProvider position="top-right">
        <YourApp />
      </NotificationProvider>
    </ThemeProvider>
  );
}
```

**3.** Use components:

```tsx
import { Button, Slider, Dropdown, notification } from "@vayuko/ui";

function Screen() {
  return (
    <>
      <Button>Save</Button>
      <Slider defaultValue={50} aria-label="Volume" />
      <button onClick={() => notification.success("Done!")}>Toast</button>
    </>
  );
}
```

---

## Components overview

| Component | Description |
| --------- | ----------- |
| **ThemeProvider** | Light/dark mode and custom CSS variables |
| **Button** | Primary and secondary button |
| **Slider** | Single-value slider (marks, sizes, value label) |
| **RangeSlider** | Dual-thumb range slider |
| **Dropdown** | Select with optional search, icons, custom color |
| **DatePicker** | Single date picker (min/max, custom disable) |
| **DateRangePicker** | From–to date range with quick ranges |
| **RadioGroup** | Radio group (default, pill, card variants) |
| **VoiceRecorder** | Mic UI for voice recording |
| **Notification** | Single notification (controlled) |
| **NotificationProvider** | Toast stack; use with `notification` API |
| **Stepper** | Step indicators (dots, shapes, segmented, fill, underline, icons, vertical) |
| **LinearProgress** | Horizontal progress bar (value/max, label, status) |
| **CircularProgress** | Ring progress (value/max, label, size) |
| **Tabs** | Tab & segment controls (filled, bordered, underline, light; icons left/top) |
| **Modal** | Dialog overlay (title, body, footer; backdrop/Escape close) |
| **Drawer** | Side panel sliding from left or right |
| **Accordion** | Expand/collapse sections (FAQ-style; single or multiple open) |

---

## Component API & examples

### ThemeProvider

| Prop | Type | Default |
|------|------|---------|
| `mode` | `"light"` \| `"dark"` | `"light"` |
| `theme` | `Record<string, string>` | — |
| `children` | `ReactNode` | — |

**Example – light/dark:**

```tsx
import { ThemeProvider } from "@vayuko/ui";

<ThemeProvider mode="dark">
  <App />
</ThemeProvider>
```

**Example – custom tokens:**

```tsx
<ThemeProvider
  mode="light"
  theme={{
    "color-primary": "#7c3aed",
    "color-border": "#e9d5ff",
    "radius-md": "10px",
  }}
>
  <App />
</ThemeProvider>
```

---

### Button

| Prop | Type | Default |
|------|------|---------|
| `variant` | `"primary"` \| `"secondary"` | `"primary"` |
| (rest) | `ButtonHTMLAttributes<HTMLButtonElement>` | — |

**Examples:**

```tsx
import { Button } from "@vayuko/ui";

<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button disabled>Disabled</Button>
<Button onClick={() => alert("Clicked")}>With handler</Button>
```

---

### Slider (single value)

| Prop | Type | Default |
|------|------|---------|
| `min` / `max` | `number` | `0` / `100` |
| `step` | `number` | `1` |
| `value` / `defaultValue` | `number` | — |
| `onChange` | `(value: number) => void` | — |
| `disabled` | `boolean` | `false` |
| `size` | `"small"` \| `"medium"` | `"medium"` |
| `marks` | `boolean` \| `SliderMark[]` | `false` |
| `valueLabelDisplay` | `"on"` \| `"auto"` \| `"off"` | `"off"` |
| `label` / `unit` | `string` | — |

**Examples:**

```tsx
import { Slider } from "@vayuko/ui";

// Uncontrolled
<Slider min={0} max={100} defaultValue={50} aria-label="Volume" />

// Controlled with label
<Slider value={volume} onChange={setVolume} label="Volume" valueLabelDisplay="on" />

// Small size, auto value label on hover/drag
<Slider size="small" defaultValue={70} valueLabelDisplay="auto" />

// With step and auto marks
<Slider min={0} max={100} step={10} marks defaultValue={30} />

// Custom marks
<Slider marks={[{ value: 0, label: "0°C" }, { value: 100, label: "100°C" }]} />
```

---

### RangeSlider

| Prop | Type | Default |
|------|------|---------|
| `min` / `max` | `number` | required |
| `value` / `defaultValue` | `{ from: number; to: number }` | — |
| `onChange` | `(v: RangeValue) => void` | — |
| `step` | `number` | `1` |
| `size` | `"small"` \| `"medium"` | `"medium"` |
| `marks` | `boolean` \| `RangeSliderMark[]` | `false` |
| `minDistance` | `number` | — |
| `disableSwap` | `boolean` | `false` |
| `label` / `unit` | `string` | — |

**Examples:**

```tsx
import { RangeSlider, type RangeValue } from "@vayuko/ui";

<RangeSlider min={0} max={100} defaultValue={{ from: 20, to: 80 }} label="Range" />
<RangeSlider min={0} max={100} value={range} onChange={setRange} minDistance={20} />
<RangeSlider min={0} max={100} marks step={10} defaultValue={{ from: 20, to: 80 }} />
<RangeSlider min={0} max={100} disableSwap value={range} onChange={setRange} />
```

---

### Dropdown

| Prop | Type | Description |
|------|------|-------------|
| `options` | `DropdownOption[]` | `{ value, label, icon? }` |
| `value` / `defaultValue` | `string` | Selected value |
| `onChange` | `(value: string) => void` | — |
| `searchable` | `boolean` | Enable search filter |
| `placeholder` | `string` | Placeholder when empty |
| `color` | `string` | Accent color |
| `disabled` | `boolean` | — |

**Examples:**

```tsx
import { Dropdown } from "@vayuko/ui";

const options = [
  { value: "a", label: "Apple" },
  { value: "b", label: "Banana" },
  { value: "c", label: "Cherry" },
];

<Dropdown options={options} placeholder="Select fruit" />
<Dropdown options={options} searchable placeholder="Search…" />
<Dropdown options={options} defaultValue="b" onChange={setValue} />
<Dropdown options={optionsWithIcons} placeholder="Choose" color="#059669" />
```

---

### DatePicker

| Prop | Type | Description |
|------|------|-------------|
| `value` / `defaultValue` | `Date \| null` | — |
| `onChange` | `(date: Date \| null) => void` | — |
| `minDate` / `maxDate` | `Date` | Disable outside range |
| `disableDates` | `(date: Date) => boolean` \| `Date[]` | Custom disable |
| `showTime` | `boolean` | Optional time inputs |
| `placeholder` | `string` | — |
| `color` | `string` | Accent color |

**Examples:**

```tsx
import { DatePicker } from "@vayuko/ui";

<DatePicker placeholder="Select date" onChange={setDate} />
<DatePicker value={date} onChange={setDate} minDate={new Date()} />
<DatePicker showTime placeholder="Date & time" />
<DatePicker disableDates={(d) => d.getDay() === 0} />
```

---

### DateRangePicker

| Prop | Type | Description |
|------|------|-------------|
| `value` / `defaultValue` | `{ from: Date \| null; to: Date \| null }` | — |
| `onChange` | `(range: DateRangeValue) => void` | — |
| `minDate` / `maxDate` | `Date` | — |
| `disableDates` | `(date: Date) => boolean` \| `Date[]` | — |
| `color` | `string` | Accent color |

**Examples:**

```tsx
import { DateRangePicker } from "@vayuko/ui";

<DateRangePicker placeholder="From – To" onChange={setRange} />
<DateRangePicker value={range} onChange={setRange} color="#7c3aed" />
```

---

### RadioGroup

| Prop | Type | Description |
|------|------|-------------|
| `name` | `string` | Group name |
| `options` | `RadioOption[]` | `{ value, label }` |
| `value` / `defaultValue` | `string` | Selected |
| `onChange` | `(value: string) => void` | — |
| `variant` | `"default"` \| `"pill"` \| `"card"` | Style |
| `color` | `string` | Checked color |
| `disabled` | `boolean` | — |

**Examples:**

```tsx
import { RadioGroup } from "@vayuko/ui";

const options = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

<RadioGroup name="choice" options={options} defaultValue="yes" />
<RadioGroup name="choice" options={options} variant="pill" />
<RadioGroup name="choice" options={options} variant="card" color="#059669" />
```

---

### VoiceRecorder

| Prop | Type | Description |
|------|------|-------------|
| `onStart` | `() => void` | Recording started |
| `onStop` | `() => void` | Recording stopped |
| `recording` | `boolean` | Visual state |
| `disabled` | `boolean` | — |
| `color` | `string` | Mic/active color |

**Example:**

```tsx
import { VoiceRecorder } from "@vayuko/ui";

const [recording, setRecording] = useState(false);

<VoiceRecorder
  recording={recording}
  onStart={() => setRecording(true)}
  onStop={() => setRecording(false)}
/>
```

---

### Notification (controlled)

| Prop | Type | Description |
|------|------|-------------|
| `open` | `boolean` | Visible |
| `onClose` | `() => void` | Close handler |
| `variant` | `"info"` \| `"success"` \| `"error"` \| `"warning"` | — |
| `message` | `string` | Primary text |
| `description` | `string` | Secondary text |
| `duration` | `number` | Auto-close seconds; `0` = no auto-close |
| `position` | `NotificationPosition` | top-left, top-center, top-right, center, bottom-* |
| `image` | `string` \| `ReactNode` | Custom icon/logo (rounded square) |
| `actionButton` | `{ label, onClick }` | e.g. Undo |
| `color` | `string` | Accent/card color |
| `pauseOnHover` | `boolean` | Pause countdown on hover |
| `showClickToStop` | `boolean` | Show "Click to stop" |

**Example:**

```tsx
import { Notification } from "@vayuko/ui";

<Notification
  open={open}
  onClose={() => setOpen(false)}
  variant="success"
  message="Changes saved"
  duration={8}
  position="top-right"
  color="#059669"
/>
```

---

### Toast notifications (use anywhere)

Wrap the app with **NotificationProvider**, then call **notification** from any component or plain JS (e.g. API callbacks):

```tsx
// main.tsx
import { NotificationProvider } from "@vayuko/ui";

root.render(
  <NotificationProvider position="top-right">
    <App />
  </NotificationProvider>
);
```

```tsx
// Anywhere
import { notification } from "@vayuko/ui";

notification.success("Saved");
notification.error("Something went wrong");
notification.info("New update available");
notification.warning("Unsaved changes");

// With options
notification.success({
  message: "Done",
  description: "Details here",
  duration: 5,
  color: "#7c3aed",
  actionButton: { label: "Undo", onClick: handleUndo },
});
```

**API:** `notification.success(msg | options)`, `notification.error(...)`, `notification.info(...)`, `notification.warning(...)`, `notification.open(options)`.

---

### Stepper

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `StepperStep[]` | — | `{ id, label, description?, icon?, highlight? }` |
| `currentStep` | `number` | — | 0-based index of current step |
| `variant` | `StepperVariant` | `"dots"` | dots, shapes, segmented, fill, underline, icons, vertical |
| `color` | `string` | — | Accent (active/completed) |
| `inactiveColor` | `string` | — | Future steps |
| `onStepClick` | `(index: number) => void` | — | When a step is clicked |
| `clickable` | `boolean` | `false` | Allow step click to navigate |

**Examples:**

```tsx
import { Stepper } from "@vayuko/ui";
import type { StepperStep, StepperVariant } from "@vayuko/ui";

const steps: StepperStep[] = [
  { id: "plan", label: "Plan" },
  { id: "account", label: "Account" },
  { id: "payment", label: "Payment" },
];

<Stepper steps={steps} currentStep={1} aria-label="Progress" />
<Stepper steps={steps} currentStep={0} variant="underline" color="#7c3aed" />
<Stepper steps={steps} currentStep={1} variant="vertical" clickable onStepClick={setStep} />
```

---

### LinearProgress

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — | Current value (0 to max) |
| `max` | `number` | `100` | Maximum value |
| `color` | `string` | — | Bar color |
| `trackColor` | `string` | — | Track background |
| `label` | `string` | — | Label above bar |
| `statusMessage` | `string` | — | Text below bar |
| `showValue` | `boolean` | `false` | Show value (e.g. 75%) |
| `height` | `number` | — | Bar height (px) |
| `rounded` | `boolean` | `false` | Pill style |

**Examples:**

```tsx
import { LinearProgress } from "@vayuko/ui";

<LinearProgress value={65} max={100} label="Your progress" />
<LinearProgress value={65} max={100} showValue statusMessage="Payment in progress" color="#059669" />
```

---

### CircularProgress

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — | Current value (e.g. step index) |
| `max` | `number` | `100` | Max value (e.g. total steps) |
| `color` | `string` | — | Ring color |
| `label` | `string` | — | Text inside circle |
| `subLabel` | `string` | — | Secondary text |
| `size` | `number` | — | Diameter (px) |
| `strokeWidth` | `number` | — | Ring thickness |

**Examples:**

```tsx
import { CircularProgress } from "@vayuko/ui";

<CircularProgress value={1} max={4} label="Status" size={100} strokeWidth={6} />
<CircularProgress value={2} max={4} color="#eab308" label="Step 2 of 4" />
```

---

### Tabs

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tabs` | `TabItem[]` | — | `{ id, label, icon? }` |
| `value` | `string` | — | Active tab id |
| `onChange` | `(tabId: string) => void` | — | When tab changes |
| `variant` | `TabsVariant` | `"filled"` | filled, bordered, underline, light |
| `iconPosition` | `TabsIconPosition` | `"none"` | none, left, top |
| `color` | `string` | — | Active tab color |

**Examples:**

```tsx
import { Tabs } from "@vayuko/ui";
import type { TabItem } from "@vayuko/ui";

const tabs: TabItem[] = [
  { id: "all", label: "All Teams" },
  { id: "sales", label: "Sales" },
  { id: "marketing", label: "Marketing" },
];

const [value, setValue] = useState("all");

<Tabs tabs={tabs} value={value} onChange={setValue} aria-label="Tabs" />
<Tabs tabs={tabs} value={value} onChange={setValue} variant="underline" color="#ff3864" />
<Tabs tabs={tabsWithIcons} value={value} onChange={setValue} iconPosition="top" />
```

---

### Modal

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Visible |
| `onClose` | `() => void` | — | Close handler |
| `title` | `ReactNode` | — | Header title |
| `children` | `ReactNode` | — | Body content |
| `footer` | `ReactNode` | — | Footer (e.g. buttons) |
| `closeOnBackdropClick` | `boolean` | `true` | Close on overlay click |
| `closeOnEscape` | `boolean` | `true` | Close on Escape |
| `maxWidth` | `string` \| `number` | `"480px"` | Panel max width |

**Examples:**

```tsx
import { Button, Modal } from "@vayuko/ui";

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open</Button>
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="View Option"
  footer={
    <>
      <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
      <Button onClick={handleSave}>Save</Button>
    </>
  }
>
  <p>Modal body content here.</p>
</Modal>
```

---

### Drawer

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Visible |
| `onClose` | `() => void` | — | Close handler |
| `children` | `ReactNode` | — | Panel content |
| `side` | `"left"` \| `"right"` | `"right"` | Slide from left or right |
| `title` | `ReactNode` | — | Header title |
| `closeOnBackdropClick` | `boolean` | `true` | Close on overlay click |
| `closeOnEscape` | `boolean` | `true` | Close on Escape |
| `width` | `string` \| `number` | `"320px"` | Panel width |

**Examples:**

```tsx
import { Button, Drawer } from "@vayuko/ui";

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open drawer</Button>
<Drawer open={open} onClose={() => setOpen(false)} side="right" title="Side panel" width="320px">
  <p>Drawer content.</p>
</Drawer>
<Drawer open={open} onClose={() => setOpen(false)} side="left" title="Filters" width={360}>
  ...filters...
</Drawer>
```

---

### Accordion

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `AccordionItem[]` | — | `{ id, label, content, header? }` |
| `allowMultiple` | `boolean` | `false` | Allow multiple sections open |
| `expanded` | `string[]` | — | Controlled: open ids |
| `defaultExpanded` | `string[]` | `[]` | Uncontrolled: initial open ids |
| `onChange` | `(ids: string[]) => void` | — | When expansion changes |
| `color` | `string` | — | Active header color |

**Examples:**

```tsx
import { Accordion } from "@vayuko/ui";
import type { AccordionItem } from "@vayuko/ui";

const items: AccordionItem[] = [
  { id: "q1", label: "How do I upgrade?", content: "Go to Account Plans..." },
  { id: "q2", label: "Where is my code?", content: "Check your email." },
];

const [expanded, setExpanded] = useState<string[]>(["q1"]);

<Accordion items={items} expanded={expanded} onChange={setExpanded} aria-label="FAQ" />
<Accordion items={items} defaultExpanded={["q1"]} allowMultiple color="#7c3aed" />
```

---

## Demo website

**Live demo:** [https://rajand2510.github.io/Vayuko-UI/](https://rajand2510.github.io/Vayuko-UI/)

The **vayukoui-demo** app shows all components with live previews, prop controls, and code snippets. Run it locally (from repo root):

```bash
cd vayukoui && npm run build   # build the library first
cd ../vayukoui-demo
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173). To deploy the demo to GitHub Pages, ensure the repo has both `vayukoui/` and `vayukoui-demo/` at root, add the `.github/workflows/deploy-demo.yml` workflow, and in the repo **Settings → Pages** set source to **GitHub Actions**.

---

## Using in your project

1. Install: `npm install @vayuko/ui`
2. Import styles: `import "@vayuko/ui/dist/ui.css"`
3. Wrap with `<ThemeProvider>` (and optionally `<NotificationProvider>`).
4. Use components. Works with Vite, CRA, Next.js, etc. (React 18 or 19).

---

## License

[MIT](https://opensource.org/licenses/MIT) · [GitHub](https://github.com/vayuko/ui) · [Issues](https://github.com/vayuko/ui/issues)
