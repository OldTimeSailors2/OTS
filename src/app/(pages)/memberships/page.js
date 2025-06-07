import ResponsiveImage from "@/components/ResponsiveImage";
import MainDiv from "@/components/MainDiv";
import { formatClientsImages } from "@/helpers/formatApiResponses";
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

const fetchClientsImages = async () => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API}/clients-image?populate=*`,
    );
    if (!res.ok) {
      throw new Error(
        `Failed to fetch clients images: ${res.status} ${res.statusText}`,
      );
    }
    const clientsImages = await res.json();
    const formattedClientsImages = formatClientsImages(clientsImages);

    return formattedClientsImages;
  } catch (error) {
    console.error("Error fetching clients images:", error);
    throw error;
  }
};

const MemberShip = async () => {
  const images = await fetchClientsImages();

  return (
    <MainDiv className="h-full bg-bluePatternMobile md1:bg-bluePatternTablet xl:bg-bluePattern bg-contain pt-[77px] xs:pt-[92px] sm:pt-[140px] fullHD:pt-[172px] 2k:pt-[204px] 4k:pt-[268px] pb-[17.5px] md1:pb-[44px] xl:pb-[40px] 2k:pb-[52px] 4k:pb-[64px]">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-1 items-end md:px-20 lg:px-40">

        <div class="order-1 sm:order-2 p-4">
          <div className="bg-[#e9dcc6] rounded-[3rem] justify-self-center">
            <div class="py-5">
              <p className="font-titles text-[3em] text-center text-[#4b6b7f] leading-none">quartermaster <br /> membership</p>
              <p className="font-titles text-[#db3a57] text-center"><span className="text-8xl">220£</span><span className="text-6xl">/year</span></p>
            </div>


            <ul className="list-disc list-outside font-txt mx-auto px-20 mb-5 px-8 font-semibold text-left text-[#1d344a]">
              <li>Free access to all our ticketed gigs.</li>
              <li>Free access to all our festival gigs (not including Glastonbury).</li>
              <li>Entry to our year private party aboard a UK ship.</li>
              <li>Entry to our Quartermaster member planning dinner aboard a ship in the UK.</li>
              <li>25% discount on our private show gigs (1 show per year per membership).</li>
              <li>15% discount on our public show fees (1 show per year per membership).</li>
              <li>50% discount on all our merch. Entry to members whatsapp group with the Captain. To make road plans, give feedback on how to improve our experience and all related to the OTS world.</li>
              <li>Metal member card plus leather log book.</li>
              <li>Email and whatsapp warnings for our gigs.</li>
            </ul>
            <div className="bg-[#b21f40] text-center h-[6em] rounded-b-[3rem] border-t-4 border-black border-dashed ">
              <Link
                className="font-titles text-white text-[3em] underline"
                href="https://oldtimesailors.co.uk/products/quarter-master-membership"
              >
                subscribe
              </Link>
            </div>
          </div>
        </div>

        <div class="order-2 sm:order-1 p-4">
          <div className="bg-[#db3a57] text-[#1d344a] rounded-[3rem] justify-self-center">
            <div className="py-5">
              <p className="font-titles text-[3em] text-center leading-none">sailor <br /> membership</p>
              <p className="font-titles text-beige text-center"><span className="text-7xl">160£</span><span className="text-5xl">/year</span></p>
            </div>

            <ul className="list-disc list-outside font-txt mx-auto px-20 mb-5 px-8 font-semibold text-left">
              <li>Entry to our year private party aboard a UK ship.</li>
              <li>50% discount on all our merch.</li>
              <li>Entry to members whatsapp group with the Captain. To make road plans, give feedback on how to improve our experience and all related to the OTS world.</li>
              <li>Free access to all our ticketed gigs.</li>
              <li>Metal member card plus leather log book.</li>
              <li>Email and whatsapp warnings for our gigs.</li>
            </ul>
            <div className="bg-[#e9dcc6] text-center h-[6em] rounded-b-[3rem] border-t-4 border-black border-dashed">
              <Link
                className="font-titles text-black text-[3em] w-100 underline"
                href="https://oldtimesailors.co.uk/products/sailor-membership"
              >
                <span>subscribe</span>
              </Link>
            </div>
          </div>
        </div>
      </div>


    </MainDiv>
  );
};

export default MemberShip;