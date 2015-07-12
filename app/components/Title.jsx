'use strict';

import React from 'react';
import Radium from 'radium';
import Transitions from 'material-ui/lib/styles/transitions';
import { ToolbarTitle } from 'material-ui/lib/toolbar';

@Radium
class Title extends React.Component {
  _getStyle() {
    const theme = this.context.muiTheme.component.title;

    return {
      root: {
        color: theme.color,
        fontSize: '24px',
        paddingRight: '0',
        transition: Transitions.easeOut(),

        ':hover': {
          color: theme.hoverColor,
        },

        '@media (max-width: 1080px)': {
          transform: 'translate(-100%, 0px)',
        },
      },
      toolbarTitle: {
        fontSize: '24px',
        paddingRight: '0',
      },
    };
  }

  render() {
    const styles = this._getStyle.call(this);

    return (
      <div style={styles.root}>
        <ToolbarTitle
          style={styles.toolbarTitle}
          text='MeerkatMap'
        />
      </div>
    );
  }
}

Title.contextTypes = {
  muiTheme: React.PropTypes.object,
};

Title.propTypes = {
  text: React.PropTypes.string,
};

export default Title;
