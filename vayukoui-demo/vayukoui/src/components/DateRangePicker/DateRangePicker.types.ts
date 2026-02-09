export interface DateRangeValue {
  from: Date | null;
  to: Date | null;
}

export interface DateRangePickerProps {
  value?: DateRangeValue;
  defaultValue?: DateRangeValue;
  onChange?: (range: DateRangeValue) => void;
  minDate?: Date;
  maxDate?: Date;
  disableDates?: ((date: Date) => boolean) | Date[];
  /** Show time inputs for from/to */
  showTime?: boolean;
  placeholderFrom?: string;
  placeholderTo?: string;
  disabled?: boolean;
  color?: string;
  className?: string;
}
