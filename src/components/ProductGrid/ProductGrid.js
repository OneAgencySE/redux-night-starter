import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Product from '../Product';

import './ProductGrid.css';

const ProductGrid = ({ className, products, onAddToCart }) => (
  <div className={classnames('ProductGrid', className)}>
    {products.map(product => (
      <Product
        className="ProductGrid__product"
        key={product.id}
        product={product}
        onAddToCart={onAddToCart}
      />
    ))}
  </div>
);

ProductGrid.propTypes = {
  className: PropTypes.string,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.shape({
        url: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductGrid;
