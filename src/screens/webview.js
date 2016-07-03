'use strict';

import React from 'react';
import {
  WebView,
  ScrollView,
  Text,
  View,
} from 'react-native';

import api from "../constant/Network";
import Colors from '../constant/Colors';
import {connect} from 'react-redux';

class webview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {webview} = this.props;
    return (
      <View style={{flex:1}}>
        <WebView
          scalesPageToFit={true}
          source={{uri: webview.webviewUrl}}
          renderError = {this.showError}
          onLoadStart={this.showState}
         />
      </View>
    );
  }

  showState() {
    return(
      <View>
        <Text style={{alignSelf:'center'}}>加载中...</Text>
      </View>
    )
  }

  showError() {
    return(
      <View>
        <Text style={{alignSelf:'center'}}>页面打开失败!</Text>
      </View>
    )
  }

};


function mapStateToProps(state) {
  const {webview} = state;
  return {
    webview
  }
}

export default connect(mapStateToProps)(webview);
