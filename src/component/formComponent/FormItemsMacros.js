'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Colors from '../../constants/Colors';
import Storage from 'react-native-storage';

var storage = new Storage({
  size: 100,
  enableCache: true,
  sync : {
  }
})

export default class FormItemsTextEmail extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        row: this.props.row,
        text: '',
      };
  }

  parserDate(date) {
      let t = Date.parse(date);
      if (!isNaN(t)) {
          return new Date(Date.parse(date.replace(/-/g, "/")));
      } else {
          return new Date();
      }
  }

  componentDidMount() {
    const {login} = this.props;
    let temp = '';
    if (this.state.row.content && this.state.row.content != '') {
      temp = this.state.row.content;
    } else if (this.props.detailType === 'sys_userid') {
      //当前用户ID
      temp = login.rawData.userid;
    } else if (this.props.detailType === 'sys_realname') {
      //用户名
      temp = login.rawData.nickName;
    } else if (this.props.detailType === 'sys_dept') {
      //用户部门
      temp = login.rawData.dept;
    } else if (this.props.detailType === 'sys_post') {
      //用户岗位
      temp = login.rawData.post;
    } else if (this.props.detailType === 'sys_companyname') {
      //用户公司
      temp = login.rawData.companyName;
    } else if (this.props.detailType === 'sys_phoneNumber') {
      //用户手机
      temp = login.rawData.telephone;
    } else if (this.props.detailType === 'sys_email') {
      //用户邮箱
      temp = login.rawData.email;
    } else if (this.props.detailType === 'sys_datetime') {
      //填写时间
      let d = new Date();
      temp = [
        d.getFullYear(), d.getMonth() + 1 > 9
          ? d.getMonth() + 1
          : `0${d.getMonth() + 1}`,
        d.getDate() > 9
          ? d.getDate()
          : `0${d.getDate()}`
      ].join('-') + ' ' + [
        d.getHours(), d.getMinutes() > 10
          ? d.getMinutes()
          : "0" + d.getMinutes()
      ].join(':');
    }
    this.props.onUserInput(this.state.row.name, temp);
    this.setState({text: temp});
}

  render() {
    return(
      <View style={formComponentStyles.container}>
        <View style={formComponentStyles.titleContainer}>
          <Text style={formComponentStyles.title}>
            {this.state.row.title}
          </Text>
        </View>
        <View style={formComponentStyles.contentContainer}>
          <Text style={{textAlign: 'right', color: Colors.black,}}>{this.state.text}</Text>
        </View>
      </View>
    );
  }
}

import formComponentStyles from './styles';
var styles = StyleSheet.create({
});
