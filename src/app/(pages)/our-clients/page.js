import ResponsiveImage from "@/components/ResponsiveImage";
import MainDiv from "@/components/MainDiv";
import { formatClientsImages } from "@/helpers/formatApiResponses";

export const metadata = {
  title: "Our Clients",
  description: "Some of our clients",
  openGraph: {
    title: "Our Clients",
    description: "Some of our clients",
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

const OurClients = async () => {
  const images = await fetchClientsImages();

  return (
    <MainDiv className="w-screen h-dvh bg-bluePatternMobile md1:bg-bluePatternTablet xl:bg-bluePattern bg-contain pt-[77px] xs:pt-[92px] sm:pt-[140px] fullHD:pt-[172px] 2k:pt-[204px] 4k:pt-[268px] pb-[17.5px] md1:pb-[44px] xl:pb-[40px] 2k:pb-[52px] 4k:pb-[64px]">
      <ResponsiveImage images={images} />
    </MainDiv>
  );
};

export default OurClients;
