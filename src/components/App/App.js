import React from 'react';
import axios from 'axios';

import './App.css';

import ProductGrid from '../ProductGrid';
import Notification from '../Notification';

const setProductsState = (productsState) => (state) => ({
  products: Object.assign({}, state.products, productsState),
});

const indexProductsById = products =>
  products.reduce(
    (previous, current) =>
      Object.assign({}, previous, { [current.id]: current }),
    {},
  );

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: null,
      products: {
        loading: false,
        byId: {},
      },
    };
  }

  componentDidMount() {
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

  render() {
    const products = Object.values(this.state.products.byId);
    return (
      <div className="App">
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
          />
        </main>
      </div>
    );
  }
}

export default App;
