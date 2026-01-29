import dayjs from "daysjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export function toDateFormat(date) {
  return dayjs(date).format("MM-DD-YYYY");
}

export function toDateTimeFormat(date) {
  return dayjs(date).format("MM-DD-YYYY HH:mm:ss");
}

export function convertISOToMST(
  date,
  format = "ddd MMM DD HH:mm:ss [MST] YYYY"
) {
  const dayjsUtc = dayjs.utc(date);
  const dayjsMst = dayjsUtc.tz("America/Denver");
  return dayjsMst.format(format);
}

export function toSlashDateFormat(data) {
  return dayjs(data).format("MM/DD/YYYY");
}
