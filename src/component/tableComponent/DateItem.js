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
    this.setState({date: data.date,});
    this.props.onUserInput(this.state.row.title, this.state.date);
  }

  onClickDate() {
    this.props.refs.modalcalendar.refs.modal.show(this);
  }

  render() {
    return (
      <View style={{height:48,flex: 1,flexDirection: 'row',justifyContent: 'space-between',  alignItems: 'center',
        backgroundColor:Colors.white,borderBottomColor: Colors.lightgrey,borderBottomWidth: 1,}}>

      <Text style={{marginLeft: 16,textAlign: 'left', fontSize: 16, color: Colors.black,}}>
        {this.state.row.title}
      </Text>

        <View style={{marginRight: 16,flexDirection: 'row',alignItems: 'center'}}>
          <Text style={{fontSize: 14}}>{this.props.value}</Text>
          <TouchableOpacity onPress={this.onClickDate.bind(this)}>
            <Image source={require('../../img/icon/sq_icon_calendar.png')}/>
          </TouchableOpacity>

        </View>

      </View>
    );
  }
}

var styles = StyleSheet.create({
});
