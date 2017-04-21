/* @flow */

import {createSelector} from 'reselect';
import totalCount from './totalCount';
import readArticles from './readArticles';

export default createSelector(
  totalCount,
  readArticles,
  (total, read) => total - read.length
);
