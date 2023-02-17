
export const getBoolValueFromLocalStorage = (key: string) => {
  const currentValue = localStorage.getItem(key)
  if (currentValue === null) return false

  return currentValue !== 'false'
}
