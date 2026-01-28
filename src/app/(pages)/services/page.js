import dynamic from "next/dynamic";
import Link from "next/link";
import ServicesDeco from "@/components/ServicesDeco";
import MainDiv from "@/components/MainDiv";

export const metadata = {
  title: "Services",
  description: "Here you'll find all the services we provide!",
  openGraph: {
    title: "Services",
    description: "Here you'll find all the services we provide!",
    images: [
      {
        url: "/assets/opengraph-image.png",
        alt: "Old Time Sailors",
      },
    ],
  },
};

const ServicesDisplay = dynamic(() => import("@/components/ServicesDisplay"), {
  ssr: false,
  loading: () => (
    <div className="w-full px-0.5 min-[600px]:px-3 xl:px-4 flex max-xl:justify-center xl:flex-col xl:items-center">
      <div className="flex flex-col justify-between xl:w-full xl:flex-row xl:justify-evenly xl:px-3 2xl:px-4 fullHD:px-6 2k:px-9 4k:px-16">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="services-hexagon !bg-transparent !before:!bg-transparent"
          />
        ))}
      </div>
      <div className="services-octagon !bg-transparent !before:!bg-transparent" />
    </div>
  ),
});

// ✅ FETCH SIMPLE desde URL pública (NO Cloudinary SDK, NO Admin API)
const fetchServices = async () => {
  try {
    const jsonUrl = process.env.NEXT_PUBLIC_SERVICES_JSON_URL;
    if (!jsonUrl) return [];

    const res = await fetch(jsonUrl, { cache: "no-store" });
    if (!res.ok) return [];

    const services = await res.json();

    return Array.isArray(services)
      ? services.map((s, idx) => ({
          id: s.id ?? s.slug ?? String(idx),
          title: s.title ?? s.name ?? "",
          description: s.description ?? s.text ?? "",
          icon: s.icon ?? s.image ?? s.iconUrl ?? "",
          ...s,
        }))
      : [];
  } catch {
    return [];
  }
};

const Services = async () => {
  const services = await fetchServices();

  return (
    <MainDiv className="w-screen h-dvh max-xl:fixed bg-beigePatternMobile md1:bg-beigePatternTablet xl:bg-beigePattern bg-contain xl:bg-cover flex flex-col justify-center gap-4 pt-[77px] pb-[17.5px]">
      <ServicesDisplay services={services} />

      <div className="w-full relative flex mt-4">
        <ServicesDeco />
        <div className="absolute inset-0 flex justify-center items-center">
          <Link
            href="mailto:captainnicholasmoffat@oldtimesailors.com"
            target="_blank"
          >
            <h2 className="services-octagon-link underline text-beige text-2xl font-titles">
              hire our services!
            </h2>
          </Link>
        </div>
      </div>
    </MainDiv>
  );
};

export default Services;
