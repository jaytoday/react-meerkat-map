'use strict';

import React from 'react';
import ListItem from './ListItem';
import ReactCSSTransitionGroup from './TimeoutTransitionGroup';
import { mergeAndPrefix } from '../utils/stylePropable';

class List extends React.Component {
  _getStyles() {
    const theme = this.context.muiTheme.component.list;

    return {
      title: {
        color: theme.color,
        borderBottom: `1px solid ${theme.borderColor}`,
        backgroundColor: theme.backgroundColor,
        width: '100%',
        display: 'block',
        textAlign: 'center',
      },
      root: {
        position: 'absolute',
        top: '56px',
        width: '290px',
        overflow: 'hidden',
        height: 'calc(50% - 28px)',
        right: '0',
      },
      ul: {
        listStyleType: 'none',
        padding: '0',
        margin: '0',
        overflowX: 'hidden',
        overflowY: 'scroll',
        height: 'calc(100% - 21px)',
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
      <div style={mergeAndPrefix(styles.root, this.props.style)}>
        <span style={styles.title}>{this.props.title}</span>
        <ul style={styles.ul}>
          <ReactCSSTransitionGroup
            enterTimeout={1000}
            leaveTimeout={0}
            style={styles.transition}
          >
            {this.props.itemData.map((obj) => {
              return (
                <ListItem
                  count={obj.broadcast.count}
                  date={obj.broadcast.date}
                  description={obj.caption}
                  icon={obj.user.profile_picture}
                  key={obj.id}
                  onClick={this.props.onClick ? this.props.onClick.bind(null, obj) : undefined}
                  title={obj.user.full_name.trim() || '-'}
                />
              );
            })}
          </ReactCSSTransitionGroup>
        </ul>
      </div>
    );
  }
}

List.contextTypes = {
  muiTheme: React.PropTypes.object,
};

List.propTypes = {
  itemData: React.PropTypes.array,
  onClick: React.PropTypes.func,
  style: React.PropTypes.object,
  title: React.PropTypes.string,
};

List.defaultProps = {
  style: {},
};

export default List;
