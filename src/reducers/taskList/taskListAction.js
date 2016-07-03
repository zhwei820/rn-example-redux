'use strict';

import * as types from '../../constant/ActionTypes';
import {request} from '../../utils/RequestUtils';

export function fetchTaskList(url, userId, id, processTitle, processNo, pageNo) {
  return dispatch => {
    dispatch(fetchTaskListResult(pageNo));
    let _url = url + userId + '&processNo=' + processNo + '&processTitle=' + processTitle + '&id=' + id + '&pageNo=' + pageNo;
    return request(_url)
      .then((responseData) => {
        dispatch(receiveTaskListResult(responseData, '', pageNo));
      })
      .catch((error) => {
        console.error('fetchTaskList error: ' + error);
        dispatch(receiveTaskListResult([], error));
      })
  }
}

function fetchTaskListResult(pageNo) {
  return {
    type: types.FETCH_TASK_LIST_RESULT,
    pageNo: pageNo,
  }
}

function receiveTaskListResult(responseData, error, pageNo) {
  return {
    type: types.RECEIVE_TASK_LIST_RESULT,
    taskListData: responseData,
    error: error,
    pageNo: pageNo,
  }
}
