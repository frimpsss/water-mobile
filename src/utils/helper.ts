import _ from "lodash";

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
export const groupByDate = (array: any[]) => {
  const grouped = _.groupBy(array, (obj) => obj.createdAt.split("T")[0]);
  return Object.keys(grouped).map((date) => ({
    date,
    notifications: grouped[date],
  }));
};

export const getCurrentDateInFormat = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  // const seconds = date.getSeconds();
  // Determine AM or PM
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;
  const time = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${ampm}`;
  // :${seconds.toString().padStart(2, "0")}

  return `${month} ${day}, ${year}  ${time}`;
}
