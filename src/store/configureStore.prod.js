/* @flow */

import createStore from 'redux/lib/createStore';
import applyMiddleware from 'redux/lib/applyMiddleware';
import thunk from 'redux-thunk';
import {enableBatching} from 'redux-batched-actions';
import reducer from '../reducers';

export default state => createStore(enableBatching(reducer), state, applyMiddleware(thunk));
