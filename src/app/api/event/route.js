import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

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

export async function GET() {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    // 🔁 Cambia este public_id al que uses en Cloudinary
    const jsonPublicId = "tickets/markers.json";

    // 1) Obtener la URL del raw file desde Cloudinary
    const rawResource = await cloudinary.api.resource(jsonPublicId, {
      resource_type: "raw",
    });

    const jsonUrl = rawResource?.secure_url;
    if (!jsonUrl) {
      return NextResponse.json([], { status: 200 });
    }

    // 2) Descargar el JSON desde la URL segura
    const res = await fetch(jsonUrl, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json([], { status: 200 });
    }

    const markers = await res.json();
    const formattedMarkers = normalizeMarkers(markers);

    return NextResponse.json(formattedMarkers);
  } catch (error) {
    console.error("Error fetching markers (Cloudinary):", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 },
    );
  }
}
