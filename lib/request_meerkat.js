'use strict';

import config from 'config';
import request from 'request';

const apiToken = config.get('Meerkat.apiToken');

request.meerkat = function(url, cb) {
  /* eslint-disable */
  return request(
    {
      'url': url,
      'headers': {
        'Authorization': apiToken,
      },
    },
    cb
  );
  /* eslint-enable */
};

module.exports = request;
