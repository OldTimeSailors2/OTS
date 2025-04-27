import Image from "next/image";
import logo from "../../../public/assets/logo.svg";

const Loading = () => {
  return (
    <div className="relative w-screen h-screen">
      {/* Background Image */}
      <Image
        src="/assets/backgrounds/fondo-01.webp"
        fill
        style={{ objectFit: "cover", objectPosition: "center" }}
        priority={true}
        alt="Background"
      />

      {/* Content */}
      <div className="w-full h-full p-[17.5px] xl:p-[28px] 2k:p-[52px] 4k:p-[64px] flex justify-center items-center relative">
        <div className=" w-1/2 h-1/2 md1:w-1/3 md1:h-1/3 xl:w-1/4 xl:h-1/4 2k:w-1/5 2k:h-1/5 flex justify-center items-center relative">
          <Image
            className="spring-rotate"
            fill
            priority={true}
            src={logo}
            alt="Loading"
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
