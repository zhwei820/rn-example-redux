'use strict';

import * as types from '../../constant/ActionTypes';

const initialState = {
  canGoBack: true,
  canClick: true,
}

export default function timeConsuming(state = initialState, action) {
  switch (action.type) {
    case types.START_HANDLE_TIME_CONSUMING:
      return Object.assign({}, state, {
        canGoBack: false,
        canClick: false,
      });
    case types.STOP_HANDLE_TIME_CONSUMING:
      return Object.assign({}, state, {
        canGoBack: true,
        canClick: true,
      });
    default:
      return state;
  }
}
