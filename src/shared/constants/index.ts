import {Dayjs} from 'dayjs';
import * as dayjsModule from 'dayjs';
import dayJsDefault from 'dayjs'

export const dateFormat = 'MMM D';
export const DAY_JS = process.env.NODE_ENV === 'production' ? dayJsDefault : dayjsModule
export const overdueDate = (date: string): boolean => {
  return DAY_JS(date).isBefore(DAY_JS().format(dateFormat));
};

export const dateToFormat = (date: Dayjs) => {
  return date.format(dateFormat)
}

export const TODAY = dateToFormat(DAY_JS())

export const INBOX_LINK = 'inbox';
export const TODAY_LINK = 'today';
export const TAGS_LINK = 'tags';
