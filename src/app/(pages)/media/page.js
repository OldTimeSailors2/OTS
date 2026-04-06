import MediaWrapper from "@/wrappers/MediaWrapper";
import Image from "next/image";
import DynamicDecoMedia from "@/components/DynamicDecoMedia";
import MainDiv from "@/components/MainDiv";
import dynamic from "next/dynamic";

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


const fetchYouTubeJson = async () => {
  const jsonUrl = process.env.NEXT_PUBLIC_VIDEOS_JSON_URL;

  if (!jsonUrl) return [];

  // URL completa, o path relativo tipo "raw/upload/..../file.json"
  const absoluteUrl = jsonUrl.startsWith("http")
    ? jsonUrl
    : `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/${jsonUrl.replace(
      /^\//,
      ""
    )}`;

  try {
    const res = await fetch(absoluteUrl, { cache: "no-store" });
    if (!res.ok) {
      console.warn(
        `YouTube JSON fetch failed: ${res.status} ${res.statusText} -> ${absoluteUrl}`
      );
      return [];
    }

    const data = await res.json();
    if (!Array.isArray(data)) return [];

    return data
      .map((v) => ({
        id: v?.id || v?.youtubeId || v?.youtube_id || v?.youtubeUrl,
        title: v?.title || "video",
        url: v?.youtubeUrl || v?.url || "",
        youtubeUrl: v?.youtubeUrl || v?.url || "",
        source: "youtube",
        thumbnail:
          v?.thumbnail ||
          (v?.id
            ? `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`
            : null),
      }))
      .filter((v) => v.youtubeUrl);
  } catch (e) {
    console.error("Error reading YouTube JSON:", e);
    return [];
  }
};

export const fetchMediaData = async () => {
  try {
    const cloudinary = require("cloudinary").v2;

    cloudinary.config(process.env.CLOUDINARY_URL);

    const getFolder = async (assetFolder, resource_type) => {
      const res = await cloudinary.api.resources_by_asset_folder(assetFolder, {
        resource_type,
        max_results: 500,
      });
      return res?.resources ?? [];
    };

    const [photos, videos, songs, ytList] = await Promise.all([
      getFolder("Images", "image"),
      getFolder("Videos", "video"),
      getFolder("Sounds", "video"), // audio -> video
      fetchYouTubeJson(), // ✅ YT JSON desde Cloudinary
    ]);

    const formattedPhotos = photos.map((r) => ({
      id: r.asset_id,
      public_id: r.public_id,
      url: r.secure_url,
      width: r.width,
      height: r.height,
    }));

    const isRealVideo = (r) => {
      const pid = (r?.public_id || "").toLowerCase();
      const fmt = (r?.format || "").toLowerCase();

      // evita que tu JSON se meta como "video"
      if (pid.endsWith(".json")) return false;
      if (fmt === "json") return false;

      // opcional: lista blanca de formatos de video
      const ok = ["mp4", "mov", "webm", "m4v", "avi", "mkv"];
      if (fmt && !ok.includes(fmt)) return false;

      return true;
    };

    const realVideos = (videos || []).filter(isRealVideo);

    const formattedVideos = realVideos.map((r) => ({
      id: r.asset_id,
      public_id: r.public_id,
      url: r.secure_url,
      duration: r.duration,
      source: "cloudinary",
      thumbnail: cloudinary.url(r.public_id, {
        resource_type: "video",
        format: "jpg",
        transformation: [{ width: 600, crop: "scale" }],
        secure: true,
      }),
    }));


    const formattedSongs = songs.map((r) => ({
      id: r.asset_id,
      title: r.display_name || r.filename || r.original_filename || r.public_id,
      public_id: r.public_id,
      url: r.secure_url,
      duration: r.duration,
    }));

    // ✅ Unimos Cloudinary videos + YouTube videos
    //    (sin duplicar si por casualidad hubiera mismo url)
    const mergedVideos = [...formattedVideos, ...(ytList || [])].filter(
      (v, idx, arr) => {
        const key = v.youtubeUrl || v.url;
        return arr.findIndex((x) => (x.youtubeUrl || x.url) === key) === idx;
      }
    );
    return {
      formattedSongs,
      formattedVideos: mergedVideos, // ✅ importante: devolvemos los merged
      formattedPhotos,
    };
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
  className="bg-bluePatternMobile md1:bg-bluePatternTablet xl:bg-bluePattern bg-contain w-screen min-h-dvh flex flex-col  pb-0 justify-around xl:justify-evenly 1xl:justify-center 1xl:gap-1 1xxl:gap-2 2xl:gap-4 2k:gap-0 2k:justify-around"
>
        <MediaWrapper
          songs={formattedSongs}
          videos={formattedVideos}
          photos={formattedPhotos}
        >
          <section className="w-full flex flex-col 1xl:mt-3 1xxl:mt-5 2k:mt-0">
            <div className="flex items-center px-2 sm:px-6 mt-12 mb-1 2k:mt-6 2k:mb-3">
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
            <div className="flex items-center px-2 sm:px-6 mt-4 mb-2 2k:mt-6 2k:mb-5">
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
