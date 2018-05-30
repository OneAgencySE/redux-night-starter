import React from 'react';

import EndpointContainer from './EndpointContainer';

import './App.css';

const App = () => (
  <div>
    <EndpointContainer method="GET" url="/api/products" />
    <EndpointContainer method="GET" url="/api/products/1" />
    <EndpointContainer method="GET" url="/api/cart-items" />
    <EndpointContainer
      method="POST"
      url="/api/cart-items/3"
      payload={{ quantity: 3 }}
    />
    <EndpointContainer
      method="PUT"
      url="/api/cart-items/3"
      payload={{ quantity: 1 }}
    />
    <EndpointContainer method="DELETE" url="/api/cart-items" />
    <EndpointContainer method="DELETE" url="/api/cart-items/3" />
  </div>
);

export default App;
