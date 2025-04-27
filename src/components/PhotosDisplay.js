"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import useMedia from "@/hooks/useMedia";

const PhotosDisplay = () => {
  const {
    isPhotoModalOpen,
    closePhotoModal,
    deselectPhoto,
    photoList,
    clickedPhotoIndex,
  } = useMedia();

  const [loaded, setLoaded] = useState(false);
  const [Splide, setSplide] = useState(null);
  const [SplideSlide, setSplideSlide] = useState(null);
  const Modal = useRef(null);
  const ModalContent = useRef(null);

  //Dynamically import Carousel and Modal when isPhotoModalOpen is true
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
    start: clickedPhotoIndex,
    arrows: true,
    pagination: false,
    breakpoints: {
      1280: {
        drag: false,
        keyboard: "global",
      },
      0: {
        drag: true,
        keyboard: false,
      },
    },

    classes: {
      arrows: "splide__arrows arrows_modal",
      arrow: "splide__arrow modal_arrow",
    },
  };

  //Component will not render if isn't loaded
  if (!loaded) return null;

  //Ref for the dynamically imported components
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
          {photoList.map((photo) => (
            <SplideSlide key={photo.id}>
              <Image
                src={
                  photo.attributes.formats.xl
                    ? photo.attributes.formats.xl.url
                    : photo.attributes.url
                }
                alt={`Slide ${photo.id}`}
                width={500}
                height={500}
                className="w-[98vw] h-[98vw] xl:h-[95dvh]"
                sizes="(max-width: 1280px) 95vw, 95dvh"
                style={{ objectFit: "contain" }}
                placeholder="blur"
                blurDataURL={photo.blurDataURL}
              />
            </SplideSlide>
          ))}
        </Splide>
      </DynamicModalContent>
    </DynamicModal>
  );
};

export default PhotosDisplay;
