import MediaWrapper from "@/wrappers/MediaWrapper";
import Image from "next/image";
import DynamicDecoMedia from "@/components/DynamicDecoMedia";
import MainDiv from "@/components/MainDiv";
import dynamic from "next/dynamic";
import { getCloudinary } from "@/lib/cloudinary";
import {
  formatPhotos,
  formatVideos,
  formatSongs,
} from "@/helpers/formatApiResponses";

export const metadata = {
  title: "Media",
  description: "Check some of our music, photos and videos",
  openGraph: {
    title: "Media",
    description: "Check some of our music, photos and videos",
    images: [
      {
        url: "/assets/opengraph-image.png",
        alt: "Old Time Sailors",
      },
    ],
  },
};

const PhotosDisplay = dynamic(() => import("@/components/PhotosDisplay"), {
  ssr: false,
});
const VideoPlayer = dynamic(() => import("@/components/VideoPlayer"), {
  ssr: false,
});
const MusicPlayer = dynamic(() => import("@/components/MusicPlayer"), {
  ssr: false,
});
const SplideCarousel = dynamic(() => import("@/components/SplideCarousel"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[12dvh] gap-2 flex ">
      <div className="bg-transparent flex-shrink-0 w-1/4 h-full rounded-lg"></div>
      <div className="bg-transparent flex-shrink-0 w-1/4 h-full rounded-lg"></div>
      <div className="bg-transparent flex-shrink-0 w-1/4 h-full rounded-lg"></div>
      <div className="bg-transparent flex-shrink-0 w-1/4 h-full rounded-lg"></div>
      <div className="bg-transparent flex-shrink-0 w-1/4 h-full rounded-lg"></div>
    </div>
  ),
});

export const fetchMediaData = async () => {
  try {
    const cloudinary = require("cloudinary").v2;

    cloudinary.config({
      secure: true,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const getFolder = async (assetFolder, resource_type) => {
      const res = await cloudinary.api.resources_by_asset_folder(assetFolder, {
        resource_type,
        max_results: 500,
      });
      return res?.resources ?? [];
    };

    const [photos, videos, songs] = await Promise.all([
      getFolder("Images", "image"),
      getFolder("Videos", "video"),
      getFolder("Sounds", "video"), // audio -> video
    ]);

    const formattedPhotos = photos.map((r) => ({
      id: r.asset_id,
      public_id: r.public_id,
      url: r.secure_url,
      width: r.width,
      height: r.height,
    }));

    const formattedVideos = videos.map((r) => ({
      id: r.asset_id,
      public_id: r.public_id,
      url: r.secure_url,
      duration: r.duration,
      thumbnail: cloudinary.url(r.public_id, {
        resource_type: "video",
        format: "jpg",
        transformation: [{ width: 600, crop: "scale" }],
        secure: true,
      }),
    }));

    const formattedSongs = songs.map((r) => ({
      id: r.asset_id,
      public_id: r.public_id,
      url: r.secure_url,
      duration: r.duration,
    }));

    console.log("Cloudinary photos:", formattedPhotos.length);
    console.log("Cloudinary videos:", formattedVideos.length);
    console.log("Cloudinary songs:", formattedSongs.length);

    return { formattedSongs, formattedVideos, formattedPhotos };
  } catch (error) {
    console.error("Error fetching media data (Cloudinary):", error);
    return { formattedSongs: [], formattedVideos: [], formattedPhotos: [] };
  }
};


const Media = async () => {
  const { formattedSongs, formattedVideos, formattedPhotos } =
    await fetchMediaData();

  return (
    <>
      <MainDiv
        className="bg-bluePatternMobile max-xl:fixed md1:bg-bluePatternTablet xl:bg-bluePattern  bg-contain  w-screen h-dvh flex flex-col pt-[77px] xs:pt-[92px] sm:pt-[140px] fullHD:pt-[172px] 2k:pt-[204px] 4k:pt-[268px]
        pb-[17.5px] md1:pb-[44px] xl:pb-[40px] 2k:pb-[52px] 4k:pb-[64px]  justify-around xl:justify-evenly 1xl:justify-center 1xl:gap-1 1xxl:gap-2 2xl:gap-4 2k:gap-0 2k:justify-around"
      >
        <MediaWrapper
          songs={formattedSongs}
          videos={formattedVideos}
          photos={formattedPhotos}
        >
          <section className="w-full flex flex-col 1xl:mt-3 1xxl:mt-5 2k:mt-0">
            <div className="flex items-center px-2 sm:px-6 mb-1 2k:mb-3">
              <Image
                src="/assets/media-deco-1.svg"
                width={35}
                height={35}
                alt="Decoration"
                className="md:w-[45px] 2xl:w-[65px] 2k:w-[80px] 4k:w-[110px]"
              />
              <h1 className="mx-2 xl:mr-0 xl:ml-2 font-titles text-lightRed text-2xl sm:text-4xl min-[900px]:text-5xl xl:text-2xl 1xxl:text-4xl fullHD:text-[42px] 2k:text-[54px] 4k:text-7xl">
                music
              </h1>
              <DynamicDecoMedia />
            </div>
            <SplideCarousel mediaType="song" />
            <MusicPlayer />
          </section>

          <section className="w-full flex flex-col">
            <div className="flex items-center px-2 sm:px-6 mb-2 2k:mb-5">
              <Image
                src="/assets/media-deco-1.svg"
                width={35}
                height={35}
                alt="Decoration"
                className="md:w-[45px] 2xl:w-[65px] 2k:w-[80px] 4k:w-[110px]"
              />
              <h1 className="mx-2 xl:mr-0 xl:ml-2 font-titles text-lightRed text-2xl sm:text-4xl min-[900px]:text-5xl xl:text-2xl 1xxl:text-4xl fullHD:text-[42px] 2k:text-[54px] 4k:text-7xl">
                videos
              </h1>
              <DynamicDecoMedia />
            </div>

            <SplideCarousel mediaType="video" />
            <VideoPlayer />
          </section>

          <section className="w-full flex flex-col">
            <div className="flex items-center px-2 sm:px-6 mb-2 2k:mb-5">
              <Image
                src="/assets/media-deco-1.svg"
                width={35}
                height={35}
                alt="Decoration"
                className="md:w-[45px] 2xl:w-[65px] 2k:w-[80px] 4k:w-[110px]"
              />
              <h1 className="mx-2 xl:mr-0 xl:ml-2 font-titles text-lightRed text-2xl sm:text-4xl min-[900px]:text-5xl xl:text-2xl 1xxl:text-4xl fullHD:text-[42px] 2k:text-[54px] 4k:text-7xl">
                photos
              </h1>
              <DynamicDecoMedia />
            </div>
            <SplideCarousel mediaType="photo" />
            <PhotosDisplay />
          </section>
        </MediaWrapper>
      </MainDiv>
    </>
  );
};

export default Media;
