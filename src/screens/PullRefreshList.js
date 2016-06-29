import { bindActionCreators } from 'redux'

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  TouchableHighlight,
  ScrollView,
  ListView,
  RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import * as screensrActions from '../reducers/screens/actions';

var GiftedSpinner = require('react-native-gifted-spinner');

import ProductListRow from '../components/ProductListRow';

import Banner from '../components/Banner';

import RefreshList from '../components/RefreshList';
import RnImage from '../../diy/RnImage';

class PullRefreshList extends Component {

  static navigatorStyle = {
    statusBarColor: '#303F9F',
    toolBarColor: '#3F51B5',
    navigationBarColor: '#303F9F',
    tabSelectedTextColor: '#FFA000',
    tabNormalTextColor: '#FFC107',
    tabIndicatorColor: '#FF4081'
  };


  render() {
    console.warn('pull Refresh constructor');

    let listView = this.getListView();
    return (
      <View style={{flex:1}}>
        {listView}
      </View>

    )
  }

  getListView = () => {
    return (<RefreshList onPress={this._onPress} {...this.props}></RefreshList>);
  }

  _onPress = (rowData) => {
    // this.props.navigator.pop();
    this.onPushPress();
  }

  onIncrementPress = () => {
    this.props.setOrderTab1();
  }

  onPushPress = () => {
    this.props.navigator.push({
      title: "More",
      screen: "example.PushedScreen",
      passProps: {
        str: 'This is a prop passed in \'navigator.push()\'!',
        obj: {
          str: 'This is a prop passed in an object!',
          arr: [
            {
              str: 'This is a prop in an object in an array in an object!'
            }
          ]
        },
        num: 1234
      }
    });
  }

};

var customStyles = {
  separator: {
    height: 1,
    backgroundColor: 'transparent'
  },
  refreshableView: {
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsLabel: {
    fontSize: 20,
    color: '#007aff',
  },
  paginationView: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  defaultView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  defaultViewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  row: {
    padding: 10,
    height: 44,
  },
  header: {
    backgroundColor: '#50a4ff',
    padding: 10,
  },
  headerTitle: {
    color: '#fff',
  },
};

var screenStyles = {
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  navBar: {
    height: 64,
    backgroundColor: '#007aff',

    justifyContent: 'center',
    alignItems: 'center',
  },
  navBarTitle: {
    color: '#fff',
    fontSize: 16,
    marginTop: 12,
  }
};

function mapStateToProps(state) {
  return {
    screens: state.screens
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(screensrActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PullRefreshList)
