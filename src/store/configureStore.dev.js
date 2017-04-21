/* @flow */

import createStore from 'redux/lib/createStore';
import applyMiddleware from 'redux/lib/applyMiddleware';
import compose from 'redux/lib/compose';
import reducer from '../reducers';
import thunk from 'redux-thunk';
import {enableBatching} from 'redux-batched-actions';
import identity from 'lodash/identity';
import {fromJS} from 'immutable';

/* eslint-disable global-require */

export default state => {
  const store = createStore(
    enableBatching(reducer),
    state,
    compose(
      applyMiddleware(thunk),
      'undefined' !== typeof window && window.devToolsExtension
        ? window.devToolsExtension({deserializeState: fromJS})
        : identity
    )
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers').default);
    });
  }

  return store;
};
