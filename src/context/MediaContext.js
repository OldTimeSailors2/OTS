"use client";

import { createContext, useState } from "react";

export const MediaContext = createContext();

export const MediaProvider = ({ children, playlist, videoList, photoList }) => {
  {
    /*Song States*/
  }
  const [isModalOpen, setIsModalOpen] = useState(false);

  {
    /*Video States*/
  }
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  {
    /*Photo States*/
  }
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [clickedPhotoIndex, setClickedPhotoIndex] = useState(null);

  {
    /*Carousel*/
  }

  const [isCarouselMoving, setIsCarouselMoving] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  {
    /*Video Functions*/
  }

  const selectVideo = (videoUrl) => {
    setCurrentVideo(videoUrl);
  };

  const deselectVideo = () => {
    setCurrentVideo(null);
  };

  const openVideoModal = () => setIsVideoModalOpen(true);
  const closeVideoModal = () => setIsVideoModalOpen(false);

  {
    /*Photo Functions*/
  }

  const selectPhoto = (index) => {
    setClickedPhotoIndex(index);
  };

  const deselectPhoto = () => {
    setClickedPhotoIndex(null);
  };

  const openPhotoModal = () => setIsPhotoModalOpen(true);
  const closePhotoModal = () => setIsPhotoModalOpen(false);

  return (
    <MediaContext.Provider
      value={{
        playlist,
        isModalOpen,
        openModal,
        closeModal,
        videoList,
        currentVideo,
        selectVideo,
        deselectVideo,
        isVideoModalOpen,
        openVideoModal,
        closeVideoModal,
        photoList,
        clickedPhotoIndex,
        selectPhoto,
        deselectPhoto,
        isPhotoModalOpen,
        openPhotoModal,
        closePhotoModal,
        isCarouselMoving,
        setIsCarouselMoving,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};
