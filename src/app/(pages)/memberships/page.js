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
      <div class=" min-h-screen py-10 px-4 text-white">
        <div class="max-w-6xl mx-auto">


          <div class="flex flex-col-reverse lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0 justify-center px-4 sm:px-12 md:px-24 lg:px-0">


            <div class="overflow-hidden bg-[#d9395d] self-end text-white rounded-[2.5em] shadow-lg w-full lg:w-1/2 flex flex-col lg:flex-col lg:justify-normal mt-2">
              <div>
                <h2 class="text-5xl text-[#1d344a] font-titles text-center px-6 pt-5 leading-none">
                  <span class="block lowercase">sailor</span>
                  <span class="block lowercase">membership</span>
                </h2>
                <h1 class="text-center font-titles text-[#ffffff] mb-6">
                  <span class="text-7xl">160£</span>
                  <span class="text-5xl">/year</span>
                </h1>
                
                <ul class="space-y-2 text-sm text-[#1d344a] font-bold list-disc list-inside px-8 font-txt text-xl">
                  <li>Entry to our year private party aboard a UK ship.</li>
                  <li>50% discount on all our merch.</li>
                  <li>Entry to members whatsapp group with the band. To make road plans, give feedback on how to improve our experience and all related to the OTS world.</li>
                  <li>Free access to all our ticketed gigs.</li>
                  <li>Travel with the band on <strong>national and international gigs</strong>.</li>
                  <li>Access to private member <strong>music sessions</strong> with the Sailors.</li>
                </ul>
              </div>
              <Link
              href="https://oldtimesailors.co.uk/products/sailor-membership"
              >
                <button class="w-full mt-6 bg-[#e9dcc6] text-5xl text-[#1d344a] font-titles py-2 px-4 hover:bg-gray-100 border-t-4 border-dashed border-[#1d344a] underline">
                  subscribe
                </button>              
              </Link>
            </div>

            <div class="overflow-hidden bg-[#f8f0e1] text-[#0d2b46] rounded-[2.5em] shadow-lg w-full lg:w-1/2 flex flex-col justify-between">
              <div>
                <h2 class="text-5xl font-titles text-center text-[#4b6b7f] px-6 pt-5 leading-none">
                  <span class="block lowercase">quartermaster</span>
                  <span class="block lowercase">membership</span>
                </h2>
                
                <h1 class="text-center font-titles text-[#d9395d] mb-6">
                  <span class="text-7xl">220£</span>
                  <span class="text-5xl">/year</span>
                </h1>
                <ul class="space-y-2 text-sm list-disc list-inside px-8 font-txt text-xl">
                  <li><strong>Free access to all our ticketed gigs.</strong></li>
                  <li><strong>Free access to all our festival gigs </strong>(not including Glastonbury).</li>
                  <li><strong>Entry to our year private party aboard a UK ship.</strong></li>
                  <li><strong>Entry to our Quartermaster member planning dinner aboard a ship in the UK.</strong></li>
                  <li><strong>25% discount on our private show gigs</strong>  (1 show per year per membership).</li>
                  <li>Travel with the band on <strong>national and international gigs</strong>. This membership gives you access to be on the road with us</li>
                  <li>Access to private member <strong>music sessions</strong> with the Sailors.</li>
                  <li>Receive <strong>custom music videos</strong> by the sailors made for you.</li>
                  <li>Private one-on-one music and industry lessons with the sailor.</li>
                  <li><strong>15% discount on our public show fees</strong> (1 show per year).</li>
                  <li><strong>50% discount on all our merch.</strong></li>
                  <li><strong>Entry to members whatsapp group with the band. To make road plans, give feedback on how to improve our experience and all related to the OTS world.</strong></li>

                </ul>
              </div>
              <Link
              href="https://oldtimesailors.co.uk/products/quarter-master-membership"
              >
                <button class="w-full mt-6 bg-[#b21f40] text-5xl text-white font-titles py-2 px-4 hover:bg-[#b82c4c] border-t-4 border-dashed border-[#1d344a] underline">
                  subscribe
                </button>
              </Link> 
            </div>
          </div>
        </div>
      </div>





    </MainDiv>
  );
};

export default MemberShip;