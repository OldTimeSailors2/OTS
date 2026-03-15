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
    console.log("[SplideCarousel] mounted", {
      mediaType,
      counts: {
        songs: playlist?.length || 0,
        videos: videoList?.length || 0,
        photos: photoList?.length || 0,
      },
      functions: {
        openModal: typeof openModal,
        selectVideo: typeof selectVideo,
        openVideoModal: typeof openVideoModal,
        selectPhoto: typeof selectPhoto,
        openPhotoModal: typeof openPhotoModal,
      },
      currentSong: currentSongRef.current?.id ?? null,
      isPlaying: isPlayingRef.current ?? null,
    });
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
    // ✅ Log básico del click
    console.log("[SplideCarousel] click capture", {
      mediaType,
      targetTag: e?.target?.tagName,
      targetClass: e?.target?.className,
    });

    if (!e) return;

    // Evita que arrows disparen modal
    const isArrow = getClosest(e, ".splide__arrow");
    if (isArrow) {
      console.log("[SplideCarousel] click ignored: arrow");
      return;
    }

    // ✅ Detecta dónde clickeaste
    const songEl = getClosest(e, "[data-song-id]");
    const videoEl = getClosest(e, "[data-video-url]");
    const photoEl = getClosest(e, "[data-photo-index]");

    console.log("[SplideCarousel] closest data elements", {
      hasSongEl: Boolean(songEl),
      hasVideoEl: Boolean(videoEl),
      hasPhotoEl: Boolean(photoEl),
      songId: songEl?.getAttribute?.("data-song-id") ?? null,
      videoUrl: videoEl?.getAttribute?.("data-video-url") ?? null,
      photoIndex: photoEl?.getAttribute?.("data-photo-index") ?? null,
    });

    // ✅ Ejecuta según mediaType
    if (mediaType === "song") {
      const target = songEl;
      if (!target) {
        console.warn("[SplideCarousel] SONG click: no data-song-id found");
        return;
      }

      const songId = target.getAttribute("data-song-id");
      console.log("[SplideCarousel] SONG click -> songId:", songId);

      if (!songId) return;

      console.log("[SplideCarousel] SONG funcs", {
        openModal: typeof openModal,
        playSong: typeof playSongRef.current,
      });

      if (currentSongRef.current?.id === songId) {
        console.log("[SplideCarousel] SONG -> current song, opening modal");
        openModal?.();
      } else {
        console.log("[SplideCarousel] SONG -> play + open modal");
        playSongRef.current?.(songId);
        openModal?.();
      }
      return;
    }

    if (mediaType === "video") {
      const target = videoEl;
      if (!target) {
        console.warn("[SplideCarousel] VIDEO click: no data-video-url found");
        return;
      }

      const videoUrl = target.getAttribute("data-video-url");
      console.log("[SplideCarousel] VIDEO click -> videoUrl:", videoUrl);

      console.log("[SplideCarousel] VIDEO funcs", {
        selectVideo: typeof selectVideo,
        openVideoModal: typeof openVideoModal,
        togglePlayPause: typeof togglePlayPauseRef.current,
        isPlaying: isPlayingRef.current,
      });

      if (!videoUrl) return;

      if (isPlayingRef.current) {
        console.log("[SplideCarousel] VIDEO -> pausing music");
        togglePlayPauseRef.current?.();
      }

      console.log("[SplideCarousel] VIDEO -> select + open modal");
      selectVideo?.(videoUrl);
      openVideoModal?.();
      return;
    }

    if (mediaType === "photo") {
      const target = photoEl;
      if (!target) {
        console.warn("[SplideCarousel] PHOTO click: no data-photo-index found");
        return;
      }

      const idxStr = target.getAttribute("data-photo-index");
      const idx = Number(idxStr);

      console.log("[SplideCarousel] PHOTO click -> idx:", idxStr, idx);

      console.log("[SplideCarousel] PHOTO funcs", {
        selectPhoto: typeof selectPhoto,
        openPhotoModal: typeof openPhotoModal,
      });

      if (Number.isNaN(idx)) return;

      console.log("[SplideCarousel] PHOTO -> select + open modal");
      selectPhoto?.(idx);
      openPhotoModal?.();
      return;
    }

    console.warn("[SplideCarousel] Unknown mediaType:", mediaType);
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
