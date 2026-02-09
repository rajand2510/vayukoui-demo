import type { ReactNode } from "react";

export interface AccordionItem {
  id: string;
  /** Header label (always visible) */
  label: string;
  /** Expandable content */
  content: ReactNode;
  /** Optional: allow custom header (overrides label) */
  header?: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Allow multiple open at once */
  allowMultiple?: boolean;
  /** Controlled: which ids are expanded (when provided, component is controlled) */
  expanded?: string[];
  /** Uncontrolled: initial expanded ids */
  defaultExpanded?: string[];
  /** Callback when expansion changes (id[] when allowMultiple, else single id or null) */
  onChange?: (expandedIds: string[]) => void;
  /** Accent color for active state */
  color?: string;
  className?: string;
  "aria-label"?: string;
}
