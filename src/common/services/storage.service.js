/**
 * Sets a local storage item
 * @param key
 * @param value
 */
const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify({ value }));
};

/**
 * Gets a local storage item
 * @param key
 * @returns item
 */
const getLocalStorageItem = key => {
  let item;
  if (localStorage.getItem(key)) {
    item = JSON.parse(localStorage.getItem(key));
  }
  return item ? item.value : undefined;
};

export { getLocalStorageItem, setLocalStorageItem };
