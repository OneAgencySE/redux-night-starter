import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import createDebugger from 'debug';

import products from './products';
import cartItems from './cartItems';

const mock = new MockAdapter(axios);
const debug = createDebugger('recat:api');

const parseIdFromUrl = url =>
  parseInt(url.substring(url.lastIndexOf('/') + 1), 10);

mock.onGet('/api/products').reply(() => {
  debug('GET: /api/products');
  const result = products.getAll();
  return [200, result];
});

mock.onGet(/\/api\/products\/\d+/).reply(({ url }) => {
  const id = parseIdFromUrl(url);
  debug(`GET: /api/products/${id}`);
  const product = products.getById(id);
  if (!product) {
    return [404];
  }
  return [200, product];
});

mock.onGet('/api/cart-items').reply(() => {
  debug('GET: api/cart-items');
  const result = cartItems.getAll();
  return [200, result];
});

mock.onDelete('/api/cart-items').reply(() => {
  debug('DELETE: api/cart-items');
  const result = cartItems.clear();
  return [200, result];
});

mock.onPost(/\/api\/cart-items\/\d+/).reply(({ url, data }) => {
  const id = parseIdFromUrl(url);
  debug(`POST: /api/cart-items/${id}`);
  const { quantity } = JSON.parse(data);

  const product = products.getById(id);
  if (!product) {
    return [404];
  }

  const cartItem = cartItems.getById(id);
  if (cartItem) {
    return [409];
  }

  const result = cartItems.insert(id, quantity);
  return [201, result];
});

mock.onPut(/\/api\/cart-items\/\d+/).reply(({ url, data }) => {
  const id = parseIdFromUrl(url);
  debug(`PUT: /api/cart-items/${id}`);
  const { quantity } = JSON.parse(data);

  const cartItem = cartItems.getById(id);
  if (!cartItem) {
    return [404];
  }

  const result = cartItems.update(id, quantity);
  return [200, result];
});

mock.onDelete(/\/api\/cart-items\/\d+/).reply(({ url }) => {
  const id = parseIdFromUrl(url);
  debug(`DELETE: /api/cart-items/${id}`);

  const cartItem = cartItems.getById(id);
  if (!cartItem) {
    return [404];
  }

  const result = cartItems.remove(id);
  return [200, result];
});
