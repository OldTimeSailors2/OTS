import { NextResponse } from "next/server";
import cache, { CACHE_CONFIG } from "@/lib/cache";

const normalizeMarkers = (markers) => {
  if (!Array.isArray(markers)) return [];

  return markers.map((m, idx) => {
    const id = m?.id ?? String(idx);

    const event = (m?.event ?? "").trim() || (m?.eventName ?? "").trim() || "";
    const location = (m?.location ?? "").trim() || (m?.venueName ?? "").trim() || "";

    const gigStartTime =
      (m?.gigStartTime ?? "").trim() || (m?.from ?? "").trim() || "";
    const gigFinishTime =
      (m?.gigFinishTime ?? "").trim() || (m?.to ?? "").trim() || "";

    const lat = m?.lat ?? m?.markerPosition?.lat ?? null;
    const lng = m?.lon ?? m?.lng ?? m?.markerPosition?.lng ?? null;

    const markerPosition =
      m?.markerPosition && typeof m.markerPosition === "object"
        ? m.markerPosition
        : lat != null && lng != null
        ? { lat: Number(lat), lng: Number(lng) }
        : null;

    return {
      id,
      markerPosition,

      event,
      location,
      date: m?.date ?? "",

      // tickets / venue info
      ticketsURL: m?.ticketsURL ?? m?.ticketsUrl ?? "",
      venueInfo: m?.venueInfo ?? "",

      gigStartTime,
      gigFinishTime,

      typeOfShow: m?.typeOfShow ?? "",
      venueName: m?.venueName ?? "",
      eventName: m?.eventName ?? "",
      from: m?.from ?? "",
      to: m?.to ?? "",
      lat: m?.lat ?? null,
      lon: m?.lon ?? null,

      ...m,
    };
  });
};

export async function GET() {
  try {
    // Check if data is already cached
    if (cache.has("event_markers")) {
      console.log("🎯 Cache HIT: event_markers");
      return NextResponse.json(cache.get("event_markers"), { status: 200 });
    }

    console.log("🚀 Cache MISS: event_markers - fetching fresh data...");

    const jsonUrl =
      process.env.NEXT_PUBLIC_MARKERS_JSON_URL ||
      process.env.NEXT_PUBLIC_TICKETS_JSON_URL ||
      process.env.NEXT_PUBLIC_TICKETS_JSON_URL;

    if (!jsonUrl) {
      return NextResponse.json([], { status: 200 });
    }

    const res = await fetch(jsonUrl, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json([], { status: 200 });
    }

    const markers = await res.json();
    const normalized = normalizeMarkers(markers);

    // Store in cache for 1 hour
    cache.set("event_markers", normalized, CACHE_CONFIG.EVENTS_MARKERS);

    return NextResponse.json(normalized, { status: 200 });
  } catch (error) {
    console.warn("Error fetching markers (Cloudinary URL):", error?.message || error);
    return NextResponse.json([], { status: 200 });
  }
}