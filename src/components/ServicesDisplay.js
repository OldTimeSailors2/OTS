"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Image from "next/image";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * Base pixel dimensions for hexagon and octagon CSS variables, per device tier.
 * Each entry: [width, height, before-width, before-height].
 */
const DEVICE_SIZES = {
  mobile: {
    hex:  [105,   70.5, 103,   69  ],
    hex2: [105,   70.5, 103,   69  ],
    hex3: [105,   70.5, 103,   69  ],
    oct:  [250,   450               ],
  },
  tablet: {
    hex:  [140,   80,   138.5, 78  ],
    hex2: [140,   80,   138.5, 78  ],
    hex3: [140,   80,   138.5, 78  ],
    oct:  [435,   550               ],
  },
  desktop: {
    hex:  [126,   69.3, 124,   68.3],
    hex2: [235.2, 69.3, 233.2, 68.3],
    hex3: [168,   69.3, 166,   68.3],
    oct:  [1240,  300               ],
  },
};

/**
 * Config for the six service selector buttons.
 * `shapeCls` maps to the CSS class that defines the hexagon shape.
 * `extraCls` holds any per-button spacing overrides.
 * `textCls`  holds responsive text-size / line-height classes.
 */
const SERVICE_BUTTONS = [
  {
    id: "our-show",
    label: "our show",
    shapeCls: "services-hexagon",
    extraCls: "xl:max-1xl:mr-3 1xxl:max-2xl:ml-0.5 4xl:max-fullHD:ml-0.5 fullHD:max-2k:ml-[1px]",
    textCls: "text-lg leading-4 xs2:text-xl xs2:leading-5 md1:text-[22px] md:text-3xl lg:text-4xl xl:text-[27px] 1xxl:text-3xl 4xl:text-4xl 4xl:leading-9 fullHD:text-4xl 2k:text-5xl 4k:text-7xl",
  },
  {
    id: "festival-and-event-organization",
    label: "festival and event organization",
    shapeCls: "services-hexagon-2",
    extraCls: "",
    textCls: "text-lg leading-4 xs:leading-5 xs2:text-xl xs2:leading-5 md1:text-[22px] md1:leading-5 md:text-3xl md:leading-[25px] md3:leading-7 lg:text-4xl xl:leading-7 xl:text-[27px] 1xxl:text-3xl 4xl:text-4xl 4xl:leading-9 fullHD:text-4xl 2k:text-5xl 4k:text-7xl",
  },
  {
    id: "hms-warrior",
    label: "hms warrior",
    shapeCls: "services-hexagon",
    extraCls: "",
    textCls: "text-lg leading-4 xs2:text-xl xs2:leading-5 md1:text-[22px] md:text-3xl lg:text-4xl xl:text-[27px] xl:leading-7 1xxl:text-3xl 4xl:text-4xl 4xl:leading-9 fullHD:text-4xl 2k:text-5xl 4k:text-7xl",
  },
  {
    id: "music-agency",
    label: "music agency",
    shapeCls: "services-hexagon",
    extraCls: "",
    textCls: "text-lg leading-4 xs2:text-xl xs2:leading-5 md1:text-[22px] md:text-3xl lg:text-4xl xl:text-[27px] xl:leading-7 1xxl:text-3xl 4xl:text-4xl 4xl:leading-9 fullHD:text-4xl 2k:text-5xl 4k:text-7xl 1xl:leading-7",
  },
  {
    id: "festival-within-a-festival",
    label: "festival within a festival",
    shapeCls: "services-hexagon-2",
    extraCls: "",
    textCls: "text-lg leading-4 xs:leading-5 xs2:text-xl xs2:leading-5 md1:text-[22px] md1:leading-6 md:text-3xl md:leading-[25px] md3:leading-7 lg:text-4xl xl:text-[27px] xl:leading-7 1xxl:text-3xl 4xl:text-4xl 4xl:leading-9 fullHD:text-4xl 2k:text-5xl 4k:text-7xl 1xl:leading-7",
  },
  {
    id: "pirate-props-and-games",
    label: "pirate props and games",
    shapeCls: "services-hexagon-3",
    extraCls: "xl:mr-0.5 1xxl:max-2xl:mr-1 4xl:max-fullHD:mr-[5px] fullHD:max-2k:mr-0.5",
    textCls: "text-lg leading-4 xs:leading-5 xs2:text-xl xs2:leading-5 md1:text-[22px] md:text-3xl md:leading-[25px] md3:leading-7 lg:text-4xl xl:text-[27px] xl:leading-7 1xxl:text-3xl 4xl:text-4xl 4xl:leading-9 fullHD:text-4xl 2k:text-5xl 4k:text-7xl 1xl:leading-7",
  },
];

/** Splide options for the mobile/tablet image carousel (never changes). */
const SPLIDE_OPTIONS = {
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
    428: { padding: { right: "6%" } },
    414: { padding: { right: "8%" } },
    380: { padding: { right: "5%" } },
    375: { padding: { right: "8%" } },
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Returns Next.js blur props for an image if `blurDataURL` is available,
 * otherwise falls back to `placeholder="empty"` to avoid console warnings.
 *
 * @param {{ blurDataURL?: string } | null} img
 */
const blurProps = (img) =>
  img?.blurDataURL
    ? { placeholder: "blur", blurDataURL: img.blurDataURL }
    : { placeholder: "empty" };

/**
 * Resolves the best available URL from a Strapi image entry.
 * Prefers `medium` over `small` for thumbnails, `xl` over original for modal.
 *
 * @param {{ attributes: { formats: object, url: string } }} image
 * @param {"thumb"|"full"} size
 */
const resolveImageUrl = (image, size = "thumb") => {
  const { formats, url } = image.attributes;
  if (size === "full") return formats.xl?.url ?? url;
  return formats.medium?.url ?? formats.small?.url;
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const ServicesDisplay = ({ services }) => {
  const [scaleFactor, setScaleFactor] = useState(1);
  const [isDevice, setIsDevice] = useState();
  const [activeService, setActiveService] = useState("our-show");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedPhotoIndex, setClickedPhotoIndex] = useState(null);

  // Lazily-loaded dependencies (only fetched when needed)
  const [Modal, setModal] = useState(null);
  const [ModalContent, setModalContent] = useState(null);
  const [Splide, setSplide] = useState(null);
  const [SplideSlide, setSplideSlide] = useState(null);

  const splideRef = useRef(null);

  const activeServiceData = useMemo(
    () => services.find((s) => s.id === activeService),
    [services, activeService],
  );

  // -------------------------------------------------------------------------
  // Resize — sets isDevice + scaleFactor from window width
  // -------------------------------------------------------------------------
  useEffect(() => {
    const handleResize = () => {
      let device, baseWidth;
      if (window.innerWidth >= 1280) {
        device = "desktop"; baseWidth = 1280;
      } else if (window.innerWidth >= 600) {
        device = "tablet";  baseWidth = 600;
      } else {
        device = "mobile";  baseWidth = 360;
      }
      setIsDevice(device);
      setScaleFactor(Math.max(window.innerWidth / baseWidth, 1));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // -------------------------------------------------------------------------
  // CSS custom properties — one useMemo instead of three
  // -------------------------------------------------------------------------
  const currentStyle = useMemo(() => {
    const sizes = DEVICE_SIZES[isDevice] ?? DEVICE_SIZES.mobile;
    const s = scaleFactor;
    const px = (n) => `${n * s}px`;
    const [hw,  hh,  hbw,  hbh ] = sizes.hex;
    const [h2w, h2h, h2bw, h2bh] = sizes.hex2;
    const [h3w, h3h, h3bw, h3bh] = sizes.hex3;
    const [ow,  oh ]              = sizes.oct;
    return {
      "--hexagon-width":          px(hw),  "--hexagon-height":          px(hh),
      "--hexagon-before-width":   px(hbw), "--hexagon-before-height":   px(hbh),
      "--hexagon-2-width":        px(h2w), "--hexagon-2-height":        px(h2h),
      "--hexagon-2-before-width": px(h2bw),"--hexagon-2-before-height": px(h2bh),
      "--hexagon-3-width":        px(h3w), "--hexagon-3-height":        px(h3h),
      "--hexagon-3-before-width": px(h3bw),"--hexagon-3-before-height": px(h3bh),
      "--octagon-width":          px(ow),  "--octagon-height":          px(oh),
    };
  }, [isDevice, scaleFactor]);

  // -------------------------------------------------------------------------
  // Lazy-load Splide for mobile / tablet
  // -------------------------------------------------------------------------
  useEffect(() => {
    if ((isDevice === "tablet" || isDevice === "mobile") && !Splide) {
      (async () => {
        const { Splide, SplideSlide } = await import("@splidejs/react-splide");
        await import("@splidejs/splide/css/core");
        await import("./carousel-styles.css");
        setSplide(() => Splide);
        setSplideSlide(() => SplideSlide);
      })();
    }
  }, [isDevice, Splide]);

  // Reset carousel to slide 0 when the active service changes
  useEffect(() => {
    splideRef.current?.go(0);
  }, [activeServiceData]);

  // -------------------------------------------------------------------------
  // Modal options — depends only on the initially-clicked photo index
  // -------------------------------------------------------------------------
  const modalSplideOptions = useMemo(() => ({
    type: "fade",
    mediaQuery: "min",
    perPage: 1,
    start: clickedPhotoIndex ?? 0,
    arrows: true,
    pagination: false,
    breakpoints: {
      1280: { drag: false, keyboard: "global" },
      0:    { drag: true,  keyboard: false    },
    },
    classes: {
      arrows: "splide__arrows arrows_modal",
      arrow:  "splide__arrow modal_arrow",
    },
  }), [clickedPhotoIndex]);

  // -------------------------------------------------------------------------
  // Image click → lazy-load modal + open it
  // -------------------------------------------------------------------------
  const handleClick = useCallback(async (index) => {
    if (!Modal || !ModalContent) {
      const modalModule = await import("@nextui-org/modal");

      if (!Splide) {
        const { Splide, SplideSlide } = await import("@splidejs/react-splide");
        await import("@splidejs/splide/css/core");
        await import("./carousel-styles.css");
        setSplide(() => Splide);
        setSplideSlide(() => SplideSlide);
      }

      setModal(() => modalModule.Modal);
      setModalContent(() => modalModule.ModalContent);
    }

    setClickedPhotoIndex(index);
    setIsModalOpen(true);
  }, [Modal, ModalContent, Splide]);

  const closeModal = () => {
    setIsModalOpen(false);
    setClickedPhotoIndex(null);
  };

  if (!activeServiceData) return null;

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------
  return (
    <div className="w-full px-0.5 min-[600px]:px-3 xl:px-4 flex xl:flex-col xl:items-center">

      {/* Service selector buttons */}
      <div
        className="flex flex-col justify-between xl:w-full xl:flex-row xl:justify-evenly xl:px-3 2xl:px-4 fullHD:px-6 2k:px-9 4k:px-16"
        role="Button-group"
      >
        {SERVICE_BUTTONS.map(({ id, label, shapeCls, extraCls, textCls }) => (
          <button
            key={id}
            onClick={() => setActiveService(id)}
            style={currentStyle}
            className={`${shapeCls} ${extraCls} transition-all ease-in duration-300 before:bg-contain xl:before:bg-cover z-[10] flex justify-center items-center font-titles text-center ${textCls} ${
              activeService === id
                ? "before:bg-redPattern text-beige xl:top-[1px]"
                : "before:bg-beigePattern text-darkBlue"
            }`}
          >
            <p className="z-[20]">{label}</p>
          </button>
        ))}
      </div>

      {/* Red octagon — description + images */}
      <div
        style={currentStyle}
        className="services-octagon bg-redPattern bg-contain transition-all ease-in duration-300 flex flex-col justify-between py-2 xl:flex-row xl:items-center 1xl:gap-3 xl:px-4 4xl:max-fullHD:px-6 4k:px-10"
      >
        {/* Description panel */}
        <div className="h-full max-xl:py-2 xl:max-w-[400px] 2xl:max-w-[450px] 4xl:max-w-[470px] fullHD:max-w-[500px] 2k:max-w-[750px] 4k:max-w-[1100px] flex items-start xl:items-center">
          <div className="flex flex-col w-full px-4 md:px-6 lg:px-8 xl:px-1.5 fullHD:pl-4 fullHD:pr-1 gap-1">
            <Image
              src="/assets/deco-services-4.svg"
              width={110} height={25} alt="Deco 1"
              className="xs2:w-[140px] md:w-[180px] md2:w-[210px] lg:w-[240px] xl:w-[150px] 1xl:w-[160px] 1xxl:w-[149px] fullHD:w-[230px] 2k:w-[310px] 4k:w-[430px]"
            />

            <div
              className="text-justify text-beige list-disc pr-1
                text-base leading-5 xs2:text-lg xs2:leading-6 max-h-[230px] min-[375px]:max-h-[240px] xs:max-h-[240px] iphone-1:max-h-[260px] xs2:max-h-[250px] iphone-2:max-h-[270px] iphone-3:max-h-[280px]
                md1:max-h-[310px] md1:text-3xl md:max-h-[320px] md:text:4xl md2:max-h-[340px] lg:text-5xl lg:max-h-[420px]
                xl:text-lg xl:max-h-[180px] 1xxl:max-h-[200px] 4xl:text-xl 4xl:max-h-[250px] fullHD:text-2xl fullHD:max-h-[260px] 2k:text-3xl 2k:max-h-[350px] 4k:text-5xl 4k:max-h-[550px] font-txt overflow-y-auto overflow-x-hidden"
              id="paragraph-scrollbar"
              dangerouslySetInnerHTML={{ __html: activeServiceData.paragraph }}
            />

            <Image
              src="/assets/deco-services-3.svg"
              width={110} height={25} alt="Deco 2"
              className="xs2:w-[140px] md:w-[180px] md2:w-[210px] lg:w-[240px] xl:w-[150px] 1xl:w-[160px] 1xxl:w-[149px] fullHD:w-[230px] 2k:w-[310px] 4k:w-[420px] self-end"
            />
          </div>
        </div>

        {/* Image gallery — carousel on mobile/tablet, grid on desktop */}
        {isDevice === "mobile" || isDevice === "tablet" ? (
          Splide && (
            <div className="w-full h-auto px-1 md:px-2 lg:px-4 pb-4">
              <Splide
                options={SPLIDE_OPTIONS}
                ref={splideRef}
                onMounted={(splide) => { splideRef.current = splide; }}
              >
                {activeServiceData.images.map((image, index) => (
                  <SplideSlide key={index}>
                    <div>
                      <Image
                        src={resolveImageUrl(image, "thumb")}
                        width={110} height={110}
                        alt={`Image ${index + 1}`}
                        className="rounded-md w-[110px] h-[110px] xs:w-[120px] xs:h-[120px] iphone-3:w-[130px] iphone-3:h-[130px] md1:w-[230px] md1:h-[230px] md:w-[230px] md:h-[230px] md2:w-[240px] md2:h-[240px] lg:w-[300px] lg:h-[300px]"
                        onClick={() => handleClick(index)}
                        {...blurProps(image)}
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
                  src={resolveImageUrl(image, "thumb")}
                  width={220} height={220}
                  alt={`Image ${index + 1}`}
                  className="rounded-sm cursor-pointer 1xxl:w-[240px] 1xxl:h-[240px] 4xl:w-[265px] 4xl:h-[265px] fullHD:w-[330px] fullHD:h-[330px] 2k:w-[440px] 2k:h-[440px] 4k:w-[630px] 4k:h-[630px]"
                  onClick={() => handleClick(index)}
                  {...blurProps(image)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Lightbox modal */}
        {Modal && ModalContent && (
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            placement="center"
            classNames={{
              base: "flex items-center justify-center w-full bg-black max-w-[98vw] xl:max-w-[95dvh]",
              wrapper: "z-[110] overflow-y-hidden",
              backdrop: "z-[109]",
              closeButton: "z-[108] text-musicColor hover:bg-[#BFA98C] active:bg-[#B69E7C]",
            }}
            backdrop="blur"
          >
            <ModalContent>
              <Splide options={modalSplideOptions}>
                {activeServiceData.images.map((photo) => (
                  <SplideSlide key={photo.id}>
                    <Image
                      src={resolveImageUrl(photo, "full")}
                      alt={`Slide ${photo.id}`}
                      width={500} height={500}
                      className="w-[98vw] h-[98vw] xl:h-[95dvh]"
                      sizes="(max-width: 1280px) 95vw, 95dvh"
                      style={{ objectFit: "contain" }}
                      {...blurProps(photo)}
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
