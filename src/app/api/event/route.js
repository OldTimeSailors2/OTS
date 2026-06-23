import { NextResponse } from "next/server";
import { fetchMarkers } from "@/lib/fetchMarkers";

export async function GET() {
  try {
    const normalized = await fetchMarkers();
    return NextResponse.json(normalized, { status: 200 });
  } catch (error) {
    console.warn("Error fetching markers:", error?.message || error);
    return NextResponse.json([], { status: 200 });
  }
}
