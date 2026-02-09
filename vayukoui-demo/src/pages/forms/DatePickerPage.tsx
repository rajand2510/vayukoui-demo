import { useState } from "react";
import { DatePicker } from "@vayuko/ui";
import { PageLayout } from "../../components/PageLayout";
import { PropControl } from "../../components/PropControl";

export default function DatePickerPage() {
  const [value, setValue] = useState<Date | null>(null);
  const [placeholder, setPlaceholder] = useState("Pick a date");
  const [showTime, setShowTime] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const code = `const [date, setDate] = useState<Date | null>(null);

<DatePicker
  value={date}
  onChange={setDate}
  placeholder=${JSON.stringify(placeholder)}
  showTime={${showTime}}
  disabled={${disabled}}
  aria-label="Date"
/>`;

  return (
    <PageLayout
      title="DatePicker"
      description="Single date picker with optional time and min/max."
      code={code}
      preview={
        <div className="max-w-xs">
          <DatePicker
            value={value}
            onChange={setValue}
            placeholder={placeholder}
            showTime={showTime}
            disabled={disabled}
            aria-label="Date"
          />
          <p className="mt-2 text-sm text-slate-500">
            Selected: {value ? value.toLocaleString() : "—"}
          </p>
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
          <PropControl label="Show time">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                className="demo-checkbox"
                checked={showTime}
                onChange={(e) => setShowTime(e.target.checked)}
              />
              <span className="text-sm">Show time inputs</span>
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
        </>
      }
    />
  );
}
