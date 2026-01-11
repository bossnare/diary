import { format, isToday, isYesterday } from 'date-fns';

export const dateUltraFormat = (date: string | Date | number) => {
  if (isToday(date)) {
    return format(date, 'hh:mm a');
  }
  if (isYesterday(date)) {
    return 'Yesterday';
  }
  return format(date, 'MMM d, yyyy');
};

export const dateFormatLong = (date: string | Date | number) => {
  if (!date) return;
  return format(date, "EEE, MMMM d, yyyy 'at' h:mm a");
};
