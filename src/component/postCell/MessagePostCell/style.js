/*
Coded by: Simar (github.com/iSimar)
GitHub Project: https://github.com/iSimar/HackerNews-React-Native
*/

'use strict';

var React = require('react-native');

var {
  Dimensions,
  StyleSheet,
} = React;

import Colors from '../../../constants/Colors';
var deviceHeight = Dimensions.get('window').height;
var itemHeight = deviceHeight / 10;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height:itemHeight,
    backgroundColor: Colors.white,
    borderBottomColor: Colors.lightgrey,
    borderBottomWidth: 1.5,
  },
  postContainer: {
    flex: 1,
    flexDirection: 'row',
    height:itemHeight,
    justifyContent: 'center',
  },
  postImage: {
    margin: 10,
    width: 30,
    height: 30,
  },
  postDetailsContainer: {
    margin: 2,
    flex: 1,
    height:itemHeight,
    justifyContent: 'center',
  },
  postTitle: {
    fontSize: 17,
    textAlign: 'left',
    marginBottom: 5,
    color: Colors.black,
  },
  postDetailsLine: {
    fontSize: 14,
    color: 'gray',
  },
  circleContainer: {
    justifyContent: 'center',
  },
  circle: {
    backgroundColor: '#fe0000',
    borderRadius: 10,
    width: 20,
    height: 20,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  count: {
    fontSize: 10,
    color: Colors.white,
    backgroundColor:'transparent'
  }
});
