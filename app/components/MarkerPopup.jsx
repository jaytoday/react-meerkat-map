'use strict';

import React from 'react';
import Cover from './Cover';
import BroadcastCount from './BroadcastCount';

import theme from '../style/themes/default-theme';

class MarkerPopup extends React.Component {
  _getStyles() {
    return {
      broadcastCount: {
        marginTop: 5,
        fontSize: 13,
        color: theme.getComponentThemes(theme.getPalette()).markerPopup.color,
      },
      caption: {
        wordWrap: 'break-word',
      },
    };
  }

  render() {
    const styles = this._getStyles();

    return (
      <div>
        <a href={this.props.broadcast.url} target='_blank'>
          <Cover
            cover={this.props.broadcast.cover}
            location={this.props.broadcast.location}
            watchersCount={this.props.broadcast.count.watchersCount}
          />
        </a>
        <div style={styles.caption}>{this.props.caption}</div>
        <BroadcastCount
          count={this.props.broadcast.count}
          style={styles.broadcastCount}
        />
      </div>
    );
  }
}

MarkerPopup.contextTypes = {
  muiTheme: React.PropTypes.object,
};

MarkerPopup.propTypes = {
  broadcast: React.PropTypes.object,
  caption: React.PropTypes.string,
  imgUrl: React.PropTypes.string,
  profileUrl: React.PropTypes.string,
};

export default MarkerPopup;
