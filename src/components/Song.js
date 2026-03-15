import Image from "next/image";
import { formatSongTitle } from "@/utils/formatSongTitle";

const Song = ({ song }) => {
  console.log("[Song.jsx] song:", song);
  const songTitle = formatSongTitle(song.title || song.public_id);

  return (
    <div
      className="
        w-[88px] sm:w-[104px] md:w-[118px] min-[900px]:w-[128px] xl:w-[110px]
        1xxl:w-[126px] 4xl:w-[150px] fullHD:w-[138px] 2k:w-[172px] 4k:w-[210px]
        flex flex-col items-center justify-start
        cursor-pointer select-none
      "
      data-song-id={song.id}
    >
      <h2
        className="
          w-full
          min-h-[42px] sm:min-h-[52px] md:min-h-[58px] xl:min-h-[52px]
          fullHD:min-h-[62px] 2k:min-h-[74px] 4k:min-h-[98px]
          mb-2 sm:mb-3
          px-1 sm:px-2
          text-center uppercase
          font-txt font-light
          text-[11px] sm:text-[13px] md:text-[15px] xl:text-[14px]
          fullHD:text-[16px] 2k:text-[20px] 4k:text-[28px]
          leading-[1.35]
          tracking-[0.01em]
          text-[#F4E8D6]
          relative z-20
          break-words
        "
        title={songTitle}
      >
        {songTitle}
      </h2>

      <div
        className="
          bg-beige rounded-lg 2k:rounded-xl 4k:rounded-2xl
          p-2 sm:p-2.5 xl:p-2 2k:p-3 4k:p-4
          flex items-center justify-center
          relative
          w-[42px] h-[42px]
          sm:w-[48px] sm:h-[48px]
          md:w-[54px] md:h-[54px]
          xl:w-[46px] xl:h-[46px]
          fullHD:w-[54px] fullHD:h-[54px]
          2k:w-[66px] 2k:h-[66px]
          4k:w-[84px] 4k:h-[84px]
          overflow-hidden
          shrink-0
        "
      >
        <div className="items-overlay rounded-lg absolute inset-0 z-0" />

        <Image
          src="/assets/song-icon.svg"
          width={60}
          height={60}
          alt={`Play ${songTitle}`}
          className="
            relative z-10
            h-[22px] w-[22px]
            sm:h-[26px] sm:w-[26px]
            md:h-[30px] md:w-[30px]
            xl:h-[24px] xl:w-[24px]
            fullHD:h-[28px] fullHD:w-[28px]
            2k:h-[36px] 2k:w-[36px]
            4k:h-[46px] 4k:w-[46px]
          "
        />
      </div>
    </div>
  );
};

export default Song;