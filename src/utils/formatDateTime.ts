import dayjs from 'dayjs';

export default function formatDateTime(dateTime: string, omitTime = false) {
  if (omitTime) {
    return dayjs(dateTime).format('DD-MM-YYYY');
  }
  return dayjs(dateTime).format('DD-MM-YYYY HH:mm:ss');
}
