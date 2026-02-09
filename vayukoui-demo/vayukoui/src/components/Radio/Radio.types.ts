export interface RadioOption {
  value: string;
  label: string;
}

export type RadioVariant = "default" | "pill" | "card";

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  variant?: RadioVariant;
  disabled?: boolean;
  /** Checked/selected color */
  color?: string;
  className?: string;
  "aria-label"?: string;
}
