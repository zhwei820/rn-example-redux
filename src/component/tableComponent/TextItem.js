'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from 'react-native';

import Colors from '../../constants/Colors';

export default class TextItem extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        row: this.props.row,
      };
  }

  render() {
    return(
      <View style={{height:48,flex: 1,flexDirection: 'row',justifyContent: 'space-between',  alignItems: 'center',
        backgroundColor:Colors.white,borderBottomColor: Colors.lightgrey,borderBottomWidth: 1,}}>

          <Text style={{marginLeft: 16,textAlign: 'left', fontSize: 16, color: Colors.black,}}>
            {this.state.row.title}
          </Text>

          <TextInput
            underlineColorAndroid={'transparent'}
            style={{textAlign:'right',height: 48,marginLeft:16,marginRight:16,flex: 1,fontSize: 14}}
            placeholder={'请输入'+this.state.row.title}
            value={this.props.value}
            maxLength={500}
            onChangeText ={this.handleChange.bind(this)} />

      </View>
    );
  }

  handleChange(text) {
    this.props.onUserInput(this.state.row.title, text);
  }

}

var styles = StyleSheet.create({
});
