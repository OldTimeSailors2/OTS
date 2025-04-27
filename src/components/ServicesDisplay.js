"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Image from "next/image";

const ServicesDisplay = ({ services }) => {
  const [scaleFactor, setScaleFactor] = useState(1);
  const [isDevice, setIsDevice] = useState();
  const [activeService, setActiveService] = useState("our-show");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedPhotoIndex, setClickedPhotoIndex] = useState(null);
  // Dynamic import states
  const [Modal, setModal] = useState(null);
  const [ModalContent, setModalContent] = useState(null);
  const [Splide, setSplide] = useState(null);
  const [SplideSlide, setSplideSlide] = useState(null);
  const splideRef = useRef(null);
  const activeServiceData = useMemo(
    () => services.find((service) => service.id === activeService),
    [services, activeService],
  );

  useEffect(() => {
    const handleResize = () => {
      let baseWidth;

      if (window.innerWidth >= 1280) {
        setIsDevice("desktop");
        baseWidth = 1280;
      } else if (window.innerWidth >= 600) {
        setIsDevice("tablet");
        baseWidth = 600;
      } else {
        setIsDevice("mobile");
        baseWidth = 360;
      }
      const currentWidth = window.innerWidth;
      const scale = Math.max(currentWidth / baseWidth, 1); // Ensure scale is never less than 1
      setScaleFactor(scale);
    };
    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Call handleResize initially
    handleResize();

    // Cleanup listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //Dynamically import Splide based on device type
  useEffect(() => {
    async function loadSplide() {
      if (isDevice === "tablet" || (isDevice === "mobile" && !Splide)) {
        // Dynamically import Splide components
        const { Splide, SplideSlide } = await import("@splidejs/react-splide");

        // Dynamically import Splide and custom CSS
        await import("@splidejs/splide/css/core");
        await import("./carousel-styles.css");
        setSplide(() => Splide);
        setSplideSlide(() => SplideSlide);
      }
    }

    loadSplide();
  }, [isDevice]);

  useEffect(() => {
    // Check if the Splide instance is available and reset to the first slide
    if (splideRef.current) {
      splideRef.current.go(0); // Go to the first slide
    }
  }, [activeServiceData]); // Depend on activeServiceData to trigger the reset

  //Octagon and Hexagons styles

  const dynamicStyle = useMemo(
    () => ({
      "--hexagon-width": `${105 * scaleFactor}px`,
      "--hexagon-height": `${70.5 * scaleFactor}px`,
      "--hexagon-before-width": `${103 * scaleFactor}px`,
      "--hexagon-before-height": `${69 * scaleFactor}px`,
      "--hexagon-2-width": `${105 * scaleFactor}px`,
      "--hexagon-2-height": `${70.5 * scaleFactor}px`,
      "--hexagon-2-before-width": `${103 * scaleFactor}px`,
      "--hexagon-2-before-height": `${69 * scaleFactor}px`,
      "--hexagon-3-width": `${105 * scaleFactor}px`,
      "--hexagon-3-height": `${70.5 * scaleFactor}px`,
      "--hexagon-3-before-width": `${103 * scaleFactor}px`,
      "--hexagon-3-before-height": `${69 * scaleFactor}px`,
      "--octagon-width": `${250 * scaleFactor}px`,
      "--octagon-height": `${450 * scaleFactor}px`,
    }),
    [scaleFactor],
  );

  const dynamicStyleTablet = useMemo(
    () => ({
      "--hexagon-width": `${140 * scaleFactor}px`,
      "--hexagon-height": `${80 * scaleFactor}px`,
      "--hexagon-before-width": `${138.5 * scaleFactor}px`,
      "--hexagon-before-height": `${78 * scaleFactor}px`,
      "--hexagon-2-width": `${140 * scaleFactor}px`,
      "--hexagon-2-height": `${80 * scaleFactor}px`,
      "--hexagon-2-before-width": `${138.5 * scaleFactor}px`,
      "--hexagon-2-before-height": `${78 * scaleFactor}px`,
      "--hexagon-3-width": `${140 * scaleFactor}px`,
      "--hexagon-3-height": `${80 * scaleFactor}px`,
      "--hexagon-3-before-width": `${138.5 * scaleFactor}px`,
      "--hexagon-3-before-height": `${78 * scaleFactor}px`,
      "--octagon-width": `${435 * scaleFactor}px`,
      "--octagon-height": `${550 * scaleFactor}px`,
    }),
    [scaleFactor],
  );

  const dynamicStyleDesktop = useMemo(
    () => ({
      "--hexagon-width": `${126 * scaleFactor}px`,
      "--hexagon-height": `${69.3 * scaleFactor}px`,
      "--hexagon-before-width": `${124 * scaleFactor}px`,
      "--hexagon-before-height": `${68.3 * scaleFactor}px`,
      "--hexagon-2-width": `${235.2 * scaleFactor}px`,
      "--hexagon-2-height": `${69.3 * scaleFactor}px`,
      "--hexagon-2-before-width": `${233.2 * scaleFactor}px`,
      "--hexagon-2-before-height": `${68.3 * scaleFactor}px`,
      "--hexagon-3-width": `${168 * scaleFactor}px`,
      "--hexagon-3-height": `${69.3 * scaleFactor}px`,
      "--hexagon-3-before-width": `${166 * scaleFactor}px`,
      "--hexagon-3-before-height": `${68.3 * scaleFactor}px`,
      "--octagon-width": `${1240 * scaleFactor}px`,
      "--octagon-height": `${300 * scaleFactor}px`,
    }),
    [scaleFactor],
  );

  const currentStyle = useMemo(() => {
    switch (isDevice) {
      case "desktop":
        return dynamicStyleDesktop;
      case "tablet":
        return dynamicStyleTablet;
      default:
        return dynamicStyle;
    }
  }, [isDevice, dynamicStyle, dynamicStyleTablet, dynamicStyleDesktop]);

  /*Splide*/

  const options = useMemo(
    () => ({
      perPage: 2,
      gap: 2,
      arrows: false,
      drag: true,
      pagination: false,
      start: 0,
      classes: "splide-services",
      padding: { right: "5%" },
      mediaQuery: "min",
      breakpoints: {
        428: {
          padding: { right: "6%" },
        },
        414: {
          padding: { right: "8%" },
        },
        380: {
          padding: { right: "5%" },
        },
        375: {
          padding: { right: "8%" },
        },
      },
    }),
    [],
  );
  const options2 = useMemo(
    () => ({
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
    }),
    [clickedPhotoIndex],
  );

  /*IMAGES DISPLAY */

  {
    /*Images Functions*/
  }

  const selectImage = useCallback((index) => {
    setClickedPhotoIndex(index);
  }, []);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setClickedPhotoIndex(null);
  }, []);

  const handleClick = useCallback(
    async (index) => {
      if (!Modal || !ModalContent) {
        const modalModule = await import("@nextui-org/modal");

        if (!Splide) {
          const { Splide, SplideSlide } = await import(
            "@splidejs/react-splide"
          );
          // Dynamically import Splide and custom CSS
          await import("@splidejs/splide/css/core");
          await import("./carousel-styles.css");
          setSplide(() => Splide);
          setSplideSlide(() => SplideSlide);
        }

        setModal(() => modalModule.Modal);
        setModalContent(() => modalModule.ModalContent);
      }

      selectImage(index);
      openModal();
    },
    [Modal, ModalContent, selectImage, openModal, Splide, clickedPhotoIndex],
  );

  /*IMAGES DISPLAY END*/

  return (
    <div className="w-full px-0.5 min-[600px]:px-3 xl:px-4 flex xl:flex-col xl:items-center">
      {/*Buttons*/}
      <div
        className=" flex flex-col justify-between xl:w-full xl:flex-row xl:justify-evenly xl:px-3 2xl:px-4 fullHD:px-6 2k:px-9 4k:px-16"
        role="Button-group"
      >
        <button
          onClick={() => setActiveService("our-show")}
          style={currentStyle}
          className={`services-hexagon transition-all ease-in duration-300 xl:max-1xl:mr-3 1xxl:max-2xl:ml-0.5 4xl:max-fullHD:ml-0.5 fullHD:max-2k:ml-[1px] ${activeService === "our-show" ? "before:bg-redPattern text-beige xl:top-[1px]" : "before:bg-beigePattern text-darkBlue"} before:bg-contain xl:before:bg-cover z-[10] flex justify-center items-center text-lg leading-4 xs2:text-xl xs2:leading-5  md1:text-[22px] md:text-3xl lg:text-4xl xl:text-[27px] 1xxl:text-3xl 4xl:text-4xl 4xl:leading-9 fullHD:text-4xl 2k:text-5xl 4k:text-7xl font-titles text-center`}
        >
          <p className="z-[20]">our show</p>
        </button>
        <button
          onClick={() => setActiveService("festival-and-event-organization")}
          style={currentStyle}
          className={`services-hexagon-2 transition-all ease-in duration-300 ${activeService === "festival-and-event-organization" ? "before:bg-redPattern text-beige xl:top-[1px]" : "before:bg-beigePattern text-darkBlue"} before:bg-contain xl:before:bg-cover z-[10] flex justify-center items-center text-lg leading-4 xs:leading-5 xs2:text-xl xs2:leading-5  md1:text-[22px] md1:leading-5 md:text-3xl md:leading-[25px] md3:leading-7 lg:text-4xl xl:leading-7 xl:text-[27px] 1xxl:text-3xl 4xl:text-4xl 4xl:leading-9 fullHD:text-4xl 2k:text-5xl 4k:text-7xl  font-titles text-center`}
        >
          <p className="z-[20]">festival and event organization</p>
        </button>
        <button
          onClick={() => setActiveService("hms-warrior")}
          style={
            isDevice === "desktop"
              ? dynamicStyleDesktop
              : isDevice === "tablet"
                ? dynamicStyleTablet
                : dynamicStyle
          }
          className={`services-hexagon transition-all ease-in duration-300 ${activeService === "hms-warrior" ? "before:bg-redPattern text-beige xl:top-[1px]" : "before:bg-beigePattern text-darkBlue"} before:bg-contain xl:before:bg-cover z-[10] flex justify-center items-center text-lg leading-4 xs2:text-xl xs2:leading-5  md1:text-[22px] md:text-3xl lg:text-4xl xl:text-[27px] xl:leading-7  1xxl:text-3xl 4xl:text-4xl 4xl:leading-9 fullHD:text-4xl 2k:text-5xl 4k:text-7xl font-titles text-center`}
        >
          <p className="z-[20]">hms warrior</p>
        </button>
        <button
          onClick={() => setActiveService("music-agency")}
          style={currentStyle}
          className={`services-hexagon transition-all ease-in duration-300 ${activeService === "music-agency" ? "before:bg-redPattern text-beige xl:top-[1px]" : "before:bg-beigePattern text-darkBlue"} before:bg-contain xl:before:bg-cover z-[10] flex justify-center items-center text-lg leading-4 xs2:text-xl xs2:leading-5  md1:text-[22px] md:text-3xl lg:text-4xl xl:text-[27px] xl:leading-7  1xxl:text-3xl 4xl:text-4xl 4xl:leading-9 fullHD:text-4xl 2k:text-5xl 4k:text-7xl 1xl:leading-7 font-titles text-center`}
        >
          <p className="z-[20]">music agency</p>
        </button>
        <button
          onClick={() => setActiveService("festival-within-a-festival")}
          style={currentStyle}
          className={`services-hexagon-2 transition-all ease-in duration-300 ${activeService === "festival-within-a-festival" ? "before:bg-redPattern text-beige xl:top-[1px]" : "before:bg-beigePattern text-darkBlue"} before:bg-contain xl:before:bg-cover z-[10] flex justify-center items-center text-lg leading-4 xs:leading-5 xs2:text-xl xs2:leading-5   md1:text-[22px] md1:leading-6 md:text-3xl md:leading-[25px] md3:leading-7 lg:text-4xl xl:text-[27px] xl:leading-7  1xxl:text-3xl 4xl:text-4xl 4xl:leading-9 fullHD:text-4xl 2k:text-5xl 4k:text-7xl 1xl:leading-7 font-titles text-center`}
        >
          <p className="z-[20]">festival within a festival</p>
        </button>
        <button
          onClick={() => setActiveService("pirate-props-and-games")}
          style={currentStyle}
          className={`services-hexagon-3 transition-all ease-in duration-300 xl:mr-0.5 1xxl:max-2xl:mr-1 4xl:max-fullHD:mr-[5px] fullHD:max-2k:mr-0.5 ${activeService === "pirate-props-and-games" ? "before:bg-redPattern text-beige xl:top-[1px]" : "before:bg-beigePattern text-darkBlue"} before:bg-contain xl:before:bg-cover z-[10] flex justify-center items-center text-lg leading-4 xs:leading-5 xs2:text-xl xs2:leading-5  md1:text-[22px]  md:text-3xl md:leading-[25px] md3:leading-7 lg:text-4xl xl:text-[27px] xl:leading-7   1xxl:text-3xl 4xl:text-4xl 4xl:leading-9 fullHD:text-4xl 2k:text-5xl 4k:text-7xl 1xl:leading-7 font-titles text-center`}
        >
          <p className="z-[20]">pirate props and games</p>
        </button>
      </div>

      {/*Red Octagon*/}
      <div
        style={currentStyle}
        className="services-octagon bg-redPattern bg-contain transition-all ease-in duration-300 flex flex-col justify-between py-2 xl:flex-row xl:items-center 1xl:gap-3 xl:px-4 4xl:max-fullHD:px-6 4k:px-10  "
      >
        <div className="h-full max-xl:py-2 xl:max-w-[400px] 2xl:max-w-[450px] 4xl:max-w-[470px] fullHD:max-w-[500px] 2k:max-w-[750px] 4k:max-w-[1100px] flex items-start xl:items-center">
          <div className="flex flex-col w-full px-4 md:px-6 lg:px-8 xl:px-1.5 fullHD:pl-4 fullHD:pr-1 gap-1">
            <Image
              src="/assets/deco-services-4.svg"
              width={110}
              height={25}
              alt="Deco 1"
              className="xs2:w-[140px] md:w-[180px] md2:w-[210px] lg:w-[240px]  xl:w-[150px] 1xl:w-[160px] 1xxl:w-[149px] fullHD:w-[230px] 2k:w-[310px] 4k:w-[430px]"
            />

            <div>
              {activeServiceData && (
                <div
                  className="text-justify text-beige list-disc pr-1
                
                text-base leading-5 xs2:text-lg xs2:leading-6  max-h-[230px] min-[375px]:max-h-[240px] xs:max-h-[240px] iphone-1:max-h-[260px] xs2:max-h-[250px] iphone-2:max-h-[270px] iphone-3:max-h-[280px]
                
                md1:max-h-[310px] md1:text-3xl md:max-h-[320px] md:text:4xl md2:max-h-[340px] lg:text-5xl lg:max-h-[420px]
                
                xl:text-lg xl:max-h-[180px] 1xxl:max-h-[200px] 4xl:text-xl 4xl:max-h-[250px] fullHD:text-2xl fullHD:max-h-[260px] 2k:text-3xl 2k:max-h-[350px] 4k:text-5xl 4k:max-h-[550px] font-txt overflow-y-auto overflow-x-hidden"
                  id="paragraph-scrollbar"
                  dangerouslySetInnerHTML={{
                    __html: activeServiceData.paragraph,
                  }}
                />
              )}
            </div>

            <Image
              src="/assets/deco-services-3.svg"
              width={110}
              height={25}
              alt="Deco 2"
              className="xs2:w-[140px] md:w-[180px] md2:w-[210px] lg:w-[240px] xl:w-[150px] 1xl:w-[160px] 1xxl:w-[149px] fullHD:w-[230px] 2k:w-[310px] 4k:w-[420px] self-end "
            />
          </div>
        </div>

        {isDevice === "mobile" || isDevice === "tablet" ? (
          Splide && (
            <div className="w-full h-auto px-1 md:px-2 lg:px-4 pb-4">
              <Splide
                options={options}
                ref={splideRef}
                onMounted={(splide) => {
                  splideRef.current = splide;
                }}
              >
                {activeServiceData.images.map((image, index) => (
                  <SplideSlide key={index}>
                    <div>
                      <Image
                        src={
                          image.attributes.formats.medium
                            ? image.attributes.formats.medium.url
                            : image.attributes.formats.small.url
                        }
                        width={110}
                        height={110}
                        alt={`Image ${index + 1}`}
                        className="rounded-md
                    
                    w-[110px] h-[110px] xs:w-[120px] xs:h-[120px] iphone-3:w-[130px] iphone-3:h-[130px]
                    
                    md1:w-[230px] md1:h-[230px] md:w-[230px] md:h-[230px] md2:w-[240px] md2:h-[240px] lg:w-[300px] lg:h-[300px]"
                        onClick={() => handleClick(index)}
                        placeholder="blur"
                        blurDataURL={image.blurDataURL}
                      />
                    </div>
                  </SplideSlide>
                ))}
              </Splide>
            </div>
          )
        ) : (
          <div className="grid grid-cols-4 gap-3">
            {activeServiceData.images.map((image, index) => (
              <div key={index} className="services-images-grid">
                <Image
                  src={
                    image.attributes.formats.medium
                      ? image.attributes.formats.medium.url
                      : image.attributes.formats.small.url
                  }
                  width={220}
                  height={220}
                  alt={`Image ${index + 1}`}
                  className="rounded-sm cursor-pointer  1xxl:w-[240px] 1xxl:h-[240px] 4xl:w-[265px] 4xl:h-[265px] fullHD:w-[330px] fullHD:h-[330px] 2k:w-[440px] 2k:h-[440px] 4k:w-[630px] 4k:h-[630px]"
                  onClick={() => handleClick(index)}
                  placeholder="blur"
                  blurDataURL={image.blurDataURL}
                />
              </div>
            ))}
          </div>
        )}

        {/*IMAGES DISPLAY */}

        {Modal && ModalContent && (
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
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
            <ModalContent>
              <Splide options={options2}>
                {activeServiceData.images.map((photo) => (
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
            </ModalContent>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default ServicesDisplay;
