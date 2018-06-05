import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

describe('App', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="app-root"></div>
      <div id="modal-root"></div>
    `;
  });

  it('renders without chrashing', () => {
    ReactDOM.render(<App />, document.getElementById('app-root'));
  });
});
