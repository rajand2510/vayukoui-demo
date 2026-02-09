import { CodeSnippet } from "../components/CodeSnippet";

const installCode = `npm install @vayuko/ui`;

const setupCode = `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, NotificationProvider } from "@vayuko/ui";
import "@vayuko/ui/dist/ui.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider mode="light">
      <NotificationProvider position="top-right">
        <App />
      </NotificationProvider>
    </ThemeProvider>
  </StrictMode>
);`;

const usageCode = `import { Button } from "@vayuko/ui";

function MyApp() {
  return <Button onClick={() => alert("Hi")}>Click me</Button>;
}`;

export default function GettingStartedPage() {
  return (
    <div className="demo-page">
      <h1 className="demo-title">Getting started</h1>
      <p className="demo-desc">
        Install the library, add the CSS and providers, then use any component in your React app.
      </p>

      <div className="space-y-10">
        <section className="demo-card demo-card-panel">
          <h2 className="demo-card-heading">1. Install</h2>
          <p className="mb-3 text-sm text-gray-600">
            Install <code className="rounded bg-gray-200 px-1.5 py-0.5 font-mono text-xs">@vayuko/ui</code> from npm.
          </p>
          <CodeSnippet code={installCode} language="bash" />
        </section>

        <section className="demo-card demo-card-panel">
          <h2 className="demo-card-heading">2. Framework support</h2>
          <p className="mb-2 text-sm text-gray-600">
            <strong>@vayuko/ui</strong> is built for React. Supported versions:
          </p>
          <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
            <li><strong>React 18</strong></li>
            <li><strong>React 19</strong></li>
          </ul>
          <p className="mt-3 text-sm text-gray-600">
            Peer dependencies: <code className="rounded bg-gray-200 px-1.5 py-0.5 font-mono text-xs">react</code>,{" "}
            <code className="rounded bg-gray-200 px-1.5 py-0.5 font-mono text-xs">react-dom</code> (^18 || ^19).
          </p>
        </section>

        <section className="demo-card demo-card-panel">
          <h2 className="demo-card-heading">3. Add CSS and providers</h2>
          <p className="mb-3 text-sm text-gray-600">
            In your entry file (e.g. <code className="rounded bg-gray-200 px-1.5 py-0.5 font-mono text-xs">main.tsx</code> or <code className="rounded bg-gray-200 px-1.5 py-0.5 font-mono text-xs">index.tsx</code>), import the library styles and wrap your app with <code className="rounded bg-gray-200 px-1.5 py-0.5 font-mono text-xs">ThemeProvider</code> and optionally <code className="rounded bg-gray-200 px-1.5 py-0.5 font-mono text-xs">NotificationProvider</code> for toasts.
          </p>
          <CodeSnippet code={setupCode} language="tsx" />
        </section>

        <section className="demo-card demo-card-panel">
          <h2 className="demo-card-heading">4. Use components</h2>
          <p className="mb-3 text-sm text-gray-600">
            Import any component and use it. Example with Button:
          </p>
          <CodeSnippet code={usageCode} language="tsx" />
          <p className="mt-3 text-sm text-gray-600">
            Browse the sidebar for each component: live preview, props, and copyable code that matches the play area.
          </p>
        </section>
      </div>
    </div>
  );
}
