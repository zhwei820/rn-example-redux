import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
  Image
} from 'react-native';

import ProgressBar from 'react-native-progress/Bar';


export default class BuyProgressInfo extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <View style={[styles.wrapper]}>
      <View style={styles.textWrapper}>
        <View style={styles.leftTextWrapper}>
            <Text style={[styles.baseText, {color: "#9D9D9D"}]}>
              总需
            </Text>
            <Text style={[styles.baseText, {color: "#FF0000"}]}>
              {this.props.totalNum}
            </Text>
            <Text style={[styles.baseText, {color: "#9D9D9D"}]}>
              人次
            </Text>

        </View>
        <View style={styles.rightTextWrapper}>
          <Text style={[styles.baseText, {color: "#9D9D9D"}]}>
            进度
          </Text>
          <Text style={[styles.baseText, {color: "#4A4AFF"}]}>
            {parseInt(this.props.progress * 100) + '%'}
          </Text>
          </View>
        </View>

        <ProgressBar progress={this.props.progress} color="#CE0000"/>
      </View>

    );
  }
}


const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    flex: 1,
    flexDirection: 'column',

    flexDirection: 'column',
  },
  baseText: {
    fontSize: 10,
    fontFamily: 'Cochin',
  },
  textWrapper:{
    flex: 1,
    flexDirection: 'row',
  },
  leftTextWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "flex-start"
  },
  rightTextWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "flex-end"

  }
})
