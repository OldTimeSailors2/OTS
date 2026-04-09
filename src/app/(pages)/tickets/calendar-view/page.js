// app/(pages)/tickets/calendar-view/page.js
import CalendarViewComponent from "@/components/CalendarViewComponent";
import cache, { CACHE_CONFIG } from "@/lib/cache";

export const metadata = {
  title: "Tickets",
  description: "Find out where are we playing next",
  openGraph: {
    title: "Tickets",
    description: "Find out where are we playing next",
    images: [
      {
        url: "/assets/opengraph-image.png",
        alt: "Old Time Sailors",
      },
    ],
  },
};

// ✅ Normaliza el JSON "simple" (array) que guardas en Cloudinary
// para que CalendarViewComponent reciba siempre el mismo shape.
const normalizeMarkers = (markers) => {
  if (!Array.isArray(markers)) return [];
  return markers.map((m, idx) => ({
    id: m.id ?? String(idx),
    markerPosition: m.markerPosition ?? null,
    event: m.event ?? "",
    location: m.location ?? "",
    date: m.date ?? "",
    ticketsURL: m.ticketsURL ?? "",
    venueInfo: m.venueInfo ?? "",
    gigStartTime: m.gigStartTime ?? "",
    gigFinishTime: m.gigFinishTime ?? "",
    typeOfShow: m.typeOfShow ?? "",
    ...m,
  }));
};

// ✅ IMPORTANTE: en build/prerender NO debemos hacer throw.
// Si Cloudinary falla o la env var no existe -> devolvemos []
const fetchMarkers = async () => {
  // Check if data is already cached
  if (cache.has("calendar_markers")) {
    console.log("🎯 Cache HIT: calendar_markers");
    return cache.get("calendar_markers");
  }

  console.log("🚀 Cache MISS: calendar_markers - fetching fresh data...");

  try {
    const jsonUrl = process.env.NEXT_PUBLIC_MARKERS_JSON_URL; // URL completa (Cloudinary raw)
    if (!jsonUrl) return [];

    const res = await fetch(jsonUrl, { cache: "no-store" });
    if (!res.ok) {
      console.warn("Markers JSON not available:", res.status, res.statusText);
      return [];
    }

    const markers = await res.json();
    const result = normalizeMarkers(markers);

    // Store in cache for 1 hour
    cache.set("calendar_markers", result, CACHE_CONFIG.EVENTS_MARKERS);

    return result;
  } catch (error) {
    console.warn("Error fetching markers (Cloudinary URL):", error);
    return [];
  }
};

const CalendarView = async () => {
  const markersList = await fetchMarkers();
  return <CalendarViewComponent markersList={markersList} />;
};

export default CalendarView;
