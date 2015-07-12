'use strict';

import React from 'react';
import Radium from 'radium';
import TopButton from './TopButton';
import GithubButton from './GithubButton';
import Title from './Title';
import Transitions from 'material-ui/lib/styles/transitions';
import { Toolbar, ToolbarGroup } from 'material-ui/lib/toolbar';

@Radium
class TopBar extends React.Component {
  _getStyles() {
    const theme = this.context.muiTheme.component.toolbar;

    return {
      root: {
        borderBottom: `1px solid ${theme.borderColor}`,
      },
      title: {
        position: 'absolute',
        top: '0',
        left: '50%',
        transform: 'translate(-50%, 0px)',
        color: theme.textColor,
        fontSize: '15px',
        lineHeight: '56px',
        transition: Transitions.easeOut(),

        '@media (max-width: 1080px)': {
          transform: 'none',
          left: '24px',
        },
      },
      toolbarGroup: {
        root: {
          position: 'absolute',
          right: '0',
          top: '0',
        },
        flatButton: {
          bottom: '1px',
        },
        iconButton: {
          top: '4px',
          margin: '0',
        },
        separator: {
          float: 'none',
          marginLeft: 'auto',
        },
      },
    };
  }

  _onFlowTouch() {
    this.props.updateFlow(this.props.flow);
  }

  render() {
    let styles = this._getStyles.call(this);

    let title = this.context.title;

    if (this.props.itemCount > 0) {
      title = `${title}s (${this.props.itemCount})`;
    }

    return (
      <Toolbar style={styles.root}>
        <Title />
        <div className='title' style={styles.title}>
          {title}
        </div>
        <ToolbarGroup style={styles.toolbarGroup.root}>
          <GithubButton repoUrl={this.context.repoUrl} style={styles.toolbarGroup.iconButton} />
          <TopButton label={this.props.flow} onTouchTap={this._onFlowTouch.bind(this)} style={styles.toolbarGroup.flatButton} />
          <TopButton label={'Menu'} onTouchTap={this.props.toggleMenu} style={styles.toolbarGroup.flatButton} />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

TopBar.contextTypes = {
  muiTheme: React.PropTypes.object,
  repoUrl: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
};

TopBar.propTypes = {
  flow: React.PropTypes.string,
  itemCount: React.PropTypes.number,
  style: React.PropTypes.object,
  toggleMenu: React.PropTypes.func,
  updateFlow: React.PropTypes.func,
};

TopBar.defaultProps = {
  itemCount: 0,
  style: {},
};

export default TopBar;
