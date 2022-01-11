import dayjs from "dayjs";
import "dayjs/locale/id";

function utcToLocal(date: string, formatDate: string): string {
  return dayjs(date).locale("id").format(formatDate);
}

export { utcToLocal };
