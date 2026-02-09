import type { ToastOptions, NotificationVariant } from "./Notification.types";

export interface ToastItem extends ToastOptions {
  id: string;
  variant: NotificationVariant;
}

type Listener = (item: ToastItem) => void;

let listener: Listener | null = null;

function nextId(): string {
  return `vk-toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function open(options: ToastOptions & { variant: NotificationVariant }): string {
  const id = nextId();
  const item: ToastItem = {
    id,
    message: options.message,
    description: options.description,
    duration: options.duration ?? 8,
    image: options.image,
    position: options.position ?? "top-right",
    actionButton: options.actionButton,
    variant: options.variant,
    color: options.color,
  };
  if (listener) listener(item);
  return id;
}

export function setNotificationListener(fn: Listener | null): void {
  listener = fn;
}

export const notification = {
  success(options: ToastOptions | string): string {
    const opts = typeof options === "string" ? { message: options } : options;
    return open({ ...opts, variant: "success" });
  },
  error(options: ToastOptions | string): string {
    const opts = typeof options === "string" ? { message: options } : options;
    return open({ ...opts, variant: "error" });
  },
  info(options: ToastOptions | string): string {
    const opts = typeof options === "string" ? { message: options } : options;
    return open({ ...opts, variant: "info" });
  },
  warning(options: ToastOptions | string): string {
    const opts = typeof options === "string" ? { message: options } : options;
    return open({ ...opts, variant: "warning" });
  },
  open(options: ToastOptions): string {
    return open({
      ...options,
      variant: options.variant ?? "info",
    });
  },
};
