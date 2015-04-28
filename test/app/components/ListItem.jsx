'use strict';

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;

const assert = require('chai').assert;
const sinon = require('sinon');

const compWithContext = require('../../utils/compWithContext');
const ListItem = compWithContext(
  require('../../../app/components/ListItem')
);

describe('ListItem component', function () {
  it('should embed children elements', function () {
    const component = TestUtils.renderIntoDocument(
      <ListItem
        icon='foo'
        title='foo'
        description='foo'
      />
    );
    const listItem = TestUtils.findRenderedComponentWithType(component, ListItem);

    assert.ok(TestUtils.findRenderedDOMComponentWithClass(listItem, 'icon'), 'has icon');
    assert.ok(TestUtils.findRenderedDOMComponentWithClass(listItem, 'content'), 'has content');
    assert.ok(TestUtils.findRenderedDOMComponentWithClass(listItem, 'border-bottom'), 'has bottom border');
  });

  it('should call onClick property', function () {
    const onClick = sinon.spy();

    const component = TestUtils.renderIntoDocument(
      <ListItem onClick={onClick} />
    );
    const listItem = TestUtils.findRenderedComponentWithType(component, ListItem);

    TestUtils.Simulate.click(React.findDOMNode(listItem));
    assert.ok(onClick.calledOnce, 'click handler called');
  });
});
