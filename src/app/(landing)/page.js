import Image from "next/image";
import Link from "next/link";
import Social from "@/components/Social";


export default function Home() {
  return (
    <div
      className="relative min-h-screen flex flex-col bg-cover bg-[position:center_65%] bg-no-repeat w-full"
      style={{
        backgroundImage: "url('/background.svg')",
      }}
    >
      {/* CONTENIDO */}
      <main className="flex-1 w-full">
        <div className="w-full p-5 space-y-4 mx-auto">
          {/* Fila 1 - 3 columnas separadas y alineadas L / C / R */}
          <div className="flex justify-between gap-4 w-full">
            {/* Columna 1 - Izquierda */}
            <div className="flex-1 flex flex-col items-start gap-3">
              <Image
                src="/home/descripcion.svg"
                alt="Descripción"
                width={140}
                height={140}
                sizes="(min-width: 1024px) 140px, (min-width: 768px) 110px, 64px"
                className="w-16 md:w-28 lg:w-36 h-auto"
              />
              <Link href="/memberships" className="inline-block">
                <Image
                  src="/home/memberships.svg"
                  alt="Memberships"
                  width={140}
                  height={140}
                  sizes="(min-width: 1024px) 140px, (min-width: 768px) 110px, 64px"
                  className="w-16 md:w-28 lg:w-36 h-auto"
                />
              </Link>
            </div>

            {/* Columna 2 - Centro */}
            <div className="flex-1 flex justify-center">
              <Link href="/" className="inline-block">
                {/*
                <Image
                  src="/home/logo.svg"
                  alt="Logo"
                  width={320}
                  height={320}
                  sizes="(min-width: 1024px) 320px, (min-width: 768px) 260px, 224px"
                  className="w-56 md:w-64 lg:w-80 h-auto mx-auto"
                />
                */}
              </Link>
            </div>

            {/* Columna 3 - Derecha */}
            <div className="flex-1 flex flex-col items-end">
              {[
                { href: "/media", label: "media", bg: "bg-cream", text: "txt-darkBlue" },
                { href: "/tickets", label: "tickets", bg: "bg-darkBlue", text: "txt-red" },
                { href: "https://oldtimesailors.co.uk", label: "merch", bg: "bg-red", text: "txt-cream" },
                { href: "/reviews", label: "reviews", bg: "bg-darkBlue", text: "txt-cream" },
                { href: "/our-clients", label: "our clients", bg: "bg-cream", text: "txt-red" },
                { href: "/services", label: "services", bg: "bg-red", text: "txt-cream" },
              ].map(({ href, label, bg, text }) => (
                <Link
                  key={href}
                  href={href}
                  className={`octagon my-1 font-titles md:text-2xl flex items-center justify-center ${bg} ${text} w-28 md:w-36 h-8`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Fila 2 - barra social (solo mobile) */}
          <div className="w-full space-y-4 flex flex-col">
            <div className="flex justify-center md:hidden">
              <Social />
            </div>

            {/* ✅ Galería mosaicos: COMENTADA por ahora */}
            {/*
            <div className="grid grid-cols-2 gap-2 md:hidden">
              {[
                "/home/mosaico-1.png",
                "/home/mosaico-2.png",
                "/home/mosaico-3.png",
                "/home/mosaico-4.png",
              ].map((src, i) => (
                <div key={src} className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={src}
                    alt={`Galería ${i + 1}`}
                    fill
                    priority={i < 2}
                    sizes="(max-width: 768px) 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            */}
          </div>
        </div>
      </main>

      {/* FOOTER: Social en desktop */}
      <footer className="hidden md:flex mt-auto w-full py-4">
        <div className="w-full px-4 flex justify-center">
          <Social className="mx-auto" />
        </div>
      </footer>

      {/* Borde */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-40 border-[0.8em] border-solid"
        style={{ borderColor: "#1d344a" }}
      />
    </div>
  );
}
