import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import type { DatePickerProps } from "./DatePicker.types";

function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function formatDisplay(d: Date, showTime?: boolean): string {
  const dateStr = d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  if (!showTime) return dateStr;
  const h = d.getHours();
  const m = d.getMinutes();
  return `${dateStr} ${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

function isDisabled(
  date: Date,
  minDate?: Date,
  maxDate?: Date,
  disableDates?: DatePickerProps["disableDates"]
): boolean {
  const t = date.getTime();
  if (minDate && t < minDate.getTime()) return true;
  if (maxDate && t > maxDate.getTime()) return true;
  if (!disableDates) return false;
  if (Array.isArray(disableDates))
    return disableDates.some((d) => formatDate(d) === formatDate(date));
  return disableDates(date);
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function DatePicker({
  value: valueProp,
  defaultValue,
  onChange,
  minDate,
  maxDate,
  disableDates,
  showTime = false,
  placeholder = "Select date",
  disabled = false,
  color,
  className = "",
  "aria-label": ariaLabel,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<Date | null>(defaultValue ?? null);
  const [viewMonth, setViewMonth] = useState(() => {
    const d = valueProp ?? value ?? new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [hour, setHour] = useState(() => (valueProp ?? value ?? new Date()).getHours());
  const [minute, setMinute] = useState(() => (valueProp ?? value ?? new Date()).getMinutes());
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const selected = valueProp ?? value;

  useEffect(() => {
    if (selected && showTime) {
      setHour(selected.getHours());
      setMinute(selected.getMinutes());
    }
  }, [selected, showTime]);

  useEffect(() => {
    if (!open) return;
    const onOutside = (e: MouseEvent) => {
      const el = e.target as Node;
      if (
        triggerRef.current?.contains(el) ||
        popoverRef.current?.contains(el)
      )
        return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [open]);

  const handleSelect = (d: Date) => {
    let final = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    if (showTime) final.setHours(hour, minute, 0, 0);
    if (valueProp === undefined) setValue(final);
    onChange?.(final);
    setOpen(false);
  };

  const handleTimeChange = (h: number, m: number) => {
    setHour(h);
    setMinute(m);
    if (selected) {
      const next = new Date(selected);
      next.setHours(h, m, 0, 0);
      if (valueProp === undefined) setValue(next);
      onChange?.(next);
    }
  };

  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startPad = (first.getDay() + 6) % 7; // Monday first
  const daysInMonth = last.getDate();
  const days: (Date | null)[] = [];
  for (let i = 0; i < startPad; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));

  const years = (() => {
    const current = new Date().getFullYear();
    const arr: number[] = [];
    for (let y = current - 50; y <= current + 10; y++) arr.push(y);
    return arr;
  })();

  const GAP = 4;
  const VIEWPORT_PAD = 8;
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!open || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setPosition({ top: rect.bottom + GAP, left: rect.left });
  }, [open]);

  useEffect(() => {
    if (!open || !triggerRef.current) return;
    const id = requestAnimationFrame(() => {
      if (!popoverRef.current) return;
      const el = popoverRef.current;
      const rect = triggerRef.current!.getBoundingClientRect();
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      let top = rect.bottom + GAP;
      let left = rect.left;
      const spaceBelow = window.innerHeight - rect.bottom - GAP;
      const spaceAbove = rect.top - GAP;
      if (spaceBelow < h && spaceAbove >= h) top = rect.top - h - GAP;
      else if (spaceBelow < h) top = VIEWPORT_PAD;
      else if (top + h > window.innerHeight - VIEWPORT_PAD) top = window.innerHeight - h - VIEWPORT_PAD;
      if (left + w > window.innerWidth - VIEWPORT_PAD) left = window.innerWidth - w - VIEWPORT_PAD;
      if (left < VIEWPORT_PAD) left = VIEWPORT_PAD;
      setPosition({ top, left });
    });
    return () => cancelAnimationFrame(id);
  }, [open]);

  const accentStyle = color
    ? ({ "--vk-datepicker-accent": color } as React.CSSProperties)
    : undefined;

  const popoverContent = (
    <div
      ref={popoverRef}
      className="vk-datepicker-popover vk-datepicker-popover--portal"
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        zIndex: 10000,
        ...accentStyle,
      }}
    >
      <div className="vk-datepicker-header">
        <select
          className="vk-datepicker-month-select"
          value={month}
          onChange={(e) =>
            setViewMonth((m) => new Date(m.getFullYear(), Number(e.target.value), 1))
          }
          aria-label="Month"
        >
          {MONTHS.map((name, i) => (
            <option key={name} value={i}>
              {name}
            </option>
          ))}
        </select>
        <select
          className="vk-datepicker-year-select"
          value={year}
          onChange={(e) =>
            setViewMonth((m) => new Date(Number(e.target.value), m.getMonth(), 1))
          }
          aria-label="Year"
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <div className="vk-datepicker-nav">
          <button
            type="button"
            onClick={() => setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1))}
            aria-label="Previous month"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1))}
            aria-label="Next month"
          >
            ›
          </button>
        </div>
      </div>
      <div className="vk-datepicker-grid">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
          <div key={d} className="vk-datepicker-weekday">
            {d}
          </div>
        ))}
        {days.map((d, i) => {
          if (!d) return <div key={`e-${i}`} />;
          const disabledDay = isDisabled(d, minDate, maxDate, disableDates);
          const selectedDay = selected && formatDate(selected) === formatDate(d);
          return (
            <button
              key={d.getTime()}
              type="button"
              className={`vk-datepicker-day ${disabledDay ? "vk-datepicker-day--disabled" : ""} ${selectedDay ? "vk-datepicker-day--selected" : ""}`}
              disabled={disabledDay}
              onClick={() => !disabledDay && handleSelect(d)}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
      {showTime && (
        <div className="vk-datepicker-time">
          <label className="vk-datepicker-time-label">Time</label>
          <div className="vk-datepicker-time-inputs">
            <input
              type="number"
              min={0}
              max={23}
              value={hour}
              onChange={(e) => handleTimeChange(Number(e.target.value) || 0, minute)}
              className="vk-datepicker-time-input"
              aria-label="Hour"
            />
            <span className="vk-datepicker-time-sep">:</span>
            <input
              type="number"
              min={0}
              max={59}
              value={minute}
              onChange={(e) => handleTimeChange(hour, Number(e.target.value) || 0)}
              className="vk-datepicker-time-input"
              aria-label="Minute"
            />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div
      className={`vk-datepicker ${disabled ? "vk-datepicker--disabled" : ""} ${className}`.trim()}
      style={accentStyle}
    >
      <button
        ref={triggerRef}
        type="button"
        className="vk-datepicker-trigger"
        onClick={() => !disabled && setOpen((o) => !o)}
        disabled={disabled}
        aria-label={ariaLabel ?? placeholder}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        {selected ? formatDisplay(selected, showTime) : placeholder}
      </button>

      {open &&
        createPortal(popoverContent, document.body)}
    </div>
  );
}
