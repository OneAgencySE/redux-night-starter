import React from 'react';
import PropTypes from 'prop-types';

import './Response.css';

const getResponseType = ({ status }) => {
  if (status >= 100 && status < 200) {
    return 'informational';
  }

  if (status >= 200 && status < 300) {
    return 'success';
  }

  if (status >= 300 && status < 400) {
    return 'redirection';
  }

  if (status >= 400 && status < 500) {
    return 'client error';
  }

  if (status >= 500 && status < 600) {
    return 'server error';
  }

  return 'unkown';
};

const Response = ({ response, onClear }) => (
  <div className="response">
    <div className="response__header">
      <h2 className="response__title">
        Response Type: {getResponseType(response)}
      </h2>
      <button
        type="button"
        className="response__clear-button"
        onClick={onClear}
      >
        Clear
      </button>
    </div>
    <pre className="response__json">
      <code>{JSON.stringify(response, null, 2)}</code>
    </pre>
  </div>
);

Response.propTypes = {
  response: PropTypes.object.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default Response;
