'use strict';
import React, {
  ListView,
} from 'react-native';

import * as types from '../../constant/ActionTypes';

const initialState = {
  tableList: [],
  content: [],
  historicTasks: [],
  name: '',
  taskDetailFetching: false,
  taskDetailFetched: false,
  error: '',
}

export default function OfficetaskDetail(state = initialState, action) {
  state = Object.assign({}, state, {
    taskDetailFetched: false,
  });
  switch (action.type) {
    case types.FETCH_TASK_DETAIL_RESULT:
      return Object.assign({}, state, {
        taskDetailFetching: true,
        tableList: [],
        content: [],
        historicTasks: [],
        name: '',
      });
    case types.RECEIVE_TASK_DETAIL_RESULT:
      let taskDetailData = action.taskDetailData;
      return Object.assign({}, state, {
        taskDetailFetching: false,
        taskDetailFetched: true,
        content: taskDetailData.formData ? taskDetailData.formData.content : [],
        historicTasks: taskDetailData.historicTasks ? taskDetailData.historicTasks : [],
        name: taskDetailData.formData ? taskDetailData.formData.name : '',
        tableList: taskDetailData.formData ? taskDetailData.formData.listctrlVoList : [],
        error: action.error,
      });
    default:
      return state;
  }
}
