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
    playlist,
    videoList,
    photoList,
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

  // Update the ref whenever playSong changes
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
          1024: {
            perPage: 10,
            gap: "10px",
            padding: "5%",
          },
          600: {
            perPage: 4,
            gap: "5px",
            padding: "10%",
          },
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
          1024: {
            perPage: 12,
            gap: "10px",
            padding: "5%",
          },
          600: {
            perPage: 5,
            gap: "5px",
            padding: "10%",
          },
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
          1920: {
            perPage: 7,
            padding: "6%",
          },
          1536: {
            perPage: 10,
          },
          1366: {
            perPage: 8,
            padding: "0%",
          },
          1280: {
            perPage: 7,
            gap: "3px",
            arrows: true,
            drag: false,
            keyboard: "focused",
            focus: "center",
            padding: "6%",
          },
          600: {
            perPage: 3,
            gap: "4px",
            padding: "17%",
          },
          380: {
            padding: "3%",
          },
          375: {
            padding: "4%",
          },
          0: {
            perPage: 3,
            gap: "4px",
            arrows: false,
            drag: true,
            keyboard: false,
            padding: "3%",
          },
        };
    }
  };

  const breakpoints = getBreakpoints(mediaType);
  //Define carousel start based on window's width
  const start =
    window.innerWidth >= 1280
      ? window.innerWidth >= 1536
        ? window.innerWidth >= 1920
          ? 3
          : 4
        : 3
      : 0;

  const options = {
    type: "loop",
    start: start,
    updateOnMove: true,
    mediaQuery: "min",
    pagination: false,
    breakpoints: breakpoints,
  };

  const handleSlideClick = (e) => {
    // Depending on the mediaType, you might look for different data attributes
    switch (mediaType) {
      case "song":
        const targetElement = e.target.closest("[data-song-id]");
        if (targetElement) {
          const songId = Number(targetElement.getAttribute("data-song-id"));
          if (songId) {
            if (currentSongRef.current?.id === songId) {
              openModal();
            } else {
              playSongRef.current(songId);
              openModal();
            }
          }
        }
        break;

      case "video":
        // And here, video-specific logic
        const videoTarget = e.target.closest("[data-video-url]");
        if (videoTarget) {
          const videoUrl = videoTarget.getAttribute("data-video-url");
          if (isPlayingRef.current) {
            togglePlayPauseRef.current();
          }
          selectVideo(videoUrl);
          openVideoModal();
        }
        break;
      case "photo":
        const photoTarget = e.target.closest("[data-photo-index]");
        if (photoTarget) {
          const photoIndex = Number(
            photoTarget.getAttribute("data-photo-index"),
          );
          if (photoIndex || photoIndex === 0) {
            selectPhoto(photoIndex);
            openPhotoModal();
          }
        }
        break;

      default:
        console.warn("Unhandled mediaType in click handler:", mediaType);
    }
  };

  const renderContent = () => {
    switch (mediaType) {
      case "song":
        return playlist.map((s, index) => (
          <SplideSlide key={s.id}>
            <Song song={s} />
          </SplideSlide>
        ));
      // return playlist.map((s, index) => <SplideSlide key={s.id}><Song song={s} /></SplideSlide>);
      case "video":
        return videoList.map((v, index) => (
          <SplideSlide key={v.id}>
            <Video video={v} />
          </SplideSlide>
        ));
      case "photo":
        return photoList.map((p, index) => (
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
      onClick={(splide, Slide, e) => handleSlideClick(e)}
    >
      {renderContent()}
    </Splide>
  );
};

export default SplideCarousel;
