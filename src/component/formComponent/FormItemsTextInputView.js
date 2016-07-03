'use strict';

import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  Dimensions,
} from 'react-native';

import Colors from '../../constants/Colors';

export default class FormItemsTextInputView extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        row: this.props.row,
        text: '',
      };
  }
  componentDidMount(){
    if(this.state.row.content){
      this.handleChange(this.state.row.content);
    }
  }
  handleChange(text) {
    this.props.onUserInput(this.state.row.name, text);
    this.setState({
      text: text,
    });
  }

  render() {
    let _maxLength = 500;
    if (this.state.row.maxLength&&this.state.row.maxLength != '') {
        _maxLength = Number(this.state.row.maxLength);
    }
    return(
      <View style={formComponentStyles.container}>
        <View style={formComponentStyles.titleContainer}>
          <Text style={formComponentStyles.title}>
            {this.state.row.title}
          </Text>
        </View>
        <View style={[formComponentStyles.contentContainer,{height: 48, marginRight: 4,}]}>
          <TextInput
            style={{height: 48, textAlign:'right', fontSize: 14,}}
            placeholder={'请输入' + this.state.row.title}
            underlineColorAndroid={'transparent'}
            value={this.state.text}
            maxLength={_maxLength}
            onChangeText={this.handleChange.bind(this)} />
        </View>
      </View>

    );
  }
}

import formComponentStyles from './styles';
var styles = StyleSheet.create({
  content:{
    flex: 1,
    height: 30,
    marginRight: 8,

  }
});
