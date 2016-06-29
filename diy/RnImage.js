import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

var RNIMAGE = 'RNIMAGE';
export default class RnImage extends Component {
  setNativeProps(props: Object) {
   this.refs[RNIMAGE].setNativeProps(props);
 }

  componentWillMount(){
    if(this.props.source.uri){
      Image.prefetch(this.props.source.uri);
    }
  }

  render() {
    return (
        <Image ref={RNIMAGE}
          source={this.props.source}
          style={[this.props.style, {overflow: 'visible'}]}
        />
    );
  }
};
