/* @flow */

import {createAction} from 'redux-actions';
import fetch from 'isomorphic-fetch';
import {REQUEST_FEED, RECEIVE_FEED, FEED_ERROR} from '../constants';

const requestFeed = createAction(REQUEST_FEED);
const receiveFeed = createAction(RECEIVE_FEED);
const feedError = createAction(FEED_ERROR);

export default (uri: string) => (dispatch: Function) => {
  dispatch(requestFeed());

  return fetch(`/rss/${encodeURIComponent(uri)}`)
    .then(response => response.json())
    .then(json => {
      if (json.error) {
        const error = new Error(decodeURIComponent(json.error.message));

        error.name = json.error.name;

        throw error;
      }
      dispatch(receiveFeed({uri, json}));
    })
    .catch(e => dispatch(feedError(e)));
};
