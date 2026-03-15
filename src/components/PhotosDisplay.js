"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import useMedia from "@/hooks/useMedia";

const DEBUG = process.env.NEXT_PUBLIC_DEBUG_MEDIA === "1";

const getCloudinarySrc = (photo) => {
  if (!photo) return "";
  if (typeof photo === "string") return photo;
  return String(photo.url || photo.secure_url || "").trim();
};

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

  useEffect(() => {
    if (!DEBUG) return;
   
   
  }, [isPhotoModalOpen, clickedPhotoIndex, photoList]);

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

  if (!loaded || !Splide || !SplideSlide || !Modal.current || !ModalContent.current) {
    return null;
  }

  const DynamicModal = Modal.current;
  const DynamicModalContent = ModalContent.current;

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
          {(photoList || []).map((photo, idx) => {
            const src = getCloudinarySrc(photo);


            return (
              <SplideSlide key={photo?.id ?? photo?.public_id ?? src ?? idx}>
                {src ? (
                  <Image
                    src={src}
                    alt={photo?.public_id ? `Slide ${photo.public_id}` : `Slide ${idx}`}
                    width={1200}
                    height={1200}
                    className="w-[98vw] h-[98vw] xl:h-[95dvh]"
                    sizes="(max-width: 1280px) 95vw, 95dvh"
                    style={{ objectFit: "contain" }}
                    unoptimized
                    onError={() => console.error("[PhotosDisplay] Image failed:", src, photo)}
                  />
                ) : (
                  <div className="w-[98vw] h-[98vw] xl:h-[95dvh] bg-black" />
                )}
              </SplideSlide>
            );
          })}
        </Splide>
      </DynamicModalContent>
    </DynamicModal>
  );
};

export default PhotosDisplay;
