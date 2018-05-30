import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './NavbarCart.css';

const NavbarCart = React.forwardRef(({ className, onClick }, ref) => (
  <div className={classnames('NavbarCart', className)} ref={ref}>
    <button className="NavbarCart__button" type="button" onClick={onClick}>
      <i className="material-icons NavbarCart__icon">shopping_cart</i>
    </button>
  </div>
));

NavbarCart.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default NavbarCart;
