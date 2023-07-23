import {Dayjs} from 'dayjs';
import * as dayjsModule from 'dayjs';
import dayJsDefault from 'dayjs'

export const dateFormat = 'MMM D';
const dayjs = process.env.NODE_ENV === 'production' ? dayJsDefault : dayjsModule
export const overdueDate = (date: string): boolean => {
  return dayjs(date).isBefore(dayjs().format(dateFormat));
};

export const dateToFormat = (date: Dayjs) => {
  return date.format(dateFormat)
}

export const TODAY = dateToFormat(dayjs())

export const INBOX_LINK = 'inbox';
export const TODAY_LINK = 'today';
export const TAGS_LINK = 'tags';
