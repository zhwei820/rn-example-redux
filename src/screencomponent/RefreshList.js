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
  InteractionManager
} from 'react-native';

import Platform from 'Platform';
var GiftedSpinner = require('react-native-gifted-spinner');
var store = require('react-native-simple-store');

//回到顶部组件
import ScrollTopView from '../../diy/react-native-scrolltotop/';
import ProductListRow from '../component/ProductListRow';
import Banner from '../component/Banner';

import {APIS, OPTIONS} from '../constant/globals'
import {queryUserInfo} from '../helper/storage'

var STORAGE_KEY = '@AsyncStorageExample:key';

import {fetchProducts} from '../reducers/prolist/actions';


// small helper function which merged two objects into one
function MergeRecursive(obj1, obj2) {
  if(obj2){
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
  }
  return obj1;
}

export default class RefreshList extends Component {


    getUrl = (Para) => {
      let queryExtra = '&last_round_id=' + (Para[1] ? Para[1] : 0) + '&last_weight=' + (Para[2] ? Para[2] : 0);

      url = OPTIONS.API_URL + APIS[Para[0]] + '?uid=44248888&app_version=1.9.4.2&os_type=android&channel=share' + queryExtra;
      return url;

      if(queryUserInfo){
        url = OPTIONS.API_URL + APIS[Para[0]] + queryUserInfo + queryExtra;
        return url;
      }else {
        url = OPTIONS.API_URL + APIS[Para[0]] + '?uid=44248888&app_version=1.9.4.2&os_type=android&channel=share' + queryExtra;
        return url;
      }
    }

    _setPage(page) { this._page = page; }
    _getPage() { return this._page; }

    componentWillMount() {
      InteractionManager.runAfterInteractions(() => {

        const {dispatch, proListReducer} = this.props;
        let url = this.getUrl(['list_pro_common', proListReducer._last_round_id, proListReducer._last_weight]);
        if(url){
          dispatch(fetchProducts(url));
        }
      }
    )
      }


  constructor(props) {
    super(props);
    this._setPage(1);

    this.state = {
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        //
        // // 排序视图Y值
        // sortTypeViewY: new Animated.Value(0),
        // // 排序三角角度
        // angleRotation: new Animated.Value(0),
        // // 遮盖层透明度
        // coverViewOpacity: new Animated.Value(0),
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
    const {proListReducer} = this.props;

    return (
      <ListView
        style={styles.listview}
        dataSource={this.state.dataSource.cloneWithRows(proListReducer.productList)}
        renderRow={this._renderRowView}
        onEndReachedThreshold = {10}
        ref="listview"
        onScroll={(e)=>this._onScroll(e)}
        onEndReached={this._onPaginate}

        renderScrollComponent={props => {
          return (
                <Banner {...this.props} {...props} >
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
