import Link from "next/link";
import Image from "next/image";
import { memo } from "react";
import blueFrame from "../../public/assets/blue-frame.webp";
import redFrame from "../../public/assets/red-frame.png";
import footerImage from "../../public/assets/view-selector-image.JPEG";
import MainDiv from "./MainDiv";

// Componente memoizado para la opción de Map
const MapOption = memo(() => (
  <Link
    href="/tickets/map-view"
    className="w-full max-w-[420px] lg:max-w-[620px]"
  >
    <div className="relative px-5">
      <Image
        src={blueFrame}
        alt="Map Option"
        width={620} // Ancho máximo que necesitarás
        height={300} // Ajusta según el aspect ratio de tu imagen
        className="w-full h-auto"
        quality={75}
        sizes="(max-width: 768px) 420px, 620px"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <h2 className="text-lightRed text-2xl lg:text-4xl font-titles">
          view gigs on
        </h2>
        <h2 className="text-darkBlue text-[68px] lg:text-[102px] font-titles">
          map
        </h2>
      </div>
    </div>
  </Link>
));

// Componente memorizado para la opción de Calendar
const CalendarOption = memo(() => (
  <Link
    href="/tickets/calendar-view"
    className="w-full max-w-[420px] lg:max-w-[620px]"
  >
    <div className="relative px-5">
      <Image
        src={redFrame}
        alt="Calendar Option"
        width={620}
        height={300}
        className="w-full h-auto"
        quality={75}
        sizes="(max-width: 768px) 420px, 620px"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h2 className="text-darkBlue text-2xl lg:text-4xl font-titles">
          view gigs on{" "}
        </h2>
        <h2 className="text-lightRed text-5xl lg:text-7xl font-titles">
          calendar
        </h2>
      </div>
    </div>
  </Link>
));

// Componente memoizado para el dibujo
const DrawingImage = memo(() => {
  // Optimización CSS-first
  return (
    <div className="w-full flex justify-center px-5">
      <div className="relative w-full  max-w-[400px] md:max-w-[500px] lg:max-w-[1000px]">
        <Image
          src={footerImage}
          alt="Dibujo"
          sizes="(max-width: 768px) 400px, (max-width: 1024px) 500px, 1000px"
          className="object-contain"
          quality={50} // Reducido aún más
          priority={true}
          loading="eager"
        />
      </div>
    </div>
  );
});

const ViewSelector = () => {
  return (
    <div className="flex flex-col w-full h-dvh justify-center items-center  pt-[85px] xs:pt-[100px] flex-1 md:pt-[140px] md1:pt-[140px] md2:pt-[150px] px-3 bg-beigePatternMobile bg-cover lg:right-[50px] lg:flex-row lg:pt-0 xl:pt-[190px] 4xl:pt-[80px] fullHD:pt-[150px] 4k:pt-[170px]">
      <div className="flex flex-col  items-center justify-center space-y-4 w-full lg:w-[1000px] lg:h-full lg:justify-center lg:ml-20">
        <MapOption />
        <CalendarOption />
      </div>
      <div>
        <DrawingImage />
      </div>
    </div>
  );
};

export default ViewSelector;
