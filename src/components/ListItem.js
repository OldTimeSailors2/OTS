import Link from "next/link";
import Image from "next/image";

const formatDateOrRange = (dateInput) => {
  try {
    // Helper function to format a single date
    const formatDate = (dateString) => {
      const [day, month, year] = dateString.split("/");
      const fullYear = year.length === 2 ? `20${year}` : year; // Handle 2-digit years
      const date = new Date(`${fullYear}-${month}-${day}`);
      if (isNaN(date)) throw new Error("Invalid date format");
      const options = { day: "2-digit", month: "long" };
      return new Intl.DateTimeFormat("en-US", options).format(date).replace(",", "");
    };

    // Check if input is a range (contains ' - ')
    if (dateInput.includes(" - ")) {
      const [startDate, endDate] = dateInput.split(" - ");
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);
      return `${formattedStartDate} - ${formattedEndDate}`;
    } else {
      // Single date case
      return formatDate(dateInput);
    }
  } catch (error) {
    console.error(error.message);
    return "Invalid Date";
  }
};

const ListItem = ({ event }) => {
  let longDate = formatDateOrRange(event.date);
  return (
    <div className="relative border-b-3 border-lightRed py-2 mr-[29.18px] ml-[32.42px] md:mx-[5%]">
      <div className="flex justify-between items-center">
        <div className="space-y-0 md:space-y-1 pr-2 w-3/4">
          <div className="flex items-baseline gap-1">
            <span
              className="text-[10px] text-darkBlue font-txt font-bold  xs:text-[14px] md:text-3xl truncate
            "
            >
              {longDate}
            </span>
            <span className="text-[10.5px] font-txt text-darkBlue xs:text-[7.6px] md:text-2xl truncate">- {event.gigStartTime}</span>
            <span className="text-[10px] font-txt text-darkBlue xs:text-[7.6px] md:text-2xl truncate">- {event.gigFinishTime}</span>
          </div>
          <h2 className="text-[12px] xs:text-[26px] md:text-[42px] font-titles text-lightRed leading-none ">{event.event.toLowerCase()}</h2>
          <p className="text-[11px] xs:text-[9.83px] text-darkBlue  font-txt  md:text-3xl">{event.location}</p>
        </div>
        <Image
          src={"/assets/+info.png"}
          width={108.12}
          height={31.52}
          onClick={() => (window.location.href = `/tickets/${event.event.replace(/\s+/g, "-").toLowerCase()}`)}
        ></Image>
        {/* <button
          onClick={() => (window.location.href = `/tickets/${event.event.replace(/\s+/g, "-").toLowerCase()}`)}
          className="flex items-center justify-center bg-ticketShape bg-cover bg-center bg-no-repeat h-[30px] w-[130px] xs:w-[130px] xs:h-[33px] md:h-[50px] md:w-[180px] lg:w-[220px] lg:h-[60px] 1xl:h-[65px] md:w-1/8 lg:w-1/10 mb-1"
        >
          <p className="text-center text-[25px] xs:text-[24px] md:text-[38px] lg:text-[42px] 1xl:text-[43px] font-txt font-bold uppercase text-beige">
            + info
          </p>
        </button> */}
      </div>
    </div>
  );
};

export default ListItem;
