import type { MetadataRoute } from "next";
import { blogs } from "@/lib/blog-data";

const SITE_URL = "https://sienaatl.com";

// Every indexable page. /event-inquiry/thank-you is deliberately absent, since it is
// marked noindex and a post-submission page has no business in search results.
const PAGES: { path: string; priority: number }[] = [
  { path: "", priority: 1.0 },
  { path: "/mediterranean-restaurant-alpharetta", priority: 0.95 },
  { path: "/menus", priority: 0.9 },
  { path: "/reservations", priority: 0.9 },

  // Landing pages built on the SEO branch. The date night and private dining pages
  // are not listed here because they already appear further down under the URLs they
  // were first published on; their content was rewritten rather than duplicated at a
  // second address.
  { path: "/italian-restaurant-alpharetta", priority: 0.9 },

  // Second batch, chosen from Search Console rather than guessed. "new restaurants"
  // and "downtown alpharetta" carry the most demand of anything the site does not
  // already cover, so they lead.
  { path: "/new-restaurants-alpharetta", priority: 0.9 },
  { path: "/downtown-alpharetta-restaurants", priority: 0.9 },
  { path: "/tapas-restaurant-alpharetta", priority: 0.8 },
  { path: "/fine-dining-restaurant-alpharetta", priority: 0.8 },
  { path: "/holiday-parties-alpharetta", priority: 0.9 },
  { path: "/cocktail-bar-alpharetta", priority: 0.8 },
  { path: "/restaurants-near-ameris-bank-amphitheatre", priority: 0.7 },
  { path: "/restaurants-near-avalon-alpharetta", priority: 0.7 },
  { path: "/dinner-alpharetta", priority: 0.7 },
  { path: "/vegetarian-restaurant-alpharetta", priority: 0.7 },
  { path: "/best-restaurants-alpharetta", priority: 0.8 },
  { path: "/private-dining-alpharetta", priority: 0.85 },
  { path: "/alpharetta-restaurant-week", priority: 0.85 },
  { path: "/date-night-alpharetta", priority: 0.8 },
  { path: "/birthday-dinner-alpharetta", priority: 0.8 },
  { path: "/brunch-alpharetta", priority: 0.8 },
  { path: "/happy-hour-alpharetta", priority: 0.8 },
  { path: "/mediterranean-restaurant-near-roswell-ga", priority: 0.8 },
  { path: "/events", priority: 0.8 },
  { path: "/event-inquiry", priority: 0.8 },
  { path: "/live-music-fridays", priority: 0.7 },
  { path: "/about-us", priority: 0.7 },
  { path: "/contact-us", priority: 0.7 },
  { path: "/gallery", priority: 0.6 },
  { path: "/blogs", priority: 0.6 },
  { path: "/order-online", priority: 0.6 },
  { path: "/gift-card", priority: 0.5 },
  { path: "/careers", priority: 0.4 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = PAGES.map(({ path, priority }) => ({ url: `${SITE_URL}${path}`, priority }));
  const posts = blogs.filter((blog) => blog.live !== false).map((blog) => ({
    url: `${SITE_URL}/blogs/${blog.slug}`,
    lastModified: new Date(blog.updatedAt || blog.publishedAt),
    priority: 0.5,
  }));
  return [...pages, ...posts];
}
