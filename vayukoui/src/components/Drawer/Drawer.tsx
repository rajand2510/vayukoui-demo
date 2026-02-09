import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import type { DrawerProps } from "./Drawer.types";

export default function Drawer({
  open,
  onClose,
  children,
  side = "right",
  title,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  width = "320px",
  className = "",
  "aria-label": ariaLabel,
}: DrawerProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === "Escape") onClose();
    },
    [onClose, closeOnEscape]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, handleEscape]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const panel = (
    <div
      className={`vk-drawer vk-drawer--${side} ${className}`.trim()}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        left: side === "left" ? 0 : "auto",
        right: side === "right" ? 0 : "auto",
      }}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel ?? (typeof title === "string" ? title : "Drawer")}
    >
      {title != null && (
        <div className="vk-drawer-header">
          <h2 className="vk-drawer-title">{title}</h2>
          <button type="button" className="vk-drawer-close" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      <div className="vk-drawer-body">{children}</div>
    </div>
  );

  return createPortal(
    <div className="vk-drawer-backdrop" onClick={closeOnBackdropClick ? onClose : undefined}>
      {panel}
    </div>,
    document.body
  );
}
