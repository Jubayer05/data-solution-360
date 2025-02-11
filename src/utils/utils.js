export function extractVideoId(url) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|.*v=)|youtu\.be\/)([^&\n?#]+)/;
  const match = url?.match(regex);
  return match ? match[1] : null;
}
