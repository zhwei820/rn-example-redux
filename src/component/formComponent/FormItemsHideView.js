'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  View,

} from 'react-native';


export default class FormItemsTextView extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        row: this.props.row,
      };
  }
  componentDidMount(){
    if(this.state.row.name){
      if (this.state.row.content === '') {
            this.handleChange("hide");
      }
      else {
          this.handleChange(this.state.row.content);
      }

    }
  }
  handleChange(text) {
      // console.log('onUserInput',this.state.row.name);
    this.props.onUserInput(this.state.row.name, text);
  }
  render() {
    return(
      <View style={{height:0,}}/>
    );
  }
}
