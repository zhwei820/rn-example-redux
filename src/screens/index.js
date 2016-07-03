import {Navigation} from 'react-native-navigation';

import LoginScreen from './LoginScreen';
import FirstTabScreen from './FirstTabScreen';
import SecondTabScreen from './SecondTabScreen';
import PushedScreen from './PushedScreen';
import ModalScreen from './ModalScreen';
// import PullRefreshList from './PullRefreshList';
import tabSetting from './tabSetting';
import tabOffice from './tabOffice';
import webview from './webview';
import taskList from './taskList';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent('example.LoginScreen', () => LoginScreen, store, Provider);
  Navigation.registerComponent('example.FirstTabScreen', () => FirstTabScreen, store, Provider);
  Navigation.registerComponent('example.SecondTabScreen', () => SecondTabScreen, store, Provider);
  Navigation.registerComponent('example.PushedScreen', () => PushedScreen, store, Provider);
  Navigation.registerComponent('example.ModalScreen', () => ModalScreen, store, Provider);
  // Navigation.registerComponent('example.PullRefreshList', () => PullRefreshList, store, Provider);
  Navigation.registerComponent('example.tabSetting', () => tabSetting, store, Provider);
  Navigation.registerComponent('example.tabOffice', () => tabOffice, store, Provider);
  Navigation.registerComponent('example.webview', () => webview, store, Provider);
  Navigation.registerComponent('example.taskList', () => taskList, store, Provider);

}
