let cartItems = [];

export const getAll = () => {
  return cartItems.slice();
};

export const clear = () => {
  cartItems = [];
  return getAll();
};

export const getById = (id) => {
  const cartItem = cartItems.find((cartItem) => cartItem.id === id);
  if (!cartItem) {
    return null;
  }
  return Object.assign({}, cartItem);
};

export const insert = (id, quantity = 1) => {
  cartItems.push({ id, quantity });
  return getAll();
};

export const update = (id, quantity = 1) => {
  const cartItem = cartItems.find((item) => item.id === id);
  cartItem.quantity += quantity;
  return getAll();
};

export const remove = (id) => {
  const cartItemIndex = cartItems.findIndex((item) => item.id === id);
  cartItems.splice(cartItemIndex, 1);
  return getAll();
};

export default {
  getAll,
  clear,
  getById,
  insert,
  update,
  remove,
};
