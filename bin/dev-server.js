/* @flow */

import {DevServer} from 'webcompiler';
import {join} from 'path';
import FeedParser from 'feedparser';
import request from 'request';

const devDir = join(__dirname, '..', 'development'),
  srcDir = join(__dirname, '..', 'src'),
  script = join(srcDir, 'browser.js'),
  style = join(devDir, 'style.scss');

new DevServer(script, {

  style,

  contentBase: devDir,

  configureApplication(app: ExpressApplication) {
    app.get('/rss/:uri', ({params: {uri}}, res) => {
      const parser = new FeedParser({addmeta: false}),
        items = [];

      let terminated = false;

      function sendError(e: Error) {
        const {name, message} = e;

        terminated = true;

        res.json({error: {name, message}});
      }

      parser.on('error', sendError);

      parser.on('readable', () => {
        let item;

        while (item = parser.read()) {
          items.push({
            title: item.title,
            content: item.description,
            link: item.link,
            date: item.date,
            author: item.author || null,
            guid: item.guid,
            comments: item.comments || null,
            image: item.image.url || null,
            categories: item.categories
          });
        }
      });

      try {
        request.get(decodeURIComponent(uri))
          .on('error', sendError)
          .pipe(parser)
          .on('end', () => {
            if (terminated) {
              return;
            }

            const {favicon, title, categories, image: {url: image}} = parser.meta;

            res.json({meta: {favicon: favicon || image, title, categories, image, count: items.length, uri}, items});
          });
      } catch (e) {
        sendError(e);
      }
    });
  }

}).run();
