/* @flow */

import {createSelector} from 'reselect';
import map from 'lodash/map';

export default createSelector(
  state => state.get('data'),
  data => data ? map(data.toJS(), 'meta') : []
);
