"use client";

import { useState, useRef, useEffect } from "react";
import useMedia from "@/hooks/useMedia";
import useBrowserDetection from "@/hooks/useBrowserDetection";

const VideoPlayer = () => {
  const { currentVideo, deselectVideo, isVideoModalOpen, closeVideoModal } =
    useMedia();
  const { isSafari } = useBrowserDetection();

  const handleClose = () => {
    closeVideoModal();
    deselectVideo();
  };
  const playerRef = useRef();
  const [videoStyle, setVideoStyle] = useState({});
  const [isVerticalVideo, setIsVerticalVideo] = useState(false);

  const [loaded, setLoaded] = useState(false);
  const Modal = useRef(null);
  const ModalContent = useRef(null);
  const ReactPlayer = useRef(null);

  useEffect(() => {
    if (isVideoModalOpen && !loaded) {
      Promise.all([
        import("react-player/file").then((mod) => {
          ReactPlayer.current = mod.default;
        }),
        import("@nextui-org/modal").then((mod) => {
          Modal.current = mod.Modal;
          ModalContent.current = mod.ModalContent;
        }),
      ]).then(() => setLoaded(true));
    }
  }, [isVideoModalOpen, loaded]);

  const onVideoLoad = () => {
    // Access the internal player after it's ready
    const internalPlayer = playerRef.current.getInternalPlayer();
    const videoElement = internalPlayer; //HTMLVideoElement
    // Now I can access videoElement properties like videoHeight and videoWidth
    const videoHeight = videoElement.videoHeight;
    const videoWidth = videoElement.videoWidth;
    const aspectRatio = videoWidth / videoHeight;
    setIsVerticalVideo(aspectRatio < 1);
    const viewportAspectRatio = window.innerWidth / window.innerHeight;

    let styles = {};
    if (aspectRatio < viewportAspectRatio) {
      // Video is taller than the viewport aspect ratio
      styles = {
        maxHeight: "80vh", // Limits the height to the viewport
        width: "auto", // Allows the width to be auto
      };
    } else {
      // Video is wider or equal to the viewport aspect ratio
      styles = {
        width: "100%", // Uses the full width of the modal
        height: "auto", // Allows the height to be auto
      };
    }

    setVideoStyle(styles);
  };

  if (!loaded) return null;

  const DynamicReactPlayer = ReactPlayer.current;
  const DynamicModal = Modal.current;
  const DynamicModalContent = ModalContent.current;

  return (
    <>
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
          base: "max-w-[82%]  sm:max-w-[70%] sm:max-h-[80vh] w-auto h-auto bg-black",
        }}
        backdrop="blur"
      >
        <DynamicModalContent
          className={`flex justify-center items-center ${isVerticalVideo ? "h-[95%]" : ""}`}
        >
          <DynamicReactPlayer
            url={currentVideo}
            controls={true}
            width="100%"
            height="100%"
            config={{
              file: {
                attributes: {
                  onContextMenu: (e) => e.preventDefault(),
                  controlsList: "nodownload",
                },
              },
            }}
            onReady={onVideoLoad}
            style={videoStyle}
            ref={playerRef}
          />
        </DynamicModalContent>
      </DynamicModal>
    </>
  );
};

export default VideoPlayer;
