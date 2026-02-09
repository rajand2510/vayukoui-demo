import { useState } from "react";
import { Button, Notification, notification } from "@vayuko/ui";
import type { NotificationVariant } from "@vayuko/ui";
import { PageLayout } from "../../components/PageLayout";
import { PropControl } from "../../components/PropControl";

export default function NotificationPage() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("Changes saved successfully.");
  const [description, setDescription] = useState("Your preferences have been updated.");
  const [variant, setVariant] = useState<NotificationVariant>("success");
  const [duration, setDuration] = useState(5);
  const [showClose, setShowClose] = useState(true);

  const code = `// Controlled
const [open, setOpen] = useState(false);
<Notification
  open={open}
  onClose={() => setOpen(false)}
  message=${JSON.stringify(message)}
  description=${JSON.stringify(description)}
  variant="${variant}"
  duration={${duration}}
  showClose={${showClose}}
/>

// Imperative (requires NotificationProvider)
import { notification } from "@vayuko/ui";
notification.success({ message: "Done!", description: "Optional" });
notification.error({ message: "Error" });
notification.info({ message: "Info" });
notification.warning({ message: "Warning" });`;

  return (
    <PageLayout
      title="Notification"
      description="Toast notifications: controlled component or imperative notification API."
      code={code}
      preview={
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setOpen(true)}>
              Open controlled notification
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                notification.success({ message: "Done!", description: "Action completed." })
              }
            >
              Toast: success
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                notification.error({
                  message: "Error",
                  description: "Something went wrong.",
                })
              }
            >
              Toast: error
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                notification.info({
                  message: "Info",
                  description: "Here is some information.",
                })
              }
            >
              Toast: info
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                notification.warning({
                  message: "Warning",
                  description: "Please check this.",
                })
              }
            >
              Toast: warning
            </Button>
          </div>
          <Notification
            open={open}
            onClose={() => setOpen(false)}
            message={message}
            description={description}
            variant={variant}
            duration={duration}
            showClose={showClose}
            inline
          />
        </div>
      }
      props={
        <>
          <PropControl label="Message (controlled)">
            <input
              type="text"
              className="demo-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </PropControl>
          <PropControl label="Description">
            <input
              type="text"
              className="demo-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </PropControl>
          <PropControl label="Variant">
            <select
              className="demo-select"
              value={variant}
              onChange={(e) => setVariant(e.target.value as NotificationVariant)}
            >
              <option value="info">info</option>
              <option value="success">success</option>
              <option value="error">error</option>
              <option value="warning">warning</option>
            </select>
          </PropControl>
          <PropControl label="Duration (seconds, 0 = no auto-close)">
            <input
              type="number"
              min={0}
              className="demo-input"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value) || 0)}
            />
          </PropControl>
          <PropControl label="Show close button">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                className="demo-checkbox"
                checked={showClose}
                onChange={(e) => setShowClose(e.target.checked)}
              />
              <span className="text-sm">Show close</span>
            </label>
          </PropControl>
        </>
      }
    />
  );
}
