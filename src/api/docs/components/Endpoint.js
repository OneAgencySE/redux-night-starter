import React from 'react';
import PropTypes from 'prop-types';

import './Endpoint.css';

const Endpoint = ({ method, url, test, payload }) => (
  <div className="endpoint">
    <div className="endpoint__method">{method}</div>
    <div className="endpoint__url">{url}</div>
    {payload && (
      <div className="endpoint__payload">
        payload: {JSON.stringify(payload)}
      </div>
    )}
    <button
      type="button"
      className="endpoint__test-button"
      onClick={() => test(method, url, payload)}
    >
      Test
    </button>
  </div>
);

Endpoint.propTypes = {
  method: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  test: PropTypes.func.isRequired,
  payload: PropTypes.object,
};

export default Endpoint;
