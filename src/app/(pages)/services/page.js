import Link from "next/link";
import ServicesDeco from "@/components/ServicesDeco";
import ServicesDisplay from "@/components/ServicesDisplayLazy";
import MainDiv from "@/components/MainDiv";
import cache, { CACHE_CONFIG } from "@/lib/cache";

// ---------------------------------------------------------------------------
// Metadata — SEO & Open Graph
// ---------------------------------------------------------------------------

/** @type {import("next").Metadata} */
export const metadata = {
  title: "Services",
  description: "Here you'll find all the services we provide!",
  openGraph: {
    title: "Services",
    description: "Here you'll find all the services we provide!",
    images: [
      {
        url: "/assets/opengraph-image.png",
        alt: "Old Time Sailors",
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Data layer — SRP: each function has one job
// ---------------------------------------------------------------------------

/**
 * Normalizes a raw service entry from the JSON feed into a consistent shape.
 * Supports multiple field aliases so the page is resilient to minor schema
 * changes in the upstream JSON without requiring code changes here.
 *
 * @param {Record<string, unknown>} raw - Raw service object from the feed.
 * @param {number} idx - Array index, used as fallback id.
 * @returns {{ id: string, title: string, description: string, icon: string }}
 */
const normalizeService = (raw, idx) => ({
  id: raw.id ?? raw.slug ?? String(idx),
  title: raw.title ?? raw.name ?? "",
  description: raw.description ?? raw.text ?? "",
  icon: raw.icon ?? raw.image ?? raw.iconUrl ?? "",
  ...raw,
});

/**
 * Fetches the services JSON from the public URL defined by
 * `NEXT_PUBLIC_SERVICES_JSON_URL` and returns a normalized array.
 * Always resolves — returns `[]` on any network or parse error so the page
 * degrades gracefully instead of throwing.
 *
 * Caches results for 24 hours to reduce API calls.
 *
 * @param {string} [url] - Override the env URL (useful for testing).
 * @returns {Promise<Array<{ id: string, title: string, description: string, icon: string }>>}
 */
const fetchServices = async (url = process.env.NEXT_PUBLIC_SERVICES_JSON_URL) => {
  if (!url) return [];

  // Check if data is already cached
  if (cache.has("services_data")) {
    console.log("🎯 Cache HIT: services_data");
    return cache.get("services_data");
  }

  console.log("🚀 Cache MISS: services_data - fetching fresh data...");

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];

    const data = await res.json();
    const result = Array.isArray(data) ? data.map(normalizeService) : [];

    // Store in cache for 24 hours
    cache.set("services_data", result, CACHE_CONFIG.SERVICES);

    return result;
  } catch {
    return [];
  }
};

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

/**
 * Services page — async Server Component.
 *
 * Fetches service data on the server, then delegates rendering to
 * `ServicesDisplay` (client component) and `ServicesDeco` + hire link.
 *
 * Layout:
 * - Full-viewport background with responsive pattern image.
 * - ServicesDisplay occupies the upper area.
 * - A decorative octagon at the bottom links to the hire email.
 */
const Services = async () => {
  const services = process.env.NODE_ENV === "development" || true ?
    (await import("@/mocks/services")).MOCK_SERVICES :
    await fetchServices();

  return (
    <MainDiv className="w-screen h-dvh max-xl:fixed bg-beigePatternMobile md1:bg-beigePatternTablet xl:bg-beigePattern bg-contain xl:bg-cover flex flex-col justify-center gap-4 pt-[77px] pb-[17.5px]">
      <ServicesDisplay services={services} />

      <div className="w-full relative flex mt-4">
        <ServicesDeco />
        <div className="absolute inset-0 flex justify-center items-center">
          <Link
            href="mailto:captainnicholasmoffat@oldtimesailors.com"
            target="_blank"
          >
            <h2 className="services-octagon-link underline text-beige text-2xl font-titles">
              hire our services!
            </h2>
          </Link>
        </div>
      </div>
    </MainDiv>
  );
};

export default Services;
