export interface RangeValue {
  from: number;
  to: number;
}

export interface RangeSliderMark {
  value: number;
  label?: string;
}

export type RangeSliderSize = "small" | "medium";
export type RangeValueLabelDisplay = "on" | "auto" | "off";
  