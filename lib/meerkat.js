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
      if (error) {
        return cb(error, broadcasts);
      }

      let result;
      try {
        result = JSON.parse(broadcasts).result;
      } catch (e) {
        return cb(e, broadcasts);
      }

      return cb(error, result);
    }
  );
}

function getLocationCoordsData(broadcast, client, locKey, iteratorCb) {
  request(
    `http://open.mapquestapi.com/nominatim/v1/search?q=${broadcast.location}&format=json`,
    function(error, response, coords) {
      if (error || !coords) {
        return iteratorCb(null);
      }

      let parsedCoords;
      try {
        parsedCoords = JSON.parse(coords);
      } catch (e) {
        return iteratorCb(null);
      }

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

function getLocationCoordsCache(broadcasts, client, cb) {
  async.eachLimit(broadcasts, 20,
    function(b, iteratorCb) {
      if (!b.location) {
        return iteratorCb(null);
      }

      const locKey = encodeURIComponent(`map_loc_${b.location}`);
      client.hgetall(locKey, (err, coords) => {
        if (err) {
          return iteratorCb(null);
        }

        // if location is not in the cache
        if (!coords) {
          getLocationCoordsData(b, client, locKey, iteratorCb);
        } else {
          b.locationCoord = coords;
          return iteratorCb(null);
        }
      });
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
    function(broadcasts, cb) {
      getLocationCoordsCache(broadcasts, client, cb);
    },
  ], function(err, result) {
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
  let broadcastsTmp = {
    location: [],
    unknown: [],
  };

  data.forEach((media) => {
    let caption = [];

    if (media.location) {
      caption.push(media.location);
    }
    if (media.caption) {
      caption.push(media.caption);
    }

    let broadcast = {
      caption: caption.join(' - '),
      id: media.id,
      profileUrl: media.profile,
      broadcast: {
        url: `http://meerkatapp.co/${media.broadcaster.name}/${media.id}`,
        cover: media.cover,
        date: new Date(media.startTime).toLocaleTimeString(),
        location: media.location,
        count: {
          commentsCount: media.commentsCount,
          likesCount: media.likesCount,
          restreamsCount: media.restreamsCount,
          watchersCount: media.watchersCount,
        },
      },
      user: {
        'profile_picture': media.broadcaster.image,
        'full_name': media.broadcaster.displayName,
        username: media.broadcaster.name,
      },
    };

    if (media.locationCoord) {
      broadcast.latLng = [media.locationCoord.lat, media.locationCoord.lon];
      broadcastsTmp.location.push(broadcast);
    } else {
      broadcastsTmp.unknown.push(broadcast);
    }
  });

  _broadcasts = broadcastsTmp;
  io.to('realtime').emit('data:add', _broadcasts, true);
}

export function getBroadcasts() {
  return _broadcasts;
}
