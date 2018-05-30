import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

describe('App', () => {
  it('renders without chrashing', () => {
    ReactDOM.render(<App />, document.createElement('div'));
  });
});
