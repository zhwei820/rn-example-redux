'use strict';
import React, {
  ListView,
} from 'react-native';

import * as types from '../../constant/ActionTypes';

var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const initialState = {
  templateListData: dataSource.cloneWithRows([]),
  templateListFetching: false,
  templateListFetched: false,
  error: '',
}

export default function OfficeTemplateList(state = initialState, action) {
  state = Object.assign({}, state, {
    templateListFetched: false,
  });
  switch (action.type) {
    case types.FETCH_OFFICE_TEMPLATE_RESULT:
      return Object.assign({}, state, {
        templateListFetching: true,
        templateListData: dataSource.cloneWithRows([]),
      });
    case types.RECEIVE_OFFICE_TEMPLATE_RESULT:
      return Object.assign({}, state, {
        templateListFetching: false,
        templateListFetched: true,
        templateListData: dataSource.cloneWithRows(action.templateListData),
        error: action.error,
      });
    default:
      return state;
  }
}
