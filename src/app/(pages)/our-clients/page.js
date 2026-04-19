import MainDiv from "@/components/MainDiv";
import ResponsiveImage from "@/components/ResponsiveImage";
import cache, { CACHE_CONFIG } from "@/lib/cache";

export const metadata = {
  title: "Our Clients",
  description: "Some of our clients",
  openGraph: {
    title: "Our Clients",
    description: "Some of our clients",
    images: [{ url: "/assets/opengraph-image.png", alt: "Old Time Sailors" }],
  },
};

const FOLDER = "Images/OurClients";

const fetchClientsImages = async () => {
  // Check if data is already cached
  if (cache.has("clients_images")) {
    console.log("🎯 Cache HIT: clients_images");
    return cache.get("clients_images");
  }

  console.log("🚀 Cache MISS: clients_images - fetching fresh data...");

  try {
    const cloudinary = require("cloudinary").v2;
    cloudinary.config(process.env.CLOUDINARY_URL);

    const res = await cloudinary.search
      .expression(`resource_type:image AND asset_folder="${FOLDER}"`)
      .max_results(200)
      .execute();

    const resources = res?.resources ?? [];

    const result = resources.map((r) => ({
      id: r.public_id,
      url: r.secure_url,
      alt: (r.display_name || r.public_id || "client").replace(/[-_]/g, " "),
    }));

    // Store in cache for 24 hours
    cache.set("clients_images", result, CACHE_CONFIG.CLIENTS_DATA);

    return result;
  } catch (e) {
    console.error("Cloudinary OurClients error:", e);
    return [];
  }
};

export default async function OurClients() {
  const images = await fetchClientsImages();

  return (
    <MainDiv className="w-screen min-h-dvh bg-bluePatternMobile md1:bg-bluePatternTablet xl:bg-bluePattern bg-contain pt-[77px] xs:pt-[92px] sm:pt-[140px] fullHD:pt-[172px] 2k:pt-[204px] 4k:pt-[268px] pb-[17.5px] md1:pb-[44px] xl:pb-[40px] 2k:pb-[52px] 4k:pb-[64px]">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-6">
          {images.map((img) => (
            <div key={img.id}>
              {/* Mobile: vertical and complete */}
              <div
                className="relative w-full rounded-lg overflow-hidden bg-white/10 sm:hidden"
                style={{ aspectRatio: "9 / 16" }}
              >
                <div
                  className="absolute top-1/2 left-1/2"
                  style={{
                    width: "177.78%",
                    height: "177.78%",
                    transform: "translate(-50%, -50%) rotate(90deg)",
                    transformOrigin: "center center",
                  }}
                >
                  <ResponsiveImage
                    images={{
                      desktop: { url: img.url },
                      mobile: { url: img.url },
                    }}
                  />
                </div>
              </div>

              {/* Desktop / Laptop: horizontal and complete */}
              <div
                className="relative hidden w-full rounded-lg overflow-hidden bg-white/10 sm:block"
                style={{ aspectRatio: "16 / 9" }}
              >
                <ResponsiveImage
                  images={{
                    desktop: { url: img.url },
                    mobile: { url: img.url },
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {!images.length ? (
          <p className="mt-8 text-center text-white/80">
            No images found in Cloudinary asset folder:
            <span className="font-semibold"> {FOLDER}</span>
          </p>
        ) : null}
      </div>
    </MainDiv>
  );
}