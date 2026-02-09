import { useState, useMemo } from "react";
import { RadioGroup } from "@vayuko/ui";
import type { RadioVariant } from "@vayuko/ui";
import { PageLayout } from "../components/PageLayout";
import { PropControl } from "../components/PropControl";

const defaultOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "maybe", label: "Maybe" },
];

function parseOptions(text: string): { value: string; label: string }[] {
  return text
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const trimmed = line.trim();
      const colon = trimmed.indexOf(":");
      if (colon >= 0) {
        const v = trimmed.slice(0, colon).trim();
        const l = trimmed.slice(colon + 1).trim();
        return { value: v || l, label: l || v };
      }
      return { value: trimmed, label: trimmed };
    });
}

export default function RadioGroupPage() {
  const [value, setValue] = useState("yes");
  const [variant, setVariant] = useState<RadioVariant>("default");
  const [optionsText, setOptionsText] = useState("yes:Yes\nno:No\nmaybe:Maybe");
  const [disabled, setDisabled] = useState(false);

  const options = useMemo(() => {
    const parsed = parseOptions(optionsText);
    return parsed.length > 0 ? parsed : defaultOptions;
  }, [optionsText]);

  const optionsCode = options
    .slice(0, 4)
    .map((o) => `  { value: ${JSON.stringify(o.value)}, label: ${JSON.stringify(o.label)} }`)
    .join(",\n");
  const code = `const options = [\n${optionsCode}\n];
const [value, setValue] = useState(${JSON.stringify(value)});

<RadioGroup
  name="choice"
  options={options}
  value={value}
  onChange={setValue}
  variant="${variant}"
  disabled={${disabled}}
  aria-label="Choice"
/>`;

  return (
    <PageLayout
      title="RadioGroup"
      description="Radio group with default, pill, and card variants."
      code={code}
      preview={
        <div className="max-w-xs">
          <RadioGroup
            name="demo-radio"
            options={options}
            value={value}
            onChange={setValue}
            variant={variant}
            disabled={disabled}
            aria-label="Choice"
          />
          <p className="mt-2 text-sm text-slate-500">Selected: {value}</p>
        </div>
      }
      props={
        <>
          <PropControl label="Variant">
            <select
              className="demo-select"
              value={variant}
              onChange={(e) => setVariant(e.target.value as RadioVariant)}
            >
              <option value="default">default</option>
              <option value="pill">pill</option>
              <option value="card">card</option>
            </select>
          </PropControl>
          <PropControl label="Options" hint="One per line: value:Label or just label">
            <textarea
              className="demo-textarea demo-input"
              value={optionsText}
              onChange={(e) => setOptionsText(e.target.value)}
              rows={4}
            />
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
