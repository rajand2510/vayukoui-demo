import { useState } from "react";
import { Button } from "@vayuko/ui";
import { PageLayout } from "../../components/PageLayout";
import { PropControl } from "../../components/PropControl";
import { ColorPicker } from "../../components/ColorPicker";

export default function ThemeProviderPage() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [customPrimary, setCustomPrimary] = useState("#6366f1");

  const code = `// Wrap your app (e.g. in main.tsx)
import { ThemeProvider } from "@vayuko/ui";

<ThemeProvider mode="${mode}">
  <App />
</ThemeProvider>

// With custom tokens
<ThemeProvider
  mode="${mode}"
  theme={{ "color-primary": ${JSON.stringify(customPrimary)} }}
>
  <App />
</ThemeProvider>`;

  return (
    <PageLayout
      title="ThemeProvider"
      description="Wraps the app to provide light/dark mode and optional custom CSS variables."
      code={code}
      preview={
        <div className="flex flex-wrap gap-3 rounded-xl border border-slate-200 bg-white p-4">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <p className="w-full text-sm text-slate-500">
            This app is wrapped in ThemeProvider in main.tsx. Use the theme prop for custom tokens.
          </p>
        </div>
      }
      props={
        <>
          <PropControl label="Mode">
            <select
              className="demo-select"
              value={mode}
              onChange={(e) => setMode(e.target.value as "light" | "dark")}
            >
              <option value="light">light</option>
              <option value="dark">dark</option>
            </select>
          </PropControl>
          <PropControl
            label="Custom primary (theme.color-primary)"
            hint="Pass as theme prop to ThemeProvider"
          >
            <ColorPicker
              value={customPrimary}
              onChange={setCustomPrimary}
              aria-label="Primary color"
            />
          </PropControl>
          <p className="text-sm text-slate-500">
            Usage:{" "}
            <code className="rounded bg-slate-200 px-1.5 py-0.5 text-xs">
              {"<ThemeProvider mode=\"light\" theme={{ \"color-primary\": \"#6366f1\" }}>"}
            </code>
          </p>
        </>
      }
    />
  );
}
