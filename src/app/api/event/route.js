import { NextResponse } from 'next/server';

const formatMarkers = (markersApiResponse) => {
  return markersApiResponse.data.map((marker) => ({
    id: marker.id,
    markerPosition: marker.attributes.markerPosition,
    event: marker.attributes.event,
    location: marker.attributes.location,
    date: marker.attributes.date,
    ticketsURL: marker.attributes.ticketsURL,
    venueInfo: marker.attributes.venueInfo,
    gigStartTime: marker.attributes.gigStartTime,
    gigFinishTime: marker.attributes.gigFinishTime,
    typeOfShow: marker.attributes.typeOfShow,
  }));
};

export async function GET() {
  try {
    const res = await fetch(`${process.env.BACKEND_API}/markers?populate=*`);
    if (!res.ok) {
      throw new Error(`Failed to fetch markers: ${res.status} ${res.statusText}`);
    }
    const markers = await res.json();
    const formattedMarkers = formatMarkers(markers);

    return NextResponse.json(formattedMarkers);
  } catch (error) {
    console.error("Error fetching markers:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
