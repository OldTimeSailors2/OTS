import ResponsiveImage from "@/components/ResponsiveImage";
import MainDiv from "@/components/MainDiv";
import Link from "next/link";

export const metadata = {
  title: "MemberShips",
  description: "",
  openGraph: {
    title: "MemberShips",
    description: "",
    images: [
      {
        url: "/assets/opengraph-image.png",
        alt: "Old Time Sailors",
      },
    ],
  },
};

// ✅ Cloudinary-only (server)
const fetchClientsImages = async () => {
  try {
    const cloudinary = require("cloudinary").v2;

    // Si ya usas CLOUDINARY_URL, no hace falta config.
    // Si no, usa tus envs:
   cloudinary.config(process.env.CLOUDINARY_URL);

    // Cambia "Clients" por el folder real en tu Cloudinary
    const res = await cloudinary.api.resources_by_asset_folder("Clients", {
      resource_type: "image",
      max_results: 200,
    });

    const resources = res?.resources ?? [];

    // Formato simple y estable para usar en UI
    return resources.map((r) => ({
      id: r.asset_id,
      public_id: r.public_id,
      url: r.secure_url,
      width: r.width,
      height: r.height,
      created_at: r.created_at,
    }));
  } catch (error) {
    console.error("Error fetching clients images (Cloudinary):", error);
    return [];
  }
};

const MemberShip = async () => {
  const images = await fetchClientsImages();

  return (
    <MainDiv className="h-full bg-darkBlue md1:bg-darkBlue xl:bg-darkBlue bg-contain pt-[77px] xs:pt-[92px] sm:pt-[140px] fullHD:pt-[172px] 2k:pt-[204px] 4k:pt-[268px] pb-[17.5px] md1:pb-[44px] xl:pb-[40px] 2k:pb-[52px] 4k:pb-[64px]">
      <div className="min-h-screen py-10 px-4 text-white">
        <div className="max-w-6xl mx-auto">
          <div>
            <div className="overflow-hidden bg-[#f8f0e1] text-[#0d2b46] rounded-[2.5em] w-full md:w-3/4 lg:w-1/2 flex flex-col mx-auto">
              <div>
                <h2 className="text-4xl sm:text-5xl font-titles text-center text-[#4b6b7f] px-6 pt-5 leading-none">
                  <span className="block lowercase">quartermaster</span>
                  <span className="block lowercase">membership</span>
                </h2>
                <h1 className="text-center font-titles text-[#d9395d] mb-6">
                  <span className="text-6xl sm:text-7xl">220£</span>
                  <span className="text-4xl sm:text-5xl">/year</span>
                </h1>

                <ul className="space-y-2 list-disc list-inside px-8 font-txt text-xl text-left text-justify leading-none">
                  <li><strong>Free access to all our ticketed gigs.</strong></li>
                  <li><strong>Free access to all our festival gigs </strong>(not including Glastonbury).</li>
                  <li><strong>Entry to our year private party aboard a UK ship.</strong></li>
                  <li><strong>Entry to our Quartermaster member planning dinner aboard a ship in the UK.</strong></li>
                  <li><strong>25% discount on our private show gigs</strong> (1 show per year per membership).</li>
                  <li>Travel with the band on <strong>national and international gigs</strong>. This membership gives you access to be on the road with us</li>
                  <li>Access to private member <strong>music sessions</strong> with the Sailors.</li>
                  <li>Receive <strong>custom music videos</strong> by the sailors made for you.</li>
                  <li>Private one-on-one music and industry lessons with the sailor.</li>
                  <li><strong>15% discount on our public show fees</strong> (1 show per year).</li>
                  <li><strong>50% discount on all our merch.</strong></li>
                  <li><strong>Entry to members whatsapp group with the band. To make road plans, give feedback on how to improve our experience and all related to the OTS world.</strong></li>
                </ul>
              </div>

              <Link href="https://oldtimesailors.co.uk/products/quarter-master-membership">
                <button className="w-full mt-6 bg-[#b21f40] text-5xl text-white font-titles py-2 px-4 hover:bg-[#b82c4c] border-t-4 border-dashed border-[#1d344a] underline">
                  subscribe
                </button>
              </Link>
            </div>

            <div className="overflow-hidden bg-[#d9395d] text-white rounded-[2.5em] w-full md:w-3/4 lg:w-1/2 flex flex-col mt-5 mx-auto">
              <div>
                <h2 className="text-5xl text-[#1d344a] font-titles text-center px-6 pt-5 leading-none">
                  <span className="block lowercase">sailor</span>
                  <span className="block lowercase">membership</span>
                </h2>
                <h1 className="text-center font-titles text-[#ffffff] mb-6">
                  <span className="text-6xl sm:text-7xl">160£</span>
                  <span className="text-5xl sm:text-5xl">/year</span>
                </h1>

                <ul className="space-y-2 text-[#1d344a] font-bold list-disc list-inside px-8 font-txt text-xl leading-none">
                  <li>Entry to our year private party aboard a UK ship.</li>
                  <li>50% discount on all our merch.</li>
                  <li>Entry to members whatsapp group with the band. To make road plans, give feedback on how to improve our experience and all related to the OTS world.</li>
                  <li>Free access to all our ticketed gigs.</li>
                  <li>Travel with the band on <strong>national and international gigs</strong>.</li>
                  <li>Access to private member <strong>music sessions</strong> with the Sailors.</li>
                </ul>
              </div>

              <Link href="https://oldtimesailors.co.uk/products/sailor-membership">
                <button className="w-full mt-6 bg-[#e9dcc6] text-5xl text-[#1d344a] font-titles py-2 px-4 hover:bg-gray-100 border-t-4 border-dashed border-[#1d344a] underline">
                  subscribe
                </button>
              </Link>
            </div>

            {/* ✅ Sección opcional: galería desde Cloudinary (Clients folder) */}
            {images.length > 0 && (
              <div className="max-w-6xl mx-auto mt-10">
                <h3 className="text-center font-titles text-4xl mb-6 text-[#f8f0e1]">
                  Our clients
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images.map((img) => (
                    <div key={img.id} className="rounded-2xl overflow-hidden bg-white/10 p-2">
                      <ResponsiveImage
                        src={img.url}
                        alt={img.public_id ?? "client"}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainDiv>
  );
};

export default MemberShip;
