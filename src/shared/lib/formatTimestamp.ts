export const formatTimestamp = (timestamp: number, short?: boolean): string => {
  const date = new Date(timestamp);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  if (short) {
    if (isToday) {
      return `${hours}:${minutes}`;
    } else if (isYesterday) {
      return 'Yesterday';
    } else {
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'long' });
      return `${month} ${day}`;
    }
  }

  if (isToday) {
    return `Today, ${hours}:${minutes}`;
  } else if (isYesterday) {
    return `Yesterday, ${hours}:${minutes}`;
  } else {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    return `${day} ${month}, ${hours}:${minutes}`;
  }
};
