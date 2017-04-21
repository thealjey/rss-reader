/* @flow */

import {createSelector} from 'reselect';
import metaArray from './metaArray';
import sumBy from 'lodash/sumBy';

export default createSelector(
  metaArray,
  data => sumBy(data, 'count')
);
