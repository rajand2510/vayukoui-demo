import { useState, useCallback } from "react";
import type { AccordionProps, AccordionItem } from "./Accordion.types";

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      className="vk-accordion-chevron"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
      style={{ transform: open ? "rotate(180deg)" : undefined }}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function Accordion({
  items,
  allowMultiple = false,
  expanded: expandedProp,
  defaultExpanded = [],
  onChange,
  color,
  className = "",
  "aria-label": ariaLabel,
}: AccordionProps) {
  const [internalExpanded, setInternalExpanded] = useState<string[]>(defaultExpanded);
  const isControlled = expandedProp !== undefined;
  const expanded = isControlled ? expandedProp : internalExpanded;

  const toggle = useCallback(
    (id: string) => {
      const next = allowMultiple
        ? expanded.includes(id)
          ? expanded.filter((x) => x !== id)
          : [...expanded, id]
        : expanded.includes(id)
          ? []
          : [id];
      if (!isControlled) setInternalExpanded(next);
      onChange?.(next);
    },
    [expanded, allowMultiple, isControlled, onChange]
  );

  const style = color ? ({ "--vk-accordion-color": color } as React.CSSProperties) : undefined;

  return (
    <div
      className={`vk-accordion ${className}`.trim()}
      style={style}
      role="region"
      aria-label={ariaLabel ?? "Accordion"}
    >
      {items.map((item: AccordionItem) => {
        const isOpen = expanded.includes(item.id);
        return (
          <div
            key={item.id}
            className={`vk-accordion-item ${isOpen ? "vk-accordion-item--open" : ""}`}
          >
            <button
              type="button"
              className="vk-accordion-trigger"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
              id={`accordion-trigger-${item.id}`}
            >
              {item.header != null ? item.header : <span className="vk-accordion-label">{item.label}</span>}
              <ChevronDown open={isOpen} />
            </button>
            <div
              id={`accordion-content-${item.id}`}
              role="region"
              aria-labelledby={`accordion-trigger-${item.id}`}
              className="vk-accordion-content"
              hidden={!isOpen}
            >
              <div className="vk-accordion-content-inner">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
