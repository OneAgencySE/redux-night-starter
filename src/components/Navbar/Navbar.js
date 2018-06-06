import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Navbar.css';

import NavbarCart from '../NavbarCart';

const Navbar = React.forwardRef(
  ({ className, cartSubtotal, activeCart, onClickCart }, ref) => (
    <nav className={classnames('Navbar', className)}>
      <a href="/" className="Navbar__logo">
        Recat Store
      </a>
      <NavbarCart
        subtotal={cartSubtotal}
        active={activeCart}
        onClick={onClickCart}
        ref={ref}
      />
    </nav>
  ),
);

Navbar.propTypes = {
  className: PropTypes.string,
  cartSubtotal: PropTypes.shape({
    quantity: PropTypes.number,
    amount: PropTypes.number,
  }),
  activeCart: PropTypes.bool,
  onClickCart: PropTypes.func,
};

export default Navbar;
