/**
 * Single source of truth for all component demos: groups, descriptions, and search metadata.
 * Used for sidebar navigation and navbar search (group-wise and word-wise).
 */

export const DEMOS_BASE = "/demos";

export type ComponentItemData = {
  path: string;
  label: string;
  slug: string;
  subtitle: string;
  description: string;
  keywords: string[];
};

export type ComponentGroupData = {
  id: string;
  label: string;
  description: string;
  items: ComponentItemData[];
};

export const COMPONENT_GROUPS_DATA: ComponentGroupData[] = [
  {
    id: "getting-started",
    label: "Getting started",
    description: "Installation, setup, and theme configuration for @vayuko/ui.",
    items: [
      {
        path: `${DEMOS_BASE}/getting-started`,
        label: "Getting started",
        slug: "getting-started",
        subtitle: "Install & setup",
        description: "Install the library, add CSS and providers, and use components in your React app.",
        keywords: ["install", "setup", "guide", "docs", "npm", "react"],
      },
      {
        path: `${DEMOS_BASE}/theme-provider`,
        label: "ThemeProvider",
        slug: "theme-provider",
        subtitle: "Light / dark mode",
        description: "Wraps the app to provide light/dark mode and optional custom CSS variables.",
        keywords: ["theme", "dark", "light", "mode", "color", "css variables"],
      },
    ],
  },
  {
    id: "forms",
    label: "Forms & inputs",
    description: "Buttons, sliders, selects, date pickers, and other form controls.",
    items: [
      {
        path: `${DEMOS_BASE}/button`,
        label: "Button",
        slug: "button",
        subtitle: "Primary & secondary",
        description: "Primary and secondary button with optional disabled state.",
        keywords: ["click", "action", "submit", "cta"],
      },
      {
        path: `${DEMOS_BASE}/slider`,
        label: "Slider",
        slug: "slider",
        subtitle: "Single value",
        description: "Single-value slider with optional marks, sizes, and value label.",
        keywords: ["range", "volume", "value", "input", "number"],
      },
      {
        path: `${DEMOS_BASE}/range-slider`,
        label: "RangeSlider",
        slug: "range-slider",
        subtitle: "From – to range",
        description: "Dual-thumb range slider for selecting a range (from – to).",
        keywords: ["range", "min", "max", "from", "to", "dual"],
      },
      {
        path: `${DEMOS_BASE}/dropdown`,
        label: "Dropdown",
        slug: "dropdown",
        subtitle: "Searchable select",
        description: "Select with optional search. Configure options and placeholder.",
        keywords: ["select", "picker", "options", "search", "combobox"],
      },
      {
        path: `${DEMOS_BASE}/date-picker`,
        label: "DatePicker",
        slug: "date-picker",
        subtitle: "Single date",
        description: "Single date picker with optional time and min/max.",
        keywords: ["date", "calendar", "time", "pick", "single"],
      },
      {
        path: `${DEMOS_BASE}/date-range-picker`,
        label: "DateRangePicker",
        slug: "date-range-picker",
        subtitle: "Date range",
        description: "From–to date range with optional time and quick ranges.",
        keywords: ["date", "range", "from", "to", "calendar", "period"],
      },
      {
        path: `${DEMOS_BASE}/radio-group`,
        label: "RadioGroup",
        slug: "radio-group",
        subtitle: "Pill & card variants",
        description: "Radio group with default, pill, and card variants.",
        keywords: ["radio", "choice", "option", "pill", "card", "select one"],
      },
    ],
  },
  {
    id: "feedback",
    label: "Feedback",
    description: "Toasts, progress indicators, and status feedback.",
    items: [
      {
        path: `${DEMOS_BASE}/notification`,
        label: "Notification",
        slug: "notification",
        subtitle: "Toasts",
        description: "Toast notifications: controlled component or imperative notification API.",
        keywords: ["toast", "alert", "message", "success", "error", "info", "warning"],
      },
      {
        path: `${DEMOS_BASE}/progress`,
        label: "Progress",
        slug: "progress",
        subtitle: "Stepper, linear & circular",
        description: "Stepper (step indicators), linear progress bar, and circular progress.",
        keywords: ["stepper", "steps", "linear", "circular", "loading", "percent", "indicator"],
      },
    ],
  },
  {
    id: "layout",
    label: "Layout",
    description: "Tabs, segments, and layout controls.",
    items: [
      {
        path: `${DEMOS_BASE}/tabs`,
        label: "Tabs",
        slug: "tabs",
        subtitle: "Tab & segment controls",
        description: "Tab and segment controls. Variants: filled, bordered, underline, light.",
        keywords: ["tab", "segment", "switch", "panel", "navigation"],
      },
    ],
  },
  {
    id: "overlay",
    label: "Overlay",
    description: "Modals, drawers, and overlay panels.",
    items: [
      {
        path: `${DEMOS_BASE}/modal`,
        label: "Modal",
        slug: "modal",
        subtitle: "Dialog overlay",
        description: "Overlay dialog with optional title, body content, and footer.",
        keywords: ["dialog", "popup", "overlay", "alert", "confirm"],
      },
      {
        path: `${DEMOS_BASE}/drawer`,
        label: "Drawer",
        slug: "drawer",
        subtitle: "Side panel",
        description: "Slide-in panel from left or right. Use for filters, settings, or secondary content.",
        keywords: ["panel", "side", "slide", "sheet", "filters", "settings"],
      },
    ],
  },
  {
    id: "data-display",
    label: "Data display",
    description: "Accordions and other data display components.",
    items: [
      {
        path: `${DEMOS_BASE}/accordion`,
        label: "Accordion",
        slug: "accordion",
        subtitle: "Expand / collapse",
        description: "Expand and collapse sections. Use for FAQs, settings groups, or collapsible content.",
        keywords: ["collapse", "expand", "faq", "sections", "accordion"],
      },
    ],
  },
  {
    id: "media",
    label: "Media",
    description: "Voice recorder and other media components.",
    items: [
      {
        path: `${DEMOS_BASE}/voice-recorder`,
        label: "VoiceRecorder",
        slug: "voice-recorder",
        subtitle: "Mic recording",
        description: "Mic UI for voice recording with onStart/onStop callbacks.",
        keywords: ["voice", "mic", "microphone", "record", "audio"],
      },
    ],
  },
];

/** Build searchable text for one item (group label + item fields + keywords). */
export function getSearchText(group: ComponentGroupData, item: ComponentItemData): string {
  const parts = [
    group.label,
    group.description,
    item.label,
    item.slug,
    item.subtitle,
    item.description,
    ...item.keywords,
  ];
  return parts.join(" ").toLowerCase();
}

/** Filter groups and items by query (word-wise: every word must match somewhere). */
export function searchComponents(query: string): { group: ComponentGroupData; item: ComponentItemData }[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const words = q.split(/\s+/).filter(Boolean);
  const results: { group: ComponentGroupData; item: ComponentItemData }[] = [];

  for (const group of COMPONENT_GROUPS_DATA) {
    const groupSearchText = `${group.label} ${group.description}`.toLowerCase();

    for (const item of group.items) {
      const itemSearchText = getSearchText(group, item);
      const allText = `${groupSearchText} ${itemSearchText}`;

      const allWordsMatch = words.every((word) => allText.includes(word));
      if (allWordsMatch) {
        results.push({ group, item });
      }
    }
  }

  return results;
}
