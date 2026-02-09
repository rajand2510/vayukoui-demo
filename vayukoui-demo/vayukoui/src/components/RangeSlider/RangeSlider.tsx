import { useState, useRef, useEffect } from "react";
import type { RangeSliderMark, RangeSliderSize, RangeValueLabelDisplay } from "./RangeSlider.types";

export interface RangeValue {
  from: number;
  to: number;
}

interface Props {
  min: number;
  max: number;
  step?: number;
  value?: RangeValue;
  defaultValue?: RangeValue;
  onChange?: (v: RangeValue) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Size: "small" | "medium" */
  size?: RangeSliderSize;
  /** Marks on the track. true = auto at steps, or array of { value, label } */
  marks?: boolean | RangeSliderMark[];
  /** When to show value label: "on" | "auto" | "off" */
  valueLabelDisplay?: RangeValueLabelDisplay;
  /** Format value for aria and label */
  getAriaValueText?: (value: number) => string;
  /** Minimum distance between from and to (enforced when dragging) */
  minDistance?: number;
  /** If true, active thumb does not swap when dragging over the other */
  disableSwap?: boolean;
  /** Optional label above the slider (e.g. "Gross Wt") */
  label?: string;
  /** Optional unit shown in value display (e.g. "gm") */
  unit?: string;
  /** Show min–max and current range below the slider. Default true. */
  showLabels?: boolean;
  /** Custom class for the root container */
  className?: string;
}

function percent(min: number, max: number, val: number) {
  if (max <= min) return 0;
  return ((val - min) / (max - min)) * 100;
}

function valueFromPercent(min: number, max: number, step: number, pct: number): number {
  if (max <= min) return min;
  const raw = min + (pct / 100) * (max - min);
  const stepped = Math.round(raw / step) * step;
  return Math.min(max, Math.max(min, stepped));
}

export default function RangeSlider({
  min,
  max,
  step = 1,
  value,
  defaultValue,
  onChange,
  disabled = false,
  size = "medium",
  marks: marksProp = false,
  valueLabelDisplay = "off",
  getAriaValueText,
  minDistance,
  disableSwap = false,
  label,
  unit = "",
  showLabels = true,
  className = "",
}: Props) {
  const [internal, setInternal] = useState(
    defaultValue ?? { from: min, to: max }
  );

  const range = value ?? internal;

  const update = (next: RangeValue) => {
    if (value === undefined) setInternal(next);
    onChange?.(next);
  };

  const trackRef = useRef<HTMLDivElement>(null);
  const draggingThumbRef = useRef<"from" | "to" | null>(null);
  const rangeRef = useRef(range);
  rangeRef.current = range;
  const pct = (val: number) => percent(min, max, val);

  const getValueFromClientX = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return min;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const pctClick = Math.max(0, Math.min(100, (x / rect.width) * 100));
    return valueFromPercent(min, max, step, pctClick);
  };

  const minDist = minDistance ?? step;
  const onMoveRef = useRef((_e: PointerEvent) => {});
  onMoveRef.current = (e: PointerEvent) => {
    const which = draggingThumbRef.current;
    if (which === null) return;
    const val = getValueFromClientX(e.clientX);
    const r = rangeRef.current;
    if (which === "from") {
      const newFrom = Math.min(val, r.to - minDist);
      update({ from: newFrom, to: r.to });
    } else {
      const newTo = Math.max(val, r.from + minDist);
      update({ from: r.from, to: newTo });
    }
  };

  const stableMove = useRef((e: PointerEvent) => onMoveRef.current(e));
  const stableUp = useRef(() => {
    draggingThumbRef.current = null;
    document.removeEventListener("pointermove", stableMove.current);
    document.removeEventListener("pointerup", stableUp.current);
    document.removeEventListener("pointercancel", stableUp.current);
  });

  useEffect(() => {
    return () => {
      document.removeEventListener("pointermove", stableMove.current);
      document.removeEventListener("pointerup", stableUp.current);
      document.removeEventListener("pointercancel", stableUp.current);
    };
  }, []);

  const handleOverlayPointerDown = (e: React.PointerEvent) => {
    if (disabled) return;
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pctClick = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const valueClick = valueFromPercent(min, max, step, pctClick);

    const pctFrom = pct(range.from);
    const pctTo = pct(range.to);
    const closerToFrom = disableSwap
      ? pctClick < (pctFrom + pctTo) / 2
      : Math.abs(pctClick - pctFrom) <= Math.abs(pctClick - pctTo);

    if (closerToFrom) {
      draggingThumbRef.current = "from";
      const newFrom = Math.min(valueClick, range.to - minDist);
      update({ from: newFrom, to: range.to });
    } else {
      draggingThumbRef.current = "to";
      const newTo = Math.max(valueClick, range.from + minDist);
      update({ from: range.from, to: newTo });
    }
    document.addEventListener("pointermove", stableMove.current);
    document.addEventListener("pointerup", stableUp.current);
    document.addEventListener("pointercancel", stableUp.current);
  };

  const marks: RangeSliderMark[] =
    marksProp === true
      ? Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => ({
          value: min + i * step,
        }))
      : Array.isArray(marksProp)
        ? marksProp
        : [];

  const trackTop = size === "small" ? "6px" : "10px";
  const trackHeight = size === "small" ? "3px" : "4px";

  return (
    <div
      className={`w-full ${disabled ? "opacity-60 pointer-events-none" : ""} ${className}`.trim()}
    >
      {label != null && (
        <p className="text-xs md:text-sm text-gray-700 mb-2 flex justify-between w-[80%]">
          <span>{label}</span>
          <span className="text-gray-500">
            {min} – {max}
            {unit ? ` ${unit}` : ""}
          </span>
        </p>
      )}

      <div
        ref={trackRef}
        className={`vk-range-slider vk-range-slider--${size} relative w-[80%] flex items-center`}
        style={{ height: size === "small" ? 16 : 24 }}
      >
        {/* Base track */}
        <div
          className="absolute left-0 right-0 rounded-full bg-[#D5D9E5]"
          style={{ top: trackTop, height: trackHeight }}
          aria-hidden
        />
        {/* Active track (between thumbs) */}
        <div
          className="absolute left-0 rounded-full bg-[var(--vk-color-primary)]"
          style={{
            top: trackTop,
            height: trackHeight,
            left: `${pct(range.from)}%`,
            width: `${pct(range.to) - pct(range.from)}%`,
          }}
          aria-hidden
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={range.from}
          role="slider"
          aria-label={label ? `${label} minimum` : "Minimum value"}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={range.from}
          aria-valuetext={getAriaValueText?.(range.from)}
          tabIndex={disabled ? -1 : 0}
          disabled={disabled}
          onChange={(e) => {
            const val = Math.min(Number(e.target.value), range.to - step);
            update({ from: val, to: range.to });
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight")
              update({
                from: Math.min(range.from + step, range.to - step),
                to: range.to,
              });
            if (e.key === "ArrowLeft")
              update({
                from: Math.max(range.from - step, min),
                to: range.to,
              });
          }}
          className="absolute inset-0 w-full z-20 pointer-events-none"
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={range.to}
          role="slider"
          aria-label={label ? `${label} maximum` : "Maximum value"}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={range.to}
          aria-valuetext={getAriaValueText?.(range.to)}
          tabIndex={disabled ? -1 : 0}
          disabled={disabled}
          onChange={(e) => {
            const val = Math.max(Number(e.target.value), range.from + step);
            update({ from: range.from, to: val });
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight")
              update({
                from: range.from,
                to: Math.min(range.to + step, max),
              });
            if (e.key === "ArrowLeft")
              update({
                from: range.from,
                to: Math.max(range.to - step, range.from + step),
              });
          }}
          className="absolute inset-0 w-full z-20 pointer-events-none"
        />

        {/* Overlay on top: captures all pointer events so both thumbs work */}
        <div
          className="absolute inset-0 w-full z-50 cursor-pointer"
          onPointerDown={handleOverlayPointerDown}
          aria-hidden
        />
      </div>

      {(showLabels || valueLabelDisplay === "on") && (
        <p className="mt-1 text-[10px] md:text-xs text-[#384E9F]">
          {getAriaValueText ? getAriaValueText(range.from) : range.from}
          {unit ? ` ${unit}` : ""} – {getAriaValueText ? getAriaValueText(range.to) : range.to}
          {unit ? ` ${unit}` : ""}
        </p>
      )}

      {marks.length > 0 && (
        <ul className="vk-slider-marks relative w-[80%] mt-1 h-4" aria-hidden>
          {marks.map((m) => (
            <li
              key={m.value}
              className="absolute text-[10px] text-gray-500 -translate-x-1/2"
              style={{ left: `${pct(m.value)}%` }}
            >
              {m.label ?? m.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
