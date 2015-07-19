'use strict';

import config from 'config';
import Hapi from 'hapi';
import Redis from 'redis';
import * as services from './lib/services';
import SocketIO from 'socket.io';
import {
  getBroadcasts,
  getData,
  emitBroadcasts
} from './lib/meerkat';

const server = new Hapi.Server();
const client = Redis.createClient();
server.app.client = client;

export default (options) => {
  server.connection({
    host: config.get('Web.host'),
    port: config.get('Web.port'),
  });

  server.register(
    [
      {
        register: require('good'),
        options: {
          reporters: [
            {
              reporter: require('good-console'),
              events: { log: '*' },
            },
          ],
        },
      },
      {
        register: require('hapi-shutdown'),
        options: {
          serverSpindownTime: 10000,
        },
      },
    ],
    err => {
      if (err) {
        throw err;
      }
    }
  );

  server.route({
    method: 'GET',
    path: '/public/{path*}',
    handler: {
      directory: {
        path: 'build/public',
        listing: false,
      },
    },
  });

  server.route({
    method: 'GET',
    path: '/',
    config: {
      handler: services.index,
    },
  });

  if (options.broadcastsRoute) {
    server.route({
      method: 'GET',
      path: '/broadcasts',
      handler: (request, reply) => {
        getData(client, (err, data) => {
          reply(err || data);
        });
      },
    });
  }

  function broadcastPolling(io) {
    getData(client, (err, data) => {
      if (!err) {
        emitBroadcasts(io, data);
      }
    });

    setTimeout(() => {
      broadcastPolling(io);
    }, options.pollingTime);
  }

  server.start(() => {
    server.log('info', `Server running at: ${server.info.uri}`);

    const io = SocketIO.listen(server.listener);
    server.app.options = options;
    server.app.io = io;

    io.on('connection', socket => {
      server.log('info', 'Client connected to local socket');

      socket.join('realtime');
      io.to('realtime').emit('data:add', getBroadcasts(), true);

      socket.on('flow:pause', (callback) => {
        socket.leave('realtime');

        return callback();
      });

      socket.on('flow:start', (callback) => {
        socket.join('realtime');

        return callback();
      });

      socket.on('disconnect', () => socket.leave('realtime'));
    });

    broadcastPolling(io);
  });
};
