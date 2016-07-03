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

export default class FormItemsTextFloat extends React.Component{
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
    return(
      <View style={formComponentStyles.container}>
        <View style={formComponentStyles.titleContainer}>
          <Text style={formComponentStyles.title}>
            {this.state.row.title}
          </Text>
        </View>
        <View style={[formComponentStyles.contentContainer, {height: 48, marginRight: 4,}]}>
          <TextInput
            underlineColorAndroid={'transparent'}
            style={{height:48,textAlign:'right',fontSize:14,}}
            placeholder={'请输入'+this.state.row.title}
            onChangeText={this.handleChange.bind(this)}
            maxLength={500}
            value={this.state.text}/>
        </View>
      </View>
    );
  }

  handleChange(text) {
    this.props.onUserInput(this.state.row.name, this.changeTwoDecimal_f(text));
    this.setState({
      text: text,
    });
  }
  //保留两位小时
  changeTwoDecimal_f(x)
  {
    var f_x = parseFloat(x);
    if (isNaN(f_x)) {
      return x;
    }
    f_x = Math.round(f_x * 100) / 100;
    var s_x = f_x.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
      pos_decimal = s_x.length;
      s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2) {
      s_x += '0';
    }
    return s_x;
  }
}

import formComponentStyles from './styles';
