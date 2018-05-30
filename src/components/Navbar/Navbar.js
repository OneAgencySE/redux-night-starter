import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Navbar.css';

import NavbarCart from '../NavbarCart';

const Navbar = React.forwardRef(({ className, onClickCart }, ref) => (
  <nav className={classnames('Navbar', className)}>
    <a href="/" className="Navbar__logo">
      Recat Store
    </a>
    <NavbarCart onClick={onClickCart} ref={ref} />
  </nav>
));

Navbar.propTypes = {
  className: PropTypes.string,
  onClickCart: PropTypes.func,
};

export default Navbar;
