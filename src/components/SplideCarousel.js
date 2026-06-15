"use client";

import { useRef, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css/core";

import Song from "./Song";
import Video from "./Video";
import Photo from "./Photo";

import useMedia from "@/hooks/useMedia";
import useMusicPlayer from "@/hooks/useMusicPlayer";

import "./carousel-styles.css";

const SplideCarousel = ({ mediaType }) => {
  const media = useMedia();
  const {
    playlist = [],
    videoList = [],
    photoList = [],
    openModal,
    selectVideo,
    openVideoModal,
    selectPhoto,
    openPhotoModal,
  } = media;

  const music = useMusicPlayer();
  const { playSong, currentSong, isPlaying, togglePlayPause } = music;

  const playSongRef = useRef(playSong);
  const currentSongRef = useRef(currentSong);
  const togglePlayPauseRef = useRef(togglePlayPause);
  const isPlayingRef = useRef(isPlaying);

  useEffect(() => {
    playSongRef.current = playSong;
    currentSongRef.current = currentSong;
    togglePlayPauseRef.current = togglePlayPause;
    isPlayingRef.current = isPlaying;
  }, [playSong, currentSong, togglePlayPause, isPlaying]);

  // ✅ Log inicial: confirma que el componente monta y tiene data/funciones
  useEffect(() => {
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaType]);

  const getBreakpoints = (type) => {
    switch (type) {
      case "song":
        return {
          1280: {
            perPage: 10,
            gap: "10px",
            arrows: true,
            drag: false,
            keyboard: "focused",
            focus: "center",
            padding: "1%",
          },
          1024: { perPage: 10, gap: "10px", padding: "5%" },
          600: { perPage: 4, gap: "5px", padding: "10%" },
          0: {
            perPage: 4,
            gap: "5px",
            arrows: false,
            drag: true,
            keyboard: false,
            padding: "10%",
          },
        };

      case "video":
        return {
          1280: {
            perPage: 11,
            gap: "10px",
            arrows: true,
            drag: false,
            keyboard: "focused",
            focus: "center",
            padding: "5%",
          },
          1024: { perPage: 12, gap: "10px", padding: "5%" },
          600: { perPage: 5, gap: "5px", padding: "10%" },
          0: {
            perPage: 4,
            gap: "5px",
            arrows: false,
            drag: true,
            keyboard: false,
Combine: "6%",
          },
        };

      case "photo":
        return {
          1920: { perPage: 7, padding: "6%" },
          1536: { perPage: 10 },
          1366: { perPage: 8, padding: "0%" },
          1280: {
            perPage: 7,
            gap: "3px",
            arrows: true,
            drag: false,
            keyboard: "focused",
            focus: "center",
            padding: "6%",
          },
          600: { perPage: 3, gap: "4px", padding: "17%" },
          380: { padding: "3%" },
          375: { padding: "4%" },
          0: {
            perPage: 3,
            gap: "4px",
            arrows: false,
            drag: true,
            keyboard: false,
            padding: "3%",
          },
        };

      default:
        return {};
    }
  };

  const breakpoints = getBreakpoints(mediaType);

  const start =
    typeof window !== "undefined" && window.innerWidth >= 1280
      ? window.innerWidth >= 1536
        ? window.innerWidth >= 1920
          ? 3
          : 4
        : 3
      : 0;

  const options = {
    type: "loop",
    start,
    updateOnMove: true,
    mediaQuery: "min",
    pagination: false,
    breakpoints,
  };

  const getClosest = (eventLike, selector) => {
    const target = eventLike?.target;
    if (!target) return null;

    const el = target.nodeType === 3 ? target.parentElement : target;
    return typeof el?.closest === "function" ? el.closest(selector) : null;
  };

  const handleClickCapture = (e) => {


    if (!e) return;

    // Evita que arrows disparen modal
    const isArrow = getClosest(e, ".splide__arrow");
    if (isArrow) {
   
      return;
    }

    // ✅ Detecta dónde clickeaste
    const songEl = getClosest(e, "[data-song-id]");
    const videoEl = getClosest(e, "[data-video-url]");
    const photoEl = getClosest(e, "[data-photo-index]");


    // ✅ Ejecuta según mediaType
    if (mediaType === "song") {
      const target = songEl;
      if (!target) {
     
        return;
      }

      const songId = target.getAttribute("data-song-id");
  

      if (!songId) return;

  

      if (currentSongRef.current?.id === songId) {
        openModal?.();
      } else {
        playSongRef.current?.(songId);
        openModal?.();
      }
      return;
    }

    if (mediaType === "video") {
      const target = videoEl;
      if (!target) {
        return;
      }

      const videoUrl = target.getAttribute("data-video-url");

  

      if (!videoUrl) return;

      if (isPlayingRef.current) {
        togglePlayPauseRef.current?.();
      }

      selectVideo?.(videoUrl);
      openVideoModal?.();
      return;
    }

    if (mediaType === "photo") {
      const target = photoEl;
      if (!target) {
        return;
      }

      const idxStr = target.getAttribute("data-photo-index");
      const idx = Number(idxStr);

      if (Number.isNaN(idx)) return;

      selectPhoto?.(idx);
      openPhotoModal?.();
      return;
    }
  };

  const renderContent = () => {
    switch (mediaType) {
      case "song":
        return (playlist || []).map((s) => (
          <SplideSlide key={s.id}>
            <Song song={s} />
          </SplideSlide>
        ));

      case "video":
        return (videoList || []).map((v) => (
          <SplideSlide key={v.id}>
            <Video video={v} />
          </SplideSlide>
        ));

      case "photo":
        return (photoList || []).map((p, index) => (
          <SplideSlide key={p.id || p.public_id || p.url || index}>
            <Photo photo={p} index={index} />
          </SplideSlide>
        ));

      default:
        return (
          <div className="w-full text-center text-3xl font-titles text-lightRed">
            No media found
          </div>
        );
    }
  };

  return (
    <div
      onClickCapture={handleClickCapture}
      style={{ pointerEvents: "auto" }}
    >
      <Splide options={options}>{renderContent()}</Splide>
    </div>
  );
};

export default SplideCarousel;
