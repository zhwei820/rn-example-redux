'use strict';

import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
  TouchableHighlight
} from 'react-native';

import Colors from '../../constant/Colors';
import {MKButton, MKColor} from 'react-native-material-kit';

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
var _this;

export default class FormItemsDateTimeView extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        row: this.props.row,
        sValue: '点击选择时间',
      };
      _this = this;
  }

  handleChange(text) {
    this.props.onUserInput(this.state.row.name, text);
  }

  componentDidMount(){
    if(this.state.row.content && this.state.row.content != '' ){
      this.setState({
        sValue: this.state.row.content,
      });
      this.handleChange(this.state.row.content);
    }
  }

  getDateChange(data){
    let d=data;
    let dformat = [d.getFullYear(),
                  d.getMonth()+1>9?d.getMonth()+1:`${0}${d.getMonth()+1}`,
                  d.getDate()>9?d.getDate():`0${d.getDate()}`].join('-') + ' ' + [d.getHours(),d.getMinutes() > 10?d.getMinutes():"0"+d.getMinutes(), d.getSeconds() > 10?d.getSeconds():"0"+d.getSeconds() ].join(':');
    this.setState({date: dformat,});
    this.props.onUserInput(this.state.row.name, dformat);
  }
  render() {
    var contentView;
    if (this.state.date) {
      contentView = this.state.date;
      this.handleChange(contentView);
    } else {
      contentView = this.state.sValue;
    }

    var _this = this;
    var ColoredFlatButton = MKButton.coloredFlatButton()
      .withText(contentView)
      .withTextStyle({color: 'gray', fontSize: 14,marginRight:10,})
      .withOnPress(() => {
        _this.props.refs.datetimepicker.refs.modal.show(_this);
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

        </View>

      </View>
    );
  }
}

import formComponentStyles from './styles';
var styles = StyleSheet.create({
  button: {
    height: 36,
    width: 180,
    backgroundColor: Colors.white,
    borderColor: Colors.black,
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    justifyContent: 'center',

  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 55,
    marginTop: 8,
    marginBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
  },
  calendarContainer: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  postImage: {
    width: 38,
    height: 38
  }
});
