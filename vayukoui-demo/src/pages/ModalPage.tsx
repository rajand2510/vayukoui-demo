import { useState } from "react";
import { Button, Modal } from "@vayuko/ui";
import { PageLayout } from "../components/PageLayout";
import { PropControl } from "../components/PropControl";

export default function ModalPage() {
  const [open, setOpen] = useState(false);
  const [closeOnBackdrop, setCloseOnBackdrop] = useState(true);
  const [closeOnEscape, setCloseOnEscape] = useState(true);
  const [maxWidth, setMaxWidth] = useState("480px");

  const code = `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open modal</Button>
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="View Option"
  closeOnBackdropClick={${closeOnBackdrop}}
  closeOnEscape={${closeOnEscape}}
  maxWidth="${maxWidth}"
  footer={<>...</>}
>
  ...content...
</Modal>`;

  return (
    <PageLayout
      title="Modal / Dialog"
      description="Overlay dialog with optional title, body content, and footer. Supports backdrop click and Escape to close."
      code={code}
      preview={
        <div className="space-y-10 max-w-2xl">
          <section>
            <h3 className="text-sm font-semibold text-slate-600 mb-3">Modal</h3>
            <Button onClick={() => setOpen(true)}>Open modal</Button>
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              title="View Option"
              closeOnBackdropClick={closeOnBackdrop}
              closeOnEscape={closeOnEscape}
              maxWidth={maxWidth}
              footer={
                <div className="flex justify-end gap-2">
                  <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button onClick={() => setOpen(false)}>Save</Button>
                </div>
              }
            >
              <p className="mb-4 text-sm text-gray-600">
                Default View is selected. Use the options below to sort, duplicate, or delete this view.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="font-medium">Sort by:</span> Connection &gt;
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">Duplicate</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">Delete</span>
                </li>
              </ul>
            </Modal>
          </section>
        </div>
      }
      props={
        <>
          <PropControl label="Close on backdrop click">
            <select
              className="demo-select w-full"
              value={closeOnBackdrop ? "true" : "false"}
              onChange={(e) => setCloseOnBackdrop(e.target.value === "true")}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </PropControl>
          <PropControl label="Close on Escape">
            <select
              className="demo-select w-full"
              value={closeOnEscape ? "true" : "false"}
              onChange={(e) => setCloseOnEscape(e.target.value === "true")}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </PropControl>
          <PropControl label="Max width">
            <input
              type="text"
              className="demo-input"
              value={maxWidth}
              onChange={(e) => setMaxWidth(e.target.value)}
              placeholder="e.g. 480px"
            />
          </PropControl>
        </>
      }
    />
  );
}
