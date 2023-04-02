import { format } from "date-fns";

export function FormatDateHoursMins(dateString: string) {
  const dateInNewFormat = new Date(dateString);

  return format(dateInNewFormat, "d 'of' LLLL',' HH:mm");
};

export function FormatDateYear(dateString: string | null) {
  const fixForNullDate = dateString == null ? new Date().toString() : dateString;
  const dateInNewFormat = new Date(fixForNullDate);

  return format(dateInNewFormat, "d 'of' LLLL',' yyyy");
};