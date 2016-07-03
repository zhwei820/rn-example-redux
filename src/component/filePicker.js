'use strict';
var RNFS = require('react-native-fs');
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

var fileArr = [];


// import Colors from '../../util/Colors';

export default class ModalCalendar extends React.Component{

  constructor(props){
  super(props);
  this.state={
    row:[],
    sValue:'',
    title:'',
  };
}

componentDidMount() {

}
warningUpDate()
{
  this.getFileList();
}
getFileList(){

RNFS.readDir(RNFS.DocumentDirectoryPath+'/Inbox')
.then((result) => {
  if (fileArr.length==0) {
    for (var i = 0; i < result.length; i++) {
      if (!result[i].isDirectory()) {
        if (fileArr.indexOf(result[i].name) === -1&&result[i].name !='.DS_Store') {
          fileArr.push(result[i].name);
        }
      }
    }
    this.setState({
      row:result,
      sValue:fileArr[0],
    });
  }
return Promise.all([RNFS.stat(result[0].path), result[0].path]);
})
.then((statResult) => {
return 'no file';
})
.catch((err) => {
console.log(err.message, err.code);
});
}



handleChange(text) {
  this.setState({sValue: text});
}
  render() {
    var items = fileArr;
    if (items.length) {
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
            <TouchableHighlight style={styles.button} onPress={this.passSelectDate.bind(this)} underlayColor={'#ffffff'}>

                <Text style={styles.buttonText}>确 定</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={this.cancel.bind(this)} underlayColor={'#ffffff'}>
                <Text style={styles.buttonText}>取 消</Text>
            </TouchableHighlight>
            </View>
          </View>
        </Modal>
      );
    }else {
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
          <Text numberOfLines = {0} style={styles.textStyle} >未发现附件,请把文件放置于该APP的Documents/Inbox文件夹下!</Text>
          </View>
          <View style={styles.calendar}>

          <TouchableHighlight style={styles.button} onPress={this.cancel.bind(this)} underlayColor={'#ffffff'}>
              <Text style={styles.buttonText}>确      定</Text>
          </TouchableHighlight>
          </View>

          </View>
        </Modal>
      );
    }

  }
  cancel(){
    this.refs.modal.close();
    fileArr = [];
  }
  passSelectDate(){
    this.refs.modal.close();
    var item ={
      name:'',
      path:''
    };
    for (var i = 0; i < this.state.row.length; i++) {

      if (this.state.row[i].name === this.state.sValue) {
        item = {
          name:this.state.sValue,
          path:this.state.row[i].path,
        }
      }
    }
    fileArr = [];
    this.refs.modal.getFromInstanse().getDateChange(item);
  }
  obtainFileNameAndFilePath(){
    var item ={
      name:'',
      path:''
    };
    for (var i = 0; i < this.state.row.length; i++) {

      if (this.state.row[i].name === this.state.sValue) {
        item = {
          name:this.state.sValue,
          path:this.state.row[i].path,
        }
      }
    }
    console.log('item ====>'+item);
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
    marginTop: 30,
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
    // borderColor: Colors.mainColor,
    borderWidth: 1,
    flex:1,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 18,
    // color: Colors.mainColor
  },
  textStyle:{
    marginLeft:10,
    marginRight:10,
    fontSize:16,
    fontWeight:'500',
    textAlign: 'center',
    color:'#ff8c00',
  }
});
