/* @flow */

import {fromJS} from 'immutable';

export default (state: any, {uri, json}: Object) => state.withMutations(map => {
  map.set('isLoading', false).delete('error').setIn(['data', uri], fromJS(json));
});
