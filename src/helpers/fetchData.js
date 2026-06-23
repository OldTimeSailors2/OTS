import cache, { CACHE_CONFIG } from "@/lib/cache";

export const fetchEvents = async () => {
  if (cache.has("events_data")) {
    return cache.get("events_data");
  }

  const res = await fetch("/api/event", { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  const data = await res.json();

  //  Si la API devuelve array directo
  let result = [];
  if (Array.isArray(data)) result = data;
  // Si la API devuelve { events: [...] }
  else if (Array.isArray(data?.events)) result = data.events;
  // Si la API devuelve { markers: [...] }
  else if (Array.isArray(data?.markers)) result = data.markers;

  // Store in cache for 1 hour
  cache.set("events_data", result, CACHE_CONFIG.EVENTS_MARKERS);

  return result;
};