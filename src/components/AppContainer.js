/* @flow */

import {connect} from 'react-redux';
import App from './App';
import {batchActions} from 'redux-batched-actions';
import loadFeed from '../actions/loadFeed';
import removeFeed from '../actions/removeFeed';
import dismissError from '../actions/dismissError';
import select from '../actions/select';
import selectArticle from '../actions/selectArticle';
import markArticleRead from '../actions/markArticleRead';
import metaArray from '../selectors/metaArray';
import totalCount from '../selectors/totalCount';
import unreadCount from '../selectors/unreadCount';
import itemsArray from '../selectors/itemsArray';
import selectedArticle from '../selectors/selectedArticle';
import readArticles from '../selectors/readArticles';

export default connect(

  state => ({
    isLoading: state.get('isLoading'),
    error: state.get('error'),
    selectedType: state.get('selectedType'),
    selectedItem: state.get('selectedItem'),
    selectedArticle: selectedArticle(state),
    metaArray: metaArray(state),
    totalCount: totalCount(state),
    unreadCount: unreadCount(state),
    itemsArray: itemsArray(state),
    readArticles: readArticles(state)
  }),

  dispatch => ({
    onAddClick() {
      const uri = prompt('Please enter the feed URI');

      if (uri) {
        dispatch(loadFeed(uri));
      }
    },
    onRemoveClick(uri: string) {
      if (confirm('Are you sure?')) {
        dispatch(removeFeed(uri));
      }
    },
    onDismissErrorClick() {
      dispatch(dismissError());
    },
    onSelect(type: string, item?: any) {
      dispatch(select({type, item}));
    },
    onSelectArticle(guid: string) {
      dispatch(batchActions([
        selectArticle(guid),
        markArticleRead(guid)
      ]));
    }
  })

)(App);
