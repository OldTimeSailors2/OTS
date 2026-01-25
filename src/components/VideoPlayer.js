"use client";

import { useState, useRef, useEffect } from "react";
import useMedia from "@/hooks/useMedia";
import useBrowserDetection from "@/hooks/useBrowserDetection";

const isYouTubeUrl = (url) =>
  typeof url === "string" &&
  (url.includes("youtube.com") || url.includes("youtu.be"));

const isShorts = (url) =>
  typeof url === "string" && url.includes("/shorts/");

const VideoPlayer = () => {
  const { currentVideo, deselectVideo, isVideoModalOpen, closeVideoModal } =
    useMedia();
  const { isSafari } = useBrowserDetection();

  const handleClose = () => {
    closeVideoModal();
    deselectVideo();
  };

  const playerRef = useRef(null);

  const [loaded, setLoaded] = useState(false);
  const Modal = useRef(null);
  const ModalContent = useRef(null);
  const ReactPlayer = useRef(null);

  const [isVerticalVideo, setIsVerticalVideo] = useState(false);

  useEffect(() => {
    if (isVideoModalOpen && !loaded) {
      Promise.all([
        // ✅ YouTube player
        import("react-player/youtube").then((mod) => {
          ReactPlayer.current = mod.default;
        }),
        import("@nextui-org/modal").then((mod) => {
          Modal.current = mod.Modal;
          ModalContent.current = mod.ModalContent;
        }),
      ]).then(() => setLoaded(true));
    }
  }, [isVideoModalOpen, loaded]);

  useEffect(() => {
    // Detecta vertical por shorts, si quieres luego lo refinamos
    setIsVerticalVideo(isShorts(currentVideo));
  }, [currentVideo]);

  if (!loaded) return null;

  const DynamicReactPlayer = ReactPlayer.current;
  const DynamicModal = Modal.current;
  const DynamicModalContent = ModalContent.current;

  // Si algún día te llega un mp4, también lo va a reproducir (react-player soporta ambos)
  const urlToPlay = currentVideo;

  return (
    <DynamicModal
      isOpen={isVideoModalOpen}
      onClose={handleClose}
      placement="center"
      className={`${isSafari ? "max-h-[77vh]" : "max-h-[58vh]"}`}
      classNames={{
        wrapper: "z-[110]",
        backdrop: "z-[109]",
        closeButton:
          "z-[108] text-musicColor hover:bg-[#BFA98C] active:bg-[#B69E7C]",
        base: "max-w-[82%] sm:max-w-[70%] sm:max-h-[80vh] w-auto h-auto bg-black",
      }}
      backdrop="blur"
    >
      <DynamicModalContent
        className={`flex justify-center items-center ${
          isVerticalVideo ? "h-[95%]" : ""
        }`}
      >
        <div
          className={`w-full ${
            isVerticalVideo ? "max-w-[420px]" : "max-w-[1100px]"
          }`}
        >
          <DynamicReactPlayer
            ref={playerRef}
            url={urlToPlay}
            controls={true}
            width="100%"
            height={isVerticalVideo ? "78vh" : "56vh"}
            playing={true}
            config={{
              youtube: {
                playerVars: {
                  rel: 0,
                  modestbranding: 1,
                  playsinline: 1,
                },
              },
              file: {
                attributes: {
                  onContextMenu: (e) => e.preventDefault(),
                  controlsList: "nodownload",
                },
              },
            }}
          />
        </div>
      </DynamicModalContent>
    </DynamicModal>
  );
};

export default VideoPlayer;
