import dayjs from 'dayjs';

export const dateFormat = 'MMM D'

export const overdueDate = (date: string): boolean => {
  return dayjs(date).isBefore(dayjs().format(dateFormat));
};
