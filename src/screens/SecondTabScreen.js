import React, {Component, PropTypes} from 'react';
import {
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import * as counterActions from '../reducers/counter/actions';

// this is a traditional React component connected to the redux store
class SecondTabScreen extends Component {
  static navigatorStyle = {
    statusBarColor: '#303F9F',
    toolBarColor: '#3F51B5',
    navigationBarColor: '#303F9F',
    tabSelectedTextColor: '#FFA000',
    tabNormalTextColor: '#FFC107',
    tabIndicatorColor: '#FFA000',
    drawUnderNavBar: true,
    drawUnderTabBar: true,
    navBarTranslucent: true

  };

  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Edit',
        icon: require('../../img/navicon_edit.png'),
        id: 'edit'
      },
    ]
  };


  constructor(props) {
    super(props);
    this.buttonsCounter = 0;
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);

  }


  onNavigatorEvent = (event) => {
    switch (event.id) {
      case 'edit':
        this.onSetButton('add');
        break;
      case 'add':
        this.onSetButton('edit');
        break;

      default:
        console.log('Unhandled event ' + event.id);
        break;
    }
  }

  render = () => {
    return (
      <ScrollView style={{flex: 1}}>

        <Image style={{width: undefined, height: 100}} source={require('../../img/colors.png')} />

        <View style={{padding: 20}}>

          <Text style={styles.text}>
            <Text style={{fontWeight: '500'}}>Here Too: </Text> {this.props.counter.count}
          </Text>

          <TouchableOpacity onPress={ this.onIncrementPress }>
            <Text style={styles.button}>Increment Counter</Text>
          </TouchableOpacity>

          <Text style={{fontWeight: '500'}}>String prop: {this.props.str}</Text>
          <Text style={{fontWeight: '500'}}>Number prop: {this.props.num}</Text>
          <Text style={{fontWeight: '500'}}>Object prop: {this.props.obj.str}</Text>
          <Text style={{fontWeight: '500'}}>Array prop: {this.props.obj.arr[0].str}</Text>

          <TouchableOpacity onPress={ this.onSetButton }>
            <Text style={styles.button}>Set a button</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    );
  }

  onIncrementPress = () => {
    this.props.dispatch(counterActions.increment());
  }

  onSetButton = (buttonType) => {
    switch (buttonType) {
        case "add":
          this.props.navigator.setButtons({
            rightButtons: [
              {
                title: 'add',
                icon: require('../../img/navicon_add.png'),
                id: 'add'
              }
            ],

          });
          this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
          break;
        case "edit":
          this.props.navigator.setButtons({
            rightButtons: [
              {
                title: 'edit',
                icon: require('../../img/navicon_edit.png'),
                id: 'edit'
              }
            ],

          });
          this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);

          break;
      default:
          break;

    }

  }

  // leftButtons: [
  //   {
  //     title: 'Left',
  //     // icon: require('../../img/navicon_add.png'),
  //     id: 'left'
  //   }
  //]

  //
  // onNavigatorEvent(event) {
  //   switch (event.id) {
  //     case 'left':
  //       Alert.alert('NavBar', 'Left button pressed');
  //       break;
  //     case 'right':
  //       Alert.alert('NavBar', 'Right button pressed');
  //       break;
  //   }
  // }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop:10,
  },
  button: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop:10,
    color: 'blue'
  }
});

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

export default connect(mapStateToProps)(SecondTabScreen);
