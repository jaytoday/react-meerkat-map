'use strict';

import React from 'react';
import Leaflet from 'leaflet';
import MarkerPopup from './MarkerPopup';
import { MapLayer } from 'react-leaflet';

require('leaflet.markercluster');

class MarkerCluster extends MapLayer {
  componentWillMount() {
    super.componentWillMount();

    this.leafletElement = Leaflet.markerClusterGroup();
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);

    // add markers to cluster layer
    if (nextProps.newMarkerData.length > 0) {
      let markers = Object.assign({}, this.props.markers);
      let newMarkers = [];
      let currentMarkers = {};

      nextProps.newMarkerData.forEach((obj) => {
        currentMarkers[obj.id] = true;

        if (!markers[obj.id]) {
          let markerPopup = React.renderToStaticMarkup(
            <MarkerPopup
              broadcast={obj.broadcast}
              caption={obj.caption}
            />
          );

          let leafletMarker = Leaflet.marker(obj.latLng)
            .bindPopup(markerPopup, { minWidth: 300, minHeight: 300 })
            .on('click', () => this.props.map.panTo(obj.latLng));

          markers[obj.id] = leafletMarker;
          newMarkers.push(leafletMarker);
        } else {
          markers[obj.id].getPopup().setContent(
            React.renderToStaticMarkup(
              <MarkerPopup
                broadcast={obj.broadcast}
                caption={obj.caption}
              />
            )
          );
        }
      });

      // Remove old layers
      for (let id in markers) {
        let layer = markers[id];

        if (!currentMarkers[id]) {
          this.leafletElement.removeLayer(layer);
          delete markers[id];
        }
      }

      this.leafletElement.addLayers(newMarkers);

      setTimeout(() => {
        this.props.updateMarkers(markers);
      }, 0);
    }

    // zoom to particular marker
    if (Object.keys(nextProps.focusMarker).length > 0) {
      let marker = this.props.markers[nextProps.focusMarker.id];

      this.leafletElement.zoomToShowLayer(marker, () => {
        this.props.map.panTo(nextProps.focusMarker.latLng);
        marker.openPopup();
      });
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return null;
  }
}

MarkerCluster.propTypes = {
  focusMarker: React.PropTypes.object,
  map: React.PropTypes.object,
  markers: React.PropTypes.object,
  newMarkerData: React.PropTypes.array,
  updateMarkers: React.PropTypes.func,
};

MarkerCluster.defaultProps = {
  markers: {},
  newMarkerData: [],
  focusMarker: {},
};

export default MarkerCluster;
