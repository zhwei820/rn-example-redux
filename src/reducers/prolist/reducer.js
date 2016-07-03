import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  count: 0
});

export default function screens(state = initialState, action = {}) {
  switch (action.type) {
    case types.ORDERTAB1:
      state.orderTabId = 1
      return state;
    case types.ORDERTAB2:
      state.orderTabId = 2
      return state;
    case types.ORDERTAB3:
      state.orderTabId = 3
      return state;
    case types.ORDERTAB4:
      state.orderTabId = 4
      return state;
    case types.ORDERTAB5:
      state.orderTabId = 5
      return state;

    default:
      return state;
  }
}
