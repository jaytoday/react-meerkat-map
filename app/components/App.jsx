'use strict';

const isBrowser = typeof window !== 'undefined';
// TODO how to handle the es6 way?
const GeoMap = isBrowser ? require('./Map') : undefined;

import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import List from './List';
import TopBar from './TopBar';
import io from 'socket.io-client';

let socket;
if (isBrowser) {
  socket = io();
}

injectTapEventPlugin();

class App extends React.Component {
  componentDidMount() {
    socket.on('data:add', this._onNewData.bind(this));
  }

  _getStyles() {
    return {
      root: {
        fontFamily: this.context.muiTheme.contentFontFamily,
        fontSize: '13px',
        lineHeight: '20px',
        WebkitFontSmoothing: 'antialiased',
      },
      secondList: {
        top: 'calc(50% + 28px)',
      },
      map: {
        position: 'absolute',
        top: '56px',
        bottom: '0',
        left: '0',
        right: '290px',
      },
    };
  }

  _onNewData(data) {
    this.props.updateData(data);
  }

  _onListItemClick(item) {
    if (item.latLng) {
      this.props.updateFocusedMarker(item);
    } else {
      window.open(item.broadcast.url);
    }
  }

  render() {
    const styles = this._getStyles();
    const locNumber = this.props.broadcastData.location.length;
    const unknownNumber = this.props.broadcastData.unknown.length;
    const titleLoc = `Map (${locNumber})`;
    const titleUnknown = `Unknown (${unknownNumber})`;

    // cant be executing client side js on prerender
    let map;

    if (isBrowser) {
      map = (
        <GeoMap
          focusMarker={this.props.focusMarker}
          markers={this.props.markers}
          newMarkerData={this.props.newBroadcastData.location}
          style={styles.map}
          updateMarkers={this.props.updateMarkers}
        />
      );
    }

    return (
      <div id='app-container' style={styles.root} >
        <TopBar
          flow={this.props.flow}
          itemCount={locNumber + unknownNumber}
          updateFlow={this.props.updateFlow}
        />
        {map}
        <List
          itemData={this.props.broadcastData.location}
          onClick={this._onListItemClick.bind(this)}
          title={titleLoc}
        />
        <List
          itemData={this.props.broadcastData.unknown}
          onClick={this._onListItemClick.bind(this)}
          style={styles.secondList}
          title={titleUnknown}
        />
      </div>
    );
  }
}

App.contextTypes = {
  muiTheme: React.PropTypes.object,
};

App.propTypes = {
  broadcastData: React.PropTypes.object,
  flow: React.PropTypes.string,
  focusMarker: React.PropTypes.object,
  markers: React.PropTypes.object,
  newBroadcastData: React.PropTypes.object,
  updateData: React.PropTypes.func,
  updateFlow: React.PropTypes.func,
  updateFocusedMarker: React.PropTypes.func,
  updateMarkers: React.PropTypes.func,
};

export default App;
