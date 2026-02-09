import { useState, useMemo } from "react";
import { Dropdown } from "@vayuko/ui";
import type { DropdownOption } from "@vayuko/ui";
import { PageLayout } from "../../components/PageLayout";
import { PropControl } from "../../components/PropControl";
import { ColorPicker } from "../../components/ColorPicker";

const defaultOptions: DropdownOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date" },
  { value: "elderberry", label: "Elderberry" },
];

const manyOptions: DropdownOption[] = Array.from({ length: 20 }, (_, i) => ({
  value: `opt-${i + 1}`,
  label: `Option ${i + 1}`,
}));

function parseOptions(text: string): DropdownOption[] {
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

export default function DropdownPage() {
  const [value, setValue] = useState("");
  const [placeholder, setPlaceholder] = useState("Select a fruit…");
  const [searchable, setSearchable] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [selectedBgColor, setSelectedBgColor] = useState("");
  const [selectedTextColor, setSelectedTextColor] = useState("");
  const [optionHoverBgColor, setOptionHoverBgColor] = useState("");
  const [optionHoverTextColor, setOptionHoverTextColor] = useState("");
  const [optionsText, setOptionsText] = useState(
    "apple:Apple\nbanana:Banana\ncherry:Cherry\ndate:Date\nelderberry:Elderberry"
  );

  const options = useMemo(() => {
    const parsed = parseOptions(optionsText);
    return parsed.length > 0 ? parsed : defaultOptions;
  }, [optionsText]);

  const optionsCode = options
    .slice(0, 5)
    .map((o) => `  { value: ${JSON.stringify(o.value)}, label: ${JSON.stringify(o.label)} }`)
    .join(",\n");
  const colorProps = [
    selectedBgColor && `selectedBgColor=${JSON.stringify(selectedBgColor)}`,
    selectedTextColor && `selectedTextColor=${JSON.stringify(selectedTextColor)}`,
    optionHoverBgColor && `optionHoverBgColor=${JSON.stringify(optionHoverBgColor)}`,
    optionHoverTextColor && `optionHoverTextColor=${JSON.stringify(optionHoverTextColor)}`,
  ].filter(Boolean);
  const code = `const options = [\n${optionsCode}\n];
const [value, setValue] = useState(${value ? JSON.stringify(value) : '""'});

<Dropdown
  options={options}
  value={value}
  onChange={setValue}
  placeholder=${JSON.stringify(placeholder)}
  searchable={${searchable}}
  disabled={${disabled}}
  ${colorProps.length ? colorProps.join("\n  ") + "\n  " : ""}aria-label="Select option"
/>`;

  return (
    <PageLayout
      title="Dropdown"
      description="Select with optional search. Configure options and placeholder."
      code={code}
      preview={
        <div className="flex flex-col gap-6 max-w-xs">
          <div>
            <Dropdown
              options={options}
              value={value}
              onChange={setValue}
              placeholder={placeholder}
              searchable={searchable}
              disabled={disabled}
              selectedBgColor={selectedBgColor || undefined}
              selectedTextColor={selectedTextColor || undefined}
              optionHoverBgColor={optionHoverBgColor || undefined}
              optionHoverTextColor={optionHoverTextColor || undefined}
              aria-label="Fruit select"
            />
            <p className="mt-2 text-sm text-slate-500">Selected: {value || "—"}</p>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-slate-600">Many options (scrollable — custom scrollbar)</p>
            <Dropdown
              options={manyOptions}
              defaultValue=""
              placeholder="Select…"
              searchable
              color="#6366f1"
              aria-label="Many options"
            />
          </div>
        </div>
      }
      props={
        <>
          <PropControl label="Placeholder">
            <input
              type="text"
              className="demo-input"
              value={placeholder}
              onChange={(e) => setPlaceholder(e.target.value)}
            />
          </PropControl>
          <PropControl label="Options" hint="One per line. Use value:Label or just label.">
            <textarea
              className="demo-textarea demo-input"
              value={optionsText}
              onChange={(e) => setOptionsText(e.target.value)}
              rows={5}
            />
          </PropControl>
          <PropControl label="Searchable">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                className="demo-checkbox"
                checked={searchable}
                onChange={(e) => setSearchable(e.target.checked)}
              />
              <span className="text-sm">Searchable</span>
            </label>
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
          <PropControl label="Selected background">
            <div className="flex flex-col gap-2">
              <ColorPicker
                value={selectedBgColor || "#6366f1"}
                onChange={setSelectedBgColor}
                aria-label="Selected background"
              />
              {selectedBgColor && (
                <button
                  type="button"
                  onClick={() => setSelectedBgColor("")}
                  className="text-xs text-slate-500 hover:text-slate-700 underline"
                >
                  Use default
                </button>
              )}
            </div>
          </PropControl>
          <PropControl label="Selected text">
            <div className="flex flex-col gap-2">
              <ColorPicker
                value={selectedTextColor || "#ffffff"}
                onChange={setSelectedTextColor}
                aria-label="Selected text"
              />
              {selectedTextColor && (
                <button
                  type="button"
                  onClick={() => setSelectedTextColor("")}
                  className="text-xs text-slate-500 hover:text-slate-700 underline"
                >
                  Use default
                </button>
              )}
            </div>
          </PropControl>
          <PropControl label="Option hover background">
            <div className="flex flex-col gap-2">
              <ColorPicker
                value={optionHoverBgColor || "#eef2ff"}
                onChange={setOptionHoverBgColor}
                aria-label="Option hover background"
              />
              {optionHoverBgColor && (
                <button
                  type="button"
                  onClick={() => setOptionHoverBgColor("")}
                  className="text-xs text-slate-500 hover:text-slate-700 underline"
                >
                  Use default
                </button>
              )}
            </div>
          </PropControl>
          <PropControl label="Option hover text">
            <div className="flex flex-col gap-2">
              <ColorPicker
                value={optionHoverTextColor || "#4338ca"}
                onChange={setOptionHoverTextColor}
                aria-label="Option hover text"
              />
              {optionHoverTextColor && (
                <button
                  type="button"
                  onClick={() => setOptionHoverTextColor("")}
                  className="text-xs text-slate-500 hover:text-slate-700 underline"
                >
                  Use default
                </button>
              )}
            </div>
          </PropControl>
        </>
      }
    />
  );
}
