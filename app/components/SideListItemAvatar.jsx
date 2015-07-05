'use strict';

import React from 'react';
import { Avatar } from 'material-ui';
import { imageError } from '../utils/imageError';

class SideListItemAvatar extends React.Component {
  _getStyles() {
    const theme = this.context.muiTheme.component.avatar;

    return {
      borderColor: theme.borderColor,
      position: 'absolute',
      top: '11px',
      left: '16px',
      width: '38px',
      height: '38px',
    };
  }

  render() {
    const style = this._getStyles();

    return (
      <Avatar
        {...this.props}
        onError={imageError}
        style={style}
      />
    );
  }
}

SideListItemAvatar.contextTypes = {
  muiTheme: React.PropTypes.object,
};

SideListItemAvatar.propTypes = {
  src: React.PropTypes.string,
};

export default SideListItemAvatar;
