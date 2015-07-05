'use strict';

import React from 'react/addons';
import { assert } from 'chai';

import compWithContext from '../../utils/compWithContext';
import ListItem from '../../../app/components/SideListItem';
import ListRaw from '../../../app/components/SideList';

const List = compWithContext(ListRaw);
const TestUtils = React.addons.TestUtils;

describe('SideList component', function () {
  xit('should embed ListItem component for each item in itemData property', function () {
    const data = [
      {
        id: 1,
        user: {
          /* eslint-disable */
          profile_picture: 'foo',
          full_name: 'foo',
          /* eslint-enable */
          username: 'foo',
        },
      },
      {
        id: 2,
        user: {
          /* eslint-disable */
          profile_picture: 'foo',
          full_name: 'foo',
          /* eslint-enable */
          username: 'foo',
        },
      },
    ];

    const component = TestUtils.renderIntoDocument(
      <List itemData={data} />
    );
    const numListItems = TestUtils.scryRenderedComponentsWithType(component, ListItem).length;

    assert.equal(numListItems, data.length, 'correct number of list items');
  });
});
