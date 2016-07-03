'use strict'

import React from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import GridItemImage from './gridItemImage';

var ITEM_HEIGHT = Dimensions.get('window').width/3-11;
var ITEM_ICON = ITEM_HEIGHT*0.6;

var imageStoreMap = new Map();

export default class GridItem extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        row: this.props.row,
      };
  }

  render(){
    return(
      <TouchableOpacity onPress={() => this.props.onClick()} >
        <View style={styles.item}>
          <GridItemImage icon={this.state.row.priority}/>
          <Text style={styles.itemText}>{this.state.row.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

var styles = StyleSheet.create({
  item: {
    width: ITEM_HEIGHT,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    margin: 5,
  },

  itemText: {
  },
});
