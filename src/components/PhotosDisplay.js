"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import useMedia from "@/hooks/useMedia";

const PhotosDisplay = () => {
  const {
    isPhotoModalOpen,
    closePhotoModal,
    deselectPhoto,
    photoList = [],
    clickedPhotoIndex,
  } = useMedia();

  const [loaded, setLoaded] = useState(false);
  const [Splide, setSplide] = useState(null);
  const [SplideSlide, setSplideSlide] = useState(null);
  const Modal = useRef(null);
  const ModalContent = useRef(null);

  useEffect(() => {
    if (isPhotoModalOpen && !loaded) {
      Promise.all([
        import("@nextui-org/modal").then((mod) => {
          Modal.current = mod.Modal;
          ModalContent.current = mod.ModalContent;
        }),
        import("@splidejs/react-splide").then((module) => {
          const { Splide, SplideSlide } = module;
          import("@splidejs/splide/css/core");
          import("./carousel-styles.css");
          setSplide(() => Splide);
          setSplideSlide(() => SplideSlide);
        }),
      ]).then(() => setLoaded(true));
    }
  }, [isPhotoModalOpen, loaded]);

  const handleClose = () => {
    closePhotoModal();
    deselectPhoto();
  };

  const options = {
    type: "fade",
    mediaQuery: "min",
    perPage: 1,
    start: clickedPhotoIndex ?? 0,
    arrows: true,
    pagination: false,
    breakpoints: {
      1280: { drag: false, keyboard: "global" },
      0: { drag: true, keyboard: false },
    },
    classes: {
      arrows: "splide__arrows arrows_modal",
      arrow: "splide__arrow modal_arrow",
    },
  };

  if (
    !loaded ||
    !Splide ||
    !SplideSlide ||
    !Modal.current ||
    !ModalContent.current
  ) {
    return null;
  }

  const DynamicModal = Modal.current;
  const DynamicModalContent = ModalContent.current;

  // ✅ Cloudinary-only:
  // esperamos que cada item venga como:
  // { id, url, public_id?, width?, height?, blurDataURL? }
  const getCloudinarySrc = (photo) => {
    const src = String(photo?.url || photo?.secure_url || "").trim();
    // opcional: valida que sea url absoluta
    if (!src || (!src.startsWith("https://") && !src.startsWith("http://")))
      return "";
    return src;
  };

  return (
    <DynamicModal
      isOpen={isPhotoModalOpen}
      onClose={handleClose}
      placement="center"
      classNames={{
        base: "flex items-center justify-center w-full bg-black max-w-[98vw] xl:max-w-[95dvh]",
        wrapper: "z-[110] overflow-y-hidden",
        backdrop: "z-[109]",
        closeButton:
          "z-[108] text-musicColor hover:bg-[#BFA98C] active:bg-[#B69E7C]",
      }}
      backdrop="blur"
    >
      <DynamicModalContent>
        <Splide options={options}>
          {photoList.map((photo, idx) => {
            const src = getCloudinarySrc(photo);
            const blurDataURL = photo?.blurDataURL || null;

            const key = photo?.id ?? photo?.public_id ?? src ?? String(idx);

            return (
              <SplideSlide key={key}>
                {src ? (
                  <Image
                    src={src}
                    alt={`Slide ${photo?.public_id ?? photo?.id ?? ""}`}
                    width={500}
                    height={500}
                    className="w-[98vw] h-[98vw] xl:h-[95dvh]"
                    sizes="(max-width: 1280px) 95vw, 95dvh"
                    style={{ objectFit: "contain" }}
                    placeholder={blurDataURL ? "blur" : "empty"}
                    blurDataURL={blurDataURL || undefined}
                 
                  />
                ) : null}
              </SplideSlide>
            );
          })}
        </Splide>
      </DynamicModalContent>
    </DynamicModal>
  );
};

export default PhotosDisplay;
