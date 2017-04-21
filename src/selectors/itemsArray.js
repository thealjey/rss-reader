/* @flow */

import {createSelector} from 'reselect';
import flatMap from 'lodash/flatMap';
import reject from 'lodash/reject';
import includes from 'lodash/includes';
import readArticles from './readArticles';

export default createSelector(
  state => state.get('selectedType'),
  state => state.get('selectedItem'),
  state => state.get('data'),
  readArticles,
  state => state.get('selectedArticle'),
  (selectedType, selectedItem, data, read, selectedArticle) => {
    if (!data) {
      return [];
    }
    switch (selectedType) {
      case 'all':
        return flatMap(data.toJS(), 'items');
      case 'unread':
        return reject(flatMap(data.toJS(), 'items'), ({guid}) => guid !== selectedArticle && includes(read, guid));
      case 'feed':
        return data.get(selectedItem).get('items').toJS();
      case 'category':
        return data
          .get(selectedItem.get('uri'))
          .get('items')
          .filter(item => item.get('categories').includes(selectedItem.get('category')))
          .toJS();
    }

    return [];
  }
);
