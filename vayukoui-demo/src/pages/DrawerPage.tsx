import { useState } from "react";
import { Button, Drawer } from "@vayuko/ui";
import type { DrawerSide } from "@vayuko/ui";
import { PageLayout } from "../components/PageLayout";
import { PropControl } from "../components/PropControl";

export default function DrawerPage() {
  const [open, setOpen] = useState(false);
  const [side, setSide] = useState<DrawerSide>("right");
  const [width, setWidth] = useState("320px");
  const [closeOnBackdrop, setCloseOnBackdrop] = useState(true);

  const code = `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open drawer</Button>
<Drawer
  open={open}
  onClose={() => setOpen(false)}
  side="${side}"
  title="Side panel"
  width="${width}"
  closeOnBackdropClick={${closeOnBackdrop}}
>
  ...content...
</Drawer>`;

  return (
    <PageLayout
      title="Drawer / Side Panel"
      description="Slide-in panel from left or right. Use for filters, settings, or secondary content."
      code={code}
      preview={
        <div className="space-y-10 max-w-2xl">
          <section>
            <h3 className="text-sm font-semibold text-slate-600 mb-3">Drawer — {side}</h3>
            <Button onClick={() => setOpen(true)}>Open drawer</Button>
            <Drawer
              open={open}
              onClose={() => setOpen(false)}
              side={side}
              title="Side panel"
              width={width}
              closeOnBackdropClick={closeOnBackdrop}
              aria-label="Drawer"
            >
              <p className="text-sm text-gray-600 mb-4">
                Content goes here. You can add forms, lists, or any other UI.
              </p>
              <ul className="space-y-2 text-sm">
                <li>Item one</li>
                <li>Item two</li>
                <li>Item three</li>
              </ul>
            </Drawer>
          </section>
        </div>
      }
      props={
        <>
          <PropControl label="Side">
            <select
              className="demo-select w-full"
              value={side}
              onChange={(e) => setSide(e.target.value as DrawerSide)}
            >
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </PropControl>
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
          <PropControl label="Width">
            <input
              type="text"
              className="demo-input"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="e.g. 320px"
            />
          </PropControl>
        </>
      }
    />
  );
}
