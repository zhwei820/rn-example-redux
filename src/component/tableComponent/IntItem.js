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

export default class IntItem extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        row: this.props.row,
      };
  }

  render() {
    return(
      <View style={{height: 48,flex: 1,flexDirection: 'row',justifyContent: 'space-between',  alignItems: 'center',
        backgroundColor:Colors.white,borderBottomColor: Colors.lightgrey,borderBottomWidth: 1,}}>
        <Text style={{textAlign: 'left', fontSize: 16, color: Colors.black,marginLeft: 16}}>
          {this.state.row.title}
        </Text>
        <TextInput
          value = {this.props.value}
          underlineColorAndroid={'transparent'}
          style={{textAlign:'right',flex: 1,height: 48,marginLeft:16,marginRight:16,fontSize:14,}}
          placeholder={'请输入'+this.state.row.title}
          onChangeText={this.handleChange.bind(this)}
          maxLength={500}
          onEndEditing={(value) => {
            var reg =/^(-?\d+)(\.\d+)?$/;
            if(!(value.nativeEvent.text == '' || reg.test(value.nativeEvent.text))){
              Alert.alert('错误提示',this.state.row.title+'必须为数字,请核对后请重新输入！',[{text: '确定', onPress: ()=>{this.handleChange('')}}])
            }
          }} />
      </View>
    );
  }

  handleChange(text) {
    this.props.onUserInput(this.state.row.title, text);
  }
}

var styles = StyleSheet.create({
});
