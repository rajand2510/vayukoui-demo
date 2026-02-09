import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import type { DropdownProps } from "./Dropdown.types";

const GAP = 4;
const VIEWPORT_PAD = 8;

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width={16} height={16} aria-hidden fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function ChevronUp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width={16} height={16} aria-hidden fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 15l-6-6-6 6" />
    </svg>
  );
}

export default function Dropdown({
  options,
  value: valueProp,
  defaultValue,
  onChange,
  searchable = false,
  placeholder = "Select…",
  disabled = false,
  color,
  selectedBgColor,
  selectedTextColor,
  optionHoverBgColor,
  optionHoverTextColor,
  className = "",
  "aria-label": ariaLabel,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue ?? "");
  const [search, setSearch] = useState("");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, minWidth: 0 });

  const selected = valueProp ?? value;
  const selectedOption = options.find((o) => o.value === selected);
  const displayLabel = selectedOption?.label ?? placeholder;

  const filtered =
    searchable && search.trim()
      ? options.filter(
          (o) =>
            o.label.toLowerCase().includes(search.toLowerCase()) ||
            o.value.toLowerCase().includes(search.toLowerCase())
        )
      : options;

  useEffect(() => {
    if (!open) return;
    const onOutside = (e: MouseEvent) => {
      const el = e.target as Node;
      if (triggerRef.current?.contains(el) || menuRef.current?.contains(el)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [open]);

  useEffect(() => {
    if (!open || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const maxMenuWidth = Math.min(400, window.innerWidth - VIEWPORT_PAD * 2);
    const menuWidth = Math.min(rect.width, maxMenuWidth);
    setPosition({ top: rect.bottom + GAP, left: rect.left, minWidth: menuWidth });
  }, [open]);

  useEffect(() => {
    if (!open || !triggerRef.current) return;
    const id = requestAnimationFrame(() => {
      if (!menuRef.current) return;
      const el = menuRef.current;
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
      setPosition((prev) => ({ ...prev, top, left }));
    });
    return () => cancelAnimationFrame(id);
  }, [open]);

  const handleSelect = (v: string) => {
    if (valueProp === undefined) setValue(v);
    onChange?.(v);
    setOpen(false);
    setSearch("");
  };

  const dropdownStyle = {
    ...(color && { "--vk-dropdown-accent": color } as React.CSSProperties),
    ...(selectedBgColor && { "--vk-dropdown-selected-bg": selectedBgColor } as React.CSSProperties),
    ...(selectedTextColor && { "--vk-dropdown-selected-text": selectedTextColor } as React.CSSProperties),
    ...(optionHoverBgColor && { "--vk-dropdown-option-hover-bg": optionHoverBgColor } as React.CSSProperties),
    ...(optionHoverTextColor && { "--vk-dropdown-option-hover-text": optionHoverTextColor } as React.CSSProperties),
  };
  const hasDropdownVars = Object.keys(dropdownStyle).length > 0;

  const menuContent = (
    <div
      ref={menuRef}
      className="vk-dropdown-menu vk-dropdown-menu--portal"
      role="listbox"
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        ["--vk-dropdown-menu-width" as string]: position.minWidth ? `${position.minWidth}px` : undefined,
        zIndex: 10000,
        ...dropdownStyle,
      }}
    >
      {searchable && (
        <div className="vk-dropdown-search-wrap">
          <input
            type="text"
            className="vk-dropdown-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search…"
            autoFocus
            aria-label="Search options"
          />
        </div>
      )}
      <ul className="vk-dropdown-list">
        {filtered.length === 0 ? (
          <li className="vk-dropdown-empty">No options</li>
        ) : (
          filtered.map((opt) => (
            <li key={opt.value}>
              <button
                type="button"
                className={`vk-dropdown-option ${opt.value === selected ? "vk-dropdown-option--selected" : ""}`}
                onClick={() => handleSelect(opt.value)}
                role="option"
                aria-selected={opt.value === selected}
              >
                {opt.icon && <span className="vk-dropdown-option-icon">{opt.icon}</span>}
                {opt.label}
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );

  return (
    <div
      className={`vk-dropdown ${disabled ? "vk-dropdown--disabled" : ""} ${className}`.trim()}
      style={hasDropdownVars ? dropdownStyle : undefined}
    >
      <button
        ref={triggerRef}
        type="button"
        className="vk-dropdown-trigger"
        onClick={() => !disabled && setOpen((o) => !o)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel ?? placeholder}
      >
        <span className="vk-dropdown-trigger-label">
          {selectedOption?.icon && (
            <span className="vk-dropdown-trigger-icon">{selectedOption.icon}</span>
          )}
          {displayLabel}
        </span>
        <span className="vk-dropdown-chevron" aria-hidden>
          {open ? <ChevronUp /> : <ChevronDown />}
        </span>
      </button>

      {open && createPortal(menuContent, document.body)}
    </div>
  );
}
