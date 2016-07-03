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

import Colors from '../../constants/Colors';

export default class FormItemsTextEmail extends React.Component{
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

  render() {
    let _maxLength = 500;
    if (this.state.row.maxLength&&this.state.row.maxLength!='') {
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
          style={{height:48,textAlign:'right',fontSize:14,}}
            placeholder={'请输入'+this.state.row.title}
            onChangeText={this.handleChange.bind(this)}
            underlineColorAndroid={'transparent'}
            maxLength={_maxLength}
            value={this.state.text}/>
        </View>
      </View>
    );
  }

  handleChange(text) {
    this.props.onUserInput(this.state.row.name, text);
    this.setState({
      text: text,
    });
  }

}

import formComponentStyles from './styles';
var styles = StyleSheet.create({
});
