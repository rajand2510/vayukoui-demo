export interface LinearProgressProps {
  /** Current value (0 to max) */
  value: number;
  /** Maximum value (default 100) */
  max?: number;
  /** Accent color */
  color?: string;
  /** Track/background color */
  trackColor?: string;
  /** Label above the bar (e.g. "Your progress") */
  label?: string;
  /** Status message below (e.g. "Payment has not been completed") */
  statusMessage?: string;
  /** Show value text (e.g. "75%") */
  showValue?: boolean;
  /** Bar height in pixels */
  height?: number;
  /** Rounded pill style */
  rounded?: boolean;
  className?: string;
  "aria-label"?: string;
}
