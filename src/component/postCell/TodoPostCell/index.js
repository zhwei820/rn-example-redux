'use strict';

import React from 'react';
import {Text, Image, View, TouchableOpacity} from 'react-native';


import styles from "./style";
import Colors from '../../../constants/Colors';
import iconNext from '../../../img/icon/icon-next.png';
var _navigator;
export default class TodoPostCell extends React.Component {

  constructor(props) {
    super(props);
  }

  renderStatus() {
    const {post, type} = this.props;
    let statusColor = Colors.secondaryColor;
    if(post.status == '同意')
      statusColor = 'green';
    else if(post.status == '不同意')
      statusColor = 'red';
    return (
      <Text style={[styles.currentName, {color: statusColor}]} numberOfLines={1}>{post.status}</Text>
    );
  }

  renderUserName() {
    const {post} = this.props;
    return (
      <Text style={styles.userName}>申请人:{post.applicantName}</Text>
    );
  }

  renderDelegateType() {
    const {post} = this.props;
    return (
      <Text style={styles.delegateType}>{post.delegateType}</Text>
    );
  }

  render() {
    const {post, type} = this.props;
    let titleColor = (post.timeOut ? '#f00' : '#333');
    let timeTitle = (type === "已办任务" ? this.props.post.endTime : this.props.post.startTime);
    return (
      <TouchableOpacity onPress={post => this.props.onSelect(this.props.post)}>
      <View style={styles.BigView}>

        <View style={styles.leftView}>
          <View style={styles.topText}>
            <Text style={{fontSize:14,color:titleColor}} numberOfLines={1}>{this.props.post.title}--{this.props.post.processTitle}</Text>
          </View>
          <View style={styles.bottomText}>
            {(type === "待办" || type === "已办任务" || type === "代理任务") && this.renderUserName()}
            {(type === "代理任务") && this.renderDelegateType()}
            {(type === "我的申请" || type === "已办任务" || type === "代理任务") && this.renderStatus()}
            <Text style={styles.timeTitle}>{timeTitle}</Text>
          </View>
        </View>

        <View style={styles.rightView}>
          <Image style={styles.postButton} source={iconNext}/>
        </View>

      </View>
      </TouchableOpacity>
    );
  }
}
