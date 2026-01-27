import MapViewComponent from "@/components/MapViewComponent";

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

// ✅ Si tu JSON ya viene en este formato, no hace falta transformar mucho.
// Mantengo normalización por seguridad.
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

const fetchMarkers = async () => {
  try {
    const jsonUrl = process.env.NEXT_PUBLIC_TICKETS_JSON_URL; // URL completa
    if (!jsonUrl) return [];

    const res = await fetch(jsonUrl, { cache: "no-store" });
    if (!res.ok) return [];

    const markers = await res.json();
    return normalizeMarkers(markers);
  } catch (error) {
    console.error("Error fetching markers (Cloudinary URL):", error);
    return [];
  }
};


const MapView = async () => {
  const markersList = await fetchMarkers();
  return <MapViewComponent markersList={markersList} />;
};

export default MapView;
