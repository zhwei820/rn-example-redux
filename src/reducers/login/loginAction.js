'use strict';

import * as types from '../../constant/ActionTypes';
import {LOGIN_URL} from '../../constant/Network';
import { request } from '../../utils/RequestUtils';

export function fetchLogin(username, password) {
  return dispatch => {
    dispatch(fetchLoginResult());
    let body = JSON.stringify({
      userName: username,
      password: password,
    });
    return request(LOGIN_URL, 'post', body, {'Accept': 'application/json', 'Content-Type': 'application/json',})
      .then((responseData) => {
        dispatch(receiveLoginResult(responseData));
      })
      .catch((error) => {
        console.error('fetchLogin error: ' + error);
        dispatch(receiveLoginResult());
      })
  }
}

export function changeLoginAuth({username, password, rawData}) {
  return {
    type: types.CHANGE_LOGIN_AUTH,
    username: username,
    password: password,
    rawData: rawData
  }
}

function fetchLoginResult() {
  return {
    type: types.FETCH_LOGIN_RESULT,
  }
}

function receiveLoginResult(responseData) {
  return {
    type: types.RECEIVE_LOGIN_RESULT,
    rawData: responseData,
  }
}
