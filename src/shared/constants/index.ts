import dayjs from "dayjs";

export const dateFormat = 'MMM D'

export const OverdueDate = (date: string): boolean => {
    return dayjs(date).isBefore(dayjs().format(dateFormat))
}