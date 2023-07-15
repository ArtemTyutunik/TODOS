import {ITodo} from '@shared/interfacesAndTypes';
import dayjs from 'dayjs';


const sortTodosByProperty = (sortType: string, todos: ITodo[]) => {
  switch (sortType) {
    case 'name': {
      return [...todos].sort((first, second) => first.label.localeCompare(second.label))
    }
    case 'date': {
      return [...todos].sort((first, second) => compareDates(first.date, second.date))
    }
    case 'priority': {
      return [...todos].sort((first, second) => {
        const firstPriority = Number(first.priority)
        const secondPriority = Number(second.priority)

        if (isNaN(firstPriority) || isNaN(secondPriority)) {
          return -1
        }

        return firstPriority - secondPriority
      })
    }
    default: return todos
  }
}

export default sortTodosByProperty


const compareDates = (first: string | undefined, second: string | undefined): number => {
  if (dayjs(first).isAfter(second)) {
    return 1
  } else if (dayjs(first).isSame(second)) {
    return 0
  } else return -1
}
