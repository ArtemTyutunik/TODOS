import {IFavorite} from '@shared/interfacesAndTypes';
import sortTodosByProperty from './sortTodosByProperty/sortTodosByProperty'

export const getBoolValueFromLocalStorage = (key: string) => {
  const currentValue = localStorage.getItem(key)
  if (currentValue === null) return false

  return currentValue !== 'false'
}

export const configureFavoriteItem = (type: 'tag' | 'filter', itemId: string): IFavorite => {
  return {
    type: type,
    itemId: itemId,
  }
}

export const itemAlreadyExist = <T>(list: T[], value: string, currentItem: T): boolean => {
  //@ts-ignore
  return list.find((item) => item.name.trim() === value.trim() && item?.id !== currentItem.id)
}

export {
  sortTodosByProperty,
}
