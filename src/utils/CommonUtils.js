'use strict';
import React from 'react-native';
const {
  BackAndroid,
  Alert,
} = React;
import JPush , {JpushEventReceiveCustomMessage,JpushEventReceiveMessage, JpushEventOpenMessage} from 'react-native-jpush';

export function NaviGoBack(navigator) {
	if (navigator && navigator.getCurrentRoutes().length > 2) {
		navigator.pop();
		return true;
  }
	if (navigator && navigator.getCurrentRoutes().length <= 2) {
		Alert.alert('提示','确定要退出吗?',[{text:'确定',onPress: ()=>{
      //JPush.setAlias('');
      JPush.clearAllNotifications();
			BackAndroid.exitApp();
		}},{text:'取消',onPress: ()=>{}}]);
		return true;
	}
  return false;
}
