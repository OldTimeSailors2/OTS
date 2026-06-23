import cache, { CACHE_CONFIG } from "@/lib/cache";

// Single cache key shared by map-view, calendar-view, and /api/event.
// This ensures all three consumers always read the same data snapshot,
// preventing slug mismatches when the source JSON changes mid-cache-cycle.
const CACHE_KEY = "event_markers";

// Normalizes raw JSON entries from Cloudinary into a consistent shape.
// NOTE: ...m is spread FIRST so that the computed fields below override
// the raw values — not the other way around. This matters for fields like
// markerPosition, which the raw JSON stores as { lat: null, lng: null }
// (a truthy object) that would otherwise override our computed null.
const normalizeMarkers = (markers) => {
  if (!Array.isArray(markers)) return [];
  return markers.map((m, idx) => {
    // Support both lat/lon (flat) and markerPosition.lat/lng (nested)
    const lat = m?.lat ?? m?.markerPosition?.lat ?? null;
    const lng = m?.lon ?? m?.lng ?? m?.markerPosition?.lng ?? null;
    const markerPosition =
      lat != null && lng != null ? { lat: Number(lat), lng: Number(lng) } : null;

    return {
      ...m, // raw fields first — preserves extra fields like buyTickets
      id: m?.id ?? String(idx),
      markerPosition, // null when coords are missing; map-view filters these out
      // Fallback chains handle inconsistent field names across JSON versions
      event: (m?.event ?? "").trim() || (m?.eventName ?? "").trim() || "",
      location: (m?.location ?? "").trim() || (m?.venueName ?? "").trim() || "",
      gigStartTime: (m?.gigStartTime ?? "").trim() || (m?.from ?? "").trim() || "",
      gigFinishTime: (m?.gigFinishTime ?? "").trim() || (m?.to ?? "").trim() || "",
      // ticketsURL covers multiple naming conventions used across JSON files
      ticketsURL: m?.ticketsURL ?? m?.ticketsUrl ?? m?.buyTickets ?? "",
    };
  });
};

// Shared fetch utility used by map-view/page.js, calendar-view/page.js,
// and app/api/event/route.js. Fetches from Cloudinary once per TTL window
// and caches the result under a single key so all consumers stay in sync.
export const fetchMarkers = async () => {
  if (cache.has(CACHE_KEY)) {
    console.log("🎯 Cache HIT: event_markers");
    return cache.get(CACHE_KEY);
  }

  console.log("🚀 Cache MISS: event_markers - fetching fresh data...");

  const jsonUrl =
    process.env.NEXT_PUBLIC_MARKERS_JSON_URL ||
    process.env.NEXT_PUBLIC_TICKETS_JSON_URL;

  if (!jsonUrl) return [];

  try {
    const res = await fetch(jsonUrl, { cache: "no-store" });
    if (!res.ok) return [];
    const markers = await res.json();
    const result = normalizeMarkers(markers);
    cache.set(CACHE_KEY, result, CACHE_CONFIG.EVENTS_MARKERS); // TTL: 1 hour
    return result;
  } catch {
    return [];
  }
};
