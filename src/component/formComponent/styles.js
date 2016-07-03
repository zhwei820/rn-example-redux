/*
Coded by: Simar (github.com/iSimar)
GitHub Project: https://github.com/iSimar/HackerNews-React-Native
*/

'use strict';

import React, {
  Dimensions,
  StyleSheet,
} from 'react-native';

import Colors from '../../constants/Colors';
var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor:Colors.white,
    borderBottomColor: Colors.lightgrey,
		borderBottomWidth: 1,
  },
  titleContainer: {
    alignItems: 'center',
    marginLeft: 16,
    marginTop: 12,
    marginBottom: 12,
  },
  title: {
    textAlign: 'right',
    fontSize: 16,
    color: Colors.black,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 20,
    marginRight:16,
  },

});
