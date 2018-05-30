import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Counter.css';

const Counter = ({ className, value, onDecrease, onIncrease }) => (
  <div className={classnames('Counter', className)}>
    <button
      className="Counter__button Counter__button--decrease"
      type="button"
      onClick={onDecrease}
    >
      -
    </button>
    <div className="Counter__value">{value}</div>
    <button
      className="Counter__button Counter__button--increase"
      type="button"
      onClick={onIncrease}
    >
      +
    </button>
  </div>
);

Counter.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number.isRequired,
  onDecrease: PropTypes.func.isRequired,
  onIncrease: PropTypes.func.isRequired,
};

export default Counter;
