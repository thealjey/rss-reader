/* @flow */

import {Map} from 'immutable';
import requestFeed from './requestFeed';
import feedError from './feedError';
import receiveFeed from './receiveFeed';
import dismissError from './dismissError';
import select from './select';
import selectArticle from './selectArticle';
import markArticleRead from './markArticleRead';
import removeFeed from './removeFeed';
import {
  REQUEST_FEED,
  RECEIVE_FEED,
  FEED_ERROR,
  DISMISS_ERROR,
  SELECT,
  SELECT_ARTICLE,
  MARK_ARTICLE_READ,
  REMOVE_FEED
} from '../constants';

export default (state: Map = new Map(), {type, payload}: Object) => {
  switch (type) {
    case REQUEST_FEED: return requestFeed(state);
    case FEED_ERROR: return feedError(state, payload);
    case RECEIVE_FEED: return receiveFeed(state, payload);
    case DISMISS_ERROR: return dismissError(state);
    case SELECT: return select(state, payload);
    case SELECT_ARTICLE: return selectArticle(state, payload);
    case MARK_ARTICLE_READ: return markArticleRead(state, payload);
    case REMOVE_FEED: return removeFeed(state, payload);
  }

  return state;
};
