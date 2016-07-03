'use strict';

import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
  BackAndroid,
  TouchableHighlight,
  Picker,
} from 'react-native';

import Modal from '../lib/react-native-fs-modal';
import formComponentStyles from './formComponent/styles';

// import Colors from '../containers/Colors';

export default class SelectItem extends React.Component{

  constructor(props){
  super(props);
  this.state={
    row:[],
    sValue:'',
    title:'',
  };
}
// 从前一个页面传到此处
passItems(data)
{
  let _content = data.items[0];
  if (data.content && data.content != '') {
      _content = data.content;
  }
  if (data.items.length) {
    this.setState({
      row:data.items,
      sValue:data.items[0],
      title:data.title,
    });
  }

}
handleChange(text) {
  this.setState({sValue: text});
}
  render() {
    var items = this.state.row;
    // var _this = this;
    return(
      <Modal
        ref={'modal'}
        duration={1}
        tween={'easeOutElastic'}
        modalStyle={{borderRadius: 10}}
        hideStatusBar={true}
        closeOnTouch={true}>
        <View style={styles.container}>
          <View style={styles.calendarContainer}>
          <Text style={styles.textStyle}>{this.state.title}</Text>
          <Picker
          style = {formComponentStyles.pickerStyle}
          selectedValue={this.state.sValue}
          onValueChange={(data) => {this.handleChange(data)}}
          mode={'dropdown'}>
          {items.map((data)=>{return (
            <Picker.Item label={data} value={data}
          />);})}
          </Picker>
          </View>
          <View style={styles.calendar}>
          <TouchableHighlight style={styles.button} onPress={this.cancel.bind(this)} underlayColor={'#ffffff'}>
              <Text style={styles.buttonText}>取 消</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={this.passSelectDate.bind(this)} underlayColor={'#ffffff'}>
              <Text style={styles.buttonText}>确 定</Text>
          </TouchableHighlight>

          </View>
        </View>
      </Modal>
    );
  }
  cancel(){
    this.setState({date:new Date()});
    this.refs.modal.close();
  }
  passSelectDate(){
    this.refs.modal.close();
    this.refs.modal.getFromInstanse().getDateChange(this.state.sValue);
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  calendarContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 20,
    // marginBottom: 10,
  },
  calendar: {
    height:60,
    justifyContent: 'center',
    flexDirection:'row',
    marginTop:30
  },
  button: {
    // backgroundColor: Colors.white,

    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    width:70,
    height:35,

    // flex:1,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 18,
    color:'#ff8c00'
  },
  textStyle:{
    fontSize:20,
    fontWeight:'500',
    textAlign: 'center',
    color:'#ff8c00'
  }
});
