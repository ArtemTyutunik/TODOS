import dayjs, {Dayjs} from 'dayjs';

export const dateFormat = 'MMM D';

export const overdueDate = (date: string): boolean => {
  return dayjs(date).isBefore(dayjs().format(dateFormat));
};

export const dateToFormat = (date: Dayjs) => {
  return date.format(dateFormat)
}

export const TODAY = dateToFormat(dayjs())

export const INBOX_LINK = 'inbox';
export const TODAY_LINK = 'today';
export const FILTERS_AND_TAGS_LINK = 'filters-and-tags';
