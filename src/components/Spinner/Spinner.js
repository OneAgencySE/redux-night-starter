import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Spinner.css';

const Spinner = ({ className, width, height, size }) => (
  <div
    className={classnames(
      'Spinner',
      (width || size) && `Spinner--width-${width || size}`,
      (height || size) && `Spinner--height-${height || size}`,
      className,
    )}
  />
);

Spinner.propTypes = {
  className: PropTypes.string,
  width: PropTypes.oneOf(['fill', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl']),
  height: PropTypes.oneOf(['fill', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl']),
  size: PropTypes.oneOf(['fill', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl']),
};

export default Spinner;
