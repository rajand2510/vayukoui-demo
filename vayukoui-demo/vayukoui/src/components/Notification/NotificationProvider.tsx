import { useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import Notification from "./Notification";
import { setNotificationListener } from "./notificationStore";
import type { ToastItem } from "./notificationStore";
import type { NotificationPosition } from "./Notification.types";

const DEFAULT_POSITION: NotificationPosition = "top-right";

export interface NotificationProviderProps {
  /** Default position for toasts when not specified in options */
  position?: NotificationPosition;
  /** Max toasts to show at once (stack); older ones are removed when exceeded */
  maxToasts?: number;
  /** Gap between stacked toasts (px) */
  gap?: number;
  children: ReactNode;
}

export default function NotificationProvider({
  position = DEFAULT_POSITION,
  maxToasts = 5,
  gap = 8,
  children,
}: NotificationProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    setNotificationListener((item) => {
      setToasts((prev) => {
        const next = [...prev, item];
        if (next.length > maxToasts) return next.slice(-maxToasts);
        return next;
      });
    });
    return () => setNotificationListener(null);
  }, [maxToasts]);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const positionClass = {
    "top-left": "vk-notification-container--top-left",
    "top-center": "vk-notification-container--top-center",
    "top-right": "vk-notification-container--top-right",
    center: "vk-notification-container--center",
    "bottom-left": "vk-notification-container--bottom-left",
    "bottom-center": "vk-notification-container--bottom-center",
    "bottom-right": "vk-notification-container--bottom-right",
  }[position];

  return (
    <>
      {children}
      <div
        className={`vk-notification-container ${positionClass}`}
        style={{ gap: `${gap}px` }}
        aria-live="polite"
      >
        {toasts.map((t) => (
          <Notification
            key={t.id}
            open
            onClose={() => remove(t.id)}
            variant={t.variant}
            message={t.message}
            description={t.description}
            duration={t.duration}
            image={t.image}
            actionButton={t.actionButton}
            showClose
            showMinimize={false}
            showClickToStop
            pauseOnHover
            inline
            color={t.color}
          />
        ))}
      </div>
    </>
  );
}
