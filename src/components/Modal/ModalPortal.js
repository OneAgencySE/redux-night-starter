import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Modal from './Modal';

class ModalPortal extends React.Component {
  constructor(props) {
    super(props);
    this.modalRoot = document.getElementById('modal-root');
    this.element = document.createElement('div');
  }

  componentDidMount() {
    this.modalRoot.appendChild(this.element);
  }

  componentWillUnmount() {
    this.modalRoot.removeChild(this.element);
  }

  render() {
    const { open, title, onClose, children, modalRef } = this.props;
    return ReactDOM.createPortal(
      <Modal open={open} title={title} onClose={onClose} ref={modalRef}>
        {children}
      </Modal>,
      this.element,
    );
  }
}

ModalPortal.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  modalRef: PropTypes.func,
};

export default ModalPortal;
