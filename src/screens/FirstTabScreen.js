import React, {Component, PropTypes} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import * as counterActions from '../reducers/counter/actions';

import RnImage from '../../diy/RnImage';

// this is a traditional React component connected to the redux store
class FirstTabScreen extends Component {
  static navigatorStyle = {
    statusBarColor: '#303F9F',
    toolBarColor: '#3F51B5',
    navigationBarColor: '#303F9F',
    tabSelectedTextColor: '#FFA000',
    tabNormalTextColor: '#FFC107',
    tabIndicatorColor: '#FFA000'
  };

  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Edit',
        id: 'edit'
      },
      {
        icon: require('../../img/navicon_add.png'),
        title: 'Add',
        id: 'add'
      }
    ]
  };

  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = (event) => {
    switch (event.id) {
      case 'edit':
        Alert.alert('NavBar', 'Edit button pressed1');
        break;

      case 'add':
        Alert.alert('NavBar', 'Add button pressed');
        break;

      default:
        console.log('Unhandled event ' + event.id);
        break;
    }
  }

  render() {
    return (
      <View style={{flex: 1, padding: 20}}>

        <Text style={styles.text}>
          <Text style={{fontWeight: '500'}}>Same Counter: </Text> {this.props.counter.count}
        </Text>

        <TouchableOpacity onPress={ this.onIncrementPress }>
          <Text style={styles.button}>Increment Counter</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={ this.onPushPress }>
          <Text style={styles.button}>Push Screen</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={ this.onShowModalPress }>
          <Text style={styles.button}>Modal Screen</Text>
        </TouchableOpacity>

        <Text style={{fontWeight: '500'}}>String prop: {this.props.str}</Text>
        <Text style={{fontWeight: '500'}}>Number prop: {this.props.num}</Text>
        <Text style={{fontWeight: '500'}}>Object prop: {this.props.obj.str}</Text>
        <Text style={{fontWeight: '500'}}>Array prop: {this.props.obj.arr[0].str}</Text>

        <RnImage source={{ uri: 'http://pointcadres.fr/img/Cadre%20image-paysage-Plage-cocotier-40X120cm.jpg' }}
          style={{
            width: 320,
            height: 240,
          }}
        />
      </View>
    );
  }

  onIncrementPress = () => {
    this.props.dispatch(counterActions.increment());
  }

  onPushPress = () => {
    this.props.navigator.push({
      title: "More",
      screen: "example.PushedScreen",
      passProps: {
        str: 'This is a prop passed in \'navigator.push()\'!',
        obj: {
          str: 'This is a prop passed in an object!',
          arr: [
            {
              str: 'This is a prop in an object in an array in an object!'
            }
          ]
        },
        num: 1234
      }
    });
  }

  onShowModalPress = () => {
    this.props.navigator.showModal({
      title: "Modal Screen",
      screen: "example.ModalScreen",
      passProps: {
        str: 'This is a prop passed in \'navigator.showModal()\'!',
        obj: {
          str: 'This is a prop passed in an object!',
          arr: [
            {
              str: 'This is a prop in an object in an array in an object!'
            }
          ]
        },
        num: 1234
      }
    });
  }

}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop:10
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

export default connect(mapStateToProps)(FirstTabScreen);
