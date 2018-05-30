const products = [
  {
    id: 1,
    image: {
      url: 'https://cataas.com/cat/says/Happy!',
      description: 'A very happy cat',
    },
    name: 'Happy Cat',
    price: 399,
  },
  {
    id: 2,
    image: {
      url: 'https://cataas.com/cat/says/Grumpy!',
      description: 'A very grumpy cat',
    },
    name: 'Grumpy Cat',
    price: 99,
  },
  {
    id: 3,
    image: {
      url: 'https://cataas.com/cat/says/Sad!',
      description: 'A very sad cat',
    },
    name: 'Sad Cat',
    price: 139,
  },
  {
    id: 4,
    image: {
      url: 'https://cataas.com/cat/says/Lucky!',
      description: 'A very lucky cat',
    },
    name: 'Lucky Cat',
    price: 1337,
  },
];

export const getAll = () => {
  return products.slice();
};

export const getById = id => {
  const product = products.find(product => product.id === id);
  if (!product) {
    return null;
  }
  return Object.assign({}, product);
};

export default { getAll, getById };
