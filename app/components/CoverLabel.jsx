'use strict';

import React from 'react';
import { mergeAndPrefix } from '../utils/stylePropable';

import theme from '../style/themes/default-theme';

class CoverLabel extends React.Component {
  _getStyle() {
    return {
      padding: 5,
      color: theme.getComponentThemes(theme.getPalette()).coverLabel.color,
      textAlign: 'center',
      whiteSpace: 'nowrap',
      borderRadius: '0.25em',
      fontWeight: 'bold',
      fontSize: 10,
      marginLeft: 4,
      position: 'relative',
    };
  }

  render() {
    const style = this._getStyle();

    return (
      <span style={mergeAndPrefix(style, this.props.style)}>
        <i className={this.props.icon}></i> {this.props.label}
      </span>
    );
  }
}

CoverLabel.contextTypes = {
  muiTheme: React.PropTypes.object,
};

CoverLabel.propTypes = {
  backgroundColor: React.PropTypes.string,
  icon: React.PropTypes.string,
  label: React.PropTypes.string,
  style: React.PropTypes.object,
};

CoverLabel.defaultProps = {
  style: {},
};

export default CoverLabel;
