"use client";

import Image from "next/image";
import { useState } from "react";

const LandingDisplay = ({ images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const [Modal, setModal] = useState(null);
  const [ModalContent, setModalContent] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleClose = () => {
    closeModal();
    setCurrentImage(null);
  };

  const handleClick = async (img) => {
    if (!Modal || !ModalContent) {
      const modalModule = await import("@nextui-org/modal");
      setModal(() => modalModule.Modal);
      setModalContent(() => modalModule.ModalContent);
    }

    setCurrentImage(img);
    openModal();
  };

  return (
    <>
      <div className="md1:px-3 md:px-14 md2:px-14 lg:px-28 xl:p-0">
        <div className="grid grid-cols-2 md1:px-28 md1:pb-4 xl:p-0 xl:grid-cols-4 gap-[5px] xl:gap-4">
          {images?.map((image) => {
            const smallUrl = image.attributes?.formats?.small?.url ?? image.attributes?.url;
            const xlUrl =
              image.attributes?.formats?.xl?.url ?? image.attributes?.url ?? smallUrl;

            const blur = image.blurDataURL;

            return (
              <div
                key={image.id}
                onClick={() => handleClick({ url: xlUrl, blurDataURL: blur })}
                className="relative aspect-square overflow-hidden rounded-sm cursor-pointer"
              >
                <Image
                  src={smallUrl}
                  alt={`Image ${image.id}`}
                  fill
                  priority
                  sizes="(max-width: 600px) 40vw, (max-width: 1280px) 35vw, 25vw"
                  style={{ objectFit: "contain" }}
                  placeholder={blur ? "blur" : "empty"}
                  blurDataURL={blur}
                />
              </div>
            );
          })}
        </div>
      </div>

      {Modal && ModalContent && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleClose}
          placement="center"
          style={{ maxWidth: "95vh" }}
          classNames={{
            base: "flex items-center justify-center w-full",
            wrapper: "z-[110] overflow-y-hidden",
            backdrop: "z-[109]",
            closeButton:
              "z-[108] text-musicColor hover:bg-[#BFA98C] active:bg-[#B69E7C]",
          }}
          backdrop="blur"
        >
          <ModalContent>
            {currentImage && (
              <Image
                src={currentImage.url}
                alt="Selected Photo"
                width={1024}
                height={1024}
                className="xl:w-[95vh] xl:h-[95vh]"
                style={{ objectFit: "contain" }}
                placeholder={currentImage.blurDataURL ? "blur" : "empty"}
                blurDataURL={currentImage.blurDataURL}
              />
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default LandingDisplay;
