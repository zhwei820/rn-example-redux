'use strict';

import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import Colors from '../../constants/Colors';
import * as types from '../../constants/NavigatorTypes';
import StaffListContainer from '../../containers/StaffListContainer';

export default class FormItemsSelectStaff extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      row: this.props.row,
      text: '点击选择',
      textColor: 'gray',
    };
    this.onSearch = this.onSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    if(this.state.row.content){
      this.handleChange(this.state.row.content.nickName, this.state.row.content.userId);
    }
  }

  handleChange(nickName, userId) {
    this.props.onUserInput(this.state.row.name, userId);
    this.setState({
      text: nickName,
      textColor: Colors.black,
    });
  }

  render() {
    return(
      <View style={formComponentStyles.container}>
        <View style={formComponentStyles.titleContainer}>
          <Text style={formComponentStyles.title}>
            {this.state.row.title}
          </Text>
        </View>
        <TouchableOpacity onPress={this.onSearch} style={formComponentStyles.contentContainer}>
          <Text style={[styles.search, {color: this.state.textColor, marginRight: 4}]}>{this.state.text}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  onSearch() {
    const {navigator} = this.props;
    navigator.push({
      name: "StaffList",
      component: StaffListContainer,
      type: types.STAFF_LIST_CONTACT,
      onStaffSelect: this.handleChange,
    });
  }
}

import formComponentStyles from './styles';
var styles = StyleSheet.create({
  search: {
    textAlign: 'right',
    color: 'gray',
    marginRight: 15,
  },
});
