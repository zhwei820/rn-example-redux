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


var CheckBoxSelectedData ;

export default class FormItemsCheckBoxView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      row: this.props.row,
      CheckBoxSelectedData: [],
    };
 CheckBoxSelectedData =[];
  }

  handleChange(text) {
    this.props.onUserInput(this.state.row.name, text);
  }
  checkString(array,string){
    for (var i = 0; i < array.length; i++)
    {
      let dataTemp= array[i];
      if (dataTemp === string) {
        return true;
      }
      return false
    }
  }
  componentWillUnmount()
  {
    var CheckBoxSelectedData=[];
  }
  render() {

    let CheckBoxSelectedData = this.state.CheckBoxSelectedData;
    var _this = this;
    var radioView = this.props.row.items.map((row)=>{
      let isChecked = false;
      if(this.state.row.content &&  this.state.row.content === row ){
        isChecked = true;
        this.handleChange(this.state.row.content);
        CheckBoxSelectedData.push(row);
      }
      return (
        <View style={styles.col}>
          <MKCheckbox checked={isChecked} borderOnColor={Colors.mainColor} borderOffColor={Colors.secondaryColor} onCheckedChange={(e) => {
            if (e.checked == true)
             {
                    if (CheckBoxSelectedData.length > 0)  {
                    CheckBoxSelectedData[CheckBoxSelectedData.length] = ',' + row;
                    }
                    else  {
                      CheckBoxSelectedData[CheckBoxSelectedData.length] = row;
                    }
            }  else  {
              var i=0;
              for (; i < CheckBoxSelectedData.length; i++) {
                if (this.checkString(CheckBoxSelectedData,row)) {
                      CheckBoxSelectedData.splice(i, 1);
                      break;
                    }
              }
            }
            if (CheckBoxSelectedData[0] && this.checkString(CheckBoxSelectedData[0],',')){
                CheckBoxSelectedData[0] = CheckBoxSelectedData[0].split(',')[1];
            }
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
