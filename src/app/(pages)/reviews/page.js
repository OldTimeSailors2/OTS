import Image from "next/image";
import Link from "next/link";
import MainDiv from "@/components/MainDiv";
import MobileSeparator from "@/components/MobileSeparator";

export const metadata = {
  title: "Reviews",
  description: "Read reviews of our show and share your experience",
  openGraph: {
    title: "Reviews",
    description: "Read reviews of our show and share your experience",
    images: [
      {
        url: "/assets/opengraph-image.png",
        alt: "Old Time Sailors",
      },
    ],
  },
};

const Reviews = () => {
  return (
    <MainDiv className="w-screen h-dvh bg-redPatternMobile md1:bg-redPatternTablet xl:bg-redPattern bg-contain pt-[77px] xs:pt-[92px] sm:pt-[140px] fullHD:pt-[172px] 2k:pt-[204px] 4k:pt-[268px] pb-[18px] md1:pb-[44px] xl:pb-[40px] 2k:pb-[52px] 4k:pb-[64px]">
      <div className="w-full h-full flex justify-between items-stretch font-txt text-beige text-justify pt-2 xl:pt-1 1xl:pt-2 1xxl:p-4 max-w-screen-xl:overflow-auto">
        <div className="relative hidden xl:block xl:mx-2">
          <Image
            src="/assets/reviews-line-desktop.svg"
            alt="Reviews decoration"
            width={10}
            height={10}
            style={{ objectFit: "cover" }}
            className="h-full w-auto"
          />
        </div>

        {/*column 1*/}
        <MobileSeparator>
          <article className="flex-grow flex flex-col pt-4 max-xl:px-3 xl:overflow-hidden">
            {/*Title for very small screens*/}
            <h2 className=" bg-darkBlue w-fit text-[15px] min-[370px]:hidden">
              The Old Time Sailors - Sunday 26th September
            </h2>
            <h2 className=" mt-0.5 bg-darkBlue w-fit text-[15px] min-[370px]:hidden">
              2021
            </h2>

            <h2 className="hidden min-[370px]:block bg-darkBlue w-fit text-[15px] xs2:text-[17px] md1:text-3xl md2:text-4xl lg:text-5xl xl:text-[17px] xl:leading-5 1xl:text-base 1xxl:text-[19px] fullHD:text-2xl 2k:text-4xl 4k:text-[54px] 4k:leading-snug">
              The Old Time Sailors - Sunday 26th September 2021
            </h2>
            <p className=" my-1 text-[14px] leading-[18px] xs2:text-[17px] xs2:leading-5 md1:text-lg md:text-xl md2:text-2xl lg:text-3xl xl:text-[14px] xl:leading-[16px] 1xl:text-[14px] 1xl:leading-[14px] 1xxl:text-[17px] 1xxl:leading-4 4xl:text-[18px] 4xl:leading-5 fullHD:text-[20px] fullHD:leading-6 2k:text-[32px] 2k:leading-9 4k:text-[45px] 4k:leading-[53px]">
              "It was the best of times, it was the worst of times,". For me,
              Dickens' immortal words describe Sundays perfectly. For many
              Sunday is a day of rest yet we end up following a set pattern,
              week after week. Following my usual Sunday routine, I ambled down
              to my local pub. A fellow local greeted me on arrival with "You've
              just missed the most amazing entertainment! But they may be coming
              back!" They did. They turned my Sunday upside down. Capsized it if
              you will.
            </p>

            <div className="flex relative w-full h-[25dvh] xs:h-[26dvh] xs2:h-[27dvh] max-xl:flex-shrink-0 xl:h-full rounded-sm">
              <Image
                src="/assets/reviews.webp"
                fill={true}
                sizes="(max-width: 1280px) 100vw, 33vw"
                className="object-cover xl:object-contain"
                priority={true}
                alt="Reviews photo"
              />
            </div>

            <p className="hidden xl:block xl:mt-1 md1:text-lg md:text-xl md2:text-2xl lg:text-3xl xl:text-[14px] xl:leading-[16px] 1xl:text-[14px] 1xl:leading-[14px] 1xxl:text-[17px] 1xxl:leading-4 4xl:text-[18px] 4xl:leading-5 fullHD:text-[20px] fullHD:leading-6 2k:text-[32px] 2k:leading-9 4k:text-[45px] 4k:leading-[53px]">
              That Sunday afternoon, the pub sailed back into the 19th century
              and was treated to over three hours of outstanding traditional
              seafaring music played and sung by a seventeen piece band, all
              dressed in 19th century style costumes, plus one guest tin
              whistler. The pub joined in when the locals knew the chorus. This
              unplanned, totally impromptu performance was a tour de force of
              professional musicianship executed by a band clearly showing its
              collective passion for its musical A genre. Three hour long sets
              of exuberant entertaining left
            </p>
            {/*Mobile/Tablet content */}

            <p className="mt-2 text-[14px] leading-[18px] xs2:text-[17px] xs2:leading-5  md1:text-lg md:text-xl md2:text-2xl lg:text-3xl xl:hidden">
              That Sunday afternoon, the pub sailed back into the 19th century
              and was treated to over three hours of outstanding traditional
              seafaring music played and sung by a seventeen piece band, all
              dressed in 19th century style costumes, plus one guest tin
              whistler. The pub joined in when the locals knew the chorus. This
              unplanned, totally impromptu performance was a tour de force of
              professional musicianship executed by a band clearly showing its
              collective passion for its musical A genre. Three hour long sets
              of exuberant entertaining left the pub locals exhausted and
              musically fulfilled. Sadly the band weighed anchor and sailed back
              to North wales. Everyone in the audience recognised that they had
              witnessed an extraordinary and unexpected event that had
              transformed a Sunday afternoon. Especially the pub landlord; he
              was the guest tin whistler! It is now Tuesday 28th September, and
              a warm euphoria pervades the pub as the locals continue to
              reminisce and share mobile video clips, continue to talk in wonder
              about the unforgettable Sunday when the Old Time Sailors moored up
              to the White Hart in Bicester, Oxfordshire."
            </p>
            <address className="text-darkBlue self-end not-italic md1:text-lg md2:text-xl my-3 xl:hidden">
              Harry Magnay
            </address>

            <Link
              href="https://www.facebook.com/groups/425503919429472"
              target="_blank"
              className="w-full my-2 xl:hidden"
            >
              <div
                className="reviews-octagon before:bg-redPattern before:bg-contain text-darkBlue
               text-[14px] min-[375px]:text-[13px]  xs:text-[15px] iphone-1:max-[393px]:text-[14px] xs2:text-base iphone-2:text-[15px]
                md1:text-2xl md2:text-3xl lg:text-4xl max-md1:font-semibold  font-extralight font-titles flex justify-center items-center "
              >
                <span className="z-10">
                  thousands of audience reviews on our
                </span>{" "}
                <span className="z-10 ml-1.5 text-beige underline underline-offset-4">
                  fan page
                </span>
              </div>
            </Link>

            <h2 className="bg-darkBlue w-fit mt-6 text-[17px] xs2:text-xl md1:text-3xl md2:text-4xl lg:text-5xl leading-5  xl:hidden">
              "The White Hart welcomes the return of the
            </h2>
            <h3 className="bg-darkBlue w-fit mt-1 text-[17px] xs2:text-xl md1:text-3xl md2:text-4xl lg:text-5xl leading-5 xl:hidden">
              {" "}
              Sailorette and her crew."
            </h3>

            <p className="mt-2 text-[14px] leading-[18px] xs2:text-[17px] xs2:leading-5 md1:text-lg md:text-xl md2:text-2xl lg:text-3xl xl:hidden">
              Eight bells has just been struck in the White Hart. It is the end
              of the afternoon watch (16:00 hours). The bar is starting to fill
              up with eager customers, animated chatter, all feeling a frisson
              of excitement and anticipation although the Sailorette is not
              expected to sail into Bicester for another three or four hours.
              Rather like a flock of gulls breathlessly awaiting the return of a
              successful fishing fleet filled to the gunwales with its haul.
              After casting off in September, the Old Time Sailors had continued
              their voyage of discovery. Sailing from faraway Edinburgh to
              Plymouth, Newquay to exotic Matlock Bath, windswept whitby to the
              wilds of Pontardulais. That morning, the Sailorette had been
              moored alongside HMS Warrior in Portsmouth before returning to the
              White Hart. The ship docked just before seven bells on the dog
              watch. Looking around, the audience had grown much larger,
              augmented with wives, girlfriends, partners, relatives and those
              who had heard about the legendary performance. By now the sun was
              well over the yardarm, consequently the expectant masses exuded a
              warm, cordial, inviting atmosphere. The sight of the seventeen
              crew of the Sailorette caused the buzz in the pub to evaporate
              into an excited electrified hush. We had returned to the 1800's
              once more. And suddenly they were away with their first song
              causing an eruption of smiles and vigorous nods from the
              experienced locals. Yet again this was an emotionally exhilarating
              experience for all. During the break, the White Hart was rich with
              enthusiastic conversations; clearly the reaction of an extremely
              appreciative audience and confirmed when I walked around and
              sought opinions. Not only was the pub Landlord in full swing with
              his tin whistle, but the pub discovered another local star,
              George. George knew all the songs. He was word perfect. It wasn't
              long before he was standing shoulder to shoulder with the Old Time
              Sailors singing his heart out. He was lucky that he wasn't press
              ganged! Once again, the Old Time Sailors landed a haul of
              outstanding unique entertainment, anchored by their excellent
              musicianship, and shipped by a company displaying an intense
              passion for this folk and maritime musical genre. As Robert Louis
              Stevenson's Squire Trelawney would have said, "Treasure indeed!"
            </p>

            <address className="text-darkBlue self-end not-italic my-3 md1:text-lg md2:text-xl xl:hidden">
              Harry Magnay
            </address>
            {/*Mobile/Tablet content end */}
          </article>
        </MobileSeparator>
        {/*column 1 end*/}

        <div className="relative hidden xl:block xl:mx-2">
          <Image
            src="/assets/reviews-line-desktop.svg"
            alt="Reviews decoration"
            width={10}
            height={10}
            style={{ objectFit: "cover" }}
            className="h-full w-auto"
          />
        </div>

        {/*column 2*/}
        <article className="hidden xl:flex-grow xl:flex xl:flex-col xl:justify-between xl:w-1/3 xl:pt-4">
          <div className="flex flex-col">
            <p className="text-[14px] leading-[16px] 1xl:text-[14px] 1xl:leading-[14px] 1xxl:text-[17px] 1xxl:leading-4 4xl:text-[18px] 4xl:leading-5 fullHD:text-[20px] fullHD:leading-6 2k:text-[32px] 2k:leading-9 4k:text-[45px] 4k:leading-[53px]">
              the pub locals exhausted and musically fulfilled. Sadly the band
              weighed anchor and sailed back to North wales. Everyone in the
              audience recognised that they had witnessed an extraordinary and
              unexpected event that had transformed a Sunday afternoon.
              Especially the pub landlord; he was the guest tin whistler! It is
              now Tuesday 28th September, and a warm euphoria pervades the pub
              as the locals continue to reminisce and share mobile video clips,
              continue to talk in wonder about the unforgettable Sunday when the
              Old Time Sailors moored up to the White Hart in Bicester,
              Oxfordshire."
            </p>

            <address className="text-darkBlue 1xxl:text-lg fullHD:text-xl 2k:text-3xl 4k:text-5xl 4k:leading-[50px] self-end not-italic">
              Harry Magnay
            </address>
          </div>

          <div className="flex flex-col">
            <h2 className="bg-darkBlue w-fit mt-1 xl:mt-1  text-[17px] leading-5 1xxl:text-[19px] fullHD:text-2xl 2k:text-[35px] 2k:leading-9 4k:text-[54px] 4k:leading-[60px]">
              "The White Hart welcomes the return of the Sailorette
            </h2>
            <h3 className="bg-darkBlue w-fit mt-1 text-[17px] leading-5 1xxl:text-[19px] fullHD:text-2xl 2k:text-[35px] 2k:leading-9 4k:text-[54px] 4k:leading-[60px]">
              {" "}
              and her crew."
            </h3>
            <p className=" 1xl:mt-2 text-[14px] leading-[16px] 1xl:text-[14px] 1xl:leading-[14px] 1xxl:text-[17px] 1xxl:leading-4 4xl:text-[18px] 4xl:leading-5 fullHD:text-[20px] fullHD:leading-6 2k:text-[32px] 2k:leading-9 4k:text-[45px] 4k:leading-[53px]">
              Eight bells has just been struck in the White Hart. It is the end
              of the afternoon watch (16:00 hours). The bar is starting to fill
              up with eager customers, animated chatter, all feeling a frisson
              of excitement and anticipation although the Sailorette is not
              expected to sail into Bicester for another three or four hours.
              Rather like a flock of gulls breathlessly awaiting the return of a
              successful fishing fleet filled to the gunwales with its haul.
              After casting off in September, the Old Time Sailors had continued
              their voyage of discovery. Sailing from faraway Edinburgh to
              Plymouth, Newquay to exotic Matlock Bath, windswept whitby to the
              wilds of Pontardulais. That morning, the Sailorette had been
              moored alongside HMS Warrior in Portsmouth before returning to the
              White Hart. The ship docked just before seven bells on the dog
              watch. Looking around, the audience had grown much larger,
              augmented with wives, girlfriends, partners, relatives and those
              who had heard about the legendary performance.
            </p>
          </div>
        </article>
        {/*column 2 end*/}

        <div className="relative hidden xl:block xl:mx-2">
          <Image
            src="/assets/reviews-line-desktop.svg"
            alt="Reviews decoration"
            width={10}
            height={10}
            style={{ objectFit: "cover" }}
            className="h-full w-auto"
          />
        </div>

        {/*column 3*/}
        <article className="hidden xl:flex-grow xl:flex xl:flex-col xl:w-1/3 xl:pt-4 xl:relative">
          <p className="text-[14px] leading-[16px] 1xl:text-[14px] 1xl:leading-[14px] 1xxl:text-[17px] 1xxl:leading-4 4xl:text-[18px] 4xl:leading-5 fullHD:text-[20px] fullHD:leading-6 2k:text-[32px] 2k:leading-9 4k:text-[45px] 4k:leading-[53px]">
            By now the sun was well over the yardarm, consequently the expectant
            masses exuded a warm, cordial, inviting atmosphere. The sight of the
            seventeen crew of the Sailorette caused the buzz in the pub to
            evaporate into an excited electrified hush. We had returned to the
            1800's once more. And suddenly they were away with their first song
            causing an eruption of smiles and vigorous nods from the experienced
            locals. Yet again this was an emotionally exhilarating experience
            for all. During the break, the White Hart was rich with enthusiastic
            conversations; clearly the reaction of an extremely appreciative
            audience and confirmed when I walked around and sought opinions. Not
            only was the pub Landlord in full swing with his tin whistle, but
            the pub discovered another local star, George. George knew all the
            songs. He was word perfect. It wasn't long before he was standing
            shoulder to shoulder with the Old Time Sailors singing his heart
            out. He was lucky that he wasn't press ganged! Once again, the Old
            Time Sailors landed a haul of outstanding unique entertainment,
            anchored by their excellent musicianship, and shipped by a company
            displaying an intense passion for this folk and maritime musical
            genre. As Robert Louis Stevenson's Squire Trelawney would have said,
            "Treasure indeed!"
          </p>

          <address className="text-darkBlue 1xxl:text-lg fullHD:text-xl 2k:text-3xl 4k:text-5xl 4k:leading-[50px] self-end not-italic">
            Harry Magnay
          </address>

          <Link
            href="https://www.facebook.com/groups/425503919429472"
            target="_blank"
            className="absolute bottom-2 left-0 w-full"
          >
            <div className="reviews-octagon before:bg-redPattern before:bg-contain text-darkBlue text-[17px] 1xl:text-lg 1xxl:text-xl fullHD:text-[27px] 2k:text-4xl 4k:text-[55px] font-extralight font-titles flex justify-center items-center ">
              <span className="z-10">thousands of audience reviews on our</span>{" "}
              <span className="z-10 ml-1.5 fullHD:ml-2 4k:ml-3 text-beige underline underline-offset-4">
                fan page
              </span>
            </div>
          </Link>
        </article>

        {/*column 3 end*/}
        <div className="relative hidden xl:block xl:mx-2">
          <Image
            src="/assets/reviews-line-desktop.svg"
            alt="Reviews decoration"
            width={10}
            height={10}
            style={{ objectFit: "cover" }}
            className="h-full w-auto"
          />
        </div>
      </div>
    </MainDiv>
  );
};

export default Reviews;
