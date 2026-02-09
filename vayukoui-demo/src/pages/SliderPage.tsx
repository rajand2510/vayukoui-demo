import { useState, useMemo } from "react";
import { Slider } from "@vayuko/ui";
import type { SliderSize, ValueLabelDisplay } from "@vayuko/ui";
import { PageLayout } from "../components/PageLayout";
import { PropControl } from "../components/PropControl";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export default function SliderPage() {
  const [min, setMinRaw] = useState(0);
  const [max, setMaxRaw] = useState(100);
  const [step, setStepRaw] = useState(1);
  const [value, setValueRaw] = useState(50);
  const [size, setSize] = useState<SliderSize>("medium");
  const [valueLabelDisplay, setValueLabelDisplay] = useState<ValueLabelDisplay>("on");
  const [label, setLabel] = useState("Volume");
  const [unit, setUnit] = useState("");
  const [marks, setMarks] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const minVal = Number.isFinite(min) ? min : 0;
  const maxVal = Number.isFinite(max) ? max : 100;
  const stepVal = Number.isFinite(step) && step > 0 ? step : 1;
  const valueClamped = useMemo(
    () => clamp(Number.isFinite(value) ? value : 50, minVal, maxVal),
    [value, minVal, maxVal]
  );

  const setMin = (v: number) => setMinRaw(Number.isFinite(v) ? v : 0);
  const setMax = (v: number) => setMaxRaw(Number.isFinite(v) ? v : 100);
  const setStep = (v: number) => setStepRaw(Number.isFinite(v) && v > 0 ? v : 1);
  const setValue = (v: number) => setValueRaw(clamp(Number.isFinite(v) ? v : valueClamped, minVal, maxVal));

  const code = `const [value, setValue] = useState(${valueClamped});

<Slider
  min={${minVal}}
  max={${maxVal}}
  step={${stepVal}}
  value={value}
  onChange={setValue}
  size="${size}"
  valueLabelDisplay="${valueLabelDisplay}"
  label=${label ? JSON.stringify(label) : "undefined"}
  unit=${unit ? JSON.stringify(unit) : "undefined"}
  marks={${marks}}
  disabled={${disabled}}
  aria-label="Volume"
/>`;

  return (
    <PageLayout
      title="Slider"
      description="Single-value slider with optional marks, sizes, and value label."
      code={code}
      preview={
        <div className="max-w-xs space-y-4">
          <Slider
            min={minVal}
            max={maxVal}
            step={stepVal}
            value={valueClamped}
            onChange={setValue}
            size={size}
            valueLabelDisplay={valueLabelDisplay}
            label={label || undefined}
            unit={unit || undefined}
            marks={marks}
            disabled={disabled}
            aria-label="Demo slider"
          />
          <p className="text-sm text-slate-500">Current value: {valueClamped}</p>
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
          <PropControl label="Step">
            <input
              type="number"
              className="demo-input"
              value={step}
              onChange={(e) => setStep(Number(e.target.value))}
            />
          </PropControl>
          <PropControl label="Value">
            <input
              type="number"
              className="demo-input"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              min={minVal}
              max={maxVal}
            />
          </PropControl>
          <PropControl label="Size">
            <select
              className="demo-select"
              value={size}
              onChange={(e) => setSize(e.target.value as SliderSize)}
            >
              <option value="small">small</option>
              <option value="medium">medium</option>
              <option value="large">large</option>
            </select>
          </PropControl>
          <PropControl label="Value label display">
            <select
              className="demo-select"
              value={valueLabelDisplay}
              onChange={(e) => setValueLabelDisplay(e.target.value as ValueLabelDisplay)}
            >
              <option value="on">on</option>
              <option value="auto">auto</option>
              <option value="off">off</option>
            </select>
          </PropControl>
          <PropControl label="Label">
            <input
              type="text"
              className="demo-input"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g. Volume"
            />
          </PropControl>
          <PropControl label="Unit">
            <input
              type="text"
              className="demo-input"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="e.g. kg, %"
            />
          </PropControl>
          <PropControl label="Marks">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                className="demo-checkbox"
                checked={marks}
                onChange={(e) => setMarks(e.target.checked)}
              />
              <span className="text-sm">Show marks</span>
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
