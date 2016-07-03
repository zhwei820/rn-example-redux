'use strict';

import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  Alert,
} from 'react-native';
var _this;
import Colors from '../../constants/Colors';

export default class FormItemsTextEmail extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        row: this.props.row,
        text:''
      };
      // _this = this;
  }

  render() {
    return(
      <View style={formComponentStyles.container}>
        <View style={formComponentStyles.titleContainer}>
          <Text style={formComponentStyles.title}>
            {this.state.row.title}
          </Text>
        </View>
        <View style={[formComponentStyles.contentContainer,{height: 48, marginRight: 4,}]}>
          <TextInput
            value = {this.state.text}
            underlineColorAndroid={'transparent'}
            style={{height:48,textAlign:'right',fontSize:14,}}
            placeholder={'请输入'+this.state.row.title}
            onChangeText={this.handleChange.bind(this)}
            maxLength={500}/>
        </View>
      </View>
    );
  }

  componentDidMount(){
    if(this.state.row.content){
      this.handleChange(this.state.row.content);
    }
  }

  handleChange(text) {
    this.props.onUserInput(this.state.row.name, text);
    this.setState({
      text:text,
    });
  }
}

import formComponentStyles from './styles';
