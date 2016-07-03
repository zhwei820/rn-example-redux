/*
Coded by: Simar (github.com/iSimar)
GitHub Project: https://github.com/iSimar/HackerNews-React-Native
*/

'use strict';

import React from 'react';
import {Text, Image, View, TouchableHighlight} from 'react-native';

import styles from "./style";
import Colors from '../../../constants/Colors';

export default class MessagePostCell extends React.Component {

  _renderCountView() {
    let count = this.props.post.count;
    if (count > 99) {
      count = '99+';
    }
    return (
      <View style={styles.circle}>
        <Text style={styles.count}>
          {count}
        </Text>
      </View>
    )
  }

  render() {
    return (
      <TouchableHighlight onPress={this.props.onSelect}>
        <View style={styles.container}>
          <Image source={this.props.post.icon} style={styles.postImage}/>

          <View style={styles.postContainer}>
            <View style={styles.postDetailsContainer}>
              <Text style={styles.postTitle}>
                {this.props.post.title}
              </Text>
              <Text style={styles.postDetailsLine}>
                {this.props.post.content}
              </Text>
            </View>
            {this.props.post.count > "0" && this._renderCountView()}
          </View>
        </View>
      </TouchableHighlight>

    );
  }
}
