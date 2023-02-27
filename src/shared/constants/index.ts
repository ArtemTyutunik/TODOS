import dayjs, {Dayjs} from 'dayjs';

export const dateFormat = 'MMM D'

export const overdueDate = (date: string): boolean => {
  return dayjs(date).isBefore(dayjs().format(dateFormat));
};

export const dateToFormat = (date: Dayjs) => {
  return date.format(dateFormat)
}
