import Link from "next/link";
import { FaCalendar, FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import { useRouter } from "next/navigation";
const formatDate = (inputDate) => {
    // Parse the input date
    const [day, month, year] = inputDate.split("/").map(Number);
    // Create a Date object
    // Note: months in JavaScript Date are 0-indexed, so we subtract 1 from the month
    const date = new Date(year, month - 1, day);
    // Array of day names
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    // Array of month names
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // Format the date
    const formattedDate = `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    return formattedDate;
};
export const PowerDesign = ({data})=>{
    const { event, location, date, ticketsURL, venueInfo, gigStartTime, gigFinishTime } = data;
    const formattedDate = formatDate(date);
    const eventURL = "/eventURL";
    const router = useRouter();
    return (
        <>
        <div className="relative"> 
        
        </div>
        </>
    );
}
export default PowerDesign;
