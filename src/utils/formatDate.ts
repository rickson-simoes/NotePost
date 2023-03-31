import { format } from "date-fns";

export function FormatDate(dateString: string) {
  const dateInNewFormat = new Date(dateString);

  return format(dateInNewFormat, "d 'of' LLLL',' HH:mm");
};