import { COMPONENT_GROUPS_DATA, DEMOS_BASE } from "./componentData";

export { DEMOS_BASE };

export const GETTING_STARTED = {
  path: COMPONENT_GROUPS_DATA[0].items[0].path,
  label: COMPONENT_GROUPS_DATA[0].items[0].label,
  slug: COMPONENT_GROUPS_DATA[0].items[0].slug,
  subtitle: COMPONENT_GROUPS_DATA[0].items[0].subtitle,
} as const;

export type ComponentItem = {
  path: string;
  label: string;
  slug: string;
  subtitle: string;
};

/** Groups with items for sidebar (path, label, slug, subtitle only). */
export const COMPONENT_GROUPS = COMPONENT_GROUPS_DATA.map((g) => ({
  id: g.id,
  label: g.label,
  items: g.items.map(({ path, label, slug, subtitle }) => ({ path, label, slug, subtitle })),
}));

/** Flat list: Overview + all items from all groups (for nav, routes). */
export const COMPONENTS: ComponentItem[] = [
  { path: DEMOS_BASE, label: "Overview", slug: "overview", subtitle: "All components" },
  ...COMPONENT_GROUPS.flatMap((g) => g.items),
];

export const COMPONENT_ITEMS = COMPONENTS.filter(
  (c) => c.path !== DEMOS_BASE && c.path !== GETTING_STARTED.path
);
