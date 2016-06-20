import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  TouchableHighlight
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

 let bannerData = [
    {
      "click_url": "http://api.duo17.com/webapp/one_dollar/dest/view/event.html?&bgc=8de0fe&cbgc=f7fcff&bc=d3f3ef&dc=3cccff&img=http%3A%2F%2Fimg-cdn.duo17.com%2Fonedata%2Fimg%2Fimg_convert%2Ffood_event1.jpg&title=%E5%90%83%E8%B4%A7%E5%AD%A3&type=4",
      "pic_url": "http://img-cdn.duo17.com/onedata/o_banner/1ed192c7426c6d9442895899dcf544e3.jpg",
      "name": "吃货节",
      "open_type": "webview",
      "id": 32
    },
    {
      "click_url": "http://api.duo17.com/webapp/one_dollar/dest/view/detail.html?pro_id=266",
      "pic_url": "http://img-cdn.duo17.com/onedata/o_banner/bcffddaa4c7cb0b62e2c93a175a08fd6.jpg",
      "name": "oppo巴萨定制手机",
      "open_type": "native",
      "id": 28
    },
    {
      "click_url": "http://api.duo17.com/webapp/one_dollar/dest/view/detail.html?pro_id=57",
      "pic_url": "http://img-cdn.duo17.com/onedata/o_banner/79c6d6ff983e7b651123bf0abab93c7f.jpg",
      "name": "智能手环",
      "open_type": "native",
      "id": 15
    },
    {
      "click_url": "http://api.duo17.com/webapp/one_dollar/dest/view/fathersDay.html?&bgc=f7e6c8&cbgc=fffaf4&bc=ffebbc&dc=eca100&img=http%3A%2F%2Fimg-cdn.duo17.com%2Fonedata%2Fimg%2Fimg_convert%2Ffathers_day.jpg&title=%E6%84%9F%E6%81%A9%E7%88%B6%E4%BA%B2%E8%8A%82&type=8",
      "pic_url": "http://img-cdn.duo17.com/onedata/o_banner/2c5b75e50a9e5c97f0b4fdf113030c3b.jpg",
      "name": "父亲节",
      "open_type": "webview",
      "id": 31
    },
    {
      "click_url": "http://api.duo17.com/webapp/one_dollar/dest/view/shareDisciple.html",
      "pic_url": "http://img-cdn.duo17.com/onedata/o_banner/44099b7c3724da95f0d489abd75534a4.jpg",
      "name": "师徒",
      "open_type": "webview",
      "id": 23
    }
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
      height: deviceWidth * (280.0 / 720)
  },
});

export default class Banner extends Component {

  static navigatorStyle = {
    statusBarColor: '#303F9F',
    toolBarColor: '#3F51B5',
    navigationBarColor: '#303F9F',
    tabSelectedTextColor: '#FFA000',
    tabNormalTextColor: '#FFC107',
    tabIndicatorColor: '#FF4081'
  };

  static propTypes = {
    onPressBanner: PropTypes.func.isRequired
  };

    constructor(props) {
      super(props);
      var dataSource = new ViewPager.DataSource({
        pageHasChanged: (p1, p2) => p1 !== p2,
      });

      this.state = {dataSource: dataSource.cloneWithPages(bannerData)};
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
        </View>
      );
    }


    _renderPage(
      data: Object,
      pageID: number | string,) {
      return (
        <TouchableHighlight
          style={styles.page}
          underlayColor='#c8c7cc'
          onPress={() => this.props.onPressBanner(data)}
        >

          <Image
            source={{uri: data.pic_url}}
            style={styles.page}
            />

        </TouchableHighlight>

      );
  }


}
