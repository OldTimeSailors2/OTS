export function formatSongTitle(raw = "") {
  if (!raw) return "";

  let title = String(raw).split("/").pop() || "";

  title = title.replace(/\.[^/.]+$/, "");
  title = title.replace(/_/g, " ");
  title = title.replace(/-/g, " ");
  title = title.replace(/\s+/g, " ").trim();

  title = title
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return title;
}