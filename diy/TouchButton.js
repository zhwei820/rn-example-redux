 'use strict';

 const React = require('react');
 const {
   PropTypes
 } = React;

 const {
   View,
   TouchableHighlight,
   Text,
   StyleSheet,
   Platform
 } = require('react-native');

 var ReactNativePropRegistry = require('ReactNativePropRegistry');

 const isEqual = require('lodash.isequal');

 const TouchButton = React.createClass({
   propTypes: Object.assign({},
     {
       style: Text.propTypes.style,
       textStyle: Text.propTypes.style,
       disabledStyle: Text.propTypes.style,
       activeOpacity: PropTypes.number,
       allowFontScaling: PropTypes.bool,
       isLoading: PropTypes.bool,
       isDisabled: PropTypes.bool,
       onPress: PropTypes.func,
       onLongPress: PropTypes.func,
       onPressIn: PropTypes.func,
       onPressOut: PropTypes.func,
     },
   ),

   statics: {
     isAndroid: (Platform.OS === 'android'),
   },

   _renderInnerText: function () {
         return (
           <Text style={[styles.textButton, this.props.textStyle]}>
             {this.props.children}
           </Text>
        );
    },

   render: function () {
     if (this.props.isDisabled === true || this.props.isLoading === true) {
       return (
         <View style={[styles.button, styles.disabledButton]}>
           {this._renderInnerText()}
         </View>
       );
     } else {
       // Extract Touchable props
       let touchableProps = {
         onPress: this.props.onPress,
         onPressIn: this.props.onPressIn,
         onPressOut: this.props.onPressOut,
         onLongPress: this.props.onLongPress,
         activeOpacity: this.props.activeOpacity,
         text: this.props.text,
         textStyle: this.props.textStyle,
         style: this.props.style,
       };
       return(
           <TouchableHighlight
              style={[styles.button, touchableProps.style]}
              activeOpacity={touchableProps.activeOpacity}
              animationVelocity={0}
              underlayColor={ReactNativePropRegistry.getByID(touchableProps.style).borderColor}
              onPress={touchableProps.onPress}
              onPressIn={touchableProps.onPressIn}
              onPressOut={touchableProps.onPressOut}
              onLongPress={touchableProps.onLongPress}>

              <View style={styles.buttonText}>
                  <Text style={[styles.textButton, this.props.textStyle]}>
                    {this.props.children}
                  </Text>
              </View>

            </TouchableHighlight>
        );
     }
   }
 });

 const styles = StyleSheet.create({
   button: {
     height: 44,
     flexDirection: 'row',
     borderWidth: 1,
     borderRadius: 8,
     marginBottom: 10,
     alignSelf: 'stretch',
     justifyContent: 'center',
   },
   buttonText: {
       justifyContent: 'center',
   },

   textButton: {
     fontSize: 18,
     alignSelf: 'center',
   },
   opacity: {
     opacity: 0.5,
   },
   disabledButton: {
       borderColor: '#848484',
       backgroundColor: '#A4A4A4'
   },

 });

 module.exports = TouchButton;
