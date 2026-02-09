import { useState, useMemo } from "react";
import { RangeSlider } from "@vayuko/ui";
import type { RangeSliderSize, RangeValueLabelDisplay } from "@vayuko/ui";
import { PageLayout } from "../components/PageLayout";
import { PropControl } from "../components/PropControl";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export default function RangeSliderPage() {
  const [min, setMinRaw] = useState(0);
  const [max, setMaxRaw] = useState(100);
  const [from, setFromRaw] = useState(20);
  const [to, setToRaw] = useState(80);
  const [size, setSize] = useState<RangeSliderSize>("medium");
  const [valueLabelDisplay, setValueLabelDisplay] = useState<RangeValueLabelDisplay>("on");
  const [disabled, setDisabled] = useState(false);

  const minVal = Number.isFinite(min) ? min : 0;
  const maxVal = Number.isFinite(max) ? max : 100;
  const fromClamped = useMemo(
    () => clamp(Number.isFinite(from) ? from : 20, minVal, maxVal),
    [from, minVal, maxVal]
  );
  const toClamped = useMemo(
    () => clamp(Number.isFinite(to) ? to : 80, minVal, maxVal),
    [to, minVal, maxVal]
  );
  const fromSafe = Math.min(fromClamped, toClamped);
  const toSafe = Math.max(fromClamped, toClamped);

  const setMin = (v: number) => setMinRaw(Number.isFinite(v) ? v : 0);
  const setMax = (v: number) => setMaxRaw(Number.isFinite(v) ? v : 100);
  const setFrom = (v: number) => setFromRaw(clamp(Number.isFinite(v) ? v : fromSafe, minVal, toSafe));
  const setTo = (v: number) => setToRaw(clamp(Number.isFinite(v) ? v : toSafe, fromSafe, maxVal));

  const code = `const [range, setRange] = useState({ from: ${fromSafe}, to: ${toSafe} });

<RangeSlider
  min={${minVal}}
  max={${maxVal}}
  value={range}
  onChange={setRange}
  size="${size}"
  valueLabelDisplay="${valueLabelDisplay}"
  disabled={${disabled}}
  aria-label="Range"
/>`;

  return (
    <PageLayout
      title="RangeSlider"
      description="Dual-thumb range slider for selecting a range (from – to)."
      code={code}
      preview={
        <div className="max-w-xs space-y-4">
          <RangeSlider
            min={minVal}
            max={maxVal}
            step={1}
            value={{ from: fromSafe, to: toSafe }}
            onChange={({ from: f, to: t }: { from: number; to: number }) => {
              setFromRaw(f);
              setToRaw(t);
            }}
            size={size}
            valueLabelDisplay={valueLabelDisplay}
            disabled={disabled}
            aria-label="Range demo"
          />
          <p className="text-sm text-slate-500">Range: {fromSafe} – {toSafe}</p>
        </div>
      }
      props={
        <>
          <PropControl label="Min">
            <input
              type="number"
              className="demo-input"
              value={min}
              onChange={(e) => setMin(Number(e.target.value))}
            />
          </PropControl>
          <PropControl label="Max">
            <input
              type="number"
              className="demo-input"
              value={max}
              onChange={(e) => setMax(Number(e.target.value))}
            />
          </PropControl>
          <PropControl label="From">
            <input
              type="number"
              className="demo-input"
              value={from}
              onChange={(e) => setFrom(Number(e.target.value))}
              min={minVal}
              max={toSafe}
            />
          </PropControl>
          <PropControl label="To">
            <input
              type="number"
              className="demo-input"
              value={to}
              onChange={(e) => setTo(Number(e.target.value))}
              min={fromSafe}
              max={maxVal}
            />
          </PropControl>
          <PropControl label="Size">
            <select
              className="demo-select"
              value={size}
              onChange={(e) => setSize(e.target.value as RangeSliderSize)}
            >
              <option value="small">small</option>
              <option value="medium">medium</option>
            </select>
          </PropControl>
          <PropControl label="Value label display">
            <select
              className="demo-select"
              value={valueLabelDisplay}
              onChange={(e) => setValueLabelDisplay(e.target.value as RangeValueLabelDisplay)}
            >
              <option value="on">on</option>
              <option value="auto">auto</option>
              <option value="off">off</option>
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
