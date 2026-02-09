export interface DatePickerProps {
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  disableDates?: ((date: Date) => boolean) | Date[];
  /** Show time inputs (hour/minute) */
  showTime?: boolean;
  placeholder?: string;
  disabled?: boolean;
  color?: string;
  className?: string;
  "aria-label"?: string;
}
