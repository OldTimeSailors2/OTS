// app/(pages)/tickets/calendar-view/page.js
import CalendarViewComponent from "@/components/CalendarViewComponent";
import { fetchMarkers } from "@/lib/fetchMarkers";

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

const CalendarView = async () => {
  const markersList = await fetchMarkers();
  return <CalendarViewComponent markersList={markersList} />;
};

export default CalendarView;
