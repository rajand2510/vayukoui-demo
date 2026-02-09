import type { ReactNode } from "react";

export interface TabItem {
  id: string;
  label: string;
  /** Optional icon (shown left or above depending on iconPosition) */
  icon?: ReactNode;
}

export type TabsVariant = "filled" | "bordered" | "underline" | "light";
export type TabsIconPosition = "none" | "left" | "top";

export interface TabsProps {
  tabs: TabItem[];
  value: string;
  onChange: (tabId: string) => void;
  variant?: TabsVariant;
  iconPosition?: TabsIconPosition;
  color?: string;
  className?: string;
  "aria-label"?: string;
}
