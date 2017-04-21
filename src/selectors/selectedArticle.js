/* @flow */

import {createSelector} from 'reselect';
import itemsArray from './itemsArray';
import find from 'lodash/find';

export default createSelector(
  itemsArray,
  state => state.get('selectedArticle'),
  (items, selectedArticle) => find(items, ['guid', selectedArticle])
);
