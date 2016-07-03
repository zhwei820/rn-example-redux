'use strict';

import * as types from '../../constant/ActionTypes';
import {PHOTO_DOWN, PHONENUMBER_EMAIL_GET, OFFICE_LIST_UPLOADFILE_URL, EDIT_USER_INFO_URL} from '../../constant/Network';
import FileManager from 'react-native-fs';
import { request } from '../../utils/RequestUtils';
import {Base64Encode,Base64Decode} from '../../utils/Base64';

export function fetchAvatar(userId) {
  let url = PHOTO_DOWN + userId + "&width=" + '160';
  let folderPath = FileManager.DocumentDirectoryPath + '/photo';
  let avatarPath = `${FileManager.DocumentDirectoryPath}/avatar/`;
  FileManager.mkdir(`${avatarPath}`);
  return dispatch => {
    dispatch(fetchGetAvatarResult());
		let avatarName = (new Date()).getTime();
    return FileManager.downloadFile(url, `${avatarPath}${avatarName}.png`)
      .then((success) => {
        let avatarData = {
          uri: `file://${avatarPath}${avatarName}.png`,
          isStatic: true
        };
        dispatch(receiveGetAvatarResult(avatarData));
      }).catch((error) => {
        console.error('fetchAvatar error: ' + error);
        dispatch(receiveGetAvatarResult(undefined, error));
      });
  }
}

function fetchGetAvatarResult() {
  return {
    type: types.FETCH_AVATAR_RESULT,
  }
}

function receiveGetAvatarResult(avatarData, error) {
  return {
    type: types.RECEIVE_AVATAR_RESULT,
    avatarData: avatarData,
    error: error,
  }
}

export function fetchPhoneNumAndEmail(userName) {
  return dispatch => {
    dispatch(fetchPhoneNumAndEmailResult());
    return request(PHONENUMBER_EMAIL_GET + userName)
      .then((responseData) => {
        dispatch(receivePhoneNumAndEmailResult(responseData));
      })
      .catch((error) => {
        console.error('fetchPhoneNumAndEmail error: ' + error);
        dispatch(receivePhoneNumAndEmailResult({}, error));
      })
  }
}

function fetchPhoneNumAndEmailResult() {
  return {
    type: types.FETCH_INFO_RESULT,
  }
}

function receivePhoneNumAndEmailResult(responseData, error) {
  return {
    type: types.RECEIVE_INFO_RESULT,
    email: responseData.email,
    phoneNumber: responseData.telephone,
    error: error,
  }
}

export function changeUserInfo({phoneNumber, email}) {
  return {
    type: types.CHANGE_USER_INFO,
    phoneNumber: phoneNumber,
    email: email,
  }
}

export function uploadAvatar(avatarData, userId, userName) {
  let url = OFFICE_LIST_UPLOADFILE_URL + '?model=avatar' + '&userId=' + userId;
  let form = new FormData();
  let fileName = Base64Encode(userName + '.png');
  form.append('model', 'avatar');
  form.append('userId', userId);
  form.append('fileName', userName + '.png');
  form.append('files', {uri: avatarData.uri, type: 'application/octet-stream', name: fileName});
  return dispatch => {
    dispatch(fetchUploadAvatarResult());
    return request(url, "post", form, {"Content-Type": "multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d"})
      .then((responseData) => {
        dispatch(receiveUploadAvatarResult(avatarData));
      })
      .catch((error) => {
        console.error('uploadAvatar error: ' + error);
        dispatch(receiveUploadAvatarResult({}, error));
      })
  }
}

function fetchUploadAvatarResult() {
  return {
    type: types.UPLOAD_AVATAR_RESULT,
  }
}

function receiveUploadAvatarResult(avatarData, error) {
  return {
    type: types.RECEIVE_UPLOAD_AVATAR_RESULT,
    avatarData: avatarData,
    error: error,
  }
}

export function commitChangedUserInfo(phoneNumber, email, userName) {
  return dispatch => {
    let body = JSON.stringify({
      telephone: phoneNumber,
      email: email,
      userName: userName,
    });
    dispatch(fetchCommitResult());
    return request(EDIT_USER_INFO_URL, "post", body, {'Accept': 'application/json', 'Content-Type': 'application/json',})
      .then((responseData) => {
        dispatch(receiveCommitResult(responseData));
      })
      .catch((error) => {
        console.error('commitChangedUserInfo error: ' + error);
        dispatch(receiveCommitResult({}, error));
      })
  }
}

function fetchCommitResult() {
  return {
    type: types.FETCH_COMMIT_USER_INFO_RESULT,
  }
}

function receiveCommitResult(responseData, error) {
  return {
    type: types.RECEIVE_COMMIT_USER_INFO_RESULT,
    commitResult: responseData.code,
    error: error,
  }
}
