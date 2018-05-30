import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Price.css';

const Price = ({ className, size, inline, children }) => (
  <div
    className={classnames(
      'Price',
      size && `Price--${size}`,
      inline && 'Price--inline',
      className,
    )}
  >
    {children}
    <span className="Price__currency">kr</span>
  </div>
);

Price.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl']),
  inline: PropTypes.bool,
  children: PropTypes.node,
};

export default Price;
