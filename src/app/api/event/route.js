import { NextResponse } from "next/server";

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
    // ✅ Usa la URL pública (NO Admin API)
    const jsonUrl = process.env.NEXT_PUBLIC_TICKETS_JSON_URL;

    if (!jsonUrl) {
      return NextResponse.json([], { status: 200 });
    }

    const res = await fetch(jsonUrl, { cache: "no-store" });
    if (!res.ok) {
      // No rompas el build; responde vacío
      return NextResponse.json([], { status: 200 });
    }

    const markers = await res.json();
    return NextResponse.json(normalizeMarkers(markers), { status: 200 });
  } catch (error) {
    // ✅ No loggees objetos gigantes que puedan incluir secrets
    console.warn("Error fetching markers (Cloudinary URL):", error?.message || error);
    return NextResponse.json([], { status: 200 });
  }
}
