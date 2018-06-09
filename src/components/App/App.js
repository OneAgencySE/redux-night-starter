import React from 'react';

import './App.css';

import Product from '../Product';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        id: 1,
        image: {
          url: 'https://cataas.com/cat/says/Happy!',
          description: 'A very happy cat',
        },
        name: 'Happy Cat',
        price: 399,
      },
    };
  }

  render() {
    return (
      <div className="App">
        <main className="App__main">
          <Product product={this.state.product} />
        </main>
      </div>
    );
  }
}

export default App;
