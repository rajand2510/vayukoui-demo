import { useState } from "react";
import { Button } from "@vayuko/ui";
import { PageLayout } from "../../components/PageLayout";
import { PropControl } from "../../components/PropControl";
import { jsxStr } from "../../lib/codegen";

export default function ButtonPage() {
  const [label, setLabel] = useState("Click me");
  const [variant, setVariant] = useState<"primary" | "secondary">("primary");
  const [disabled, setDisabled] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const code = `<Button variant="${variant}" disabled={${disabled}}>\n  ${jsxStr(label)}\n</Button>`;

  return (
    <PageLayout
      title="Button"
      description="Primary and secondary button with optional disabled state."
      code={code}
      preview={
        <div className="flex flex-wrap gap-3">
          <Button
            variant={variant}
            disabled={disabled}
            onClick={() => setClickCount((c) => c + 1)}
          >
            {label}
          </Button>
          <Button variant="primary" disabled={disabled}>Primary</Button>
          <Button variant="secondary" disabled={disabled}>Secondary</Button>
          {clickCount > 0 && (
            <p className="w-full text-sm text-slate-500">Clicks: {clickCount}</p>
          )}
        </div>
      }
      props={
        <>
          <PropControl label="Button text">
            <input
              type="text"
              className="demo-input"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </PropControl>
          <PropControl label="Variant">
            <select
              className="demo-select"
              value={variant}
              onChange={(e) => setVariant(e.target.value as "primary" | "secondary")}
            >
              <option value="primary">primary</option>
              <option value="secondary">secondary</option>
            </select>
          </PropControl>
          <PropControl label="Disabled">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                className="demo-checkbox"
                checked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
              />
              <span className="text-sm">Disabled</span>
            </label>
          </PropControl>
        </>
      }
    />
  );
}
