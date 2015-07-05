'use strict';

import AppStore from '../../../app/stores/AppStore';
import { assert } from 'chai';

describe('AppStore', function () {
  before(function () {
    this.UnwrappedStore = AppStore[Object.getOwnPropertySymbols(AppStore)[2]];
    this.defaultState = AppStore.getState();
  });

  afterEach(function () {
    this.UnwrappedStore.newBroadcastData = this.defaultState.newBroadcastData;
    this.UnwrappedStore.broadcastData = this.defaultState.broadcastData;
    this.UnwrappedStore.focusMarker = this.defaultState.focusMarker;
    this.UnwrappedStore.flow = this.defaultState.flow;
  });

  describe('onUpdateInstaData()', function () {
    it('should update relevant app state', function () {
      const data = ['foo', 'bar'];

      this.UnwrappedStore.onUpdateInstaData(data);
      assert.deepEqual(AppStore.getState().newBroadcastData, data);
      assert.deepEqual(AppStore.getState().broadcastData, data);
      assert.deepEqual(AppStore.getState().focusMarker, {});

      assert.equal(AppStore.getState().flow, this.defaultState.flow);
    });
  });

  describe('onUpdateFocusedMarker()', function () {
    it('should update focusMarker state', function () {
      const data = 'foo';

      this.UnwrappedStore.onUpdateFocusedMarker(data);
      assert.equal(AppStore.getState().focusMarker, data);

      assert.deepEqual(AppStore.getState().newBroadcastData, this.defaultState.newBroadcastData);
      assert.deepEqual(AppStore.getState().broadcastData, this.defaultState.broadcastData);
      assert.equal(AppStore.getState().flow, this.defaultState.flow);
    });
  });

  describe('onUpdateFlowSuccess()', function () {
    it('should update flow state', function () {
      const newFlow = 'Pause';

      this.UnwrappedStore.onUpdateFlowSuccess(newFlow);
      assert.equal(AppStore.getState().flow, newFlow);

      assert.deepEqual(AppStore.getState().newBroadcastData, this.defaultState.newBroadcastData);
      assert.deepEqual(AppStore.getState().broadcastData, this.defaultState.broadcastData);
      assert.deepEqual(AppStore.getState().focusMarker, this.defaultState.focusMarker);
    });
  });
});
