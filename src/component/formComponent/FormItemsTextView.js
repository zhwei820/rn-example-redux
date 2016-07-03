'use strict';

import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
} from 'react-native';

import Colors from '../../constants/Colors';
var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

export default class FormItemsTextView extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        row: this.props.row,
      };
  }

  render() {
    let contentView;
    if (this.state.row.content) {
      contentView = <Text style={{textAlign: 'right', color: Colors.black, marginRight: 15}}>
          {this.state.row.content}
        </Text>;
      if(this.state.row.detailType === 'file'){
        let arrFiles = [];
        let rowContent = eval('(' + this.state.row.content + ')');
        for(let i = 0; i < rowContent.length; i++){
          let file = {};
          for(let key in rowContent[i]){
            file.fileName = rowContent[i][key];
          }
          arrFiles.push(file);
        }
        contentView = arrFiles.map(function(row) {
          return <Text style={{textAlign: 'right', color: Colors.black}}>
              {row.fileName}
            </Text>
        });
      }
    }


    return(
      <View style={formComponentStyles.container}>
        <View style={formComponentStyles.titleContainer}>
          <Text style={formComponentStyles.title}>
            {this.state.row.title}
          </Text>
        </View>
        <View style={[formComponentStyles.contentContainer, {marginRight: 4,}]}>
          {contentView}
        </View>
      </View>
    );
  }
}

import formComponentStyles from './styles';
