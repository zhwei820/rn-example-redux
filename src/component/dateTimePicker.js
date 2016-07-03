'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  DatePickerIOS,
  // Modal,
} from 'react-native';

import Modal from '../lib/react-native-fs-modal-datamodal';
var deviceScreen = require('Dimensions').get('window');

export default class dateTimePicker extends React.Component{

  constructor(props){
  super(props);
  this.state = {
    date:new Date(),
    dateModel:'datetime'
  };
}

  render() {
    var _this = this;
    return(
      <Modal
        ref={'modal'}
        duration={0}
        tween={'easeOutElastic'}
        modalStyle={{borderRadius: 10}}
        hideStatusBar={true}
        closeOnTouch={true}>
        <View style={styles.container}>
          <View style={styles.calendarContainer}>
            <Text style={styles.textStyle}>请选择日期时间</Text>
          <DatePickerIOS
          style = {styles.datePicker}
          date={this.state.date}
          mode={this.state.dateModel}
          timeZoneOffSetInMinutes={8*60}
          onDateChange={this.onDateChange.bind(this)}
          />
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
  onDateChange(date){
    this.setState({date:date});
  }
  passSelectDate(){
    this.refs.modal.close();
    this.refs.modal.getFromInstanse().getDateChange(this.state.date);
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
    justifyContent: 'flex-start',
    marginTop: deviceScreen.height < 500?20:deviceScreen.height/8.5,
  },
  calendar: {
    height:60,
    justifyContent: 'center',
    flexDirection:'row',
    marginTop:20,
  },
  datePicker:{
      width:200,
    marginTop:10,
    // justifyContent: 'center',
  },
  button: {
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    // borderWidth: 1,
    flex:1,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 18,
    color:'#ff8c00',
  },
  textStyle:{
    fontSize:20,
    fontWeight:'500',
    textAlign: 'center',
    color:'#ff8c00'
  }
});
