import React, {Component, PropTypes} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import * as counterActions from '../reducers/counter/actions';
import * as appActions from '../reducers/app/actions';


import Button from 'apsl-react-native-button';
import TouchButton from '../diy/TouchButton';

import {Image as ImageP} from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';




// this is a traditional React component connected to the redux store
class LoginScreen extends Component {

  static propTypes = {
    str: PropTypes.string.isRequired,
    obj: PropTypes.object.isRequired,
    num: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1, padding: 20}}>

        <Text style={styles.text}>
          <Text style={{fontWeight: '500'}}>Counter: </Text> {this.props.counter.count}
        </Text>

        <TouchableOpacity onPress={ this.onIncrementPress.bind(this) }>
          <Text style={styles.button}>Increment Counter</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={ this.onLoginPress.bind(this) }>
          <Text style={styles.button}>Login</Text>
        </TouchableOpacity>

        <Text style={{fontWeight: '500'}}>String prop: {this.props.str}</Text>
        <Text style={{fontWeight: '500'}}>Number prop: {this.props.num}</Text>
        <Text style={{fontWeight: '500'}}>Object prop: {this.props.obj.str}</Text>
        <Text style={{fontWeight: '500'}}>Array prop: {this.props.obj.arr[0].str}</Text>
        <Text style={{fontWeight: '500'}}>Array of arrays prop: {JSON.stringify(this.props.obj.arr2)}</Text>




        <TouchButton style={styles.style3} textStyle={styles.textStyle}
          onPress={() => {
              console.log("10");
          }}>
            Increment async!
        </TouchButton>

        <TouchButton
          isDisabled={false}
          style={styles.style2}
          textStyle={styles.textStyle}
          activeOpacity={0.6}
          onPress={() => {
              console.log("10");
          }}

          onPressIn={() => {
              console.log("10");
          }}
          onPressOut={() => {
              console.log("11");
          }}>
          Hello
        </TouchButton>


        <Image
          source={{ uri: 'http://loremflickr.com/640/480/dog' }}
          indicator={ProgressBar}
          style={{
            width: 320,
            height: 240,
          }}/>


      </View>
    );
  }
  onIncrementPress() {
    this.props.dispatch(counterActions.increment());
  }
  onLoginPress() {
    this.props.dispatch(appActions.login());
  }
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
  },
  style2: {
      borderColor: '#c0392b',
      backgroundColor: '#e74c3c'
  },
  style3: {
      borderColor: '#16a085',
      backgroundColor: '#1abc9c'
  },
  textStyle: {
      color: 'white',
      fontSize: 20,
  },

});

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

export default connect(mapStateToProps)(LoginScreen);
