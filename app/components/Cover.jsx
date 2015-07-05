'use strict';

import React from 'react';
import CoverLabel from './CoverLabel';

import theme from '../style/themes/default-theme';

class Cover extends React.Component {
  _getStyles() {
    const cTheme = theme.getComponentThemes(theme.getPalette()).cover;

    return {
      cover: {
        width: '100%',
        height: 300,
        padding: 1,
        backgroundColor: cTheme.backgroundColor,
        backgroundImage: `url('${this.props.cover}')`,
        backgroundSize: 'cover',
      },
      labelWatchers: {
        backgroundColor: cTheme.labelWatchers.backgroundColor,
        top: 6,
      },
      labelLocation: {
        backgroundColor: cTheme.labelLocation.backgroundColor,
        top: 15,
      },
    };
  }

  render() {
    const styles = this._getStyles();
    const labelWatchers = `${this.props.watchersCount} Watching`;

    return (
      <div style={styles.cover}>
        <CoverLabel
          icon='mui-icon-eye'
          label={labelWatchers}
          style={styles.labelWatchers}
        /><br/>
        <CoverLabel
          icon='mui-icon-location'
          label={this.props.location}
          style={styles.labelLocation}
        />

      </div>
    );
  }
}

Cover.contextTypes = {
  muiTheme: React.PropTypes.object,
};

Cover.propTypes = {
  cover: React.PropTypes.string,
  location: React.PropTypes.string,
  watchersCount: React.PropTypes.number,
};

export default Cover;
