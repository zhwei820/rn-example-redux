'use strict';

import * as types from '../../constant/ActionTypes';
import {request} from '../../utils/RequestUtils';

export function fetchTaskDetail(url) {
  return dispatch => {
    dispatch(fetchTaskDetailResult());
    return request(url)
      .then((responseData) => {
        if (responseData && responseData.formData && responseData.historicTasks && responseData.formData.name && responseData.formData.listctrlVoList) {
          dispatch(receiveTaskDetailResult(responseData));
        }
        else {
          dispatch(receiveTaskDetailResult({}));
        }
      })
      .catch((error) => {
        console.error('fetchTaskDetail error: ' + error);
        dispatch(receiveTaskDetailResult({}, error));
      })
  }
}

function fetchTaskDetailResult() {
  return {
    type: types.FETCH_TASK_DETAIL_RESULT,
  }
}

function receiveTaskDetailResult(responseData, error) {
  return {
    type: types.RECEIVE_TASK_DETAIL_RESULT,
    taskDetailData: responseData,
    error: error,
  }
}
