import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import AppContainer from '../App/App';

export default function Root({ store }) {
  return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
  );
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};
