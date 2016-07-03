'use strict';
import React, {
  ListView,
} from 'react-native';

import * as types from '../../constant/ActionTypes';

const initialState = {
  taskListData: [],
  taskSearchList: [],
  taskListFetching: false,
  taskListFetched: false,
  taskListFetchingMore: false,
  taskListHasMore: true,
  error: '',
}

export default function OfficetaskList(state = initialState, action) {
  state = Object.assign({}, state, {
    taskListFetched: false,
  });
  switch (action.type) {
    case types.FETCH_TASK_LIST_RESULT:
      if(action.pageNo == 1) {
        return Object.assign({}, state, {
          taskListFetching: true,
          taskListData: [],
        });
      } else {
        return Object.assign({}, state, {
          taskListFetchingMore: true,
        });
      }
    case types.RECEIVE_TASK_LIST_RESULT:
      let list = action.taskListData.list ? action.taskListData.list : [];
      let process = action.taskListData.process ? action.taskListData.process : [];
      return Object.assign({}, state, {
        taskListData: state.taskListFetchingMore ? state.taskListData.concat(list) : list,
        taskSearchList: process,
        taskListFetching: false,
        taskListFetchingMore: false,
        taskListFetched: true,
        taskListHasMore: list.length === 0 ? false : true,
        error: action.error,
      });
    default:
      return state;
  }
}
