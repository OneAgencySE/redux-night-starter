import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Thumbnail from '../Thumbnail';
import Price from '../Price';

import './Product.css';

class Product extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { className, product } = this.props;
    return (
      <div className={classnames('Product', className)}>
        <Thumbnail
          {...product.image}
          caption={product.name}
          width="fill"
          height="xxxl"
          position="top"
        />
        <Price className="Product__price">{product.price}</Price>
      </div>
    );
  }
}

Product.propTypes = {
  className: PropTypes.string,
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.shape({
      url: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default Product;
