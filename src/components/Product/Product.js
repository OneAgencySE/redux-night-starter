import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Thumbnail from '../Thumbnail';
import Price from '../Price';
import Counter from '../Counter';
import Button from '../Button';

import './Product.css';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  decreaseQuantity() {
    if (this.state.quantity > 1) {
      this.setState({
        quantity: this.state.quantity - 1,
      });
    }
  }

  increaseQuantity() {
    this.setState({
      quantity: this.state.quantity + 1,
    });
  }

  addToCart() {
    const { product, onAddToCart } = this.props;
    const { quantity } = this.state;
    onAddToCart({ id: product.id, quantity });
    this.setState({ quantity: 1 });
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
        <Counter
          className="Product__quantityCounter"
          value={this.state.quantity}
          onDecrease={this.decreaseQuantity}
          onIncrease={this.increaseQuantity}
        />
        <Button
          className="Product__addToCartButton"
          color="primary"
          onClick={this.addToCart}
        >
          Add to cart
        </Button>
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
  onAddToCart: PropTypes.func.isRequired,
};

export default Product;
