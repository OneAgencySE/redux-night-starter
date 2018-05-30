import React from 'react';
import PropTypes from 'prop-types';

import './Modal.css';

import Button from '../Button';

const Modal = React.forwardRef(
  ({ open, title, onClose, children }, ref) =>
    open ? (
      <div className="Modal">
        <div className="Modal__background" />
        <div className="Modal__dialog" role="dialog" ref={ref}>
          <header className="Modal__header">
            <h1 className="Modal__title">{title}</h1>
            <Button
              className="Modal__closeButton"
              color="primary"
              onClick={onClose}
            >
              CLOSE
            </Button>
          </header>
          <div className="Modal__content">{children}</div>
        </div>
      </div>
    ) : null,
);

Modal.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export default Modal;
