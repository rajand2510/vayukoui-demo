import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, useEffect } from "react";
import { Notification, NotificationProvider, notification } from "../index";
import type { NotificationPosition, NotificationVariant } from "../index";

/** Dummy API: simulates a fetch that resolves or rejects after a short delay. */
async function dummyApi(options: { succeed: boolean }): Promise<{ data: string }> {
  await new Promise((r) => setTimeout(r, 800));
  if (options.succeed) return { data: "ok" };
  throw new Error("API error");
}

/** Component that uses useEffect to call dummy API and show notification on result. */
function ComponentWithEffectAndApi({
  apiSucceeds,
  onStart,
}: {
  apiSucceeds: boolean;
  onStart?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    if (trigger === 0) return;
    let cancelled = false;
    setLoading(true);
    onStart?.();
    dummyApi({ succeed: apiSucceeds })
      .then(() => {
        if (!cancelled) notification.success("Data loaded");
      })
      .catch(() => {
        if (!cancelled) notification.error("Failed to load");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [trigger, apiSucceeds, onStart]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <button
        type="button"
        onClick={() => setTrigger((t) => t + 1)}
        disabled={loading}
        style={{
          padding: "8px 16px",
          background: apiSucceeds ? "#059669" : "#dc2626",
          color: "white",
          border: "none",
          borderRadius: 8,
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? "Calling API…" : apiSucceeds ? "Call API (success)" : "Call API (error)"}
      </button>
      {loading && <span style={{ fontSize: 12, color: "#666" }}>useEffect → dummyApi() → notification</span>}
    </div>
  );
}

const meta = {
  title: "Components/Notification",
  component: Notification,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "error", "warning"] as NotificationVariant[],
    },
    position: {
      control: "select",
      options: [
        "top-left",
        "top-center",
        "top-right",
        "center",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ] as NotificationPosition[],
    },
    duration: { control: "number" },
    color: { control: "color" },
    showClose: { control: "boolean" },
    pauseOnHover: { control: "boolean" },
    showClickToStop: { control: "boolean" },
    showMinimize: { control: "boolean" },
  },
} satisfies Meta<typeof Notification>;

export default meta;
type Story = StoryObj<typeof meta>;

function NotificationDemo(props: {
  variant?: NotificationVariant;
  position?: NotificationPosition;
  message?: string;
  description?: string;
  duration?: number;
  color?: string;
  image?: string | React.ReactNode;
  actionButton?: { label: string; onClick: () => void };
  showClose?: boolean;
  showMinimize?: boolean;
  showClickToStop?: boolean;
  pauseOnHover?: boolean;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          padding: "8px 16px",
          background: "#384E9F",
          color: "white",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        Show notification
      </button>
      <Notification
        open={open}
        onClose={() => setOpen(false)}
        variant={props.variant ?? "success"}
        message={props.message ?? "Changes saved"}
        description={props.description}
        duration={props.duration ?? 8}
        color={props.color}
        image={props.image}
        position={props.position ?? "top-right"}
        actionButton={props.actionButton}
        showClose={props.showClose ?? true}
        showMinimize={props.showMinimize ?? true}
        showClickToStop={props.showClickToStop ?? true}
        pauseOnHover={props.pauseOnHover ?? true}
      />
    </div>
  );
}

export const Success: Story = {
  args: {
    open: true,
    onClose: () => {},
    variant: "success",
    message: "Changes saved",
    duration: 8,
    position: "top-right",
    color: undefined,
  },
  render: (args) => (
    <div>
      <NotificationDemo
        variant="success"
        position={args.position}
        message="Changes saved"
        duration={8}
        color={args.color}
      />
    </div>
  ),
};

const baseArgs = { open: true, onClose: () => {}, message: "Message" };

export const Info: Story = {
  args: { ...baseArgs, variant: "info", message: "New update available" },
  render: () => (
    <NotificationDemo
      variant="info"
      position="top-right"
      message="New update available"
      description="Version 2.0 is ready to install."
      duration={10}
    />
  ),
};

export const ErrorVariant: Story = {
  args: { ...baseArgs, variant: "error", message: "Failed to save" },
  render: () => (
    <NotificationDemo
      variant="error"
      position="top-right"
      message="Failed to save"
      description="Please check your connection and try again."
      duration={10}
    />
  ),
};

export const Warning: Story = {
  args: { ...baseArgs, variant: "warning", message: "Unsaved changes" },
  render: () => (
    <NotificationDemo
      variant="warning"
      position="top-left"
      message="Unsaved changes"
      description="You have unsaved changes that will be lost."
      duration={8}
    />
  ),
};

export const WithCustomImage: Story = {
  args: { ...baseArgs, message: "Profile updated" },
  render: () => (
    <NotificationDemo
      variant="success"
      position="top-right"
      message="Profile updated"
      description="Your avatar has been changed."
      image="https://picsum.photos/80?seed=avatar"
      duration={8}
    />
  ),
};

export const WithActionButton: Story = {
  args: { ...baseArgs, message: "Item removed" },
  render: () => (
    <NotificationDemo
      variant="success"
      position="top-right"
      message="Item removed"
      actionButton={{ label: "Undo", onClick: () => window.alert("Undo") }}
      duration={8}
    />
  ),
};

export const PositionCenter: Story = {
  args: { ...baseArgs, position: "center" },
  render: () => (
    <NotificationDemo
      variant="success"
      position="center"
      message="Changes saved"
      duration={8}
    />
  ),
};

export const PositionBottomLeft: Story = {
  args: { ...baseArgs, position: "bottom-left" },
  render: () => (
    <NotificationDemo
      variant="info"
      position="bottom-left"
      message="Message in bottom-left"
      duration={8}
    />
  ),
};

export const NoAutoClose: Story = {
  args: { ...baseArgs, duration: 0 },
  render: () => (
    <NotificationDemo
      variant="success"
      position="top-right"
      message="Stays until you close"
      duration={0}
      showClickToStop={false}
    />
  ),
};

/** Use the Controls panel to pick a custom accent/card color (icon + progress bar). */
export const CustomCardColor: Story = {
  args: { ...baseArgs, color: "#7c3aed" },
  render: (args) => (
    <NotificationDemo
      variant="success"
      position="top-right"
      message="Changes saved"
      description="Custom accent color from Controls."
      duration={8}
      color={args.color}
    />
  ),
};

/** One story for different durations: 2s, 5s, 8s, and no auto-close (0). */
export const DifferentDurations: Story = {
  args: baseArgs,
  render: () => (
    <NotificationProvider position="top-right" maxToasts={6}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        <button
          type="button"
          onClick={() => notification.success({ message: "Closes in 2 seconds", duration: 2 })}
          style={{ padding: "8px 16px", background: "#059669", color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}
        >
          Show 2s
        </button>
        <button
          type="button"
          onClick={() => notification.success({ message: "Closes in 5 seconds", duration: 5 })}
          style={{ padding: "8px 16px", background: "#2563eb", color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}
        >
          Show 5s
        </button>
        <button
          type="button"
          onClick={() => notification.success({ message: "Closes in 8 seconds", duration: 8 })}
          style={{ padding: "8px 16px", background: "#384E9F", color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}
        >
          Show 8s
        </button>
        <button
          type="button"
          onClick={() =>
            notification.success({
              message: "No auto-close",
              description: "Stays until you click close. duration: 0",
              duration: 0,
            })
          }
          style={{ padding: "8px 16px", background: "#6b7280", color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}
        >
          Show (no auto-close)
        </button>
      </div>
    </NotificationProvider>
  ),
};

/** useEffect + dummy API: notification is shown after async call (like real API flow). */
export const UseEffectWithDummyApi: Story = {
  args: baseArgs,
  render: () => (
    <NotificationProvider position="top-right" maxToasts={5}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-start" }}>
        <div>
          <p style={{ margin: "0 0 8px", fontSize: 12, color: "#666" }}>useEffect runs → dummyApi() → notification</p>
          <ComponentWithEffectAndApi apiSucceeds={true} />
        </div>
        <div>
          <p style={{ margin: "0 0 8px", fontSize: 12, color: "#666" }}>Same flow, API fails → error toast</p>
          <ComponentWithEffectAndApi apiSucceeds={false} />
        </div>
      </div>
    </NotificationProvider>
  ),
};

/** Wrap app with NotificationProvider in main entry; then use notification from anywhere (components, API, plain JS). */
export const WithProviderAndAPI: Story = {
  args: baseArgs,
  render: () => (
    <NotificationProvider position="top-right" maxToasts={5}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <button
          type="button"
          onClick={() => notification.success("Changes saved")}
          style={{ padding: "8px 16px", background: "#059669", color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}
        >
          Success
        </button>
        <button
          type="button"
          onClick={() => notification.error("Something went wrong")}
          style={{ padding: "8px 16px", background: "#dc2626", color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}
        >
          Error
        </button>
        <button
          type="button"
          onClick={() => notification.info("New update available")}
          style={{ padding: "8px 16px", background: "#2563eb", color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}
        >
          Info
        </button>
        <button
          type="button"
          onClick={() => notification.warning("Unsaved changes")}
          style={{ padding: "8px 16px", background: "#d97706", color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}
        >
          Warning
        </button>
        <button
          type="button"
          onClick={() => {
            notification.success({
              message: "API response",
              description: "Simulated API flow toast",
              duration: 5,
              actionButton: { label: "Undo", onClick: () => notification.info("Undo clicked") },
            });
          }}
          style={{ padding: "8px 16px", background: "#384E9F", color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}
        >
          Simulate API flow
        </button>
      </div>
    </NotificationProvider>
  ),
};
