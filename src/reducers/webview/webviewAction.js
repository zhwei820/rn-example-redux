'use strict';

import * as types from '../../constant/ActionTypes';

export function changeWebviewUrl(webviewUrl) {
  return {
    type: types.CHANGE_WEBVIEW_URL,
    webviewUrl: webviewUrl,
  }
}
