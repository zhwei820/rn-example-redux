'use strict'

import React from 'react';
import {
  Dimensions,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';

import Colors from '../constant/Colors.js';
import GridItem from '../component/gridItem';
import api from '../constant/Network.js';
// import OfficeTemplateListContainer from '../containers/OfficeTemplateListContainer'
import {fetchOffice} from '../reducers/tabOffice/tabOfficeAction';
// import TaskListContainer from '../containers/TaskListContainer'
import {OFFICE_CREATED, OFFICE_IAPPROVALLIST, SEARCH_AGENT_URL} from '../constant/Network';
import { connect } from 'react-redux';

const WIDTH = Dimensions.get('window').width;
const ITEM_HEIGHT = Dimensions.get('window').width / 3 - 11;
const ITEM_ICON = ITEM_HEIGHT * 0.6;
const top = Platform.OS === 'ios' ? 20 : 0;

var gridItems;

export default class OfficeTab extends React.Component {
  constructor(props){
      super(props);
      this.onCreated = this.onCreated.bind(this);
      this.onApproval = this.onApproval.bind(this);
      this.onProxy = this.onProxy.bind(this);
  }

  componentWillReceiveProps(nextProps){
    let tabOffice = nextProps.tabOffice;
    if(tabOffice.isFetched && tabOffice.officeItemData)
      gridItems = tabOffice.officeItemData.map((row)=>{
        return <GridItem row={row} onClick={
            this.onItemClick.bind(this, row)
          }/>
      });
  }

  componentDidMount() {
    const {tabOffice} = this.props;
    if(tabOffice.officeItemData) {
      gridItems = tabOffice.officeItemData.map((row)=>{
        return <GridItem row={row} onClick={
            this.onItemClick.bind(this, row)
          }/>
      });
    }
    this.fetchOfficeItem();
  }

  fetchOfficeItem() {
    const {dispatch} = this.props;
    dispatch(fetchOffice());
  }

  render() {
    const {tabOffice} = this.props;
    return(
      <View style={styles.background}>
        <View style={[styles.mainBack, {marginTop: top}]}>
          <Image style={styles.mainBack,{  height: 200,} }
          source={require('../img/office/office_bg.jpg')}>
            <View style ={styles.topBg}>

              <TouchableOpacity  onPress={this.onCreated}>
                <View style={styles.topItem}>
                  <Image style={styles.itemIcon} source={require('../img/office/office_sq.png')}/>
                  <Text style={[styles.itemText,{color: '#FFFFFF'},{backgroundColor:'transparent'},]}>我的申请</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.onApproval}>
                <View style={styles.topItem} >
                  <Image style={styles.itemIcon} source={require('../img/office/office_sp.png')}/>
                  <Text style={[styles.itemText,{color: '#FFFFFF'},{backgroundColor:'transparent'},]}>已办任务</Text>
                </View>
              </TouchableOpacity >

              <TouchableOpacity onPress={this.onProxy}>
                <View style={styles.topItem} >
                  <Image style={styles.itemIcon} source={require('../img/office/office_proxy.png')}/>
                  <Text style={[styles.itemText,{color: '#FFFFFF'},{backgroundColor:'transparent'},]}>代理任务</Text>
                </View>
              </TouchableOpacity >

            </View>
          </Image>
        </View>
        <ScrollView>
          <View style={styles.scrollBg}>
            {gridItems}
          </View>
        </ScrollView>
      </View>
    );
  }

  onItemClick(templateOption) {
    if(templateOption.id == 25) {
      Alert.alert('', '功能研发中，敬请期待！', [ {text: '确定', onPress: ()=>{}}]);
      return;
    }
    const {navigator} = this.props;
    // navigator.push({
    //   name: 'officeTemplateList',
    //   templateOption: templateOption,
    //   component: OfficeTemplateListContainer,
    // });
  }

  onCreated() {
    const {navigator} = this.props;
    // navigator.push({
    //   name: "TaskListContainer",
    //   component: TaskListContainer,
    //   url: OFFICE_CREATED,
    //   navBarTitle: "我的申请",
    // });
  }

  onApproval() {
    const {navigator} = this.props;
    // navigator.push({
    //   name: "TaskListContainer",
    //   component: TaskListContainer,
    //   url: OFFICE_IAPPROVALLIST,
    //   navBarTitle: "已办任务",
    // });
  }

  onProxy() {
    const {navigator} = this.props;
    // navigator.push({
    //   name: "TaskListContainer",
    //   component: TaskListContainer,
    //   url: SEARCH_AGENT_URL,
    //   navBarTitle: "代理任务",
    // });
  }
};

var styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#EFEFF4',
  },
  mainBack: {
    height: 200,
    elevation: 5,
  },
  topBg: {
    flex: 1,
    width: WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  topItem: {
    width: ITEM_HEIGHT,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  itemIcon: {
    width: ITEM_ICON,
    height: ITEM_ICON,
  },
  itemText: {
  },
  scrollBg: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});



function mapStateToProps(state) {
  const {tabOffice} = state;
  return {
    tabOffice,
  }
}

export default connect(mapStateToProps)(OfficeTab);
