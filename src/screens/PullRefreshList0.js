import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';

// var React = require('react');
// var {
//   StyleSheet,
//   Text,
//   View,
//   TouchableHighlight,
//   Platform
// } = require('react-native');

var GiftedListView = require('../../diy/react-native-gifted-listview/GiftedListView');
var GiftedSpinner = require('react-native-gifted-spinner');

import ProductListRow from '../components/ProductListRow';

import Banner from '../components/Banner';

class PullRefreshList extends Component {

  static navigatorStyle = {
    statusBarColor: '#303F9F',
    toolBarColor: '#3F51B5',
    navigationBarColor: '#303F9F',
    tabSelectedTextColor: '#FFA000',
    tabNormalTextColor: '#FFC107',
    tabIndicatorColor: '#FF4081'
  };

  /**
   * Will be called when refreshing
   * Should be replaced by your own logic
   * @param {number} page Requested page to fetch
   * @param {function} callback Should pass the rows
   * @param {object} options Inform if first load
   */
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

  _onFetch = (page = 1, callback, options) => {
    setTimeout(() => {
      var rows = {};
      rows[page] = this.getRowData();
      if (page === 100) {
        callback(rows, {
          allLoaded: true, // the end of the list is reached
        });
      } else {
        callback(rows);
      }
    }, 1000); // simulating network fetching
  }


  /**
   * When a row is touched
   * @param {object} rowData Row data
   */
  _onPress = (rowData) => {
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

  /**
   * Render a row
   * @param {object} rowData Row data
   */
  // _renderSectionHeaderView = (sectionData, sectionID) => {
  //   return (
  //     <View style={customStyles.header}>
  //       <Text style={customStyles.headerTitle}>
  //         {sectionID}
  //       </Text>
  //     </View>
  //   );
  // }

  /**
   * Render the refreshable view when waiting for refresh
   * On Android, the view should be touchable to trigger the refreshCallback
   * @param {function} refreshCallback The function to call to refresh the listview
   */
  _renderRefreshableWaitingView = (refreshCallback) => {
    if (Platform.OS !== 'android') {
      return (
        <View style={customStyles.refreshableView}>
          <Text style={customStyles.actionsLabel}>
            ↓
          </Text>
        </View>
      );
    } else {
      return (
        <TouchableHighlight
          underlayColor='#c8c7cc'
          onPress={refreshCallback}
          style={customStyles.refreshableView}
        >
          <Text style={customStyles.actionsLabel}>
            ↻
          </Text>
        </TouchableHighlight>
      );
    }
  }

  /**
   * Render the refreshable view when the pull to refresh has been activated
   * @platform ios
   */
  _renderRefreshableWillRefreshView = () => {
    return (
      <View style={customStyles.refreshableView}>
        <Text style={customStyles.actionsLabel}>
          ↻
        </Text>
      </View>
    );
  }

  /**
   * Render the refreshable view when fetching
   */
  _renderRefreshableFetchingView = () => {
    return (
      <View style={customStyles.refreshableView}>
        <GiftedSpinner />
      </View>
    );
  }

  /**
   * Render the pagination view when waiting for touch
   * @param {function} paginateCallback The function to call to load more rows
   */
  _renderPaginationWaitingView = (paginateCallback) => {
    return (
      <TouchableHighlight
        underlayColor='#c8c7cc'
        onPress={paginateCallback}
        style={customStyles.paginationView}
      >
        <Text style={[customStyles.actionsLabel, {fontSize: 13}]}>
          Load more
        </Text>
      </TouchableHighlight>
    );
  }

  /**
   * Render the pagination view when fetching
   */
  _renderPaginationFetchigView = () => {
    return (
      <View style={customStyles.paginationView}>
        <GiftedSpinner />
      </View>
    );
  }

  /**
   * Render the pagination view when end of list is reached
   */
  _renderPaginationAllLoadedView = () => {
    return (
      <View style={customStyles.paginationView}>
        <Text style={customStyles.actionsLabel}>
          ~
        </Text>
      </View>
    );
  }

  /**
   * Render a view when there is no row to display at the first fetch
   * @param {function} refreshCallback The function to call to refresh the listview
   */
  _renderEmptyView = (refreshCallback) => {
    return (
      <View style={customStyles.defaultView}>
        <Text style={customStyles.defaultViewTitle}>
          Sorry, there is no content to display
        </Text>

        <TouchableHighlight
          underlayColor='#c8c7cc'
          onPress={refreshCallback}
        >
          <Text>
            ↻
          </Text>
        </TouchableHighlight>
      </View>
    );
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
      <ScrollView style={screenStyles.container}>
        <Banner onPressBanner={this.props._onPressBanner}>
        </Banner>

        <GiftedListView
          rowView={this._renderRowView}

          onFetch={this._onFetch}
          initialListSize={12} // the maximum number of rows displayable without scrolling (height of the listview / height of row)

          firstLoader={true} // display a loader for the first fetching

          pagination={true} // enable infinite scrolling using touch to load more
          paginationFetchigView={this._renderPaginationFetchigView}
          paginationAllLoadedView={this._renderPaginationAllLoadedView}
          paginationWaitingView={this._renderPaginationFetchigView}

          refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
          refreshableViewHeight={50} // correct height is mandatory
          refreshableDistance={40} // the distance to trigger the pull-to-refresh - better to have it lower than refreshableViewHeight
          refreshableFetchingView={this._renderRefreshableFetchingView}
          refreshableWillRefreshView={this._renderRefreshableWillRefreshView}
          refreshableWaitingView={this._renderRefreshableWaitingView}

          emptyView={this._renderEmptyView}

          renderSeparator={this._renderSeparatorView}

          withSections={true} // enable sections
          sectionHeaderView={this._renderSeparatorView}

          PullToRefreshViewAndroidProps={{
            colors: ['#fff'],
            progressBackgroundColor: '#003e82',
          }}

        />
      </ScrollView>
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
