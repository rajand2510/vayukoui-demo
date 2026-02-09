import type { ReactNode } from "react";

export type DrawerSide = "left" | "right";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  /** Panel content */
  children: ReactNode;
  /** Which side to slide from */
  side?: DrawerSide;
  /** Optional title in the panel header */
  title?: ReactNode;
  /** Close when clicking overlay */
  closeOnBackdropClick?: boolean;
  /** Close on Escape */
  closeOnEscape?: boolean;
  /** Width of the panel */
  width?: string | number;
  className?: string;
  "aria-label"?: string;
}
