import React from 'react';
import axios from 'axios';

import './App.css';

import Navbar from '../Navbar';
import Cart from '../Cart';
import ProductGrid from '../ProductGrid';
import Modal from '../Modal';
import Thumbnail from '../Thumbnail';
import Notification from '../Notification';

const setProductsState = (productsState) => (state) => ({
  products: Object.assign({}, state.products, productsState),
});

const setCartState = (cartState) => (state) => ({
  cart: Object.assign({}, state.cart, cartState),
});

const indexProductsById = (products) =>
  products.reduce(
    (previous, current) =>
      Object.assign({}, previous, { [current.id]: current }),
    {},
  );

const mapCartItems = (state, items) =>
  items.map((item) => Object.assign({}, item, state.products.byId[item.id]));

const clickedOutside = (element, target) =>
  !element || !element.contains(target);

const calculateSubtotal = (items) =>
  items.reduce(
    (previousSubtotal, currentItem) => ({
      quantity: previousSubtotal.quantity + currentItem.quantity,
      amount:
        previousSubtotal.amount + currentItem.quantity * currentItem.price,
    }),
    { quantity: 0, amount: 0 },
  );

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: null,
      cart: {
        active: false,
        items: [],
      },
      products: {
        loading: false,
        byId: {},
      },
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
    this.setState(setProductsState({ loading: true }));
    this.setState({ notification: null });
    axios
      .get('/api/products')
      .then((response) => {
        this.setState(
          setProductsState({
            byId: indexProductsById(response.data),
            loading: false,
          }),
        );
      })
      .catch((error) => {
        this.setState({
          notification: { type: 'error', message: error.message },
        });
        this.setState(
          setProductsState({
            loading: false,
          }),
        );
      });
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
      (cartItem) => cartItem.id === id,
    );
    this.setState({ notification: null });
    if (existingCartItem) {
      axios
        .put(`/api/cart-items/${id}`, { quantity })
        .then(({ data }) => {
          this.setState(
            setCartState({ items: mapCartItems(this.state, data) }),
          );
        })
        .catch((error) => {
          this.setState({
            notification: { type: 'error', message: error.message },
          });
        });
    } else {
      axios
        .post(`/api/cart-items/${id}`, { quantity })
        .then(({ data }) => {
          this.setState(
            setCartState({ items: mapCartItems(this.state, data) }),
          );
        })
        .catch((error) => {
          this.setState({
            notification: { type: 'error', message: error.message },
          });
        });
    }
  }

  removeCartItem(id) {
    this.setState({ notification: null });
    axios
      .delete(`/api/cart-items/${id}`)
      .then(({ data }) => {
        this.setState(setCartState({ items: mapCartItems(this.state, data) }));
      })
      .catch((error) => {
        this.setState(setCartState({ active: false }));
        this.setState({
          notification: { type: 'error', message: error.message },
        });
      });
  }

  clearCart() {
    this.setState({ notification: null });
    axios
      .delete(`/api/cart-items`)
      .then(({ data }) => {
        this.setState(setCartState({ items: mapCartItems(this.state, data) }));
      })
      .catch((error) => {
        this.setState(setCartState({ active: false }));
        this.setState({
          notification: { type: 'error', message: error.message },
        });
      });
  }

  checkout() {
    this.setState({ notification: null });
    axios
      .delete(`/api/cart-items`)
      .then(({ data }) => {
        this.setState(setCartState({ items: mapCartItems(this.state, data) }));
        this.closeCart();
        this.setState({ showModal: true });
      })
      .catch((error) => {
        this.setState(setCartState({ active: false }));
        this.setState({
          notification: { type: 'error', message: error.message },
        });
      });
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
    const products = Object.values(this.state.products.byId);
    const subtotal = calculateSubtotal(this.state.cart.items);
    return (
      <div className="App">
        <Navbar
          className="App__navbar"
          cartSubtotal={subtotal}
          activeCart={this.state.cart.active}
          onClickCart={this.toggleCart}
          ref={(node) => (this.navbarCartElement = node)}
        />
        <Cart
          active={this.state.cart.active}
          items={this.state.cart.items}
          subtotal={subtotal}
          onRemoveItem={this.removeCartItem}
          onClear={this.clearCart}
          onCheckout={this.checkout}
          ref={(node) => (this.cartElement = node)}
        />
        <main className="App__main">
          {this.state.notification && (
            <Notification
              className="App__notification"
              type={this.state.notification.type}
            >
              {this.state.notification.message}
            </Notification>
          )}
          <ProductGrid
            className="App__productGrid"
            products={products}
            loading={this.state.products.loading}
            onAddToCart={this.addToCart}
          />
        </main>
        <Modal
          title="Thank you!"
          open={this.state.showModal}
          onClose={this.closeModal}
          modalRef={(node) => (this.modalElement = node)}
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
