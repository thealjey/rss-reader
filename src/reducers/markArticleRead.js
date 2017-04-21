/* @flow */

import {Set} from 'immutable';

export default (state: any, payload: string) =>
  state.set('readArticles', state.get('readArticles', new Set()).add(payload));
