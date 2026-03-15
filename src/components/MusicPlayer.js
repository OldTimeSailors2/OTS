"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import useMedia from "@/hooks/useMedia";
import useMusicPlayer from "@/hooks/useMusicPlayer";
import formatTime from "@/helpers/formatTime";
import PlayB from "../../public/assets/play.svg";
import PauseB from "../../public/assets/pause.svg";
import {
  TbPlayerSkipForwardFilled,
  TbPlayerSkipBackFilled,
} from "react-icons/tb";
import { TbArrowsShuffle2 } from "react-icons/tb";
import { TbRepeat, TbRepeatOff, TbRepeatOnce } from "react-icons/tb";
import { formatSongTitle } from "@/utils/formatSongTitle";

const MusicPlayer = () => {
  const {
    currentSong,
    isPlaying,
    togglePlayPause,
    handleNext,
    handlePrevious,
    handleShuffle,
    isShuffled,
    handleRepeat,
    repeatMode,
    progress,
    handleSeek,
    handleSeekStart,
    handleSeekEnd,
    handleSeekMove,
    currentTime,
    duration,
  } = useMusicPlayer();

  const { isModalOpen, closeModal } = useMedia();

  const [marqueeThreshold, setMarqueeThreshold] = useState(24);
  const [loaded, setLoaded] = useState(false);

  const Modal = useRef(null);
  const ModalHeader = useRef(null);
  const ModalContent = useRef(null);
  const Marquee = useRef(null);

  useEffect(() => {
    if (isModalOpen && !loaded) {
      Promise.all([
        import("@nextui-org/modal").then((mod) => {
          Modal.current = mod.Modal;
          ModalHeader.current = mod.ModalHeader;
          ModalContent.current = mod.ModalContent;
        }),
        import("react-fast-marquee").then((mod) => {
          Marquee.current = mod.default;
        }),
      ]).then(() => setLoaded(true));
    }
  }, [isModalOpen, loaded]);

  useEffect(() => {
    const updateThreshold = () => {
      const thresholdMobile = 17;
      const thresholdTablet = 21;
      const thresholdSmallDesktop = 28;
      const thresholdLargeDesktop = 26;

      const viewportWidth = window.innerWidth;

      if (viewportWidth < 768) {
        setMarqueeThreshold(thresholdMobile);
      } else if (viewportWidth >= 768 && viewportWidth < 1050) {
        setMarqueeThreshold(thresholdTablet);
      } else if (viewportWidth >= 1050 && viewportWidth < 1360) {
        setMarqueeThreshold(thresholdSmallDesktop);
      } else {
        setMarqueeThreshold(thresholdLargeDesktop);
      }
    };

    updateThreshold();
    window.addEventListener("resize", updateThreshold);
    return () => window.removeEventListener("resize", updateThreshold);
  }, []);

  // ✅ Title seguro (nunca undefined)
  const safeTitle = useMemo(() => {
    return formatSongTitle(currentSong?.title || currentSong?.public_id || "");
  }, [currentSong]);

  // ✅ FIX: no uses currentSong?.title.length (puede ser undefined)
  const isMarqueeNeeded = safeTitle.length > marqueeThreshold;

  const getRepeatModeIcon = () => {
    switch (repeatMode) {
      case "one":
        return (
          <TbRepeatOnce className="text-[25px] sm:text-[35px] lg:text-[40px] xl:text-[35px] text-lightRed" />
        );
      case "all":
        return (
          <TbRepeat className="text-[25px] sm:text-[35px] lg:text-[40px] xl:text-[35px] text-lightRed" />
        );
      case "none":
      default:
        return (
          <TbRepeatOff className="text-[25px] sm:text-[35px] lg:text-[40px] xl:text-[35px] text-musicColor" />
        );
    }
  };

  // Si aún no cargó componentes dinámicos, no renders (ok)
  if (!loaded) return null;

  const DynamicModal = Modal.current;
  const DynamicModalHeader = ModalHeader.current;
  const DynamicModalContent = ModalContent.current;
  const DynamicMarquee = Marquee.current;

  // ✅ Proteger caso: modal abierto pero aún no hay canción seleccionada
  // (evita renders raros y reduce warnings)
  const hasSong = Boolean(currentSong);

  return (
    <DynamicModal
      isOpen={isModalOpen}
      onClose={closeModal}
      placement="center"
      classNames={{
        base: 'bg-[url("/assets/backgrounds/bg-music-player.webp")] bg-contain min-w-[45%] max-w-[95%] sm:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] 1xxl:max-w-[45%] 2xl:min-w-[40%] 2xl:max-w-[40%] 2k:min-w-[35%] 2k:max-w-[35%] 4k:min-w-[30%] 4k:max-w-[30%] rounded-[26px]',
        wrapper: "z-[110]",
        backdrop: "z-[109]",
        closeButton:
          "text-[25px] text-musicColor font-bold z-[108] hover:bg-[#BFA98C] active:bg-[#B69E7C]",
      }}
      backdrop="blur"
    >
      <DynamicModalContent>
        <DynamicModalHeader className="font-txt text-lightRed text-3xl md:text-4xl 1xl:text-[40px] 2xl:text-5xl 4k:text-6xl font-medium uppercase justify-center mt-4">
          {!hasSong ? (
            <h1 className="opacity-70">Select a song</h1>
          ) : isMarqueeNeeded ? (
            <DynamicMarquee
              speed={40}
              pauseOnHover={false}
              className="music-marquee"
            >
              <h1 className="pr-6">{safeTitle}</h1>
            </DynamicMarquee>
          ) : (
            <h1>{safeTitle}</h1>
          )}
        </DynamicModalHeader>

        <div className="w-full flex h-4 gap-2 items-center px-3 sm:px-5">
          <span className="font-numbers text-musicColor font-bold text-base xs2:text-lg md:text-xl xl:text-lg 2xl:text-xl 2k:text-2xl tracking-wide">
            {formatTime(currentTime || 0)}
          </span>

          <input
            type="range"
            min="0"
            max="1"
            step="any"
            value={Number.isFinite(progress) ? progress : 0}
            onChange={(e) => handleSeek(parseFloat(e.target.value))}
            onMouseDown={handleSeekStart}
            onMouseUp={handleSeekEnd}
            onTouchStart={handleSeekStart}
            onTouchMove={handleSeekMove}
            onTouchEnd={handleSeekEnd}
            className="progress-input"
            style={{
              background: `linear-gradient(to right, #253142 ${(Number.isFinite(progress) ? progress : 0) * 100}%, #bfa98c ${(Number.isFinite(progress) ? progress : 0) * 100}%)`,
            }}
          />

          <span className="font-numbers text-musicColor font-bold text-base xs2:text-lg md:text-xl xl:text-lg 2xl:text-xl 2k:text-2xl tracking-wide">
            {formatTime(duration || 0)}
          </span>
        </div>

        <div className="flex justify-center items-center my-6 px-4 gap-6 sm:gap-8 lg:gap-10">
          <button onClick={handleShuffle} type="button">
            <TbArrowsShuffle2
              className={`text-[25px] sm:text-[35px] lg:text-[40px] xl:text-[35px] ${isShuffled ? "text-lightRed" : "text-musicColor"}`}
            />
          </button>

          <button onClick={handlePrevious} type="button" disabled={!hasSong}>
            <TbPlayerSkipBackFilled className="text-[40px] sm:text-[55px] lg:text-[65px] xl:text-[60px] text-musicColor" />
          </button>

          <button onClick={togglePlayPause} type="button" disabled={!hasSong}>
            <Image
              src={isPlaying ? PauseB : PlayB}
              width={75}
              height={75}
              priority={true}
              className="text-musicColor sm:w-[95px] sm:h-[95px] lg:w-[100px] lg:h-[100px] 2xl:w-[120px] 2xl:h-[120px]"
              alt="Play|Pause Button"
            />
          </button>

          <button onClick={handleNext} type="button" disabled={!hasSong}>
            <TbPlayerSkipForwardFilled className="text-[40px] sm:text-[55px] lg:text-[65px] xl:text-[60px] text-musicColor" />
          </button>

          <button onClick={handleRepeat} type="button">
            {getRepeatModeIcon()}
          </button>
        </div>
      </DynamicModalContent>
    </DynamicModal>
  );
};

export default MusicPlayer;
