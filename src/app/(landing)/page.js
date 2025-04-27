import Image from "next/image";
import logo from "../../../public/assets/logo.svg";
import dynamic from "next/dynamic";
import LandingDynamicBg from "@/components/LandingDynamicBg";
import MainDiv from "@/components/MainDiv";
import { formatLandingImages } from "@/helpers/formatApiResponses";

const LandingDisplay = dynamic(() => import("@/components/LandingDisplay"), {
  ssr: false,
  loading: () => (
    <div className="md1:px-3 md:px-14 md2:px-14 lg:px-28 xl:p-0 1xl:mt-4 1xxl:mt-14 2xl:mt-20 3xl:mt-24 fullHD:mt-48 2k:mt-64 4k:mt-96">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-[5px] xl:gap-4">
        {/* Four placeholders for images */}
        <div className="bg-transparent aspect-w-1 aspect-h-1 w-full h-full"></div>
        <div className="bg-transparent aspect-w-1 aspect-h-1 w-full h-full"></div>
        <div className="bg-transparent aspect-w-1 aspect-h-1 w-full h-full"></div>
        <div className="bg-transparent aspect-w-1 aspect-h-1 w-full h-full"></div>
      </div>
    </div>
  ),
});
const LandingLeftSide = dynamic(() => import("@/components/LandingLeftSide"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-between">
      <div className="flex flex-col items-center justify-center ">
        {/* Placeholder for the description image */}
        <div className="mt-32 ml-0.5 bg-transparent rounded-md w-24 h-16 md1:w-36 md1:h-10 lg:w-36 lg:h-16"></div>

        {/* Placeholder for the blurb button*/}
        <div className="mt-4 bg-transparent rounded-md w-12 h-5 lg:w-14 lg:h-6"></div>

        {/* Placeholders for social media icons*/}
        <div className="grid grid-cols-2 gap-2 mt-10 xl:mt-8">
          <div className="bg-transparent rounded-full w-9 h-9 md1:w-16 md1:h-16 xl:w-11 xl:h-11"></div>
          <div className="bg-transparent rounded-full w-9 h-9 md1:w-16 md1:h-16 xl:w-11 xl:h-11"></div>
          <div className="bg-transparent rounded-full w-9 h-9 md1:w-16 md1:h-16 xl:w-11 xl:h-11"></div>
          <div className="bg-transparent rounded-full w-9 h-9 md1:w-16 md1:h-16 xl:w-11 xl:h-11"></div>
        </div>
      </div>

      <div
        className="flex flex-col gap-1 xs:gap-1 md1:gap-3 xl:gap-1.5 2k:gap-3
       mt-1 min-[375px]:max-xs:mt-2 md1:mt-8 min-[820px]:mt-10 lg:mt-11 xl:mt-1.5 1xxl:mt-3 fullHD:mt-5 4k:mt-7
        mr-4 min-[375px]:max-xs:mr-8 xs:mr-6 iphone-1:max-[393px]:mr-7 iphone-2:max-[415px]mr-9 iphone-3:mr-9 md1:mr-6 min-[820px]:mr-10 lg:mr-11 xl:mr-12 fullHD:mr-20 2k:mr-28 4k:mr-36"
      >
        {/* Skeleton for each Link*/}
        <div className="octagon bg-transparent xl:w-40 xl:h-8 1xxl:w-48 1xxl:h-10"></div>
        <div className="octagon bg-transparent xl:w-40 xl:h-8 1xxl:w-48 1xxl:h-10"></div>
        <div className="octagon bg-transparent xl:w-40 xl:h-8 1xxl:w-48 1xxl:h-10"></div>
        <div className="octagon bg-transparent xl:w-40 xl:h-8 1xxl:w-48 1xxl:h-10"></div>
        <div className="octagon bg-transparent xl:w-40 xl:h-8 1xxl:w-48 1xxl:h-10"></div>
        <div className="octagon bg-transparent xl:w-40 xl:h-8 1xxl:w-48 1xxl:h-10"></div>
      </div>
    </div>
  ),
});

const fetchLandingImages = async () => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API}/landing-image?populate=*`,
    );
    if (!res.ok) {
      throw new Error(
        `Failed to fetch landing images: ${res.status} ${res.statusText}`,
      );
    }
    const landingImages = await res.json();
    const formattedLandingImages = await formatLandingImages(landingImages);

    return formattedLandingImages;
  } catch (error) {
    console.error("Error fetching landing images:", error);
    throw error;
  }
};

const Home = async () => {
  const formattedLandingImages = await fetchLandingImages();

  return (
    <MainDiv className="w-full min-h-screen flex flex-col relative">
      <LandingDynamicBg />
      <div className="w-full h-full px-[17.5px] pt-[17.5px] xl:px-[28px] xl:pt-[28px] 2k:px-[52px] 2k:pt-[52px] 4k:px-[64px] 4k:pt-[64px] relative">
        <div className="w-full h-full flex flex-col gap-3 md1:justify-between xl:gap-0 relative">
          <div className="absolute image-border pointer-events-none" />
          <Image
            src={logo}
            width={135}
            height={135}
            priority={true}
            alt="OTS Logo"
            className="absolute -top-3.5 -left-3.5 xs2:-top-4 md1:-left-3.5  xl:-top-7 xl:-left-6   2k:-top-12 2k:-left-11 4k:-top-14 4k:-left-14 
                 xs:w-[145px] xs:h-[145px] xs2:w-[155px] xs2:h-[155px]
                  md1:w-[150px] md1:h-[150px] md:w-[170px] md:h-[170px]  min-[820px]:w-[200px]  min-[820px]:h-[200px] lg:w-[230px] lg:h-[230px]
                   xl:w-[190px] xl:h-[190px] 1xxl:w-[210px] 1xxl:h-[210px] 4xl:w-[230px] 4xl:h-[230px]  fullHD:w-[290px] fullHD:h-[290px] 2k:w-[420px] 2k:h-[420px] 4k:w-[580px] 4k:h-[580px]"
          />

          <LandingLeftSide />

          <LandingDisplay images={formattedLandingImages} />
        </div>
      </div>
      <footer className="w-full z-[105] flex justify-center items-center py-1 xl:p-1 2k:py-2">
        <p className="text-beige font-txt text-[9px] md1:text-lg md:text-xl xl:text-base 2k:text-3xl 4k:text-5xl uppercase">
          OLD TIME SAILORS LTD.®
        </p>
      </footer>
    </MainDiv>
  );
};

export default Home;
