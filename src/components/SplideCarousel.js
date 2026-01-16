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
  const {
    playlist = [],
    videoList = [],
    photoList = [],
    openModal,
    selectVideo,
    openVideoModal,
    selectPhoto,
    openPhotoModal,
  } = useMedia();

  const { playSong, currentSong, isPlaying, togglePlayPause } =
    useMusicPlayer();

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
            padding: "6%",
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

  const handleSlideClick = (eventLike) => {
    if (!eventLike) return;

    switch (mediaType) {
      case "song": {
        const target = getClosest(eventLike, "[data-song-id]");
        if (!target) return;

        // ✅ NO Number() porque asset_id es string
        const songId = target.getAttribute("data-song-id");
        if (!songId) return;

        if (currentSongRef.current?.id === songId) {
          openModal?.();
        } else {
          playSongRef.current?.(songId);
          openModal?.();
        }
        break;
      }

      case "video": {
        const target = getClosest(eventLike, "[data-video-url]");
        if (!target) return;

        const videoUrl = target.getAttribute("data-video-url");
        if (!videoUrl) return;

        if (isPlayingRef.current) togglePlayPauseRef.current?.();
        selectVideo?.(videoUrl);
        openVideoModal?.();
        break;
      }

      case "photo": {
        const target = getClosest(eventLike, "[data-photo-index]");
        if (!target) return;

        const idxStr = target.getAttribute("data-photo-index");
        const idx = Number(idxStr);
        if (Number.isNaN(idx)) return;

        selectPhoto?.(idx);
        openPhotoModal?.();
        break;
      }

      default:
        break;
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
          <SplideSlide key={p.id}>
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
    <Splide
      options={options}
      // ✅ importante pasar el evento real como tercer parámetro
      onClick={(splide, slide, event) => handleSlideClick(event)}
    >
      {renderContent()}
    </Splide>
  );
};

export default SplideCarousel;
