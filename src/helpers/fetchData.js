export const fetchEvents = async () => {
  const res = await fetch("/api/event", { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  const data = await res.json();

  //  Si la API devuelve array directo
  if (Array.isArray(data)) return data;

  // Si la API devuelve { events: [...] }
  if (Array.isArray(data?.events)) return data.events;

  // Si la API devuelve { markers: [...] } 
  if (Array.isArray(data?.markers)) return data.markers;

  // fallback
  console.log("API /api/event payload:", data);
  return [];
};