/* @flow */

import {createSelector} from 'reselect';

export default createSelector(
  state => state.get('readArticles'),
  read => read ? read.toJS() : []
);
