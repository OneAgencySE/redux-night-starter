import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Endpoint from './Endpoint';
import Response from './Response';

class EndpointContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.testEnpoint = this.testEnpoint.bind(this);
    this.clearResponse = this.clearResponse.bind(this);
  }

  testEnpoint(method, url, payload) {
    axios({
      method,
      url,
      data: payload,
    })
      .then(response =>
        this.setState({
          response,
        }),
      )
      .catch(error => {
        this.setState({
          response: error.response,
        });
      });
  }

  clearResponse() {
    this.setState({
      response: null,
    });
  }

  render() {
    const { method, url, payload } = this.props;
    return (
      <div>
        <Endpoint
          method={method}
          url={url}
          test={this.testEnpoint}
          payload={payload}
        />
        {this.state.response && (
          <Response
            response={this.state.response}
            onClear={this.clearResponse}
          />
        )}
      </div>
    );
  }
}

EndpointContainer.propTypes = {
  method: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  payload: PropTypes.object,
};

export default EndpointContainer;
