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
    return ReactDOM.createPortal(<Modal {...this.props} />, this.element);
  }
}

ModalPortal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export default ModalPortal;
