import MainDiv from "@/components/MainDiv";
import ResponsiveImage from "@/components/ResponsiveImage";

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
    cloudinary.config(process.env.CLOUDINARY_URL);

    const res = await cloudinary.search
      .expression(`resource_type:image AND asset_folder="${FOLDER}"`)
      .max_results(200)
      .execute();

    const resources = res?.resources ?? [];

    return resources.map((r) => ({
      id: r.public_id,
      url: r.secure_url,
      alt: (r.display_name || r.public_id || "client").replace(/[-_]/g, " "),
    }));
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
            <div
              key={img.id}
              className="relative w-full rounded-lg overflow-hidden bg-white/10"
              style={{ aspectRatio: "16 / 9" }}
            >
              <ResponsiveImage
                images={{
                  desktop: { url: img.url },
                  mobile: { url: img.url },
                }}
              />
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