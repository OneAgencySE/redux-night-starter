import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import './api';

import DocsBar from './api/components/DocsBar';
import App from './components/App';

ReactDOM.render(<App />, document.getElementById('app-root'));
ReactDOM.render(<DocsBar />, document.getElementById('docs-root'));
