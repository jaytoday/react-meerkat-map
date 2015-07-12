'use strict';

import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';

class TopButton extends React.Component {
  _getStyles() {
    const theme = this.context.muiTheme.component.flatButton;

    return {
      hoverColor: theme.hoverColor,
    };
  }

  render() {
    const styles = this._getStyles.call(this);

    return (
      <FlatButton
        {...this.props}
        hoverColor={styles.hoverColor}
      />
    );
  }
}

TopButton.contextTypes = {
  muiTheme: React.PropTypes.object,
};

TopButton.propTypes = {
  label: React.PropTypes.string,
  onTouchTap: React.PropTypes.func,
  style: React.PropTypes.object,
};

TopButton.defaultProps = {
  label: 'Pause',
  style: {},
};

export default TopButton;
