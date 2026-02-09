import type { ReactNode } from "react";

export interface StepperStep {
  /** Unique key */
  id: string;
  /** Step label (e.g. "Step 1") */
  label: string;
  /** Optional short description below the label (e.g. "Explain your step...") */
  description?: string;
  /**
   * Optional custom icon (used when variant is 'icons').
   * Pass any React node: SVG, <img>, emoji, or a component.
   * When completed, a checkmark is shown instead unless you use showCustomIconWhenCompleted.
   */
  icon?: ReactNode;
  /** Optional: use diamond shape for this step when variant is 'shapes' */
  highlight?: boolean;
}

export type StepperVariant =
  | "dots"       // filled/outline circles, connecting line
  | "shapes"     // squares/diamond, connecting line
  | "segmented"  // arrow segments, current step distinct
  | "fill"       // continuous bar fill + dots under labels
  | "underline"  // text with underline on active
  | "icons"      // squircle markers, checkmark when completed, line through center
  | "vertical";  // vertical layout with side connector

export interface StepperProps {
  /** Steps to display */
  steps: StepperStep[];
  /** Current step index (0-based). Steps before this are completed. */
  currentStep: number;
  /** Visual style */
  variant?: StepperVariant;
  /** Accent color (active/completed) - CSS color */
  color?: string;
  /** Inactive color (future steps) - CSS color */
  inactiveColor?: string;
  /** Callback when a step is clicked (optional interactivity) */
  onStepClick?: (stepIndex: number) => void;
  /** Allow clicking steps to navigate */
  clickable?: boolean;
  className?: string;
  "aria-label"?: string;
}
