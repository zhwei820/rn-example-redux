'use strict';

import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

import DatePicker from "../datePicker";
import Colors from '../../constants/Colors';

export default class DateItem extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        row: this.props.row,
        date: '',
      };
  }

  getDateChange(data){
    let d=data;
    let dformat = [d.getFullYear(),
                 d.getMonth()+1>9?d.getMonth()+1:`0${d.getMonth()+1}`,
                 d.getDate()>9?d.getDate():`0${d.getDate()}`].join('-') ;
    this.setState({date: dformat,});
    this.props.onUserInput(this.state.row.title, this.state.date);
  }

  onClickDate() {
    this.props.refs.datepicker.refs.modal.show(this);
  }

  render() {
    return (
      <View style={{height:48,flex: 1,flexDirection: 'row',justifyContent: 'space-between',  alignItems: 'center',
        backgroundColor:Colors.white,borderBottomColor: Colors.lightgrey,borderBottomWidth: 1,}}>

      <Text style={{marginLeft: 16,textAlign: 'left', fontSize: 16, color: Colors.black,}}>
        {this.state.row.title}
      </Text>

        <View style={{marginRight: 16,flexDirection: 'row',alignItems: 'center'}}>
          <Text style={{fontSize:14}}>{this.props.value}</Text>
          <TouchableOpacity onPress={this.onClickDate.bind(this)}>
            <Image style={{height:35,width:35,}} source={require('../../img/icon/sq_icon_calendar.png')}/>
          </TouchableOpacity>

        </View>

      </View>
    );
  }
}

var styles = StyleSheet.create({
});
