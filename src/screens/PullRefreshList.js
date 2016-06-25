import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  TouchableHighlight,
  ScrollView,
  ListView,
  RefreshControl
} from 'react-native';
import { connect } from 'react-redux';

var GiftedListView = require('../../diy/react-native-gifted-listview/GiftedListView');
var GiftedSpinner = require('react-native-gifted-spinner');

import ProductListRow from '../components/ProductListRow';

import Banner from '../components/Banner';
import ParallaxScrollView from '../../diy/react-native-gifted-listview/tmp';


import RefreshList from '../components/RefreshList';

class PullRefreshList extends Component {

  static navigatorStyle = {
    statusBarColor: '#303F9F',
    toolBarColor: '#3F51B5',
    navigationBarColor: '#303F9F',
    tabSelectedTextColor: '#FFA000',
    tabNormalTextColor: '#FFC107',
    tabIndicatorColor: '#FF4081'
  };

   getRowData = () => {
    let tmp = [
        {
            "roundId": 37509,
            "description": "全网通 唯一的不同，就是处处不同 ",
            "weight": 18000,
            "price": 648000,
            "newPricePerUnit": 100,
            "listImage": "http://img-cdn.duo17.com/onedata/product/dd899cb2ab0a50fef1f5bce15ddaa15f.jpg",
            "proId": 10,
            "proLatestProgress": 4454,
            "proProgress": 4454,
            "ctime": "2016-06-19 20:50:37",
            "title": "苹果iPhone6s 64G 颜色随机",
            "pricePerUnit": 100,
            "longRoundId": "60619",
            "longProId": "03005",
            "categoryId": 3
        },
        {
            "roundId": 37508,
            "description": "全网通 唯一的不同，就是处处不同 ",
            "weight": 17900,
            "price": 728000,
            "newPricePerUnit": 100,
            "listImage": "http://img-cdn.duo17.com/onedata/product/9fb97c0e3d80f44bb3a25847fae68e6a.jpg",
            "proId": 12,
            "proLatestProgress": 5247,
            "proProgress": 5247,
            "ctime": "2016-06-19 20:50:20",
            "title": "苹果iPhone6s plus 64G 颜色随机",
            "pricePerUnit": 100,
            "longRoundId": "60619",
            "longProId": "03007",
            "categoryId": 3
        },
        {
            "roundId": 37532,
            "description": "具有更强大性能，更卓越的便携性，暂时无法预估发货时间",
            "weight": 17800,
            "price": 498800,
            "newPricePerUnit": 100,
            "listImage": "http://img-cdn.duo17.com/onedata/product/9a17503b424fc5fb053dceb6dc1e33fe.jpg",
            "proId": 76,
            "proLatestProgress": 3144,
            "proProgress": 3144,
            "ctime": "2016-06-19 21:10:07",
            "title": "苹果ipad pro 32G 颜色随机",
            "pricePerUnit": 100,
            "longRoundId": "60619",
            "longProId": "04010",
            "categoryId": 3
        },
        {
            "roundId": 37510,
            "description": "全网通 唯一的不同，就是处处不同 ",
            "weight": 17700,
            "price": 809000,
            "newPricePerUnit": 100,
            "listImage": "http://img-cdn.duo17.com/onedata/product/95f5a44044d39598bd24ce8b69ad0b5f.jpg",
            "proId": 11,
            "proLatestProgress": 4527,
            "proProgress": 4527,
            "ctime": "2016-06-19 20:59:05",
            "title": "苹果iPhone6s plus 128G 颜色随机",
            "pricePerUnit": 100,
            "longRoundId": "60619",
            "longProId": "03006",
            "categoryId": 3
        },
        {
            "roundId": 37530,
            "description": "全网通 唯一的不同，就是处处不同 ",
            "weight": 17600,
            "price": 728000,
            "newPricePerUnit": 100,
            "listImage": "http://img-cdn.duo17.com/onedata/product/c196c831881315e969c6073f3b2ed9a7.jpg",
            "proId": 9,
            "proLatestProgress": 2687,
            "proProgress": 2687,
            "ctime": "2016-06-19 21:07:19",
            "title": "Apple iPhone6s 128G（颜色随机）",
            "pricePerUnit": 100,
            "longRoundId": "60619",
            "longProId": "03004",
            "categoryId": 3
        },
        {
            "roundId": 37451,
            "description": "壳薄易剥，美味轻松享！颗颗香醇！",
            "weight": 17508,
            "price": 3500,
            "newPricePerUnit": 100,
            "listImage": "http://img-cdn.duo17.com/onedata/product/fd979783c7318e1d5f41855286627913.jpg",
            "proId": 256,
            "proLatestProgress": 0,
            "proProgress": 17,
            "ctime": "2016-06-19 19:25:11",
            "title": "良品铺子 坚果炒货干果 奶香巴旦木238g",
            "pricePerUnit": 100,
            "longRoundId": "60619",
            "longProId": "09006",
            "categoryId": 9
        },
        {
            "roundId": 37459,
            "description": "皇家御用 纯正黄油，口感香甜",
            "weight": 17506,
            "price": 13900,
            "newPricePerUnit": 100,
            "listImage": "http://img-cdn.duo17.com/onedata/product/3fae0bd584a78474763764bcf5696687.jpg",
            "proId": 252,
            "proLatestProgress": 0,
            "proProgress": 87,
            "ctime": "2016-06-19 19:37:48",
            "title": "丹麦进口 Kjeldsens 蓝罐曲奇礼盒 908g 盒装",
            "pricePerUnit": 100,
            "longRoundId": "60619",
            "longProId": "01034",
            "categoryId": 9
        },
        {
            "roundId": 37444,
            "description": "8种美味组合，健康有营养 送礼专属礼盒！",
            "weight": 17505,
            "price": 15900,
            "newPricePerUnit": 100,
            "listImage": "http://img-cdn.duo17.com/onedata/product/40922040358902767249016ae79ae018.jpg",
            "proId": 254,
            "proLatestProgress": 0,
            "proProgress": 40,
            "ctime": "2016-06-19 19:10:45",
            "title": "百草味 零食纷享包996g 坚果礼盒8包干果零食大礼包",
            "pricePerUnit": 100,
            "longRoundId": "60619",
            "longProId": "09004",
            "categoryId": 9
        },
        {
            "roundId": 37379,
            "description": "进口夏威夷果，漂洋过海只“喂”你",
            "weight": 17504,
            "price": 3500,
            "newPricePerUnit": 100,
            "listImage": "http://img-cdn.duo17.com/onedata/product/d952d4c092d063803b9c3691569a47ae.jpg",
            "proId": 255,
            "proLatestProgress": 0,
            "proProgress": 32,
            "ctime": "2016-06-19 17:21:12",
            "title": "良品铺子 坚果炒货干果 奶香夏威夷果280g",
            "pricePerUnit": 100,
            "longRoundId": "60619",
            "longProId": "09005",
            "categoryId": 9
        },
        {
            "roundId": 37412,
            "description": "畅饮可乐，共赏欧洲杯！",
            "weight": 17503,
            "price": 6900,
            "newPricePerUnit": 100,
            "listImage": "http://img-cdn.duo17.com/onedata/product/2a6bb73a2d82a2636afaf328edf73a2d.jpg",
            "proId": 262,
            "proLatestProgress": 0,
            "proProgress": 56,
            "ctime": "2016-06-19 18:11:20",
            "title": "欧洲杯可口可乐330ml*24听 整箱装",
            "pricePerUnit": 100,
            "longRoundId": "60619",
            "longProId": "09008",
            "categoryId": 9
        }
    ];
    let data = [];
    let item = [];
    for (var i = 0; i < tmp.length; i++) {
      if(i % 2 == 0 && i != tmp.length - 1){
        item.push(tmp[i]);
      }else if(i % 2 != 0) {
        item.push(tmp[i]);
        data.push(item);
        item = [];
      }else if (i % 2 == 0 && i == tmp.length - 1) {
        item.push(tmp[i]);
        item.push({});
        data.push(item);
      }
    }
    return data;

   }

  _onRefresh = (page = 1, callback, options) => {
    setTimeout(() => {
      let rows = this.getRowData();

      const dataSource = rows.concat(this.state.dataSource);
      this.setState({
            loaded: this.state.loaded + 10,
            isRefreshing: false,
            dataSource: dataSource,
          });

    }, 1000); // simulating network fetching

  }


  /**
   * When a row is touched
   * @param {object} rowData Row data
   */
  _onPress = (rowData) => {
    this.props.navigator.pop();
  }

  _onPressBanner = (url) => {
    this.props.navigator.pop();

  }

  /**
   * Render a row
   * @param {object} rowData Row data
   */
  _renderRowView = (rowData) => {
    return (

      <ProductListRow
        rowData={rowData}
        onPress={this._onPress}
      >
      </ProductListRow>
    );
  }

  constructor(props){
    super(props);
    let ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {dataSource: ds.cloneWithRows(this.getRowData())};

  }

  /**
   * Render a separator between rows
   */
  _renderSeparatorView = () => {
    return (
      <View style={customStyles.separator} />
    );
  }

  render() {
    return (
      <RefreshList></RefreshList>
    );
  }

};



var customStyles = {
  separator: {
    height: 1,
    backgroundColor: 'transparent'
  },
  refreshableView: {
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsLabel: {
    fontSize: 20,
    color: '#007aff',
  },
  paginationView: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  defaultView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  defaultViewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  row: {
    padding: 10,
    height: 44,
  },
  header: {
    backgroundColor: '#50a4ff',
    padding: 10,
  },
  headerTitle: {
    color: '#fff',
  },
};

var screenStyles = {
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  navBar: {
    height: 64,
    backgroundColor: '#007aff',

    justifyContent: 'center',
    alignItems: 'center',
  },
  navBarTitle: {
    color: '#fff',
    fontSize: 16,
    marginTop: 12,
  }
};

function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

export default connect(mapStateToProps)(PullRefreshList);
