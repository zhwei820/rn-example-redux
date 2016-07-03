'use strict';

import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
  Picker,
} from 'react-native';

import Colors from '../../constants/Colors';
var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

export default class FormItemsSpinnerView extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        row: this.props.row,
        sValue: '请选择',
      };
  }

  handleChange(text) {
    this.props.onUserInput(this.state.row.name, text);
    this.setState({sValue: text});
  }

  render() {
    var items = this.state.row.items;
    return(
      <View style={formComponentStyles.container}>
        <View style={formComponentStyles.titleContainer}>
          <Text style={formComponentStyles.title}>
            {this.state.row.title}
          </Text>
        </View>
        <View style={formComponentStyles.contentContainer}>
          <Picker
          style = {styles.pickerStyle}
            selectedValue={this.state.sValue}
            onValueChange={(data) => {this.handleChange(data)}}
            mode={'dropdown'}>
            {items.map((data)=>{return (
              <Picker.Item label={data} value={data}/>
            );})}
          </Picker>
        </View>
      </View>
    );
  }

  componentDidMount(){
    if(this.state.row.content && this.state.row.content!= '' ){
      this.setState({
        sValue: this.state.row.content,
      });
      this.handleChange(this.state.row.content);
    }
  }
}

import formComponentStyles from './styles';
var styles = StyleSheet.create({
  content: {
    height: 30,
  },
  pickerStyle:{
    marginTop:1,
    alignSelf: 'flex-end',
    marginBottom:1,
    width: 200,
    // height:100
  }
});
