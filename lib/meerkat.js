'use strict';

import async from 'async';
import request from './request_meerkat';

let _broadcasts = {
  location: [],
  unknown: [],
};
let busy = false;

function getBroadcastsList(cb) {
  request.meerkat('https://resources.meerkatapp.co/broadcasts?v=1.0',
    function(error, response, broadcasts) {
      return cb(error, error ? broadcasts : JSON.parse(broadcasts).result);
    }
  );
}

function getLocationCoordsData(broadcast, client, locKey, iteratorCb) {
  request(`http://open.mapquestapi.com/nominatim/v1/search?q=${broadcast.details.location}&format=json`,
    function(error, response, coords) {
      if (error || !coords) {
        return iteratorCb(null);
      }

      const parsedCoords = JSON.parse(coords);
      if (!Array.isArray(parsedCoords) || parsedCoords.length < 1) {
        return iteratorCb(null);
      }

      const pickedCoords = {
        lat: parsedCoords[0].lat,
        lon: parsedCoords[0].lon,
      };

      broadcast.locationCoord = pickedCoords;
      client.hmset(locKey, pickedCoords);
      return iteratorCb(null);
    }
  );
}

function getLocationCoordsCache(broadcast, client, iteratorCb) {
  const locKey = encodeURIComponent(`map_loc_${broadcast.details.location}`);

  client.hgetall(locKey, (err, coords) => {
    if (err) {
      return iteratorCb(null);
    }

    // if location is not in the cache
    if (!coords) {
      getLocationCoordsData(broadcast, client, locKey, iteratorCb);
    } else {
      broadcast.locationCoord = coords;
      return iteratorCb(null);
    }
  });
}

function getBroadcastsSummary(broadcasts, client, cb) {
  async.eachLimit(broadcasts, 20,
    function(b, iteratorCb) {

      request.meerkat(b.broadcast,
        function (error, response, summary) {
          if (error) {
            return iteratorCb(error);
          }

          b.details = JSON.parse(summary).result;
          if (b.details && b.details.location) {
            return getLocationCoordsCache(b, client, iteratorCb);
          }

          return iteratorCb(null);
        }
      );

    },
    function(err) {
      return cb(err, broadcasts);
    }
  );
}

export function getData(client, next) {
  if (busy) {
    return next('I am busy');
  }

  async.waterfall([
    getBroadcastsList,
    function (broadcasts, cb) {
      getBroadcastsSummary(broadcasts, client, cb);
    },
  ], function (err, result) {
    if (err) {
      return next(err, result);
    }

    result.reverse((a, b) => {
      return a.startTime - b.startTime;
    });

    busy = false;

    return next(null, result);
  });
}

export function emitBroadcasts(io, data) {
  _broadcasts = {
    location: [],
    unknown: [],
  };

  data.forEach((media) => {
    if (media.details.status === 'live') {
      let caption = [];

      if (media.details.location) {
        caption.push(media.details.location);
      }

      if (media.details.caption) {
        caption.push(media.details.caption);
      }

      let broadcast = {
        caption: caption.join(' - '),
        id: media.id,
        profileUrl: media.details.profile,
        broadcast: {
          url: `http://meerkatapp.co/${media.details.broadcaster.name}/${media.details.id}`,
          cover: media.details.cover,
          date: new Date(media.startTime).toLocaleTimeString(),
          location: media.details.location,
          count: {
            commentsCount: media.details.commentsCount,
            likesCount: media.details.likesCount,
            restreamsCount: media.details.restreamsCount,
            watchersCount: media.details.watchersCount,
          },
        },
        user: {
          'profile_picture': media.details.broadcaster.image,
          'full_name': media.details.broadcaster.name,
          username: media.details.broadcaster.displayName,
        },
      };

      if (media.locationCoord) {
        broadcast.latLng = [media.locationCoord.lat, media.locationCoord.lon];
        _broadcasts.location.push(broadcast);
      } else {
        _broadcasts.unknown.push(broadcast);
      }

    }
  });

  io.to('realtime').emit('data:add', _broadcasts, true);
}

export function getBroadcasts() {
  return _broadcasts;
}
