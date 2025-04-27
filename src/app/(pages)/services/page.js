import dynamic from "next/dynamic";
import Link from "next/link";
import ServicesDeco from "@/components/ServicesDeco";
import MainDiv from "@/components/MainDiv";
import { formatServices } from "@/helpers/formatApiResponses";

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

const ServicesDisplay = dynamic(() => import("@/components/ServicesDisplay"), {
  ssr: false,
  loading: () => (
    <div className="w-full px-0.5 min-[600px]:px-3 xl:px-4 flex max-xl:justify-center xl:flex-col xl:items-center">
      <div className="flex flex-col justify-between xl:w-full xl:flex-row xl:justify-evenly xl:px-3 2xl:px-4 fullHD:px-6 2k:px-9 4k:px-16">
        <div className="services-hexagon !bg-transparent !before:!bg-transparent"></div>
        <div className="services-hexagon !bg-transparent !before:!bg-transparent"></div>
        <div className="services-hexagon !bg-transparent !before:!bg-transparent"></div>
        <div className="services-hexagon !bg-transparent !before:!bg-transparent"></div>
        <div className="services-hexagon !bg-transparent !before:!bg-transparent"></div>
        <div className="services-hexagon !bg-transparent !before:!bg-transparent"></div>
      </div>

      <div className="services-octagon !bg-transparent !before:!bg-transparent"></div>
    </div>
  ),
});

const fetchServices = async () => {
  try {
    const res = await fetch(`${process.env.BACKEND_API}/services?populate=*`);
    if (!res.ok) {
      throw new Error(
        `Failed to fetch services: ${res.status} ${res.statusText}`,
      );
    }
    const services = await res.json();
    const formattedServices = await formatServices(services);

    return formattedServices;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

const Services = async () => {
  const services = await fetchServices();

  return (
    <MainDiv
      className="w-screen h-dvh max-xl:fixed bg-beigePatternMobile md1:bg-beigePatternTablet xl:bg-beigePattern bg-contain xl:bg-cover flex flex-col justify-center
     gap-4 min-[390px]:max-xs2:gap-2 md1:max-xl:gap-24 md:gap-8 1xl:max-1xxl:gap-2  1xl:items-center 1xl:justify-evenly
      pt-[77px] xs:pt-[92px] sm:pt-[140px] fullHD:pt-[172px] 2k:pt-[204px] 4k:pt-[268px]
       pb-[17.5px] md1:pb-[44px] xl:pb-[40px] 2k:pb-[52px] 4k:pb-[64px]"
    >
      <ServicesDisplay services={services} />

      <div className="w-full relative flex mt-4 md:max-md3:mt-0">
        <ServicesDeco />
        <div className="absolute inset-0 flex justify-center items-center">
          <Link
            href="mailto:captainnicholasmoffat@oldtimesailors.com"
            target="_blank"
            className="xl:max-2xl:mr-2"
          >
            <h2
              className="services-octagon-link bg-bluePattern bg-contain underline underline-offset-2 text-beige  text-2xl leading-[39px]
             xs2:text-3xl xs2:leading-[43px] font-medium tracking-wide  pl-[3.8px]
              md1:text-[38px] md1:tracking-wide md1:max-xl:pt-1.5 md1:max-xl:pl-1.5 md:text-[44px] md:leading-[48px] lg:text-[55px] lg:leading-[66px]
               xl:text-3xl  xl:tracking-normal  1xl:text-[27px] 2xl:text-4xl fullHD:text-5xl  2k:text-6xl 4k:text-8xl font-titles flex justify-center  xl:items-start  xl:pt-1 2xl:pt-2 4xl:max-fullHD:pl-3 fullHD:pt-3 2k:pt-4 4k:pt-6"
            >
              hire our services!
            </h2>
          </Link>
        </div>
      </div>
    </MainDiv>
  );
};

export default Services;
