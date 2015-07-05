'use strict';

import React from 'react/addons';
import sinon from 'sinon';
import { assert } from 'chai';

import compWithContext from '../../utils/compWithContext';
import ListItemRaw from '../../../app/components/SideListItem';

const ListItem = compWithContext(ListItemRaw);
const TestUtils = React.addons.TestUtils;

describe('SideListItem component', function () {
  xit('should embed children elements', function () {
    const component = TestUtils.renderIntoDocument(
      <ListItem
        description='foo'
        icon='foo'
        title='foo'
      />
    );
    const listItem = TestUtils.findRenderedComponentWithType(component, ListItem);

    assert.ok(TestUtils.findRenderedDOMComponentWithClass(listItem, 'icon'), 'has icon');
    assert.ok(TestUtils.findRenderedDOMComponentWithClass(listItem, 'content'), 'has content');
    assert.ok(TestUtils.findRenderedDOMComponentWithClass(listItem, 'border-bottom'), 'has bottom border');
  });

  xit('should call onClick property', function () {
    const onClick = sinon.spy();

    const component = TestUtils.renderIntoDocument(
      <ListItem onClick={onClick} />
    );
    const listItem = TestUtils.findRenderedComponentWithType(component, ListItem);

    TestUtils.Simulate.click(React.findDOMNode(listItem));
    assert.ok(onClick.calledOnce, 'click handler called');
  });
});