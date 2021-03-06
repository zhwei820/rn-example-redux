import React, {Component, PropTypes} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import * as counterActions from '../reducers/counter/actions';

// this is a traditional React component connected to the redux store
class PushedScreen extends Component {
  static navigatorStyle = {
    statusBarColor: '#303F9F',
    toolBarColor: '#3F51B5',
    navigationBarColor: '#303F9F',
    tabSelectedTextColor: '#FFA000',
    tabNormalTextColor: '#FFC107',
    tabIndicatorColor: '#FF4081'
  };

  static propTypes = {
    str: PropTypes.string.isRequired,
    obj: PropTypes.object.isRequired,
    num: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.bgColor = "#FFA000";
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);

  }


    static navigatorButtons = {
      rightButtons: [
        {

          icon: require('../../img/navicon_edit.png'),
          title: 'Edit1',
          id: 'edit'
        },
        {
          icon: require('../../img/navicon_add.png'),
          title: 'Add',
          id: 'add'
        }
      ]
    };


    onNavigatorEvent = (event) => {
      switch (event.id) {
        case 'edit':
          Alert.alert('NavBar', 'Edit button pressed');
          break;

        case 'add':
          Alert.alert('NavBar', 'Add button pressed');
          break;

        default:
          console.log('Unhandled event ' + event.id);
          break;
      }
    }

  getRandomColor = () => {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render() {
    return (
      <View style={{flex: 1, padding: 20, backgroundColor: this.bgColor}}>

        <Text style={styles.text}>
          <Text style={{fontWeight: '500'}}>Counter: </Text> {this.props.counter.count}
        </Text>

        <TouchableOpacity onPress={ this.onIncrementPress }>
          <Text style={styles.button}>Increment Counter</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={ this.onShowModalPress }>
          <Text style={styles.button}>Modal Screen</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={ this.onDismissModal }>
          <Text style={styles.button}>Dismiss modal</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={ this.onDismissAllModalsPress }>
          <Text style={styles.button}>Dismiss all modals</Text>
        </TouchableOpacity>

        <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}/>

        <Text style={{fontWeight: '500'}}>String prop: {this.props.str}</Text>
        <Text style={{fontWeight: '500'}}>Number prop: {this.props.num}</Text>
        <Text style={{fontWeight: '500'}}>Object prop: {this.props.obj.str}</Text>
        <Text style={{fontWeight: '500'}}>Array prop: {this.props.obj.arr[0].str}</Text>

      </View>
    );
  }

  onIncrementPress = () => {
    this.props.dispatch(counterActions.increment());
  }

  onShowModalPress = () => {
    this.props.navigator.showModal({
      title: "Modal Screen",
      screen: "example.ModalScreen",
      passProps: {
        passed: 'This is a prop passed in \'navigator.showModal()\'!',
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

  onDismissAllModalsPress = () => {
    this.props.navigator.dismissAllModals();
  }

  onDismissModal = () => {
    this.props.navigator.dismissModal();
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

export default connect(mapStateToProps)(PushedScreen);
