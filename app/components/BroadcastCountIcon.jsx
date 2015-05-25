'use strict';

import React from 'react';
import { mergeAndPrefix } from '../utils/stylePropable';

class BroadcastCountIcon extends React.Component {
  _getStyle() {
    return {
      marginLeft: 5,
      marginRight: 1,
    };
  }

  render() {
    const style = this._getStyle();

    return (
      <span>
        <i className={this.props.icon} style={mergeAndPrefix(style, this.props.style)}></i> {this.props.label}
      </span>
    );
  }
}

BroadcastCountIcon.propTypes = {
  icon: React.PropTypes.string,
  label: React.PropTypes.number,
  style: React.PropTypes.object,
};

BroadcastCountIcon.defaultProps = {
  style: {},
};

export default BroadcastCountIcon;
