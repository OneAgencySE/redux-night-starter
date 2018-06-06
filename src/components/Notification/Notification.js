import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Notification.css';

const iconByType = {
  info: 'info',
  success: 'check-circle',
  warning: 'warning',
  error: 'error',
};

const Notification = ({ className, type, children }) => (
  <div
    className={classnames(
      'Notification',
      type && `Notification--${type}`,
      className,
    )}
  >
    <i className="material-icons Notification__icon">{iconByType[type]}</i>
    <div className="Notification__message">{children}</div>
  </div>
);

Notification.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default Notification;
