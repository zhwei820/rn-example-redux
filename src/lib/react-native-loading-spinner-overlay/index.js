//     react-native-loading-spinner-overlay
//     Copyright (c) 2016- Nick Baugh <niftylettuce@gmail.com>
//     MIT Licensed

// * Author: [@niftylettuce](https://twitter.com/#!/niftylettuce)
// * Source:
// <https://github.com/niftylettuce/react-native-loading-spinner-overlay>

// # react-native-loading-spinner-overlay
//
// <https://github.com/facebook/react-native/issues/2501>
// <https://rnplay.org/apps/1YkBCQ>
// <https://github.com/facebook/react-native/issues/2501>
// <https://github.com/brentvatne/react-native-overlay>
//

import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Modal,
  Text,
} from 'react-native';

import autobind from 'autobind-decorator';
import GiftedSpinner from 'react-native-gifted-spinner';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  float: {
    height: 150,
    width: 260,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
   }
});

const SIZES = ['small', 'normal', 'large'];

export default class Spinner extends React.Component {

  constructor(props) {
    super(props);

    this.state = { visible: this.props.visible }
  }

  static propTypes = {
    visible: React.PropTypes.bool,
    color: React.PropTypes.string,
    size: React.PropTypes.oneOf(SIZES),
    overlayColor: React.PropTypes.string,
    floatColor: React.PropTypes.string,
  };

  static defaultProps = {
    visible: false,
    color: '#ff9800',
    size: 'large', // 'normal',
    overlayColor: 'rgba(0, 0, 0, 0.25)',
    floatColor: 'rgba(0, 0, 0, 0.45)',
  };

  close() {
    this.setState({ visible: false })
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = nextProps
    this.setState({ visible })
  }

  _renderSpinner() {
    const { visible } = this.state

    if (!visible)
      return (
        <View />
      );

    // once RN version is released for this pull request
    // then we will integrate this `"Normal"` styleAttr property as default
    //let styleAttr = 'Normal';

    let styleAttr = 'Inverse';
    let size = 'large';

    switch (this.props.size) {
    case 'small':
      styleAttr = 'SmallInverse';
      size = 'small';
      break;
    case 'large':
      styleAttr = 'LargeInverse';
      size = 'large';
      break;
    }

    let spinner = (
      <View style={styles.container} key={'spinner' + Date.now()}>
        <View style={[styles.background, {backgroundColor: this.props.overlayColor}]}>
          <View style={[styles.float, {backgroundColor:this.props.floatColor}]}>
            <GiftedSpinner
              color={this.props.color}
              size={size}
              style={{ flex: 1 }}
              styleAttr={styleAttr}/>
            <Text style={{color: this.props.color, fontSize: 16, marginTop: 5,}}>{this.props.text}</Text>
          </View>
        </View>
      </View>
    );

    return (
      <Modal visible={visible} transparent>
        {spinner}
      </Modal>
    );

  }

  render() {
    return this._renderSpinner();
  }

};
