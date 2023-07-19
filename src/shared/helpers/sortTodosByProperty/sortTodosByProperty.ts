import {ITodo} from '@shared/interfacesAndTypes';
import dayjs from 'dayjs';


const sortTodosByProperty = (sortType: string, todos: ITodo[], order: string) => {
  switch (sortType) {
    case 'name': {
      return [...todos].sort((first, second) => order === 'ascending' ?
          first.label.localeCompare(second.label) : second.label.localeCompare(first.label))
    }
    case 'date': {
      return [...todos].sort((first, second) => compareDates(first.date, second.date, order))
    }
    case 'priority': {
      return [...todos].sort((first, second) => {
        const firstPriority = Number(first.priority)
        const secondPriority = Number(second.priority)

        if (isNaN(firstPriority) || isNaN(secondPriority)) {
          return -1
        }

        return order === 'ascending' ? secondPriority - firstPriority : firstPriority - secondPriority
      })
    }
    default: return todos
  }
}

export default sortTodosByProperty


const compareDates = (first: string | undefined, second: string | undefined, order: string): number => {
  if (dayjs(first).isAfter(second)) {
    return order === 'ascending' ? 1 : -1
  } else if (dayjs(first).isSame(second)) {
    return 0
  } else return order === 'ascending' ? -1 : 1
}

