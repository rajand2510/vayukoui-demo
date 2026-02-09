import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { notification, setNotificationListener } from "./notificationStore";
import type { ToastItem } from "./notificationStore";

describe("notification store", () => {
  beforeEach(() => {
    setNotificationListener(null);
  });

  afterEach(() => {
    setNotificationListener(null);
  });

  it("calls listener with toast item when notification.success(string) is used", () => {
    const listener = vi.fn();
    setNotificationListener(listener);
    const id = notification.success("Changes saved");
    expect(id).toBeDefined();
    expect(typeof id).toBe("string");
    expect(listener).toHaveBeenCalledTimes(1);
    const [item] = listener.mock.calls[0] as [ToastItem];
    expect(item.message).toBe("Changes saved");
    expect(item.variant).toBe("success");
    expect(item.id).toBe(id);
  });

  it("calls listener with toast item when notification.success(options) is used", () => {
    const listener = vi.fn();
    setNotificationListener(listener);
    notification.success({
      message: "Done",
      description: "All good",
      duration: 5,
    });
    expect(listener).toHaveBeenCalledTimes(1);
    const [item] = listener.mock.calls[0] as [ToastItem];
    expect(item.message).toBe("Done");
    expect(item.description).toBe("All good");
    expect(item.duration).toBe(5);
    expect(item.variant).toBe("success");
  });

  it("notification.error invokes listener with variant error", () => {
    const listener = vi.fn();
    setNotificationListener(listener);
    notification.error("Failed");
    expect(listener).toHaveBeenCalledTimes(1);
    expect((listener.mock.calls[0][0] as ToastItem).variant).toBe("error");
    expect((listener.mock.calls[0][0] as ToastItem).message).toBe("Failed");
  });

  it("notification.info and notification.warning invoke listener with correct variant", () => {
    const listener = vi.fn();
    setNotificationListener(listener);
    notification.info("Info message");
    expect((listener.mock.calls[0][0] as ToastItem).variant).toBe("info");
    notification.warning("Warning message");
    expect((listener.mock.calls[1][0] as ToastItem).variant).toBe("warning");
  });

  it("does not throw when listener is null", () => {
    setNotificationListener(null);
    expect(() => {
      notification.success("No listener");
      notification.error("No listener");
    }).not.toThrow();
  });
});
