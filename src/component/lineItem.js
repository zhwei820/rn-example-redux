'use strict'

import React from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
// onPress={() => this.props.onClick()}
export default class LineItem extends React.Component {
  render(){
    var ITEM_HEIGHT = parseInt(this.props.height?this.props.height:Dimensions.get('window').height/14);
    var viewStyle ={
      height: ITEM_HEIGHT,
      backgroundColor: this.props.bg?this.props.bg:'#FFFFFF',
      flexDirection: 'row',
      alignItems:'center',
    };
    var touchStyle={
      marginTop: parseInt(this.props.top?this.props.top:1),
    };
    var textStyle ={
      marginLeft: 10,
      flex: 1,
      color: this.props.fontColor?this.props.fontColor:'#333',
      fontSize: parseInt(this.props.fontSize?this.props.fontSize:14),
    };
    var imageStyle={
      marginLeft: 10,
      width: ITEM_HEIGHT*0.5,
      height: ITEM_HEIGHT*0.5,
      borderRadius: parseInt(this.props.iconRadius?this.props.iconRadius:4),
    };
    if(this.props.type === 'nextIcon'){
      return(
        <TouchableHighlight style={[touchStyle]} onPress={() => this.props.onClick()} >
          <View style={viewStyle}>
            <Image style={imageStyle} source={this.props.icon} />
            <Text style={textStyle}>{this.props.text}</Text>
            <Image style={styles.nextIcon} source={require('../img/icon/icon-next.png')} />
          </View>
        </TouchableHighlight>
      );
    }
    if(this.props.type === 'next'){
      return(
        <TouchableHighlight style={[touchStyle]} onPress={() => this.props.onClick()}>
          <View style={viewStyle}>
            <Text style={textStyle}>{this.props.text}</Text>
            <Image style={styles.nextIcon} source={require('../img/icon/icon-next.png')} />
          </View>
        </TouchableHighlight>
      );
    }
    if(this.props.type === 'text'){
      return(
        <TouchableHighlight style={[touchStyle]} onPress={() => this.props.onClick()}>
          <View style={viewStyle}>
            <Text style={[textStyle,{textAlign: 'center'}]}>{this.props.text}</Text>
          </View>
        </TouchableHighlight>
      );
    }
    return(
        <View style={{flexWrap: 'wrap'}}>
          <Text style={{marginLeft: 10}}>
          type: 类型('text','next','nextIcon'){'\n'}
          height: item高度，默认为界面高度的1/14{'\n'}
          top:上边距（外）默认值：1{'\n'}
          bg: 背景色，默认白色{'\n'}
          text:中间文本（type为‘text’时，文本居中显示）{'\n'}
          fontSize:文本字体大小，默认为18{'\n'}
          fontColor:文本字体颜色，默认黑色{'\n'}
          icon:左边图标（仅type为‘nextIcon’时显示）{'\n'}
          iconRadius:图标弧度，默认4{'\n'}
          onClick:点击响应函数{'\n'}
          </Text>
        </View>
    );
  }
};

var styles = StyleSheet.create({
  nextIcon: {
    width: 8,
    height: 14,
    marginRight: 10,
  },
});
