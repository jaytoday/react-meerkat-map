'use strict';

import React from 'react';
import BroadcastCount from './BroadcastCount';
import {
  ListDivider,
  ListItem,
} from 'material-ui';
import ListItemAvatar from './ListItemAvatar';
import { mergeAndPrefix } from '../utils/stylePropable';

export default class extends React.Component {
  static contextTypes = {
    muiTheme: React.PropTypes.object,
  };

  static propTypes = {
    avatarUrl: React.PropTypes.string,
    count: React.PropTypes.object,
    description: React.PropTypes.string,
    leftAvatar: React.PropTypes.object,
    onTouchTap: React.PropTypes.func,
    secondaryText: React.PropTypes.object,
    secondaryTextLines: React.PropTypes.number,
    title: React.PropTypes.string,
  };

  _getStyles() {
    const theme = this.context.muiTheme.component.listDivider;

    return {
      title: {
        fontSize: '12px',
        lineHeight: '15px',
      },
      secondaryText: {
        fontSize: '10px',
        lineHeight: '15px',
        marginTop: 0,
      },
      overflow: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        width: '190px',
        display: 'inline-block',
        whiteSpace: 'nowrap',
      },
      innerDiv: {
        paddingLeft: '72px',
        paddingRight: '16px',
        paddingBottom: '6px',
        paddingTop: '8px',
      },
      divider: {
        backgroundColor: theme.backgroundColor,
        paddingTop: '0.1px',
      },
    };
  }

  render() {
    const styles = this._getStyles();
    /* eslint-disable */
    const {
      avatarUrl,
      count,
      description,
      title,
      ...other
    } = this.props;
    /* eslint-enable */

    return (
      <div>
        <ListItem
          {...other}
          innerDivStyle={styles.innerDiv}
          leftAvatar={<ListItemAvatar className='avatar' src={avatarUrl} />}
          secondaryText={
            <div style={styles.secondaryText}>
              <BroadcastCount count={count} />
              <div dangerouslySetInnerHTML={{__html: description}} style={styles.overflow}></div>
            </div>
          }
        >
          <span dangerouslySetInnerHTML={{__html: title}} style={mergeAndPrefix(styles.overflow, styles.title)}></span>
        </ListItem>
        <ListDivider className='border-bottom' inset={true} style={styles.divider} />
      </div>
    );
  }
}
