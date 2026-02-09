import { useState, useRef, useEffect, useCallback } from "react";
import type { NotificationProps, NotificationVariant } from "./Notification.types";

const VARIANT_COLORS: Record<
  NotificationVariant,
  { bg: string; iconBg: string; progress: string }
> = {
  success: {
    bg: "bg-emerald-500",
    iconBg: "bg-emerald-500",
    progress: "bg-emerald-500",
  },
  error: {
    bg: "bg-red-500",
    iconBg: "bg-red-500",
    progress: "bg-red-500",
  },
  info: {
    bg: "bg-blue-500",
    iconBg: "bg-blue-500",
    progress: "bg-blue-500",
  },
  warning: {
    bg: "bg-amber-500",
    iconBg: "bg-amber-500",
    progress: "bg-amber-500",
  },
};

function DefaultIcon({ variant }: { variant: NotificationVariant }) {
  const c = VARIANT_COLORS[variant];
  if (variant === "success") {
    return (
      <div
        className={`vk-notification-icon-circle ${c.iconBg} rounded-full flex items-center justify-center text-white flex-shrink-0`}
        aria-hidden
      >
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
    );
  }
  if (variant === "error") {
    return (
      <div
        className={`vk-notification-icon-circle ${c.iconBg} rounded-full flex items-center justify-center text-white flex-shrink-0`}
        aria-hidden
      >
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </div>
    );
  }
  if (variant === "warning") {
    return (
      <div
        className={`vk-notification-icon-circle ${c.iconBg} rounded-full flex items-center justify-center text-white flex-shrink-0`}
        aria-hidden
      >
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
    );
  }
  return (
    <div
      className={`vk-notification-icon-circle ${c.iconBg} rounded-full flex items-center justify-center text-white flex-shrink-0`}
      aria-hidden
    >
      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
    </div>
  );
}

export default function Notification({
  open,
  onClose,
  variant = "success",
  message,
  description,
  duration = 8,
  image,
  position = "top-right",
  actionButton,
  showClose = true,
  pauseOnHover = true,
  showClickToStop = true,
  showMinimize = true,
  className = "",
  "aria-label": ariaLabel,
  inline = false,
  color: colorProp,
}: NotificationProps) {
  const [remaining, setRemaining] = useState(duration);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const remainingWhenPausedRef = useRef(duration);

  const startTimer = useCallback(
    (initialRemaining?: number) => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (duration <= 0) return;
      const start = Date.now();
      const initial = initialRemaining ?? (paused ? remainingWhenPausedRef.current : duration);
      setRemaining(initial);
      intervalRef.current = setInterval(() => {
        const elapsed = (Date.now() - start) / 1000;
        const r = Math.max(0, initial - elapsed);
        setRemaining(r);
        if (r <= 0) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          intervalRef.current = null;
          onClose();
        }
      }, 50);
    },
    [duration, onClose]
  );

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    remainingWhenPausedRef.current = remaining;
    setPaused(true);
  }, [remaining]);

  useEffect(() => {
    if (!open) return;
    setRemaining(duration);
    setPaused(false);
    remainingWhenPausedRef.current = duration;
    if (duration > 0) startTimer();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [open, duration]);

  const handleMouseEnter = () => {
    if (pauseOnHover && duration > 0) stopTimer();
  };

  const handleMouseLeave = () => {
    if (pauseOnHover && duration > 0 && paused) {
      setPaused(false);
      startTimer(remainingWhenPausedRef.current);
    }
  };

  const handleClickToStop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (duration > 0) stopTimer();
  };

  if (!open) return null;

  const colors = VARIANT_COLORS[variant];
  const progressPct = duration > 0 ? (remaining / duration) * 100 : 100;

  const positionClass = inline
    ? ""
    : {
        "top-left": "vk-notification--top-left",
        "top-center": "vk-notification--top-center",
        "top-right": "vk-notification--top-right",
        center: "vk-notification--center",
        "bottom-left": "vk-notification--bottom-left",
        "bottom-center": "vk-notification--bottom-center",
        "bottom-right": "vk-notification--bottom-right",
      }[position];

  const accentStyle = colorProp ? ({ "--vk-notification-accent": colorProp } as React.CSSProperties) : undefined;

  return (
    <div
      className={`vk-notification ${positionClass} ${className}`.trim()}
      style={inline ? { position: "relative" } : undefined}
      role="alert"
      aria-label={ariaLabel ?? message}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`vk-notification-panel bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden min-w-[320px] max-w-[420px] ${colorProp ? "vk-notification-panel--custom-accent" : ""}`.trim()}
        style={accentStyle}
      >
          <div className="vk-notification-header flex items-start gap-3 p-4 pb-2">
          <div className="vk-notification-icon-wrap flex-shrink-0">
            {image !== undefined && image !== null ? (
              <div className="vk-notification-image rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 w-10 h-10 flex items-center justify-center">
                {typeof image === "string" ? (
                  <img src={image} alt="" className="w-full h-full object-cover" />
                ) : (
                  image
                )}
              </div>
            ) : (
              <DefaultIcon variant={variant} />
            )}
          </div>
          <div className="vk-notification-content flex-1 min-w-0">
            <p className="vk-notification-message font-semibold text-gray-900 text-sm md:text-base">
              {message}
            </p>
            {description && (
              <p className="vk-notification-description text-gray-500 text-xs mt-0.5">
                {description}
              </p>
            )}
          </div>
          <div className="vk-notification-actions flex items-center gap-1 flex-shrink-0">
            {showMinimize && (
              <button
                type="button"
                className="vk-notification-btn-icon w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                aria-label="Minimize"
              >
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M18 15l-6-6-6 6" />
                </svg>
              </button>
            )}
            {showClose && (
              <button
                type="button"
                className="vk-notification-btn-icon w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                aria-label="Close"
                onClick={onClose}
              >
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {duration > 0 && (
          <div className="vk-notification-footer px-4 pb-3 pt-1">
            <p className="vk-notification-countdown text-xs text-gray-500">
              This message will close in <strong>{Math.ceil(remaining)}</strong> seconds.{" "}
              {showClickToStop && (
                <button
                  type="button"
                  className="vk-notification-click-to-stop underline text-gray-600 hover:text-gray-900 focus:outline-none focus:underline"
                  onClick={handleClickToStop}
                >
                  Click to stop.
                </button>
              )}
            </p>
            <div
              className="vk-notification-progress-track h-1 rounded-full bg-gray-100 overflow-hidden mt-2"
              role="presentation"
            >
              <div
                className={`vk-notification-progress-fill h-full rounded-full ${colors.progress} transition-[width] duration-75 ease-linear`}
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}

        {actionButton && (
          <div className="vk-notification-action-bar px-4 pb-4 pt-0">
            <button
              type="button"
              className="vk-notification-action-btn text-sm font-medium text-[var(--vk-color-primary)] hover:underline focus:outline-none focus:underline"
              onClick={() => {
                actionButton.onClick();
                onClose();
              }}
            >
              {actionButton.label}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
