import ReservationsPageClient from "@/components/ReservationsPageClient";
import { todayISO } from "@/lib/hours";

type SearchParams = Promise<{ date?: string; time?: string; partySize?: string }>;

export default async function Reservations({ searchParams }: { searchParams: SearchParams }) {
  // Prefill from the homepage's inline booking widget (?date=&time=&partySize=),
  // e.g. /reservations?date=2026-08-22&time=7:00%20PM&partySize=2. Anything
  // missing or invalid just falls back to an empty/default field like normal.
  // Read via the Page's `searchParams` prop (Server Component) rather than
  // the `useSearchParams` client hook, so no Suspense boundary is needed and
  // the rest of the page renders as real server HTML instead of being
  // excluded behind a client-only fallback.
  const params = await searchParams;

  const today = todayISO();
  const rawDate = params.date ?? "";
  const prefillDate = /^\d{4}-\d{2}-\d{2}$/.test(rawDate) && rawDate >= today ? rawDate : "";
  const rawPartySize = params.partySize ?? "";
  const prefillPartySize = /^(1[0-4]|[1-9])$/.test(rawPartySize) ? rawPartySize : "2";
  // Only carry the time over if the date came through too — a time with no
  // date attached isn't meaningful to prefill.
  const prefillTime = prefillDate ? params.time ?? "" : "";

  return (
    <ReservationsPageClient
      prefillDate={prefillDate}
      prefillTime={prefillTime}
      prefillPartySize={prefillPartySize}
    />
  );
}
