export const getBoolean = itemName => localStorage.getItem(itemName) === 'true';
export const getNumber = itemName => {
  const parsedValue = Number.parseInt(localStorage.getItem(itemName), 10);
  return isNaN(parsedValue) ? 0 : parsedValue;
};
export const getSettings = () => ({
  delayResponse: getNumber('delayResponse'),
  getProductsNetworkError: getBoolean('getProductsNetworkError'),
  getProductNetworkError: getBoolean('getProductNetworkError'),
  getCartItemsNetworkError: getBoolean('getCartItemNetworkError'),
  deleteCartItemsNetworkError: getBoolean('deleteCartItemsNetworkError'),
  deleteCartItemNetworkError: getBoolean('deleteCartItemNetworkError'),
  postCartItemNetworkError: getBoolean('postCartItemNetworkError'),
  putCartItemNetworkError: getBoolean('putCartItemNetworkError'),
});

export default { getBoolean, getNumber, getSettings };
