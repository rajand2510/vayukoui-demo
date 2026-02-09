import type { ReactNode } from "react";

export type NotificationVariant = "info" | "success" | "error" | "warning";

export type NotificationPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface NotificationActionButton {
  label: string;
  onClick: () => void;
}

export interface NotificationProps {
  /** Whether the notification is visible */
  open: boolean;
  /** Called when the notification should close (X or after duration) */
  onClose: () => void;
  /** Visual variant: info, success, error, warning */
  variant?: NotificationVariant;
  /** Primary message (e.g. "Changes saved") */
  message: string;
  /** Optional secondary description */
  description?: string;
  /** Auto-close after this many seconds; 0 = no auto-close */
  duration?: number;
  /** Optional custom image/logo URL or ReactNode (rounded square) */
  image?: string | ReactNode;
  /** Position on screen */
  position?: NotificationPosition;
  /** Optional action button (e.g. "Undo") */
  actionButton?: NotificationActionButton;
  /** Show close (X) button */
  showClose?: boolean;
  /** Pause countdown when user hovers; resume when they leave */
  pauseOnHover?: boolean;
  /** Show "Click to stop" to pause countdown (when duration > 0) */
  showClickToStop?: boolean;
  /** Show minimize/expand chevron */
  showMinimize?: boolean;
  /** Additional class for the root element */
  className?: string;
  /** aria-label for the notification */
  "aria-label"?: string;
  /** When true, root is not fixed (for use inside NotificationProvider stack) */
  inline?: boolean;
  /** Custom accent/card color (icon + progress bar), e.g. "#059669" or "rgb(5, 150, 105)" */
  color?: string;
}

/** Options for imperative toast API (notification.success, etc.) */
export interface ToastOptions {
  message: string;
  description?: string;
  duration?: number;
  image?: string | ReactNode;
  position?: NotificationPosition;
  actionButton?: NotificationActionButton;
  variant?: NotificationVariant;
  /** Custom accent/card color (icon + progress bar) */
  color?: string;
}
