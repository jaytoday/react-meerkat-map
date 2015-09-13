'use strict';

import React from 'react';
import ReactCSSTransitionGroup from './TimeoutTransitionGroup';
import { mergeAndPrefix } from '../utils/stylePropable';
import List from 'material-ui/lib/lists/list';
import ListItem from './ListItem';

class SideList extends React.Component {
  _getStyles() {
    const theme = this.context.muiTheme.component.list;

    return {
      subheaderStyle: {
        color: theme.color,
        borderBottom: `1px solid ${theme.borderColor}`,
        backgroundColor: theme.backgroundColor,
        display: 'block',
        textAlign: 'center',
        lineHeight: '24px',
        paddingLeft: '0',
      },
      root: {
        position: 'absolute',
        top: '0',
        width: '290px',
        overflow: 'hidden',
        height: '50%',
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
                  primaryText={obj.user.full_name.trim() || '-'}
                  secondaryTextLines={2}
                  username={obj.user.username}
                />
              );
            })}
          </ReactCSSTransitionGroup>
        </div>
      </List>
    );
  }
}

SideList.contextTypes = {
  muiTheme: React.PropTypes.object,
};

SideList.propTypes = {
  itemData: React.PropTypes.array,
  onClick: React.PropTypes.func,
  style: React.PropTypes.object,
  title: React.PropTypes.string,
};

SideList.defaultProps = {
  style: {},
};

export default SideList;
