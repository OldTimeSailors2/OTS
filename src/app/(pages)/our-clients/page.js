import Image from "next/image";
import MainDiv from "@/components/MainDiv";

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
  try {
    const cloudinary = require("cloudinary").v2;

    cloudinary.config({
      secure: true,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const res = await cloudinary.api.resources_by_asset_folder(FOLDER, {
      resource_type: "image",
      max_results: 200,
    });

    const resources = res?.resources ?? [];

    return resources
      .map((r) => ({
        url: r.secure_url,
        w: r.width,
        h: r.height,
        id: r.public_id,
        alt: (r.public_id.split("/").pop() || "client").replace(/[-_]/g, " "),
      }))
      .filter((x) => x.url)
      .sort((a, b) => a.id.localeCompare(b.id));
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
        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative w-full aspect-square rounded-lg overflow-hidden bg-white/10"
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                className="object-contain p-3"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1280px) 25vw, 20vw"
              />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {!images.length ? (
          <p className="mt-8 text-center text-white/80">
            No images found in Cloudinary folder: <span className="font-semibold">{FOLDER}</span>
          </p>
        ) : null}
      </div>
    </MainDiv>
  );
}
