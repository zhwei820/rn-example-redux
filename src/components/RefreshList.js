/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  ListView,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  AsyncStorage,
} from 'react-native';

import Platform from 'Platform';

//回到顶部组件
import ScrollTopView from '../../diy/react-native-scrolltotop/';
import ProductListRow from './ProductListRow';
import Banner from './Banner';
var GiftedSpinner = require('react-native-gifted-spinner');
var store = require('react-native-simple-store');

import {APIS, OPTIONS} from '../constant/globals'
import {queryUserInfo} from '../helper/storage'

var STORAGE_KEY = '@AsyncStorageExample:key';

// small helper function which merged two objects into one
function MergeRecursive(obj1, obj2) {
  for (var p in obj2) {
    try {
      if ( obj2[p].constructor==Object ) {
        obj1[p] = MergeRecursive(obj1[p], obj2[p]);
      } else {
        obj1[p] = obj2[p];
      }
    } catch(e) {
      obj1[p] = obj2[p];
    }
  }
  return obj1;
}

export default class RefreshList extends Component {

  getUrl = (Para) => {
    let url = OPTIONS.API_URL + APIS[Para[0]] + queryUserInfo + '&last_round_id=' + (Para[1] ? Para[1] : 0) + '&last_weight=' + (Para[2] ? Para[2] : 0);
    console.log(url);
    return url;
  }

  async getRowData(last_round_id = 0, last_weight = 0) {
    try {
      console.log('getRowData');
      console.log(last_round_id);
      console.log(last_weight);
      let response = await fetch(this.getUrl(['list_pro_common', last_round_id, last_weight]));
      let responseJson = await response.json();

      let data = [];
      let item = [];
      let _last_round_id = 10000000;
      let _last_weight = 10000000;
      if(!responseJson.data){
        return [];
      }
      for (var i = 0; i < responseJson.data.length; i++) {
        if(_last_round_id > responseJson.data[i].roundId){
          _last_round_id = responseJson.data[i].roundId;
        }
        if(_last_weight > responseJson.data[i].weight){
          _last_weight = responseJson.data[i].weight;
        }
        if(i % 2 == 0 && i != responseJson.data.length - 1){
          item.push(responseJson.data[i]);
        }else if(i % 2 != 0) {
          item.push(responseJson.data[i]);
          data.push(item);
          item = [];
        }else if (i % 2 == 0 && i == responseJson.data.length - 1) {
          item.push(tmp[i]);
          item.push({});
          data.push(item);
        }
      }
      console.log(_last_round_id);

      this._setLastRoundId(_last_round_id);
      console.log(this._getLastRoundId());
      this._setLastWeight(_last_weight);
      return data;
    } catch(error) {
      // Handle error
      console.warn(error);
    }
  }

  _setLastWeight(last_weight) { this._last_weight = last_weight; }
  _getLastWeight() { return this._last_weight; }

  _setLastRoundId(last_round_id) { this._last_round_id = last_round_id; }
  _getLastRoundId() { return this._last_round_id; }

  _setPage(page) { this._page = page; }
  _getPage() { return this._page; }
  _setRows(rows) { this._rows = rows; }
  _getRows() { return this._rows; }

  async _loadInitialState() {  // 第一个分页
      try {
        this._setLastRoundId(0);
        this._setLastWeight(0);
        this._setPage(1);
        let firstSection = await this.getRowData();
        this._setRows([firstSection]);

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2,
          sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
        });

        this.setState({dataSource: ds.cloneWithRowsAndSections(this._getRows())});
        store.save(STORAGE_KEY, firstSection)
      } catch (error) {
        console.warn("exception");
      }
    }
  componentDidMount() {
      this._loadInitialState().done();
    }

  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
    });

    store.get(STORAGE_KEY)
      .then(firstSection => {
        if (firstSection !== null){
          this.setState({dataSource: this.ds.cloneWithRowsAndSections([firstSection])});
        } else {
          console.warn("error");
        }
      })

    this.state = {
      dataSource: this.ds.cloneWithRowsAndSections([]),
      isShowToTop: false,
      isReFresh: false,
      paginationStatus: 'waiting'
    };
  }

  async _onFetch(page = 1, callback, options){
      var rows = {};
      rows[page] = await this.getRowData(this._getLastRoundId(), this._getLastWeight());
      if (page === 100) {
        callback(rows, {
          allLoaded: true, // the end of the list is reached
        });
      } else {
        callback(rows);
      }
  }

    _onRefresh = (options = {}) => {
        this.setState({
          isReFresh: true,})
        this._setLastRoundId(0);
        this._setLastWeight(0);
        this._setPage(1);
        this._onFetch(this._getPage(), this._postRefresh, options);
    }

    _postRefresh = (rows = [], options = {}) => {
        this._updateRows(rows, options);
    }

    _onPaginate = () => {
      if(this.state.paginationStatus==='allLoaded'){
        return null
      }else {
        this.setState({
          paginationStatus: 'fetching',
        });
        this._onFetch(this._getPage() + 1, this._postPaginate, {});
      }
    }

    _postPaginate = (rows = [], options = {}) => {
      this._setPage(this._getPage() + 1);
      var mergedRows = null;
      mergedRows = MergeRecursive(this._getRows(), rows);
      this._updateRows(mergedRows, options);
    }

    _updateRows = (rows = [], options = {}) => {
      this._setRows(rows);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRowsAndSections(rows),
          isReFresh: false,
          paginationStatus: (options.allLoaded === true ? 'allLoaded' : 'waiting'),
        });

    }

    paginationFetchingView = () => {

      return (
        <View style={[this.defaultStyles.paginationView]}>
          <GiftedSpinner />
        </View>
      );
    }
    paginationAllLoadedView = () => {

      return (
        <View style={[this.defaultStyles.paginationView]}>
          <Text style={[this.defaultStyles.actionsLabel]}>
            ~
          </Text>
        </View>
      );
    }
    paginationWaitingView = () => {

      return (
        <View style={[this.defaultStyles.paginationView]}>
          <Text style={[this.defaultStyles.actionsLabel]}>
            上拉加载更多
          </Text>
        </View>
      );
    }
    emptyView = (refreshCallback) => {

      return (
        <View style={[this.defaultStyles.defaultView]}>
          <Text style={[this.defaultStyles.defaultViewTitle]}>
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

  _renderPaginationView = () => {
    if ((this.state.paginationStatus === 'fetching')) {
      return this.paginationFetchingView();
    } else if (this.state.paginationStatus === 'allLoaded') {
      return this.paginationAllLoadedView();
    } else if (this.state.paginationStatus === 'waiting') {
      return this.paginationWaitingView();
    } else if (this._getRows().length === 0) {
      return this.emptyView(this._onRefresh);
    } else {
      return null;
    }
  }

  _renderRowView = (rowData) => {
    return (
      <ProductListRow
        rowData={rowData}
        onPress={this.props.onPress}
      >
      </ProductListRow>
    );
  }

  _listView = () => {
    /*
     * android，ios都使用原生下拉刷新组件：
     */
    return (
      <ListView
        style={styles.listview}
        dataSource={this.state.dataSource}
        renderRow={this._renderRowView}
        renderFooter={this._renderPaginationView}
        onEndReachedThreshold = {10}
        ref="listview"
        onScroll={(e)=>this._onScroll(e)}
        onEndReached={this._onPaginate}

        renderScrollComponent={props => {
          return (
                <Banner onPressBanner={this.props.onPressBanner} {...this.props} {...props} >
                </Banner>
              )
        }}

        refreshControl={
            <RefreshControl
                refreshing={this.state.isReFresh}
                onRefresh={this._onRefresh}
                colors={['#ffffff', '#ffffff', '#ffffff']}
                progressBackgroundColor="#0000E3"/>
        }/>
    );
  }

  render() {
    let listView = this._listView();
    return (
      <View style={{flex:1}}>

        {listView}
        {this.state.isShowToTop ? <ScrollTopView root={this} ></ScrollTopView>:null}
      </View>
    );
  }

  _onScroll(e) {
    var offsetY = e.nativeEvent.contentOffset.y;

    if(offsetY > 100) {
        this.setState({
            isShowToTop: true
        })
    } else {
        this.setState({
            isShowToTop: false
        })
    }
  }

  rowRender(data) {
    return (
      <View style={styles.container}>
        <Text>{data}</Text>
      </View>
    );
  }

  defaultStyles = {
    separator: {
      height: 1,
      backgroundColor: '#CCC'
    },
    actionsLabel: {
      fontSize: 10,
    },
    paginationView: {
      height: 44,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
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
  }

}

const styles = StyleSheet.create({
  header: {
    height : 50,
    paddingTop:15,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor : '#FFFFFF'
  },
  headerText: {
    color: '#ffffff'
  },
  container: {
    flex: 1,
    height:74,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#cccccc',
  },
  listview: {
    backgroundColor : '#FFFFFF'

  }
});
