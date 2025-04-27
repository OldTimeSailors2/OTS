import Image from "next/image";

const Photo = ({ photo, index }) => {
  return (
    <div
      className="w-[108px] h-[108px] min-[375px]:w-28 min-[375px]:h-28  xs:w-[115px] xs:h-[115px] iphone-1:w-[120px] iphone-1:h-[120px] xs2:w-[127px] xs2:h-[127px] iphone-3:w-[131px] iphone-3:h-[131px] md1:w-[148px] md1:h-[148px] md:w-[186px] md:h-[186px] md2:w-[220px] md2:h-[220px]
     lg:w-[276px] lg:h-[276px] xl:w-[145px] xl:h-[145px]
       1xxl:w-[170px] 1xxl:h-[170px] 2xl:w-[145px] 2xl:h-[145px] 4xl:w-[160px] 4xl:h-[160px] fullHD:w-[225px] fullHD:h-[225px] 2k:w-[308px] 2k:h-[308px]
       4k:w-[464px] 4k:h-[464px] relative cursor-pointer"
      data-photo-index={index}
    >
      <div className="items-overlay" />
      <Image
        src={photo.attributes.formats.small.url}
        alt="photo thubmnail"
        fill
        sizes="(max-width: 640px) 128px, 
                        (max-width: 1366px) 176px, 
                        (max-width: 2560px) 234px,
                        464px"
        style={{ objectFit: "cover", objectPosition: "center" }}
        className="rounded-sm"
        placeholder="blur"
        blurDataURL={photo.blurDataURL}
      />
    </div>
  );
};

export default Photo;
