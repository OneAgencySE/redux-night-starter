import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Button.css';

const Button = ({ className, color, disabled, onClick, children }) => {
  const tabIndex = disabled ? -1 : 0;
  return (
    <button
      className={classnames(
        'Button',
        color && `Button--${color}`,
        disabled && 'Button--disabled',
        className,
      )}
      tabIndex={tabIndex}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'secondary']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
