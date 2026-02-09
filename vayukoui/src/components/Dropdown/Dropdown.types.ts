import type { ReactNode } from "react";

export interface DropdownOption {
  value: string;
  label: string;
  icon?: ReactNode;
}

export interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  searchable?: boolean;
  placeholder?: string;
  disabled?: boolean;
  /** Accent color (border, focus, scrollbar); also fallback for selected/hover when not overridden */
  color?: string;
  /** Selected option background color */
  selectedBgColor?: string;
  /** Selected option text color */
  selectedTextColor?: string;
  /** Option hover background color */
  optionHoverBgColor?: string;
  /** Option hover text color */
  optionHoverTextColor?: string;
  className?: string;
  "aria-label"?: string;
}
