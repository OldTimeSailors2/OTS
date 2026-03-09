import Link from "next/link";
import { FaCalendar, FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/formatDate";
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
