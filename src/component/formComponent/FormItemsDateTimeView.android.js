'use strict';

import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  NativeModules,
} from 'react-native';

import Colors from '../../constants/Colors';
import {MKButton, MKColor} from 'react-native-material-kit';

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

export default class FormItemsDateTimeView extends React.Component{
  constructor(props) {
      super(props);
      let content = this.props.row.content;
      let date = '', time = '00:00';
      if (content) {
        let contentArr = content.split(" ");
        if (contentArr && contentArr.length > 1) {
          date = contentArr[0];
          time = contentArr[1];
        }
      }
      this.state = {
        row: this.props.row,
        date: date,
        time: time,
      };
  }

  handleChange() {
    this.props.onUserInput(this.state.row.name, this.state.date+' '+this.state.time);
  }

  getDateChange(data){
    this.setState({date: data.date,});
  }

  handleClick () {
     NativeModules.DateAndroid.showTimepicker((date)=>{}, (hour, minute)=>{
       if(hour < 10){
         hour = `0${hour}`;
       }
       if(minute < 10){
         minute = `0${minute}`;
       }
       this.setState({
         time: hour+':'+minute,
       });
       this.props.onUserInput(this.state.row.name, this.state.date + ' ' + this.state.time);
     });
   }

  render() {
    let contentDate = this.state.date == '' ? '点击选择日期' : this.state.date;
    let contentTime = this.state.time;
    this.handleChange();
    var _this = this;
    var ColoredFlatButton = MKButton.coloredFlatButton()
      .withText(contentDate)
      .withTextStyle({color: 'gray', fontSize: 14,marginRight: 10,})
      .withOnPress(() => {
      _this.props.refs.modalcalendar.refs.modal.show(_this);
    }).build();

    return (
      <View style={formComponentStyles.container}>
        <View style={formComponentStyles.titleContainer}>
          <Text style={formComponentStyles.title}>
            {this.state.row.title}
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.buttonContainer}>
            <ColoredFlatButton/>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this.handleClick.bind(this)}>
              <Text style={styles.instructions}>{contentTime}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    );
  }
}

import formComponentStyles from './styles';
var styles = StyleSheet.create({
  instructions: {
    textAlign: 'center',
    color: '#333333',
    margin: 5,
  },
  button: {
    height: 36,
    width: 180,
    backgroundColor: Colors.white,
    borderColor: Colors.black,
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    justifyContent: 'center'
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 55,
    marginTop: 8,
    marginBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
  },
  calendarContainer: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: 4,
  },
  postImage: {
    width: 38,
    height: 38
  }
});
