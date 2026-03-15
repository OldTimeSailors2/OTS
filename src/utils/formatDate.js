const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const formatDate = (inputDate) => {
  if (!inputDate || typeof inputDate !== "string") return "";
  const [day, month, year] = inputDate.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};
