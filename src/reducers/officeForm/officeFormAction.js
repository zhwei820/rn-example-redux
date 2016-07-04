'use strict';

import * as types from '../../constant/ActionTypes';
import {OFFICE_LIST_DETAIL_URL, OFFICE_LIST_DETAILCOMMIT_URL} from '../../constant/Network';
import {request} from '../../utils/RequestUtils';

var formInputData = "{}";
var tableInputData = {};

export function fetchOfficeForm(FormId) {
  return dispatch => {
    dispatch(fetchOfficeFormResult());
    formInputData = "{}";
    tableInputData = {};
    let url = OFFICE_LIST_DETAIL_URL + FormId;
    return request(url)
      .then((responseData) => {
        dispatch(receiveOfficeFormResult(responseData));
      })
      .catch((error) => {
        console.error('fetchOfficeForm error: ' + error);
        dispatch(receiveOfficeFormResult(undefined, error));
      })
  }
}

function fetchOfficeFormResult() {
  return {
    type: types.FETCH_OFFICE_FORM_RESULT,
  }
}

function receiveOfficeFormResult(responseData, error) {
  return {
    type: types.RECEIVE_OFFICE_FORM_RESULT,
    formData: responseData,
    error: error,
  }
}

export function changeKeyboardSpace(keyboardSpace) {
  return {
    type: types.CHANGE_OFFICE_FORM_KEYBOARD_SPACE,
    keyboardSpace: keyboardSpace,
  }
}

export function handleUserInput(type, userInputKey, userInputValue, extraData) {
  return dispatch => {
    // if (type == 'form') {
    //   dispatch(setJson(type, userInputKey, userInputValue));
    // }else{
      if (userInputValue == ''){
          dispatch(deleteJson(type, userInputKey));
      }
      else{
        //如果被选择的附件继续从１开始，说明用户重新上传了，此时清空之前的文件数组
        if(extraData && extraData.type == 'fj' && extraData.index == '1'){
          var jsonObj = JSON.parse(formInputData);
          for(let json in jsonObj){
            if(json.indexOf(extraData.name) >= 0)
              dispatch(deleteJson(type, json));
          }
        }
        dispatch(setJson(type, userInputKey, userInputValue));
      }

    // }
  }
}

function setJson(type, name, value) {
  if (type == 'form') {
    if (!formInputData)
      formInputData = "{}";
    var jsonObj = JSON.parse(formInputData);
    jsonObj[name] = value;
    formInputData = JSON.stringify(jsonObj);
    return {
      type: types.HANDLE_FORM_USER_INPUT,
      formInputData: formInputData,
    }
  } else if (type == 'table') {
    if (!tableInputData){
      tableInputData = {};}
    var jsonObj = tableInputData;
    jsonObj[name] = value;
    tableInputData = jsonObj;
    return {
      type: types.HANDLE_TABLE_USER_INPUT,
      tableInputData: tableInputData,
    }
  }

}

function deleteJson(type, name) {
  if (type == 'form') {
    if (!formInputData)
      return null;
    var jsonObj = JSON.parse(formInputData);
    delete jsonObj[name];
    formInputData = JSON.stringify(jsonObj);
    return {
      type: types.HANDLE_FORM_USER_INPUT,
      formInputData: formInputData,
    }
  } else if (type == 'table') {
    if (!tableInputData)
      return null;
      //直接使用json数据
    var  jsonObj = tableInputData
    delete jsonObj[name];
    tableInputData = jsonObj
    return {
      type: types.HANDLE_TABLE_USER_INPUT,
      tableInputData: tableInputData,
    }
  }
}

export function assignTableData(tableData){
  tableInputData = {};
  return {
    type: types.ASSIGN_TABLE_DATA,
    tableData: tableData,
  }
}

export function assignTableInputData(tableInputData){
  return {
    type: types.ASSIGN_TABLE_INPUT_DATA,
    tableInputData: tableInputData,
  }
}

export function fetchCommitOfficeForm(formData, tableData, formId, userId) {
  return dispatch => {
    dispatch(fetchCommitOfficeFormResult());
    let url = OFFICE_LIST_DETAILCOMMIT_URL + userId + '&bpmProcessId=' + formId;
    let body = JSON.stringify({
       formData: formData,
       tableData: tableData});
    return request(url, 'post', body, {'Accept': 'application/json', 'Content-Type': 'application/json',})
      .then((responseData) => {
        dispatch(receiveCommitOfficeFormResult(responseData));
      })
      .catch((error) => {
        console.error('fetchCommitOfficeForm error: ' + error);
        dispatch(receiveCommitOfficeFormResult({}, error));
      })
  }
}

function fetchCommitOfficeFormResult() {
  return {
    type: types.FETCH_COMMIT_OFFICE_FORM_RESULT,
  }
}

function receiveCommitOfficeFormResult(responseData, error) {
  return {
    type: types.RECEIVE_COMMIT_OFFICE_FORM_RESULT,
    commitResult: responseData.code,
    error: error,
  }
}

export function onEditLine(tableData){
  tableInputData = tableData;
  return {
    type: types.RECEIVE_COMMIT_OFFICE_FORM_EDIT,
    tableData: tableData,
  }
}

export function onClearEdit(tableData){
  tableInputData = tableData;
  return {
    type: types.RECEIVE_COMMIT_OFFICE_FORM_CLEAREDIT,
    tableData: tableData,
  }
}
