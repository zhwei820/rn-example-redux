'use strict';

import React from 'react';
import {StyleSheet, Image, Text, View, Dimensions} from 'react-native';

import Colors from '../../constants/Colors';

import {
  MKIconToggle,
  MKSwitch,
  MKRadioButton,
  MKCheckbox,
  MKColor,
  getTheme,
  setTheme
} from 'react-native-material-kit';

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
var radioSelectedData;
var radioGroup ;
let isRender;
export default class FormItemsRadioView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      row: this.props.row,
      isChecked: false,
    };
    isRender=true;
  }
shouldComponentUpdate()
{
  return isRender;
}

  handleChange(text) {
    this.props.onUserInput(this.state.row.name, text);
  }

  render() {
    isRender=false;
    radioGroup = new MKRadioButton.Group();
    var radioView = this.props.row.items.map((row)=>{
      let isChecked = false;
      if(this.state.row.content && this.state.row.content === row){
        isChecked = true;
        this.handleChange(row);
      }
      return (
        <View style={styles.col}>
          <MKRadioButton group={radioGroup} checked={isChecked} borderOnColor={Colors.mainColor}
            borderOffColor={Colors.secondaryColor}
            fillColor={Colors.mainColor}
            onCheckedChange={(e) => {
              if (e.checked == true) {
                this.handleChange(row);
              }}}/>
          <Text style={styles.legendLabel}>{row}</Text>
        </View>
      )
    });

    return (
      <View style={formComponentStyles.container}>
        <View style={formComponentStyles.titleContainer}>
          <Text style={formComponentStyles.title}>
            {this.state.row.title}
          </Text>
        </View>
        <View style={formComponentStyles.contentContainer}>
          <View style={styles.row}>
            {radioView}
          </View>
        </View>
      </View>
    );
  }
}

import formComponentStyles from './styles';
var styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 8,
    marginRight: 8,
    marginTop: 3,
    marginBottom: 8,
    paddingLeft: 10,
    paddingRight: 10
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 7,
    marginRight: 7,
  },
  legendLabel: {
    textAlign: 'center',
    color: Colors.black,
    fontSize: 12,
    fontWeight: '300'
  }
});
