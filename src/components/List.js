"use client";

import ListItem from "./ListItem";
const parseDate = (dateString) => {
  const [day, month, year] = dateString.split("/"); // Split by '/'
  return new Date(`${year}-${month}-${day}`); // Reorder to yyyy-mm-dd
};

const List = ({ markersList }) => {
  let sorted = markersList.sort((a, b) => {
    const dateA = parseDate(a.date); // Convert dd/mm/yyyy to Date
    const dateB = parseDate(b.date);
    return dateA - dateB; // Compare dates
  });
  return (
    <div className="w-full h-full flex-1 pt-10 md:pt-16 overflow-auto">
      {sorted.map((item, index) => (
        <ListItem event={item} key={index}></ListItem>
      ))}
    </div>
  );
};

export default List;
