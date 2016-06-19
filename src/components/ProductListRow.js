import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
  Image
} from 'react-native';

import BuyProgressInfo from './BuyProgressInfo';

export default class ProductListRow extends Component {
  constructor(props) {
    super(props);
  }

  _renderItem = (item) => {
    return(
      <TouchableHighlight
        style={styles.itemWrapper}
        underlayColor='#c8c7cc'
        onPress={() => this.props.onPress(item)}
      >
        <View
          style={{flex: 1}}
        >
          <View style={{alignItems: "center"}}>
            <Image
              style={[styles.base]}
              source={{uri: item.listImage}}
            />
          </View>
          <View style={styles.title}>
            <Text numberOfLines={2} style={{fontSize: 13, fontFamily: 'Cochin',}}>
              {item.title}
            </Text>
          </View>

          <BuyProgressInfo progress={item.proProgress / (item.price / 100)} totalNum={item.price / 100}/>

        </View>
      </TouchableHighlight>

    );
  }

  render() {
    return (
      <View style={[styles.wrapper, styles.row]}>
        {this._renderItem(this.props.rowData[0])}
        {this._renderItem(this.props.rowData[1])}

      </View>

    );
  }
}


const styles = StyleSheet.create({
  row: {
    padding: 10,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  base: {
   width: 100,
   height: 100,
 },
 title: {
   marginTop: 10,
   height: 30,
 }
})
