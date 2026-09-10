import siteData from "@/lib/site-data.json";

/* ─── Types ─────────────────────────────────────────────── */
export interface MenuItem {
  image: string;
  name: string;
  description: string;
  price: string;
  allergens?: string[];
}

export interface SubSection {
  id: string;
  title: string;
  subtitle?: string;
  items: MenuItem[];
}

export interface TabData {
  id: string;
  label: string;
  subsections: SubSection[];
  footnote?: string;
}

// Alcohol isn't sold through online ordering: drop the dedicated drinks tabs
// entirely, plus the "To Drink" subsection tucked inside Happy Hour.
const ALCOHOL_TAB_IDS = new Set(["libations", "wines", "spirits"]);
const ALCOHOL_SUBSECTION_IDS = new Set(["to-drink"]);

// Site-wide "Order Online" entry points (header, footer, homepage CTAs) send
// customers to the real Toast ordering page for now. The in-house
// /order-online + /checkout pages stay in the codebase (built, not removed)
// but aren't linked from anywhere until a real payment backend exists —
// switch this back to "/order-online" to re-enable them.
export const ORDER_ONLINE_URL = "https://order.toasttab.com/online/sienaatl";

export const orderTabs: TabData[] = (siteData.menuTabs as TabData[])
  .filter((t) => !ALCOHOL_TAB_IDS.has(t.id))
  .map((t) => ({
    ...t,
    subsections: t.subsections.filter((s) => !ALCOHOL_SUBSECTION_IDS.has(s.id)),
  }));

const restaurant = (siteData as { restaurant?: { name?: string; address?: string } }).restaurant ?? {};
export const RESTAURANT_NAME = restaurant.name ?? "Siena Restaurant";
export const RESTAURANT_ADDRESS = restaurant.address ?? "";

export const keyFor = (tabIdx: number, subIdx: number, itemIdx: number) => `${tabIdx}-${subIdx}-${itemIdx}`;

// Flat lookup so the cart (which only stores quantities by key) can render
// each line item's name/image/price without re-walking the tab tree.
export const itemsByKey: Record<string, MenuItem> = {};
orderTabs.forEach((t, ti) => {
  t.subsections.forEach((s, si) => {
    s.items.forEach((it, ii) => {
      itemsByKey[keyFor(ti, si, ii)] = it;
    });
  });
});
