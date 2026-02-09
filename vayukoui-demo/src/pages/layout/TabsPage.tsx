import { useState } from "react";
import { Tabs } from "@vayuko/ui";
import type { TabItem, TabsVariant, TabsIconPosition } from "@vayuko/ui";
import { PageLayout } from "../../components/PageLayout";
import { PropControl } from "../../components/PropControl";

const iconPeople = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>
);
const iconPercent = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M19 5L5 19M6.5 9a2.5 2.5 0 110-5 2.5 2.5 0 010 5zM17.5 20a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
  </svg>
);
const iconBag = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <path d="M3 6h18M16 10a4 4 0 01-8 0" />
  </svg>
);
const iconPerson = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const TABS_WITH_ICONS: TabItem[] = [
  { id: "all", label: "All Teams", icon: iconPeople },
  { id: "sales", label: "Sales", icon: iconPercent },
  { id: "marketing", label: "Marketing", icon: iconBag },
  { id: "success", label: "Customer Success", icon: iconPerson },
];

const TABS_TEXT_ONLY: TabItem[] = [
  { id: "all", label: "All Teams" },
  { id: "sales", label: "Sales" },
  { id: "marketing", label: "Marketing" },
  { id: "success", label: "Customer Success" },
];

export default function TabsPage() {
  const [value, setValue] = useState("all");
  const [variant, setVariant] = useState<TabsVariant>("filled");
  const [iconPosition, setIconPosition] = useState<TabsIconPosition>("top");
  const [color, setColor] = useState("#ff3864");

  const tabs = iconPosition === "none" ? TABS_TEXT_ONLY : TABS_WITH_ICONS;

  const code = `const tabs = [/* TabItem[] with id, label, optional icon */];
const [value, setValue] = useState("all");

<Tabs
  tabs={tabs}
  value={value}
  onChange={setValue}
  variant="${variant}"
  iconPosition="${iconPosition}"
  color="${color}"
  aria-label="Teams"
/>`;

  return (
    <PageLayout
      title="Tabs"
      description="Tab and segment controls. Variants: filled (block/pill), bordered, underline, light. Icons can be none, left, or above text."
      code={code}
      preview={
        <div className="space-y-10 max-w-2xl">
          <section>
            <h3 className="text-sm font-semibold text-slate-600 mb-3">Tabs — {variant}, icon: {iconPosition}</h3>
            <Tabs
              tabs={tabs}
              value={value}
              onChange={setValue}
              variant={variant}
              iconPosition={iconPosition}
              color={color}
              aria-label="Teams"
            />
            <p className="mt-4 text-sm text-slate-500">Selected: {value}</p>
          </section>
        </div>
      }
      props={
        <>
          <PropControl label="Variant">
            <select
              className="demo-select w-full"
              value={variant}
              onChange={(e) => setVariant(e.target.value as TabsVariant)}
            >
              <option value="filled">Filled</option>
              <option value="bordered">Bordered</option>
              <option value="underline">Underline</option>
              <option value="light">Light</option>
            </select>
          </PropControl>
          <PropControl label="Icon position">
            <select
              className="demo-select w-full"
              value={iconPosition}
              onChange={(e) => setIconPosition(e.target.value as TabsIconPosition)}
            >
              <option value="none">None</option>
              <option value="left">Left</option>
              <option value="top">Top</option>
            </select>
          </PropControl>
          <PropControl label="Active color">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-10 w-full rounded border border-gray-300"
              aria-label="Tabs active color"
            />
          </PropControl>
        </>
      }
    />
  );
}
