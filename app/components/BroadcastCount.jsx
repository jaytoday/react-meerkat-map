'use strict';

import React from 'react';
import BroadcastCountIcon from './BroadcastCountIcon';
import { mergeAndPrefix } from '../utils/stylePropable';

class BroadcastCount extends React.Component {
  _getStyle() {
    return {
      display: 'flex',
      alignItems: 'center',
    };
  }

  render() {
    const style = this._getStyle();
    const firstIcon = {marginLeft: 0};

    return (
      <div style={mergeAndPrefix(style, this.props.style)}>
        <BroadcastCountIcon
          icon='mui-icon-comment'
          label={this.props.count.commentsCount}
          style={firstIcon}
        />
        <BroadcastCountIcon
          icon='mui-icon-heart'
          label={this.props.count.likesCount}
        />
        <BroadcastCountIcon
          icon='mui-icon-eye'
          label={this.props.count.watchersCount}
        />
        <BroadcastCountIcon
          icon='mui-icon-retweet'
          label={this.props.count.restreamsCount}
        />
      </div>
    );
  }
}

BroadcastCount.propTypes = {
  commentsCount: React.PropTypes.number,
  count: React.PropTypes.object,
  likesCount: React.PropTypes.number,
  restreamsCount: React.PropTypes.number,
  style: React.PropTypes.object,
  watchersCount: React.PropTypes.number,
};

BroadcastCount.defaultProps = {
  style: {},
};

export default BroadcastCount;
