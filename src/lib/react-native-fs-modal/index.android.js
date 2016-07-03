'use strict';

import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {Component,} from 'react';

var deviceScreen = require('Dimensions').get('window');
var Tween = require('react-native-tween-animation');

var fromInstance;
import utils from './utils';

export default class Modal extends Component {
  constructor (props) {
    super(props);
    this.state = {
      modalUnderlay: {
        top: deviceScreen.height,
        opacity: 0
      },
      modal: {
        top: deviceScreen.height
      },
      modalWrapper: {
        height: 0
      }
    };
  }

  _showModalWrapper () {
    this.setState({
      modalWrapper: {
        height: deviceScreen.height
      },
      modalUnderlay: {
        top: 0
      },
    });
  }

  _hideModalWrapper () {
    this.setState({
      modalWrapper: {
        height: 0
      },
      modalUnderlay: {
        top: deviceScreen.height
      },
    });
  }

  _showModal () {
    this.modalTween = new Tween({
      start: {
        top: deviceScreen.height,
      },
      end: {
        top: 50,
      },
      duration: (this.props.hasOwnProperty('duration')) ? (
          this.props.duration
      ) : 500,
      tween: (this.props.hasOwnProperty('tween')) ? (
          this.props.tween
      ) : 'easeOutBack',
      frame: (tweenFrame) => this.setState({
        modal: tweenFrame
      })
    });
  }

  getFromInstanse() {
    return fromInstance;
  }

  show (_this) {
    // if(this.props.hideStatusBar !== false)
    //   utils.setHidden(true);
    fromInstance = _this;
    this._showModalWrapper();
    this.underlayTween = new Tween({
      start: {
        opacity: 0,
      },
      end: {
        opacity: 0.6,
      },
      duration: 200,
      tween: 'easeInQuad',
      frame: (tweenFrame) => this.setState({
        modalUnderlay: tweenFrame
      }),
      done: () => {
        this._showModal();
      }
    });
  }

  close () {
    if(this.props.hideStatusBar !== false)
    //this.modalTween.reverse(() => {});
    this.underlayTween.reverse(() => {
      this._hideModalWrapper();
    });
  }

  renderChildren () {
    return React.cloneElement(
        this.props.children,
        {closeModal: this.close.bind(this)}
    );
  }

  render () {
    return (
        <View style={[styles.modalWrapper, this.state.modalWrapper]}>
          <TouchableWithoutFeedback onPress={this.props.closeOnTouch === true ? this.close.bind(this) : null}>
            <View style={[styles.modalUnderlay, this.state.modalUnderlay]}></View>
          </TouchableWithoutFeedback>
          <View style={[styles.modal, this.state.modal, this.props.modalStyle]}>
            {this.renderChildren()}
          </View>
        </View>
    );
  }
}

var styles = StyleSheet.create({
  modalWrapper: {
    position: 'absolute',
    width: deviceScreen.width,
    height: deviceScreen.height,
    left: 0,
    top: 0,
    backgroundColor: 'transparent'
  },

  modalUnderlay: {
    position: 'absolute',
    width: deviceScreen.width,
    height: deviceScreen.height,
    left: 0,
    backgroundColor: '#000'
  },

  modal: {
    position: 'absolute',
    width: deviceScreen.width-40,
    height: deviceScreen.height-180,
    left: 20,
    top: 40,
    backgroundColor: '#fff',
    opacity: 1,
    borderRadius: 4,
    overflow: 'hidden'
  }
});
