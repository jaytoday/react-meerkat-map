'use strict';

import React from 'react';
import FlowButton from './FlowButton';
import GithubButton from './GithubButton';
import Title from './Title';
import { Toolbar, ToolbarGroup } from 'material-ui/lib/toolbar';

class TopBar extends React.Component {
  _getStyles() {
    const theme = this.context.muiTheme.component.toolbar;

    return {
      root: {
        borderBottom: `1px solid ${theme.borderColor}`,
        boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.12)',
      },
      title: {
        position: 'absolute',
        top: '0',
        left: '50%',
        transform: 'translate(-50%, 0px)',
        color: theme.textColor,
        fontSize: '15px',
        lineHeight: '56px',
      },
      toolbarGroup: {
        root: {
          float: 'right',
        },
        flatButton: {
          bottom: '1px',
          margin: '0 24px',
        },
        iconButton: {
          top: '4px',
          margin: '0 -12px',
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
        <ToolbarGroup key={1} style={styles.toolbarGroup.root}>
          <FlowButton label={this.props.flow} onTouchTap={this._onFlowTouch.bind(this)} style={styles.toolbarGroup.flatButton} />
          <GithubButton repoUrl={this.context.repoUrl} style={styles.toolbarGroup.iconButton} />
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
  updateFlow: React.PropTypes.func,
};

TopBar.defaultProps = {
  itemCount: 0,
  style: {},
};

export default TopBar;
