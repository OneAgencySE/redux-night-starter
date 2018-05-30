import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './CartItem.css';

import Thumbnail from '../Thumbnail';
import Price from '../Price';

const CartItem = ({ className, item, onRemove }) => (
  <div className={classnames('CartItem', className)}>
    <div className="CartItem__name">{item.name}</div>
    <Thumbnail className="CartItem__image" {...item.image} size="l" />
    <div className="CartItem__priceLabel">Price</div>
    <Price className="CartItem__price" size="m">
      {item.price}
    </Price>
    <div className="CartItem__quantityLabel">Quantity</div>
    <div className="CartItem__quantity">{item.quantity}</div>
    <button
      className="CartItem__removeButton"
      type="button"
      onClick={() => onRemove(item.id)}
    >
      <i className="material-icons CartItem__removeIcon">clear</i>
    </button>
  </div>
);

CartItem.propTypes = {
  className: PropTypes.string,
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    image: PropTypes.shape({
      url: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
  onRemove: PropTypes.func,
};

export default CartItem;
