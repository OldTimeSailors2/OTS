export const fetchEvents = async () => {
  const res = await fetch("/api/event");
  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }
  return res.json();
};
