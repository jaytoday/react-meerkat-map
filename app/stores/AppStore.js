'use strict';

import alt from '../alt';
import AppActions from '../actions/AppActions';

class AppStore {
  constructor() {
    this.bindActions(AppActions);

    this.broadcastData = { location: [], unknown: [] };
    this.newBroadcastData = { location: [], unknown: [] };
    this.markers = {};
    this.focusMarker = {};
    this.flow = 'Pause';
  }

  onUpdateData(data) {
    this.focusMarker = {};
    this.newBroadcastData = data;
    this.broadcastData = data;
  }

  onUpdateMarkers(markers) {
    this.newBroadcastData = { location: [], unknown: [] };
    this.markers = markers;
  }

  onUpdateFocusedMarker(marker) {
    this.focusMarker = marker;
  }

  onUpdateFlowSuccess(newFlow) {
    this.flow = newFlow;
  }
}

export default alt.createStore(AppStore, 'AppStore');
