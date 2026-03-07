import Image from "next/image";

const Song = ({ song }) => {
  
  return (
    <div
      className="
        w-[72px] sm:w-20 md:w-24 min-[900px]:w-28 xl:w-[72px] 1xxl:w-[82px] 4xl:w-[103px] fullHD:w-28 2k:w-36 4k:w-44
        flex flex-col items-center justify-start gap-2
        cursor-pointer select-none
      "
      data-song-id={song.id}
    >
      {/* ✅ TÍTULO SIEMPRE VISIBLE */}
      <h2
        className="
          font-txt text-[11px] sm:text-sm min-[900px]:text-[15px] xl:text-[12px] fullHD:text-base 2k:text-lg 4k:text-2xl
          text-center font-light uppercase tracking-tighter leading-tight
          w-full
          relative z-20
          px-1
        "
        title={song.title}
      >
        {/* Sin line-clamp para que no dependa de plugin */}
        {song.public_id}
      </h2>

      {/* ✅ CUADRITO */}
      <div
        className="
          bg-beige rounded-lg 2k:rounded-xl 4k:rounded-2xl
          p-2 sm:p-2.5 xl:p-2 2k:p-3 4k:p-4
          flex items-center justify-center
          relative
          w-full
          aspect-square
          overflow-hidden
        "
      >
        {/* overlay detrás del icono/texto */}
        <div className="items-overlay rounded-lg absolute inset-0 z-0" />
        <Image
          src="/assets/song-icon.svg"
          width={60}
          height={60}
          alt="Song icon"
          className="
            relative z-10
            h-[30px] w-[30px]
            sm:h-[40px] sm:w-[40px]
            min-[900px]:h-[50px] min-[900px]:w-[50px]
            xl:h-[30px] xl:w-[30px]
            2k:h-[55px] 2k:w-[55px]
            4k:h-[75px] 4k:w-[75px]
          "
        />
      </div>
    </div>
  );
};

export default Song;
