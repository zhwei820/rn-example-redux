'use strict';

import * as types from '../../constant/ActionTypes';

const initialState = {
  webviewUrl: '',
}

export default function webview(state = initialState, action) {
  switch (action.type) {
    case types.CHANGE_WEBVIEW_URL:
      return Object.assign({}, state, {
        webviewUrl: action.webviewUrl,
      });
    default:
      return state;
  }
}
