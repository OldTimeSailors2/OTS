import Image from "next/image";

const ServicesDeco = () => {
  return (
    <Image
      src="/assets/deco-services-2.svg"
      srcSet="/assets/deco-services-1.svg 1280w"
      width={45}
      height={0}
      className="grow"
      alt="Services decoration"
    />
  );
};

export default ServicesDeco;
