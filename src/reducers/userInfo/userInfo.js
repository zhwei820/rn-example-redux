'use strict';

import * as types from '../../constant/ActionTypes';

const initialState = {
  avatarGetting: false,
  avatarData: undefined,
  avatarGot: false,

  userInfoGetting: false,
  userInfoGot: false,
  phoneNumber: '未获取到',
  email: '未获取到',

  avatarUploading: false,
  avatarUploaded: false,
  avatarResult: '',

  committing: false,
  committed: false,
  commitResult: '',

  error: '',
}

export default function userInfo(state = initialState, action) {

  state = Object.assign({}, state, {
    userInfoGot: false,
    avatarGot: false,
    avatarUploaded: false,
    committed: false,
  });

  let newState;

  switch (action.type) {
    case types.FETCH_AVATAR_RESULT:
      return Object.assign({}, state, {
        avatarGetting: true,
      });
    case types.RECEIVE_AVATAR_RESULT:
      if(action.error){
        newState = Object.assign({}, {
          avatarGetting: false,
          avatarGot: true,
        });
      } else {
        newState = Object.assign({}, {
          avatarGetting: false,
          avatarGot: true,
          avatarData: action.avatarData,
        });
      }
      return Object.assign({}, state, newState);
    case types.FETCH_INFO_RESULT:
      return Object.assign({}, state, {
        userInfoGetting: true,
        phoneNumber: '未获取到',
        email: '未获取到',
      });
    case types.RECEIVE_INFO_RESULT:
      return Object.assign({}, state, {
        userInfoGetting: false,
        userInfoGot: true,
        phoneNumber: action.phoneNumber,
        email: action.email,
        error: action.error,
      });
    case types.CHANGE_USER_INFO:
      if (action.phoneNumber != undefined && action.phoneNumber.length >= 0) {
        return Object.assign({}, state, {
          phoneNumber: action.phoneNumber,
        });
      } else if (action.email != undefined && action.email.length >= 0) {
        return Object.assign({}, state, {
          email: action.email,
        });
      } else {
        return state;
      }
    case types.UPLOAD_AVATAR_RESULT:
      return Object.assign({}, state, {
        avatarUploading: true,
      });
    case types.RECEIVE_UPLOAD_AVATAR_RESULT:
      newState = Object.assign({}, state, {
        avatarUploading: false,
        avatarUploaded: true,
        avatarResult: '头像上传失败！'
      });
      if(action.avatarData && action.error == undefined)
        return Object.assign({}, newState, {
          avatarData: action.avatarData,
          avatarResult: '头像上传成功！',
          error: action.error,
        });
        else {
          return state;
        }
    case types.FETCH_COMMIT_USER_INFO_RESULT:
      return Object.assign({}, state, {
        committing: true,
      });
    case types.RECEIVE_COMMIT_USER_INFO_RESULT:
      return Object.assign({}, state, {
        committing: false,
        committed: true,
        commitResult: action.commitResult,
        error: action.error,
      });
    default:
      return state;
  }
}
