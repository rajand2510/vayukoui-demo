import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import type { DateRangePickerProps, DateRangeValue } from "./DateRangePicker.types";

function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function formatDisplay(d: Date): string {
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function isDisabled(
  date: Date,
  minDate?: Date,
  maxDate?: Date,
  disableDates?: DateRangePickerProps["disableDates"]
): boolean {
  const t = date.getTime();
  if (minDate && t < minDate.getTime()) return true;
  if (maxDate && t > maxDate.getTime()) return true;
  if (!disableDates) return false;
  if (Array.isArray(disableDates))
    return disableDates.some((d) => formatDate(d) === formatDate(date));
  return disableDates(date);
}

/** When selecting "from", disable dates after current "to". When selecting "to", disable dates before current "from". */
function isDisabledByRange(
  date: Date,
  selecting: "from" | "to",
  from: Date | null,
  to: Date | null
): boolean {
  const d = startOfDay(date).getTime();
  if (selecting === "from" && to) return d > startOfDay(to).getTime();
  if (selecting === "to" && from) return d < startOfDay(from).getTime();
  return false;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

type QuickRangeKey =
  | "today"
  | "yesterday"
  | "this_week"
  | "last_week"
  | "this_month"
  | "last_month"
  | "this_year"
  | "last_year"
  | "all_time";

function getQuickRange(key: QuickRangeKey): DateRangeValue {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let from: Date;
  let to: Date = new Date(today);
  to.setDate(to.getDate() - 1);
  to.setHours(23, 59, 59, 999);

  switch (key) {
    case "today":
      from = new Date(today);
      to = new Date(today);
      to.setHours(23, 59, 59, 999);
      break;
    case "yesterday":
      from = new Date(today);
      from.setDate(from.getDate() - 1);
      to = new Date(from);
      to.setHours(23, 59, 59, 999);
      break;
    case "this_week": {
      const day = today.getDay();
      const start = new Date(today);
      start.setDate(today.getDate() - (day === 0 ? 6 : day - 1));
      from = start;
      to = new Date(start);
      to.setDate(to.getDate() + 6);
      to.setHours(23, 59, 59, 999);
      break;
    }
    case "last_week": {
      const day = today.getDay();
      const start = new Date(today);
      start.setDate(today.getDate() - (day === 0 ? 6 : day - 1) - 7);
      from = start;
      to = new Date(start);
      to.setDate(to.getDate() + 6);
      to.setHours(23, 59, 59, 999);
      break;
    }
    case "this_month":
      from = new Date(today.getFullYear(), today.getMonth(), 1);
      to = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      to.setHours(23, 59, 59, 999);
      break;
    case "last_month":
      from = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      to = new Date(today.getFullYear(), today.getMonth(), 0);
      to.setHours(23, 59, 59, 999);
      break;
    case "this_year":
      from = new Date(today.getFullYear(), 0, 1);
      to = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);
      break;
    case "last_year":
      from = new Date(today.getFullYear() - 1, 0, 1);
      to = new Date(today.getFullYear() - 1, 11, 31, 23, 59, 59, 999);
      break;
    case "all_time":
      from = new Date(2000, 0, 1);
      to = new Date(2100, 11, 31, 23, 59, 59, 999);
      break;
    default:
      return { from: null, to: null };
  }
  return { from, to };
}

const QUICK_RANGES: { key: QuickRangeKey; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "yesterday", label: "Yesterday" },
  { key: "this_week", label: "This week" },
  { key: "last_week", label: "Last week" },
  { key: "this_month", label: "This month" },
  { key: "last_month", label: "Last month" },
  { key: "this_year", label: "This year" },
  { key: "last_year", label: "Last year" },
  { key: "all_time", label: "All time" },
];

/** Monday = 0, Sunday = 6 */
function getDayOfWeek(d: Date): number {
  return (d.getDay() + 6) % 7;
}

function buildCalendarDays(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startPad = getDayOfWeek(first);
  const daysInMonth = last.getDate();
  const days: (Date | null)[] = [];
  for (let i = 0; i < startPad; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
  return days;
}

export default function DateRangePicker({
  value: valueProp,
  defaultValue,
  onChange,
  minDate,
  maxDate,
  disableDates,
  showTime = false,
  placeholderFrom = "From",
  placeholderTo = "To",
  disabled = false,
  color,
  className = "",
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState<DateRangeValue>(defaultValue ?? { from: null, to: null });
  const [pending, setPending] = useState<DateRangeValue>({ from: null, to: null });
  const [selecting, setSelecting] = useState<"from" | "to">("from");
  const [leftMonth, setLeftMonth] = useState(() => {
    const r = valueProp ?? range;
    const d = r.from ?? r.to ?? new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [rightMonth, setRightMonth] = useState(() => {
    const r = valueProp ?? range;
    const d = r.from ?? r.to ?? new Date();
    const first = new Date(d.getFullYear(), d.getMonth(), 1);
    return new Date(first.getFullYear(), first.getMonth() + 1, 1);
  });
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const current = valueProp ?? range;
  const editing = open ? pending : current;

  useEffect(() => {
    if (!open) return;
    setPending(current);
    setSelecting("from");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onOutside = (e: MouseEvent) => {
      const el = e.target as Node;
      if (triggerRef.current?.contains(el) || popoverRef.current?.contains(el)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [open]);

  const handleSelect = (d: Date) => {
    if (selecting === "from") {
      setPending({ from: d, to: editing.to });
      setSelecting("to");
    } else {
      const from = editing.from ?? d;
      const to = d.getTime() >= from.getTime() ? d : from;
      const next = { from: from.getTime() <= to.getTime() ? from : to, to };
      setPending(next);
      if (valueProp === undefined) setRange(next);
      onChange?.(next);
      setOpen(false);
    }
  };

  const handleQuickSelect = (key: QuickRangeKey) => {
    const next = getQuickRange(key);
    setPending(next);
    if (valueProp === undefined) setRange(next);
    onChange?.(next);
    setOpen(false);
  };

  const handleCancel = () => setOpen(false);
  const handleApply = () => {
    if (valueProp === undefined) setRange(pending);
    onChange?.(pending);
    setOpen(false);
  };

  const years = (() => {
    const y = new Date().getFullYear();
    const arr: number[] = [];
    for (let i = y - 50; i <= y + 10; i++) arr.push(i);
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
    ? ({ "--vk-daterangepicker-accent": color } as React.CSSProperties)
    : undefined;

  const renderCalendar = (
    viewMonth: Date,
    setViewMonth: (v: Date | ((prev: Date) => Date)) => void,
    isLeft: boolean
  ) => {
    const year = viewMonth.getFullYear();
    const month = viewMonth.getMonth();
    const days = buildCalendarDays(year, month);
    return (
      <div key={`${year}-${month}-${isLeft ? "L" : "R"}`} className="vk-daterangepicker-calendar">
        <div className="vk-daterangepicker-calendar-header">
          <button
            type="button"
            onClick={() => setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1))}
            aria-label="Previous month"
            className="vk-daterangepicker-nav"
          >
            ‹
          </button>
          <div className="vk-daterangepicker-month-year">
            <select
              className="vk-daterangepicker-month-select"
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
              className="vk-daterangepicker-year-select"
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
          </div>
          <button
            type="button"
            onClick={() => setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1))}
            aria-label="Next month"
            className="vk-daterangepicker-nav"
          >
            ›
          </button>
        </div>
        <div className="vk-daterangepicker-grid">
          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
            <div key={d} className="vk-daterangepicker-weekday">
              {d}
            </div>
          ))}
          {days.map((d, i) => {
            if (!d) return <div key={`e-${i}`} />;
            const baseDisabled = isDisabled(d, minDate, maxDate, disableDates);
            const rangeDisabled = isDisabledByRange(d, selecting, editing.from, editing.to);
            const disabledDay = baseDisabled || rangeDisabled;
            const fromSel = editing.from && formatDate(editing.from) === formatDate(d);
            const toSel = editing.to && formatDate(editing.to) === formatDate(d);
            const dTime = startOfDay(d).getTime();
            const fromTime = editing.from ? startOfDay(editing.from).getTime() : 0;
            const toTime = editing.to ? startOfDay(editing.to).getTime() : 0;
            const inRange =
              editing.from &&
              editing.to &&
              dTime > fromTime &&
              dTime < toTime;
            return (
              <button
                key={d.getTime()}
                type="button"
                className={`vk-daterangepicker-day ${disabledDay ? "vk-daterangepicker-day--disabled" : ""} ${fromSel ? "vk-daterangepicker-day--from" : ""} ${toSel ? "vk-daterangepicker-day--to" : ""} ${inRange ? "vk-daterangepicker-day--inrange" : ""}`}
                disabled={disabledDay}
                onClick={() => !disabledDay && handleSelect(d)}
              >
                {d.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const popoverContent = (
    <div
      ref={popoverRef}
      className="vk-daterangepicker-popover vk-daterangepicker-popover--portal"
      role="dialog"
      aria-modal="true"
      data-show-time={showTime}
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        zIndex: 10000,
        ...accentStyle,
      }}
    >
      <div className="vk-daterangepicker-body">
        <aside className="vk-daterangepicker-sidebar">
          {QUICK_RANGES.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              className="vk-daterangepicker-quick"
              onClick={() => handleQuickSelect(key)}
            >
              {label}
            </button>
          ))}
        </aside>
        <div className="vk-daterangepicker-calendars">
          {renderCalendar(leftMonth, setLeftMonth, true)}
          {renderCalendar(rightMonth, setRightMonth, false)}
        </div>
      </div>
      <div className="vk-daterangepicker-footer">
        <div className="vk-daterangepicker-inputs">
          <input
            type="text"
            readOnly
            className="vk-daterangepicker-input"
            value={editing.from ? formatDisplay(editing.from) : placeholderFrom}
          />
          <span className="vk-daterangepicker-sep">–</span>
          <input
            type="text"
            readOnly
            className="vk-daterangepicker-input"
            value={editing.to ? formatDisplay(editing.to) : placeholderTo}
          />
        </div>
        <div className="vk-daterangepicker-actions">
          <button type="button" className="vk-daterangepicker-cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button type="button" className="vk-daterangepicker-apply" onClick={handleApply}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div
      ref={triggerRef}
      className={`vk-daterangepicker ${disabled ? "vk-daterangepicker--disabled" : ""} ${className}`.trim()}
      style={accentStyle}
    >
      <div className="vk-daterangepicker-triggers">
        <button
          type="button"
          className="vk-daterangepicker-trigger"
          onClick={() => !disabled && setOpen(true)}
          disabled={disabled}
        >
          {current.from ? formatDisplay(current.from) : placeholderFrom}
        </button>
        <span className="vk-daterangepicker-sep">–</span>
        <button
          type="button"
          className="vk-daterangepicker-trigger"
          onClick={() => !disabled && setOpen(true)}
          disabled={disabled}
        >
          {current.to ? formatDisplay(current.to) : placeholderTo}
        </button>
      </div>

      {open && createPortal(popoverContent, document.body)}
    </div>
  );
}
