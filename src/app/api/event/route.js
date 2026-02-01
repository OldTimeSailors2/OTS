import { NextResponse } from "next/server";

const slugify = (s = "") =>
  String(s)
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

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

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug"); // /api/event?slug=...

    const jsonUrl = process.env.NEXT_PUBLIC_MARKERS_JSON_URL; 
    if (!jsonUrl) return NextResponse.json({ event: null }, { status: 200 });

    const res = await fetch(jsonUrl, { cache: "no-store" });
    if (!res.ok) return NextResponse.json({ event: null }, { status: 200 });

    const markers = normalizeMarkers(await res.json());

    if (!slug) {
      return NextResponse.json({ events: markers }, { status: 200 });
    }

    const normalizedSlug = slugify(slug);
    const found = markers.find((m) => slugify(m.event) === normalizedSlug);

    return NextResponse.json({ event: found ?? null }, { status: 200 });
  } catch (error) {
    console.warn("Error fetching markers:", error?.message || error);
    return NextResponse.json({ event: null }, { status: 200 });
  }
}