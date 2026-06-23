import MapViewComponent from "@/components/MapViewComponent";
import { fetchMarkers } from "@/lib/fetchMarkers";

export const metadata = {
  title: "Tickets",
  description: "Find out where are we playing next",
  openGraph: {
    title: "Tickets",
    description: "Find out where are we playing next",
    images: [{ url: "/assets/opengraph-image.png", alt: "Old Time Sailors" }],
  },
};

const MapView = async () => {
  const all = await fetchMarkers();
  const markersList = all.filter((m) => m.markerPosition !== null);
  return <MapViewComponent markersList={markersList} />;
};

export default MapView;
