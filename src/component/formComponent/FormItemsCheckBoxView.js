'use strict';
import React from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';

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

export default class FormItemsCheckBoxView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      row: this.props.row,
      CheckBoxSelectedData: [],
    };
  }

  handleChange(text) {
    this.props.onUserInput(this.state.row.name, text);
  }

  render() {
    let CheckBoxSelectedData = this.state.CheckBoxSelectedData;
    var _this = this;
    var radioView = this.props.row.items.map((row)=>{
      let isChecked = false;

      if(this.state.row.content && this.state.row.content.contains(row)){
        isChecked = true;
        this.handleChange(this.state.row.content);
        CheckBoxSelectedData.push(row);
      }
      return (
        <View style={styles.col}>
          <MKCheckbox checked={isChecked} borderOnColor={Colors.mainColor} borderOffColor={Colors.secondaryColor} fillColor={Colors.mainColor} onCheckedChange={(e) => {
            if (e.checked == true) {
              if (CheckBoxSelectedData.length > 0)
                CheckBoxSelectedData[CheckBoxSelectedData.length] = ',' + row;
              else
                CheckBoxSelectedData[CheckBoxSelectedData.length] = row;
            }else {
              var i = 0;
              for (; i < CheckBoxSelectedData.length; i++) {
                if (CheckBoxSelectedData[i].contains(row)) {
                  CheckBoxSelectedData.splice(i, 1);
                  break;
                }
              }
            }
            if (CheckBoxSelectedData[0] && CheckBoxSelectedData[0].contains(','))
              CheckBoxSelectedData[0] = CheckBoxSelectedData[0].split(',')[1];
            _this.handleChange(CheckBoxSelectedData.join(""));
          }}/>
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
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 7,
    alignItems:'center',
  },
  legendLabel: {
    textAlign: 'center',
    color: Colors.black,
    fontSize: 12,
    fontWeight: '300'
  }
});
