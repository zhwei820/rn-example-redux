 'use strict';

import * as types from '../../constant/ActionTypes';

const initialState = {
  isFetching: false,
  isFetched: false,
  officeItemData: undefined,
}

export default function tabOffice(state = initialState, action) {
  state = Object.assign({}, state, {
    isFetched: false,
  });
  switch (action.type) {
    case types.FETCH_OFFICE_ITEM_RESULT:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case types.RECEIVE_OFFICE_ITEM_RESULT:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        officeItemData: action.officeItemData,
      });
    default:
      return state;
  }
}
