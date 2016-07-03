'use strict';

import * as types from '../../constant/ActionTypes';
import {OFFICE_LIST_URL} from '../../constant/Network';
import {request} from '../../utils/RequestUtils';

export function fetchOfficeTemplateList(templateId,userId) {
  return dispatch => {
    dispatch(fetchTemplateListResult());
    let url = OFFICE_LIST_URL + templateId + "&accountId=" + userId;
    return request(url)
      .then((responseData) => {
        dispatch(receiveTemplateListResult(responseData));
      })
      .catch((error) => {
        console.error(('fetchOfficeTemplateList error: ' + error));
        dispatch(receiveTemplateListResult([], error));
      })
  }
}

function fetchTemplateListResult() {
  return {
    type: types.FETCH_OFFICE_TEMPLATE_RESULT,
  }
}

function receiveTemplateListResult(responseData, error) {
  return {
    type: types.RECEIVE_OFFICE_TEMPLATE_RESULT,
    templateListData: responseData,
    error: error,
  }
}
