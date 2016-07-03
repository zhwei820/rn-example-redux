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

export default class TextareaItem extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        row: this.props.row,
      };
  }

  render() {
    return(
      <View style={{height:96,flex: 1,
        backgroundColor:Colors.white,borderBottomColor: Colors.lightgrey,borderBottomWidth: 1,}}>

          <Text style={{height:32,marginLeft: 16,marginRight: 16,textAlign: 'left',alignItems: 'center', fontSize: 16, color: Colors.black}}>
            {this.state.row.title}
          </Text>

          <TextInput
            underlineColorAndroid={'transparent'}
            placeholder={'请输入'+this.state.row.title}
            style={{textAlign:'left',height: 64,marginLeft:16,marginRight:16,flex: 1,fontSize: 14}}
            value={this.props.value}
            multiline={true}
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
