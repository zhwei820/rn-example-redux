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
} from 'react-native';

import Calendar from 'react-native-calendar-android';
import Modal from '../lib/react-native-fs-modal';
import Colors from '../constants/Colors';

export default class ModalCalendar extends React.Component{
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
              <Calendar
                width={300}
                topbarVisible={true}
                arrowColor={Colors.mainColor}
                firstDayOfWeek="monday"
                showDate="all"
                currentDate={[ "2016/12/01" ]}
                selectionMode="single"
                selectionColor={Colors.mainColor}
                selectedDates={[ "2015/11/20", "2015/11/30", 1448745712382 ]}
                onDateChange={(data) => {_this.refs.modal.getFromInstanse().getDateChange(data); _this.refs.modal.close()}} />
          </View>
          <TouchableHighlight style={styles.button} onPress={() => this.refs.modal.close()} underlayColor={Colors.secondaryColor}>
              <Text style={styles.buttonText}>取 消</Text>
          </TouchableHighlight>
        </View>
      </Modal>
    );
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
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  calendar: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: 40,
    marginLeft: 100,
    marginRight: 100,
    borderColor: Colors.mainColor,
    borderWidth: 1,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 18,
    color: Colors.mainColor
  }
});
