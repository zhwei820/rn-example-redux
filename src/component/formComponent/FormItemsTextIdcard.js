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

export default class FormItemsTextIdcard extends React.Component{
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
        <View style={[formComponentStyles.contentContainer,{height: 48, marginRight: 4,}]}>
          <TextInput
            style={{height: 48,textAlign:'right',fontSize: 14,}}
            placeholder={'请输入'+this.state.row.title}
            underlineColorAndroid={'transparent'}
            onChangeText={this.handleChange.bind(this)}
            maxLength={500}
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
