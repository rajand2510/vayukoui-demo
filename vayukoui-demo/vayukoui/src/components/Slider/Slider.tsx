import { useState, useRef } from "react";
import type { SliderMark, SliderSize, ValueLabelDisplay } from "./Slider.types";

export interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Size of the slider */
  size?: SliderSize;
  /** Marks on the track. true = auto marks at steps, or array of { value, label } */
  marks?: boolean | SliderMark[];
  /** When to show the value label: "on" | "auto" (on hover/drag) | "off" */
  valueLabelDisplay?: ValueLabelDisplay;
  /** Format value for aria and value label */
  getAriaValueText?: (value: number) => string;
  /** Optional label above (e.g. "Volume") */
  label?: string;
  /** Unit shown in value (e.g. "gm") */
  unit?: string;
  /** aria-label for accessibility */
  "aria-label"?: string;
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

export default function Slider({
  min = 0,
  max = 100,
  step = 1,
  value: valueProp,
  defaultValue,
  onChange,
  disabled = false,
  size = "medium",
  marks: marksProp = false,
  valueLabelDisplay = "off",
  getAriaValueText,
  label,
  unit = "",
  "aria-label": ariaLabel,
  className = "",
}: SliderProps) {
  const [internal, setInternal] = useState(defaultValue ?? min);
  const value = valueProp ?? internal;
  const [showValueLabel, setShowValueLabel] = useState(valueLabelDisplay === "on");
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const update = (v: number) => {
    const clamped = Math.min(max, Math.max(min, v));
    if (valueProp === undefined) setInternal(clamped);
    onChange?.(clamped);
  };

  const pct = percent(min, max, value);

  const marks: SliderMark[] =
    marksProp === true
      ? Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => ({
          value: min + i * step,
        }))
      : Array.isArray(marksProp)
        ? marksProp
        : [];

  const handleOverlayPointerDown = (e: React.PointerEvent) => {
    if (disabled) return;
    isDraggingRef.current = true;
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pctClick = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const val = valueFromPercent(min, max, step, pctClick);
    update(val);
    if (valueLabelDisplay === "auto") setShowValueLabel(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pctClick = Math.max(0, Math.min(100, (x / rect.width) * 100));
    update(valueFromPercent(min, max, step, pctClick));
  };


  const valueText = getAriaValueText ? getAriaValueText(value) : undefined;
  const displayLabel = showValueLabel || valueLabelDisplay === "on";

  return (
    <div
      className={`vk-slider-wrapper w-full ${disabled ? "opacity-60 pointer-events-none" : ""} ${className}`.trim()}
    >
      {label != null && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs md:text-sm text-gray-700">{label}</span>
          {displayLabel && (
            <span
              className="vk-slider-value-label text-xs font-medium text-[var(--vk-color-primary)]"
              role="presentation"
            >
              {valueText ?? value}
              {unit ? ` ${unit}` : ""}
            </span>
          )}
        </div>
      )}

      <div
        ref={trackRef}
        className={`vk-slider vk-slider--${size} relative w-full flex items-center`}
      >
        {/* Track (background always visible; active fill from 0 to value %) */}
        <div
          className="vk-slider-track absolute left-0 right-0 h-1 rounded-full bg-[#D5D9E5]"
          style={{ top: size === "small" ? "6px" : "10px", width: "100%" }}
          aria-hidden
        />
        <div
          className="vk-slider-track-active absolute left-0 h-1 rounded-full bg-[var(--vk-color-primary)]"
          style={{
            top: size === "small" ? "6px" : "10px",
            width: `${pct}%`,
          }}
          aria-hidden
        />

        {/* Thumb (native input is hidden for pointer handling) */}
        <div
          className="vk-slider-thumb absolute w-4 h-4 rounded-full border-2 border-white bg-[var(--vk-color-primary)] shadow-md -translate-x-1/2 pointer-events-none"
          style={{
            left: `${pct}%`,
            top: size === "small" ? "2px" : "4px",
            width: size === "small" ? 12 : 16,
            height: size === "small" ? 12 : 16,
          }}
          aria-hidden
        />

        {/* Native input for a11y and keyboard */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          role="slider"
          aria-label={ariaLabel ?? label ?? "Slider"}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={valueText}
          tabIndex={disabled ? -1 : 0}
          onChange={(e) => update(Number(e.target.value))}
          className="absolute inset-0 w-full z-20 pointer-events-none opacity-0"
        />

        {/* Overlay for pointer */}
        <div
          className="absolute inset-0 w-full z-50 cursor-pointer"
          onPointerDown={handleOverlayPointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={(e) => {
            isDraggingRef.current = false;
            try { (e.target as HTMLElement).releasePointerCapture(e.pointerId); } catch { /* ignore */ }
            if (valueLabelDisplay === "auto") setShowValueLabel(false);
          }}
          onPointerCancel={(e) => {
            isDraggingRef.current = false;
            try { (e.target as HTMLElement).releasePointerCapture(e.pointerId); } catch { /* ignore */ }
            if (valueLabelDisplay === "auto") setShowValueLabel(false);
          }}
          aria-hidden
        />
      </div>

      {/* Value label below when no label above */}
      {!label && displayLabel && (
        <p className="mt-1 text-[10px] md:text-xs text-[#384E9F]" role="presentation">
          {valueText ?? value}
          {unit ? ` ${unit}` : ""}
        </p>
      )}

      {/* Marks */}
      {marks.length > 0 && (
        <ul className="vk-slider-marks relative w-full mt-1 h-4" aria-hidden>
          {marks.map((m) => (
            <li
              key={m.value}
              className="vk-slider-mark absolute text-[10px] text-gray-500 -translate-x-1/2"
              style={{ left: `${percent(min, max, m.value)}%` }}
            >
              {m.label ?? m.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
