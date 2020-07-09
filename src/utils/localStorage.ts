const localStorageGet = (item: string, defaultValue: string = '') => {
  const localStorageItem = localStorage.getItem(item)

  return localStorageItem || defaultValue
}

export default localStorageGet
