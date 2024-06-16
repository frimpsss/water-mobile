export function getGreeting(): string {
  const now = new Date();
  const hours = now.getHours();

  if (hours < 12) {
    return "Good morning";
  } else if (hours < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}
export function formatDate(date: Date): string {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const dateToCompare = new Date(date);

  if (dateToCompare.toDateString() === today.toDateString()) {
    return "Today";
  } else if (dateToCompare.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return dateToCompare.toLocaleDateString(undefined, options);
  }
}
