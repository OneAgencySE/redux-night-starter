import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './NavbarCart.css';

import Price from '../Price';

const NavbarCart = React.forwardRef(
  ({ className, subtotal, active, onClick }, ref) => (
    <div
      className={classnames(
        'NavbarCart',
        active && 'NavbarCart--active',
        className,
      )}
      ref={ref}
    >
      <ul className="NavbarCart__list">
        <li className="NavbarCart__listItem">Items: {subtotal.quantity}</li>
        <li className="NavbarCart__listItem">
          <Price size="m">Subtotal: {subtotal.amount}</Price>
        </li>
      </ul>
      <button className="NavbarCart__button" type="button" onClick={onClick}>
        <i className="material-icons NavbarCart__icon">shopping_cart</i>
      </button>
    </div>
  ),
);

NavbarCart.propTypes = {
  className: PropTypes.string,
  subtotal: PropTypes.shape({
    quantity: PropTypes.number,
    amount: PropTypes.number,
  }),
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export default NavbarCart;
