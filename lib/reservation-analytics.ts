/** Queue a confirmation event only after the booking API accepts a reservation. */
export function trackConfirmedReservation() {
  if (typeof window === "undefined") return;
  try {
    const analyticsWindow = window as Window & { dataLayer?: Record<string, unknown>[] };
    analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
    analyticsWindow.dataLayer.push({
      event: "reservation_confirmed",
      booking_method: "siena_website",
    });
  } catch {
    // Analytics must never turn a confirmed booking into an apparent failure.
  }
}
