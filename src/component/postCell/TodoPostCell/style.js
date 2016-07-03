'use strict';

var React = require('react-native');

var {
  Dimensions,
  StyleSheet,
} = React;

import Colors from '../../../constants/Colors';
var deviceHeight = Dimensions.get('window').height;


module.exports = StyleSheet.create({
  BigView:
  {
    backgroundColor:'white',
    borderBottomWidth:1,
    borderBottomColor:Colors.lightgrey,
    flexDirection: 'row',
    height:60,
  },
  leftView:
  {
    flex:9.5,
    marginTop:10,
    marginBottom:10,
    marginLeft:10,
    flexDirection:'column',
  },
  rightView:
  {
    flex:0.5,
    marginTop:10,
    marginBottom:10,
    marginRight:10,
  },
  topText:
  {
    flex:1,
  },
  bottomText:
  {
    flex:1,
    flexDirection:'row',
  },

  textTitle:
  {
    fontSize:14,
    color:Colors.black,
  },
  userName:
  {
    flex:4,
    marginTop:5,
    fontSize:11,
    color:Colors.grey,
    textAlign: 'left',
  },
  delegateType:
  {
    flex:2,
    marginTop:5,
    fontSize:11,
    color:Colors.grey,
    textAlign: 'left',
  },
  currentName:
  {
    flex:3,
    marginTop:5,
    fontSize:11,
    color:Colors.secondaryColor,
    textAlign: 'left',
  },
  timeTitle:
  {
    flex:5,
    marginTop:5,
    fontSize:11,
    color:Colors.grey,
    textAlign: 'right',
  },
  postButton:
  {
    width: 8,
    height: 13,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    marginTop:10,
  }
});
