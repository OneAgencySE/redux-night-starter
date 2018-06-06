import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Cart.css';

import Button from '../Button';
import CartItem from '../CartItem';
import Price from '../Price';

const Cart = React.forwardRef(
  (
    { className, active, items, subtotal, onRemoveItem, onClear, onCheckout },
    ref,
  ) => {
    const hasItems = items.length > 0;
    return (
      <div
        className={classnames('Cart', active && 'Cart--active', className)}
        ref={ref}
      >
        <div className="Cart__items">
          {!hasItems && <span>Your cart is empty!</span>}
          {hasItems &&
            items.map(item => (
              <CartItem
                className="Cart__item"
                key={item.id}
                item={item}
                onRemove={onRemoveItem}
              />
            ))}
        </div>
        <div className="Cart__subtotal">
          Subtotal ({subtotal.quantity} items):{' '}
          <Price size="m" inline>
            {subtotal.amount}
          </Price>
        </div>
        <div className="Cart__actions">
          <Button color="secondary" disabled={!hasItems} onClick={onClear}>
            Clear
          </Button>
          <Button
            className="Cart__checkoutButton"
            color="primary"
            disabled={!hasItems}
            onClick={onCheckout}
          >
            Proceed to checkout
          </Button>
        </div>
      </div>
    );
  },
);

Cart.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      image: PropTypes.shape({
        url: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ),
  subtotal: PropTypes.shape({
    quantity: PropTypes.number,
    amount: PropTypes.number,
  }),
  onRemoveItem: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onCheckout: PropTypes.func.isRequired,
};

Cart.defaultProps = {
  active: false,
  items: [],
};

export default Cart;
