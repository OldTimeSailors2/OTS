import Image from "next/image";
import { FaPlay } from "react-icons/fa6";

const Video = ({ video }) => {
  return (
    <div
      className="w-[72px] h-32 iphone-3:w-20 iphone-3:h-36 md:w-24 md:h-44 min-[900px]:w-32 min-[900px]:h-72 xl:w-[72px] xl:h-32 1xxl:w-[82px] 1xxl:h-36 4xl:w-[103px] 4xl:h-44  fullHD:w-28 fullHD:h-52 2k:w-36 2k:h-60 4k:w-52 4k:h-96 cursor-pointer relative"
      data-video-url={video.url}
    >
      <div className="items-overlay-video" />
      <Image
        src={video.thumbnail}
        alt="video thubmnail"
        fill
        sizes="(max-width: 640px) 64px, 
                        (max-width: 900px) 96px, 
                        (max-width: 1366px) 75px,
                        (max-width: 1920px) 96px,
                        (max-width: 2560px) 112px,
                        176px"
        style={{ objectFit: "cover" }}
        className="absolute inset-0"
        placeholder="blur"
        blurDataURL={video.blurDataURL}
      />

      <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center z-9">
        <FaPlay className="text-white opacity-80 text-[26px] sm:text-[32px] min-[900px]:text-[40px] xl:text-[28px] 2xl:text-[36px] 2k:text-[44px] 4k:text-[56px]" />
      </div>
    </div>
  );
};

export default Video;
