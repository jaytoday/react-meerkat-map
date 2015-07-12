'use strict';

const isBrowser = typeof window !== 'undefined';
// TODO how to handle the es6 way?
const GeoMap = isBrowser ? require('./Map') : undefined;

import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import List from './List';
import TopBar from './TopBar';
import io from 'socket.io-client';
import Sidebar from 'react-sidebar';

let socket;
let openTime;
if (isBrowser) {
  socket = io();
}

injectTapEventPlugin();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.state = {
      sidebarOpen: false,
      sidebarDocked: false,
    };
  }

  componentDidMount() {
    socket.on('data:add', this._onNewData.bind(this));
  }

  onSetSidebarOpen(open) {
    if (new Date().getTime() - openTime > 1000) {
      this.setState({sidebarOpen: open});
    }
  }

  componentWillMount() {
    let mql;

    if (isBrowser) {
      mql = window.matchMedia(`(min-width: 1080px)`);
      mql.addListener(this.mediaQueryChanged);

      /* eslint-disable */
      this.state = ({mql: mql});
      /* eslint-enable */
      this.mediaQueryChanged();
    }
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  mediaQueryChanged() {
    this.setState({sidebarDocked: this.state.mql.matches});
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
        top: '50%',
      },
      map: {
        position: 'relative',
        height: '100%',
      },
      sidebar: {
        width: '290px',
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

  toggleMenu() {
    if (this.state.mql.matches) {
      this.setState({sidebarDocked: !this.state.sidebarDocked});
    } else {
      this.setState({sidebarOpen: true});
      openTime = new Date().getTime();
    }
  }

  render() {
    const styles = this._getStyles();
    const locNumber = this.props.broadcastData.location.length;
    const unknownNumber = this.props.broadcastData.unknown.length;
    const titleLoc = `Map (${locNumber})`;
    const titleUnknown = `Unknown (${unknownNumber})`;

    // cant be executing client side js on prerender
    let map, sidebar;

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

      sidebar = (
        <Sidebar
          docked={this.state.sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
          open={this.state.sidebarOpen}
          sidebar={
            <div style={styles.sidebar}>
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
          }
          topSidebar={56}
        >
           {map}
        </Sidebar>
      );
    }

    return (
      <div id='app-container' style={styles.root} >
        <TopBar
          flow={this.props.flow}
          itemCount={locNumber + unknownNumber}
          toggleMenu={this.toggleMenu.bind(this)}
          updateFlow={this.props.updateFlow}
        />
        {sidebar}
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
  sidebarOpen: React.PropTypes.bool,
  toggleMenu: React.PropTypes.func,
  updateData: React.PropTypes.func,
  updateFlow: React.PropTypes.func,
  updateFocusedMarker: React.PropTypes.func,
  updateMarkers: React.PropTypes.func,
};

export default App;
