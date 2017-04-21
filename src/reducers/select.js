/* @flow */

import {fromJS} from 'immutable';

export default (state: any, {type, item}: Object) => state.withMutations(map => {
  map.set('selectedType', type).set('selectedItem', fromJS(item));
});
