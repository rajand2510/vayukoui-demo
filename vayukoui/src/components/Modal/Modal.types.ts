import type { ReactNode } from "react";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** Title at top of modal */
  title?: ReactNode;
  /** Main content */
  children: ReactNode;
  /** Optional footer (buttons, etc.) */
  footer?: ReactNode;
  /** Close when clicking backdrop */
  closeOnBackdropClick?: boolean;
  /** Close on Escape key */
  closeOnEscape?: boolean;
  /** Max width of the panel */
  maxWidth?: string | number;
  className?: string;
  "aria-label"?: string;
}
