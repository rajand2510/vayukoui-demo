import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import type { ModalProps } from "./Modal.types";

export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  maxWidth = "480px",
  className = "",
  "aria-label": ariaLabel,
}: ModalProps) {
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
      className={`vk-modal vk-modal-panel ${className}`.trim()}
      style={{ maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth }}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel ?? (typeof title === "string" ? title : "Dialog")}
    >
      {title != null && (
        <div className="vk-modal-header">
          <h2 className="vk-modal-title">{title}</h2>
          <button
            type="button"
            className="vk-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      <div className="vk-modal-body">{children}</div>
      {footer != null && <div className="vk-modal-footer">{footer}</div>}
    </div>
  );

  return createPortal(
    <div className="vk-modal-backdrop" onClick={closeOnBackdropClick ? onClose : undefined}>
      <div className="vk-modal-wrap" onClick={(e) => e.stopPropagation()}>
        {panel}
      </div>
    </div>,
    document.body
  );
}
