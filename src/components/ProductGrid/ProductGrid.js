import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Product from '../Product';
import Spinner from '../Spinner';

import './ProductGrid.css';

const ProductGrid = ({ className, products, loading }) => {
  if (loading) {
    return <Spinner className="ProductGrid__spinner" size="xxl" />;
  }
  if (products.length === 0) {
    return null;
  }
  return (
    <div className={classnames('ProductGrid', className)}>
      {products.map((product) => (
        <Product
          className="ProductGrid__product"
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};

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
  loading: PropTypes.bool,
  notification: PropTypes.shape({
    type: PropTypes.oneOf(['info', 'success', 'warning', 'error']).isRequired,
    message: PropTypes.string.isRequired,
  }),
};

export default ProductGrid;
