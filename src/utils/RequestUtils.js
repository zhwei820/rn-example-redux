'use strict';
import React from 'react-native';
const {
  Alert,
} = React;

import NetworkInfo from 'react-native-network-info';
import * as data from '../constant/VirtualData';
export function request(url, method, body, headers) {
  console.log('url = ', url);
  var isOk;
  return new Promise((resolve, reject) => {
    // const timeoutId = setTimeout(() => reject(new Error('request timeout')), 30000);
    // fetch(url, {
    //     method: method,
    //     headers: headers,
    //     body: body,
    //   })
    //   .then((response) => {
    //     if (response.ok) {
    //       isOk = true;
    //     } else {
    //       isOk = false;
    //     }
    //     return response.json();
    //   })
    //   .then((responseData) => {
    //     clearTimeout(timeoutId);
    //     if (isOk) {
    //       console.log('responseData = ', responseData);
    //       resolve(responseData);
    //     } else {
    //       reject(responseData);
    //     }
    //   })
    //   .catch((error) => {
    //     clearTimeout(timeoutId);
    //     reject(error);
    //   });

    resolve(getResponseData(url));
  })
}

function getResponseData(url) {
  if (url.indexOf("login") > 0)
    return data.LOGIN_DATA;
  else if (url.indexOf("personalTasksCount") > 0)
    return data.COUNT_DATA;
  else if (url.indexOf("newsData") > 0)
    return data.NEWS_DATA;
  else if (url.indexOf("findAllCmsArticle") > 0)
    return data.NOTICE_LIST_DATA;
  else if (url.indexOf("findAddressByUserName") > 0)
    return data.ADDRESS_DATA;
  else if (url.indexOf("personalTasks") > 0)
    return data.TASK_LIST_DATA;
  else if (url.indexOf("viewProcessTaskDeatil") > 0)
    return data.TASK_DETAIL_DATA;
  else if (url.indexOf("viewTaskForm") > 0)
    return data.TASK_LIST_APPROVE_DATA;
  else if (url.indexOf("processNodeButtons") > 0)
    return data.NODE_BUTTON_DATA;
  else if (url.indexOf("completeTask") > 0)
    return data.APPROVE_RESULT_DATA;
  else if (url.indexOf("bpmType") > 0)
    return data.OFFICE_ITEM_DATA;
  else if (url.indexOf("bpmProcess.do") > 0)
    return data.TASK_LIST_CONTENT_DATA;
  else if (url.indexOf("viewStartForm") > 0)
    return data.TASK_LIST_FORM_DATA;
  else if (url.indexOf("startProcessInstance") > 0)
    return data.TASK_LIST_FORM_COMMIT_DATA;
  }

export function showAlert(error) {
  let errorContent = '网络请求失败，请稍后再试！'
  let errorTitle = '当前网络异常！'
  if(error == 'Error: request timeout')
    errorContent = '网络请求超时或未接入公司网络，请检查网络后再试！'
  Alert.alert(errorTitle, errorContent, [{text: '好'},]);
}
