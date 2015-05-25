'use strict';

import config from 'config';

// webpack
import renderApp from '../build/prerender/main.js';
import stats from '../build/stats.json';

const title = config.get('Meerkat.title');
const repoUrl = config.get('Github.repoUrl');

export function index(request, reply) {
  const options = request.server.app.options;
  const publicPath = stats.publicPath;
  const styleUrl = options.separateStylesheet && (`${publicPath}main.css?${stats.hash}`) || '';
  const scriptUrl = publicPath + [].concat(stats.assetsByChunkName.main)[0];
  const initData = {
    state: {
      AppStore: {},
    },
    ctx: {
      title,
      repoUrl,
    },
  };

  renderApp(initData, scriptUrl, styleUrl, (err, html) => {
    if (err) {
      console.log(err);
    }

    return reply(html);
  });
}
