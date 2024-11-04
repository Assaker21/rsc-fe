export default function useFormatDatetime() {
  function formatDate(date) {
    const now = new Date();

    const diffInMinutes = Math.floor((now - date) / 1000 / 60);

    if (diffInMinutes < 1) {
      return "just now";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 120) {
      return "about an hour ago";
    } else if (diffInMinutes < 24 * 60) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else if (diffInMinutes < 48 * 60) {
      return "yesterday";
    } else if (diffInMinutes < 7 * 24 * 60) {
      return `${Math.floor(diffInMinutes / (60 * 24))} days ago`;
    } else if (diffInMinutes < 30 * 24 * 60) {
      return `${Math.floor(diffInMinutes / (60 * 24 * 7))} weeks ago`;
    } else if (diffInMinutes < 12 * 30 * 24 * 60) {
      return `${Math.floor(diffInMinutes / (60 * 24 * 30))} months ago`;
    } else {
      return `${Math.floor(diffInMinutes / (60 * 24 * 30 * 12))} years ago`;
    }
  }

  return { formatDate };
}
