export interface CircularProgressProps {
  /** Current value (e.g. step index 1) */
  value: number;
  /** Maximum value (e.g. total steps 4) */
  max?: number;
  /** Accent color (blue, red, yellow for state) */
  color?: string;
  /** Label inside the circle (e.g. "Status" / "1 of 4") */
  label?: string;
  /** Sub-label (e.g. "1 of 4" when label is "Status") */
  subLabel?: string;
  /** Size in pixels (diameter) */
  size?: number;
  /** Stroke width of the ring */
  strokeWidth?: number;
  className?: string;
  "aria-label"?: string;
}
