const formatTime = (secs) => {
  const minutes = Math.floor(secs / 60) || 0;
  const seconds = Math.floor(secs % 60) || 0;
  return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
export default formatTime;
