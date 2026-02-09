import { useState } from "react";
import { DateRangePicker } from "@vayuko/ui";
import type { DateRangeValue } from "@vayuko/ui";
import { PageLayout } from "../../components/PageLayout";
import { PropControl } from "../../components/PropControl";

export default function DateRangePickerPage() {
  const [value, setValue] = useState<DateRangeValue>({ from: null, to: null });
  const [placeholderFrom, setPlaceholderFrom] = useState("From");
  const [placeholderTo, setPlaceholderTo] = useState("To");
  const [showTime, setShowTime] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const code = `const [range, setRange] = useState({ from: null as Date | null, to: null as Date | null });

<DateRangePicker
  value={range}
  onChange={setRange}
  placeholderFrom=${JSON.stringify(placeholderFrom)}
  placeholderTo=${JSON.stringify(placeholderTo)}
  showTime={${showTime}}
  disabled={${disabled}}
/>`;

  return (
    <PageLayout
      title="DateRangePicker"
      description="From–to date range with optional time and quick ranges."
      code={code}
      preview={
        <div className="max-w-sm">
          <DateRangePicker
            value={value}
            onChange={setValue}
            placeholderFrom={placeholderFrom}
            placeholderTo={placeholderTo}
            showTime={showTime}
            disabled={disabled}
          />
          <p className="mt-2 text-sm text-slate-500">
            From: {value.from ? value.from.toLocaleString() : "—"} → To:{" "}
            {value.to ? value.to.toLocaleString() : "—"}
          </p>
        </div>
      }
      props={
        <>
          <PropControl label="Placeholder (from)">
            <input
              type="text"
              className="demo-input"
              value={placeholderFrom}
              onChange={(e) => setPlaceholderFrom(e.target.value)}
            />
          </PropControl>
          <PropControl label="Placeholder (to)">
            <input
              type="text"
              className="demo-input"
              value={placeholderTo}
              onChange={(e) => setPlaceholderTo(e.target.value)}
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
