/* @flow */

import React from 'react';
import {htmlToJSX} from 'webcompiler/lib/jsx';
import uniqueId from 'lodash/uniqueId';
import {func, bool, string, array, number, any, object} from 'prop-types';
import noop from 'lodash/noop';
import map from 'lodash/map';
import includes from 'lodash/includes';
import classNames from 'classnames';

const App = ({
  onAddClick,
  onRemoveClick,
  onDismissErrorClick,
  onSelect,
  onSelectArticle,
  isLoading,
  error,
  metaArray,
  itemsArray,
  totalCount,
  unreadCount,
  selectedType,
  selectedItem,
  selectedArticle,
  readArticles
}: Object) => {
  const rowRadioId = uniqueId('x-'),
    columnRadioId = uniqueId('x-'),
    fullscreenCheckboxId = uniqueId('x-');

  return (
    <div className="rss-reader">
      <input className="rss-reader__row-radio" type="radio" name="layout-switch" id={rowRadioId} defaultChecked />
      <input className="rss-reader__column-radio" type="radio" name="layout-switch" id={columnRadioId} />
      <input className="rss-reader__fullscreen-checkbox" type="checkbox" id={fullscreenCheckboxId} />
      <div className={`loader ${isLoading ? 'active' : ''}`}>
        <div className="loader__spinner" />
      </div>

      <div className="toolbar rss-reader__toolbar">
        <button className="btn" onClick={onAddClick}>+</button>
        <button className="btn" disabled={'feed' !== selectedType} onClick={() => onRemoveClick(selectedItem)}>
          -
        </button>
        <div className="btn-group">
          <label className="btn rss-reader__row-label" htmlFor={rowRadioId}>Row</label>
          <label className="btn rss-reader__column-label" htmlFor={columnRadioId}>Column</label>
        </div>
        <label className="btn rss-reader__fullscreen-label" htmlFor={fullscreenCheckboxId}>Fullscreen Preview</label>
      </div>

      <div className="rss-reader__inner">
        <div className="rss-reader__list scrollbar">
          <div className={classNames('list-item', {active: 'all' === selectedType})} onClick={() => onSelect('all')}>
            <div className="list-item__name">All</div>
            <div className="list-item__count">{totalCount}</div>
          </div>
          <div
            className={classNames('list-item', {active: 'unread' === selectedType})}
            onClick={() => onSelect('unread')}
          >
            <div className="list-item__name">Unread</div>
            <div className="list-item__count">{unreadCount}</div>
          </div>
          {map(metaArray, ({title, uri, favicon, count, categories}, i) =>
            <div key={i}>
              <div
                className={classNames('list-item', {active: 'feed' === selectedType && uri === selectedItem})}
                title={title}
                onClick={() => onSelect('feed', uri)}
              >
                <div className="list-item__thumb">{favicon ? <img alt="" src={favicon} /> : null}</div>
                <div className="list-item__name">{title}</div>
                <div className="list-item__count">{count}</div>
              </div>
              {map(categories, (category, j) =>
                <div
                  className={classNames('list-item', 'list-item--subitem', {
                    active: 'category' === selectedType && uri === selectedItem.get('uri') &&
                      category === selectedItem.get('category')
                  })}
                  key={`${i}-${j}`}
                  title={category}
                  onClick={() => onSelect('category', {uri, category})}
                >
                  <div className="list-item__thumb">{favicon ? <img alt="" src={favicon} /> : null}</div>
                  <div className="list-item__name">{category}</div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="rss-reader__pane">
          <div className="rss-reader__articles scrollbar">
            {map(itemsArray, ({title, date, guid}) =>
              <div
                className={classNames('list-item', {
                  active: selectedArticle && guid === selectedArticle.guid,
                  bold: !includes(readArticles, guid)
                })}
                key={guid}
                title={title}
                onClick={() => onSelectArticle(guid)}
              >
                <div className="list-item__name">{title}</div>
                <div className="list-item__count">{new Date(date).toDateString()}</div>
              </div>
            )}
          </div>
          <div className="rss-reader__preview scrollbar">
            {error &&
              <div className="error">
                {error}
                <button className="error__close-btn" onClick={onDismissErrorClick}>+</button>
              </div>
            }
            {selectedArticle &&
              <article>
                <h2>{selectedArticle.title}</h2>
                <ul>
                  {selectedArticle.author && <li><strong>Author</strong>: {selectedArticle.author}</li>}
                  <li><strong>Date</strong>: {new Date(selectedArticle.date).toDateString()}</li>
                  <li><strong>Link</strong>: <a href={selectedArticle.link}>{selectedArticle.link}</a></li>
                  {selectedArticle.comments &&
                    <li>
                      <strong>Comments</strong>: <a href={selectedArticle.comments}>{selectedArticle.comments}</a>
                    </li>
                  }
                </ul>
                {selectedArticle.image && <img alt="" src={selectedArticle.image} />}
                {htmlToJSX(selectedArticle.content)}
              </article>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

App.propTypes = {
  onAddClick: func,
  onRemoveClick: func,
  isLoading: bool,
  error: string,
  onDismissErrorClick: func,
  metaArray: array,
  totalCount: number,
  unreadCount: number,
  onSelect: func,
  onSelectArticle: func,
  selectedType: string,
  selectedItem: any,
  itemsArray: array,
  selectedArticle: object,
  readArticles: array
};
App.defaultProps = {
  onAddClick: noop,
  onRemoveClick: noop,
  isLoading: false,
  error: null,
  onDismissErrorClick: noop,
  metaArray: [],
  totalCount: 0,
  unreadCount: 0,
  onSelect: noop,
  onSelectArticle: noop,
  selectedType: null,
  selectedItem: null,
  itemsArray: [],
  selectedArticle: null,
  readArticles: []
};

export default App;
