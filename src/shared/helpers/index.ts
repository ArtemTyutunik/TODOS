import {IFavorite} from '@shared/interfacesAndTypes';

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
