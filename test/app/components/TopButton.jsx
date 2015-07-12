'use strict';

import React from 'react/addons';
import sinon from 'sinon';
import { assert } from 'chai';

import compWithContext from '../../utils/compWithContext';
import TopButtonRaw from '../../../app/components/TopButton';

const TopButton = compWithContext(TopButtonRaw);
const TestUtils = React.addons.TestUtils;

describe('TopButton component', function () {
  it('should set value using label property', function () {
    const label = 'Foo';

    const component = TestUtils.renderIntoDocument(
      <TopButton label={label} />
    );
    const button = TestUtils.findRenderedComponentWithType(component, TopButton);
    const value = React.findDOMNode(button).getElementsByTagName('span')[0].innerHTML;

    assert.equal(value, label, 'label set');
  });

  it('should call onClick property', function () {
    const onClick = sinon.spy();

    const component = TestUtils.renderIntoDocument(
      <TopButton onClick={onClick} />
    );
    const button = TestUtils.findRenderedComponentWithType(component, TopButton);

    TestUtils.Simulate.click(React.findDOMNode(button));
    assert.ok(onClick.calledOnce, 'click handler called');
  });
});
