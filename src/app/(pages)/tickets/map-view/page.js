import MapViewComponent from "@/components/MapViewComponent";

export const metadata = {
  title: "Tickets",
  description: "Find out where are we playing next",
  openGraph: {
    title: "Tickets",
    description: "Find out where are we playing next",
    images: [{ url: "/assets/opengraph-image.png", alt: "Old Time Sailors" }],
  },
};

const normalizeMarkers = (markers) => {
  if (!Array.isArray(markers)) return [];

  return markers
    .map((m, idx) => ({
      id: m.id ?? String(idx),

      // ✅ lo importante: convertir lat/lon -> markerPosition(lat/lng)
      markerPosition:
        m.lat != null && m.lon != null
          ? { lat: Number(m.lat), lng: Number(m.lon) }
          : null,

      // ✅ compatibilidad con tu popup (Maps usa event/location/date)
      event: m.eventName ?? "",
      location: m.venueName ?? "",
      date: m.date ?? "",

      // opcional: para que no pierdas info
      gigStartTime: m.from ?? "",
      gigFinishTime: m.to ?? "",
      ...m,
    }))
    .filter((m) => m.markerPosition); // quita los que no tienen coords
};

const fetchMarkers = async () => {
  try {
    // ✅ usa TU env real
    const jsonUrl = process.env.NEXT_PUBLIC_MARKERS_JSON_URL;
    if (!jsonUrl) return [];

    const res = await fetch(jsonUrl, { cache: "no-store" });
    if (!res.ok) return [];

    const markers = await res.json();
    return normalizeMarkers(markers);
  } catch (error) {
    console.error("Error fetching markers:", error);
    return [];
  }
};

const MapView = async () => {
  const markersList = await fetchMarkers();

  return <MapViewComponent markersList={markersList} />;
  
};


export default MapView;