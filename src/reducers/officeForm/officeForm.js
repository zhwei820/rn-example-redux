'use strict';
import React, {
  ListView,
} from 'react-native';

import * as types from '../../constant/ActionTypes';

const initialState = {
  keyboardSpace: undefined,

  formInputData: undefined,
  tableInputData: undefined,
  tableData: [],

  formData: undefined,
  formFetching: false,
  formFetched: false,

  formCommitting: false,
  formCommitted: false,
  commitResult: '',
  error: '',
}

export default function officeForm(state = initialState, action) {
  state = Object.assign({}, state, {
    formFetched: false,
    formCommitted: false,
  });
  switch (action.type) {
    case types.FETCH_OFFICE_FORM_RESULT:
      return Object.assign({}, state, {
        formFetching: true,
        formData: undefined,
        tableInputData: undefined,
        tableData: [],
      });
    case types.RECEIVE_OFFICE_FORM_RESULT:
      return Object.assign({}, state, {
        formFetching: false,
        formFetched: true,
        formData: action.formData,
        error: action.error,
      });
    case types.CHANGE_OFFICE_FORM_KEYBOARD_SPACE:
      return Object.assign({}, state, {
        keyboardSpace: action.keyboardSpace,
      });
    case types.HANDLE_FORM_USER_INPUT:
      return Object.assign({}, state, {
        formInputData: action.formInputData,
      });
    case types.HANDLE_TABLE_USER_INPUT:
      return Object.assign({}, state, {
        tableInputData: action.tableInputData,
      });
    case types.ASSIGN_TABLE_DATA:
      return Object.assign({}, state, {
        tableData: action.tableData,
        tableInputData: {},
      });
    case types.ASSIGN_TABLE_INPUT_DATA:
      return Object.assign({}, state, {
        tableInputData: action.tableInputData,
      });
    case types.FETCH_COMMIT_OFFICE_FORM_RESULT:
      return Object.assign({}, state, {
        formCommitting: true,
      });
    case types.RECEIVE_COMMIT_OFFICE_FORM_RESULT:
      return Object.assign({}, state, {
        formCommitting: false,
        formCommitted: true,
        commitResult: action.commitResult,
        error: action.error,
      });
      case types.RECEIVE_COMMIT_OFFICE_FORM_EDIT:
      return Object.assign({}, state, {
        tableInputData: action.tableData,
      });
      case types.RECEIVE_COMMIT_OFFICE_FORM_CLEAREDIT:
      return Object.assign({}, state, {
        tableInputData: action.tableData,
      });
        break;
    default:
      return state;
  }
}
