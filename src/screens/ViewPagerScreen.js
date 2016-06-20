import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';
import { connect } from 'react-redux';

var ViewPager = require('react-native-viewpager');
var deviceWidth = Dimensions.get('window').width;

 var IMGS = [
   'https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024',
   'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=1024',
   'https://images.unsplash.com/photo-1441448770220-76743f9e6af6?h=1024',
   'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024',
   'https://images.unsplash.com/photo-1441126270775-739547c8680c?h=1024',
   'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024',
   'https://images.unsplash.com/photo-1440847899694-90043f91c7f9?h=1024'
 ];


const styles = StyleSheet.create({
    container: {
     flex: 1,
     flexDirection: 'column',
   },
   viewpager: {
     flex: 1,
   },
  page: {
      width: deviceWidth,
  },
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

class ViewPagerScreen extends Component {

  static navigatorStyle = {
    statusBarColor: '#303F9F',
    toolBarColor: '#3F51B5',
    navigationBarColor: '#303F9F',
    tabSelectedTextColor: '#FFA000',
    tabNormalTextColor: '#FFC107',
    tabIndicatorColor: '#FF4081'
  };

  static propTypes = {
    onNavigate: PropTypes.func.isRequired
  };

    constructor(props) {
      super(props);
      var dataSource = new ViewPager.DataSource({
        pageHasChanged: (p1, p2) => p1 !== p2,
      });

      this.state = {dataSource: dataSource.cloneWithPages(IMGS)};
    }


    render() {
      return (
        <View style={styles.container} >
            <ViewPager
              style={styles.viewpager}
              dataSource={this.state.dataSource}
              renderPage={this._renderPage}
              isLoop={true}
              autoPlay={true}/>

              <TouchableOpacity onPress={ this.onPopToRootPress}>
                <Text style={styles.button}>Pop to root</Text>
              </TouchableOpacity>

        </View>
      );
    }


    _renderPage(
      data: Object,
      pageID: number | string,) {
      return (
        <Image
          source={{uri: data}}
          style={styles.page} />
      );
  }

  onPopToRootPress = () => {
    this.props.navigator.popToRoot();
  }

}

function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

export default connect(mapStateToProps)(ViewPagerScreen);
