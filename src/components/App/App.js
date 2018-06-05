import React from 'react';
import axios from 'axios';
import createDebugger from 'debug';

import './App.css';

import Navbar from '../Navbar';
import Cart from '../Cart';
import ProductGrid from '../ProductGrid';
import Modal from '../Modal';
import Thumbnail from '../Thumbnail';

const debug = createDebugger('recat:app');

const setProductsByIdState = productsByIdState => state => ({
  productsById: Object.assign({}, state.productsById, productsByIdState),
});

const setCartState = cartState => state => ({
  cart: Object.assign({}, state.cart, cartState),
});

const indexProductsById = products =>
  products.reduce(
    (previous, current) =>
      Object.assign({}, previous, { [current.id]: current }),
    {},
  );

const mapCartItems = (state, items) =>
  items.map(item => Object.assign({}, item, state.productsById[item.id]));

const clickedOutside = (element, target) =>
  !element || !element.contains(target);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: {
        active: false,
        items: [],
      },
      productsById: {},
      showModal: false,
    };

    this.navbarCartElement = React.createRef();
    this.cartElement = React.createRef();
    this.modalElement = React.createRef();

    this.clickOutsideCart = this.clickOutsideCart.bind(this);
    this.toggleCart = this.toggleCart.bind(this);
    this.closeCart = this.closeCart.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.removeCartItem = this.removeCartItem.bind(this);
    this.clearCart = this.clearCart.bind(this);
    this.checkout = this.checkout.bind(this);
    this.clickOutsideModal = this.clickOutsideModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.clickOutsideCart, true);
    document.addEventListener('click', this.clickOutsideModal, true);
    axios
      .get('/api/products')
      .then(({ data }) => {
        this.setState(setProductsByIdState(indexProductsById(data)));
      })
      .catch(error => debug(error));
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.clickOutsideModal, true);
  }

  clickOutsideCart({ target }) {
    if (
      this.state.cart.active &&
      clickedOutside(this.navbarCartElement, target) &&
      clickedOutside(this.cartElement, target)
    ) {
      this.closeCart();
    }
  }

  toggleCart() {
    this.setState(setCartState({ active: !this.state.cart.active }));
  }

  closeCart() {
    this.setState(setCartState({ active: false }));
  }

  addToCart({ id, quantity }) {
    const existingCartItem = this.state.cart.items.find(
      cartItem => cartItem.id === id,
    );
    if (existingCartItem) {
      axios
        .put(`/api/cart-items/${id}`, { quantity })
        .then(({ data }) => {
          this.setState(
            setCartState({ items: mapCartItems(this.state, data) }),
          );
        })
        .catch(error => debug(error));
    } else {
      axios
        .post(`/api/cart-items/${id}`, { quantity })
        .then(({ data }) => {
          this.setState(
            setCartState({ items: mapCartItems(this.state, data) }),
          );
        })
        .catch(error => debug(error));
    }
  }

  removeCartItem(id) {
    axios
      .delete(`/api/cart-items/${id}`)
      .then(({ data }) => {
        this.setState(setCartState({ items: mapCartItems(this.state, data) }));
      })
      .catch(error => debug(error));
  }

  clearCart() {
    axios
      .delete(`/api/cart-items`)
      .then(({ data }) => {
        this.setState(setCartState({ items: mapCartItems(this.state, data) }));
      })
      .catch(error => debug(error));
  }

  checkout() {
    axios
      .delete(`/api/cart-items`)
      .then(({ data }) => {
        this.setState(setCartState({ items: mapCartItems(this.state, data) }));
        this.closeCart();
        this.setState({ showModal: true });
      })
      .catch(error => debug(error));
  }

  clickOutsideModal({ target }) {
    if (this.state.showModal && clickedOutside(this.modalElement, target)) {
      this.closeModal();
    }
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  render() {
    const products = Object.values(this.state.productsById);
    return (
      <div className="App">
        <Navbar
          className="App__navbar"
          onClickCart={this.toggleCart}
          ref={node => (this.navbarCartElement = node)}
        />
        <Cart
          active={this.state.cart.active}
          items={this.state.cart.items}
          onRemoveItem={this.removeCartItem}
          onClear={this.clearCart}
          onCheckout={this.checkout}
          ref={node => (this.cartElement = node)}
        />
        <ProductGrid
          className="App__productGrid"
          products={products}
          onAddToCart={this.addToCart}
        />
        <Modal
          title="Thank you!"
          open={this.state.showModal}
          onClose={this.closeModal}
          modalRef={node => (this.modalElement = node)}
        >
          <Thumbnail
            url="http://thecatapi.com/api/images/get?format=src&type=gif"
            description="Random cat gif"
            size="xxxl"
          />
        </Modal>
      </div>
    );
  }
}

export default App;
