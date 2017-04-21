/* @flow */

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import {Map} from 'immutable';
import AppContainer from './components/AppContainer';

// this is were we would pick up the server rendered data, if we had any
const store = configureStore(new Map());

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('app')
);
