import { useState } from "react";
import { Accordion, Button } from "@vayuko/ui";
import type { AccordionItem } from "@vayuko/ui";
import { PageLayout } from "../components/PageLayout";
import { PropControl } from "../components/PropControl";
import { ColorPicker } from "../components/ColorPicker";

const FAQ_ITEMS: AccordionItem[] = [
  {
    id: "setup",
    label: "How do I set up my profile?",
    content: "Go to Settings > Profile and fill in your details. You can add a photo and bio.",
  },
  {
    id: "verification",
    label: "Where do I find my profile verification code?",
    content: "Check your email for the verification link. The code is also shown in Account > Security.",
  },
  {
    id: "upgrade",
    label: "How do I upgrade to premium?",
    content: (
      <div>
        <p className="mb-2">
          To upgrade your account, please select a plan in our <strong>Account Plans</strong> page for more information.
        </p>
        <p className="mb-4">
          If you need help, call <strong>1-888-341-9381</strong> to speak to a representative.
        </p>
        <Button>Learn More</Button>
      </div>
    ),
  },
  {
    id: "projects",
    label: "What can I do with my projects?",
    content: "You can create, edit, share, and archive projects. Export is available for premium users.",
  },
  {
    id: "voice",
    label: "Where can I go to edit voice settings?",
    content: "Voice settings are under Settings > Accessibility > Voice.",
  },
];

export default function AccordionPage() {
  const [expanded, setExpanded] = useState<string[]>(["upgrade"]);
  const [allowMultiple, setAllowMultiple] = useState(false);
  const [color, setColor] = useState("#3b82f6");

  const code = `const items = [/* AccordionItem[]: id, label, content (ReactNode) */];
const [expanded, setExpanded] = useState<string[]>(["upgrade"]);

<Accordion
  items={items}
  expanded={expanded}
  onChange={setExpanded}
  allowMultiple={${allowMultiple}}
  color="${color}"
  aria-label="FAQ"
/>`;

  return (
    <PageLayout
      title="Accordion"
      description="Expand and collapse sections. Use for FAQs, settings groups, or any collapsible content. Optional allowMultiple and custom color."
      code={code}
      preview={
        <div className="space-y-10 max-w-2xl">
          <section>
            <h3 className="text-sm font-semibold text-slate-600 mb-3">Accordion — FAQ</h3>
            <p className="text-sm text-slate-600 mb-4">
              Frequently Asked Questions. Refer to the questions and answers below.
            </p>
            <Accordion
              items={FAQ_ITEMS}
              expanded={expanded}
              onChange={setExpanded}
              allowMultiple={allowMultiple}
              color={color}
              aria-label="FAQ"
            />
          </section>
        </div>
      }
      props={
        <>
          <PropControl label="Allow multiple open">
            <select
              className="demo-select w-full"
              value={allowMultiple ? "true" : "false"}
              onChange={(e) => setAllowMultiple(e.target.value === "true")}
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </PropControl>
          <PropControl label="Accent color">
            <ColorPicker value={color} onChange={setColor} aria-label="Accordion color" />
          </PropControl>
        </>
      }
    />
  );
}
