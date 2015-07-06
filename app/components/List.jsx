'use strict';

import React from 'react';
import ReactCSSTransitionGroup from './TimeoutTransitionGroup';
import { mergeAndPrefix } from '../utils/stylePropable';
import { List } from 'material-ui';
import ListItem from './ListItem';

export default class extends React.Component {
  static contextTypes = {
    muiTheme: React.PropTypes.object,
  };

  static propTypes = {
    itemData: React.PropTypes.array,
    onClick: React.PropTypes.func,
    style: React.PropTypes.object,
    title: React.PropTypes.string,
  };

  static defaultProps = {
    style: {},
  };

  _getStyles() {
    const theme = this.context.muiTheme.component.list;

    return {
      subheaderStyle: {
        color: theme.color,
        borderBottom: `1px solid ${theme.borderColor}`,
        backgroundColor: theme.backgroundColor,
        width: '100%',
        display: 'block',
        textAlign: 'center',
        lineHeight: '24px',
      },
      root: {
        position: 'absolute',
        top: '56px',
        width: '290px',
        overflow: 'hidden',
        height: 'calc(50% - 28px)',
        paddingBottom: 0,
        right: '0',
      },
      listContainer: {
        listStyleType: 'none',
        padding: '0',
        margin: '0',
        overflowX: 'hidden',
        overflowY: 'scroll',
        height: 'calc(100% - 25px)',
      },
      transition: {
        enter: {
          default: {
            opacity: '0.01',
            transition: 'opacity .3s ease-in',
          },
          active: {
            opacity: '1',
          },
        },
        leave: {
          default: {
            opacity: '1',
            transition: 'opacity .3s ease-in',
          },
          active: {
            opacity: '0.01',
          },
        },
      },
    };
  }

  render() {
    let styles = this._getStyles();

    return (
      <List
        style={mergeAndPrefix(styles.root, this.props.style)}
        subheader={this.props.title}
        subheaderStyle={styles.subheaderStyle}
      >
        <div style={styles.listContainer}>
          <ReactCSSTransitionGroup
            enterTimeout={1000}
            leaveTimeout={0}
            style={styles.transition}
          >
            {this.props.itemData.map((obj) => {
              return (
                <ListItem
                  avatarUrl={obj.user.profile_picture}
                  count={obj.broadcast.count}
                  description={`[${obj.broadcast.date}] ${obj.caption}`}
                  key={obj.id}
                  onTouchTap={this.props.onClick ? this.props.onClick.bind(null, obj) : undefined}
                  secondaryTextLines={2}
                  title={obj.user.full_name.trim() || '-'}
                />
              );
            })}
          </ReactCSSTransitionGroup>
        </div>
      </List>
    );
  }

}
