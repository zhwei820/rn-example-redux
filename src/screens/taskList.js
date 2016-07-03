'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  ListView,
  Alert,
  Picker,
  TextInput,
  TouchableOpacity,
  Modal,
  Dimensions,
  Platform,
  Image,
} from 'react-native';

import Colors from '../constant/Colors';
// import NavigationBar from '../component/ZqOfficeNavigationBar';
import PostCell from "../component/postCell/TodoPostCell";
import {fetchTaskList} from '../reducers/taskList/taskListAction';
// import TaskDetailContainer from '../containers/TaskDetailContainer';
import Spinner from '../lib/react-native-loading-spinner-overlay';
import {startHandleTimeConsuming, stopHandleTimeConsuming} from '../reducers/timeConsuming/timeConsumingAction';
// import * as types from '../constant/NavigatorTypes';
import {showAlert} from '../utils/RequestUtils';
import LoadMoreFooter from '../component/LoadMoreFooter';
import { connect } from 'react-redux';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

var title;
var selectItem;
var page = 1;
var canLoadMore = true;
var onEndReach = false;

class TaskList extends React.Component {
  constructor(props) {
    super(props);

    this.onLeftBack = this.onLeftBack.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onScroll = this.onScroll.bind(this);

    this.state = {
      searchId: '',
      searchTitle: '',
      showModel: false,
      selectedValue:'全部',
      isSelect: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }

  componentWillReceiveProps(nextProps) {
    const {taskList} = nextProps;
    if(taskList.taskListFetched){
      canLoadMore = true;
      // nextProps.dispatch(stopHandleTimeConsuming());
      if(taskList.error){
        // showAlert(taskList.error);
      }
    }
  }

  componentWillMount() {
    this.setState({
      searchId: '',
      searchTitle: '',
    });
    selectItem = '';
  }

  componentDidMount() {
    const {dispatch, route, login, navigator} = this.props;
    if(
      // Platform.OS == 'ios' &&
      login.rawData) {
      page = 1;
      canLoadMore = false;
      onEndReach = false;
      dispatch(fetchTaskList(this.props.url + 'userId=', login.rawData.userId, this.state.searchId, this.state.searchTitle, '', page));
      // dispatch(startHandleTimeConsuming());
    }

    // this.didFocusSubscription = navigator.navigationContext.addListener('willfocus', (event) => {
    //   if(event.data.route.name == 'TaskListContainer' && event.data.route.type == types.TASK_LIST_NORMAL)
    //     if(login.rawData) {
    //       page = 1;
    //       canLoadMore = false;
    //       onEndReach = false;
    //       dispatch(fetchTaskList(this.props.url + 'userId=', login.rawData.userId, this.state.searchId, this.state.searchTitle, '', page));
    //       dispatch(startHandleTimeConsuming());
    //     }
    // });
    // title = route.navBarTitle;
  }

  componentWillUnmount() {
    page = 1;
    // this.didFocusSubscription.remove();
  }

  renderSelect(){
    if(Platform.OS == 'ios') {
      return(
        <View>
          <TouchableOpacity onPress = {()=>{this.setState({showModel: true})}} style={{alignItems:'center', marginTop:10}}>
            <Text style={{textAlign:'center'}}>
              {this.state.selectedValue}
            </Text>
          </TouchableOpacity>
        </View>)
    } else {
      return(this.renderPick())

    }
  }

  renderPick(){
    const {taskList, login, route, dispatch} = this.props;
    let searchArr = [];
    let itemAll = {};
    itemAll.id = '';
    itemAll.name = '全部';
    searchArr.push(itemAll);
    Array.prototype.push.apply(searchArr, taskList.taskSearchList);
    return(
      <Picker
        style={styles.picker}
        mode="dropdown"
        selectedValue={this.state.searchId}
        itemStyle={{backgroundColor:'#fdfcf5',}}
        onValueChange={(id) => {
          for (var i = 0; i < searchArr.length; i++) {
            if (searchArr[i].id == id) {
                this.setState({selectedValue: searchArr[i].name,});
            }
          }
          page = 1;
          canLoadMore = false;
          onEndReach = false;
          dispatch(fetchTaskList(this.props.url + 'userId=', login.rawData.userId, id, '', '', page));
          dispatch(startHandleTimeConsuming());
          this.setState({searchId: id, isSelect:true});
        }}>
        {searchArr.map(function(row) {
          return <Picker.Item label={row.name} value={row.id} />
        })}
      </Picker>
    )
  }

  renderModel() {
    return(
      <Modal visible={this.state.showModel} transparent = {true}>
        <View style={{backgroundColor:'rgba(0, 0, 0, 0.5)', height:deviceHeight, width: deviceWidth,}}>
          <View style={styles.modelStyle}>
            <View style={styles.calendarContainer}>
              <Text style={styles.textStyle}>请选择类型</Text>
              <View style={{flex:1, justifyContent: 'center',}}>
              {this.renderPick()}
              </View>
              <View style={styles.calendar}>
              <TouchableOpacity style={styles.button} onPress={this.passSelectDate.bind(this)} >
                  <Text style={styles.buttonText}>取 消</Text>
              </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={this.cancel.bind(this)}>
                    <Text style={styles.buttonText}>确 定</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  renderItem(post) {
    const {route} = this.props;
    return (<PostCell post={post} type={route.navBarTitle} onSelect={this.onPress.bind(this, post)}/>);
  }

  renderFooter() {
    const {taskList} = this.props;
    if (taskList.taskListFetchingMore) {
      return <LoadMoreFooter />
    }
  }

  renderListView() {
    const {taskList} = this.props;
    if(taskList.taskListData.length <= 0) {
      return (
        <View style={{height: deviceHeight - 250, alignItems: 'center', justifyContent: 'center'}}>
          <Image source={require('../img/icon/app_panel_expression_icon.png')} style={{width: 120, height: 120,}}/>
          <Text style={{textAlign:'center', fontSize: 15, color: Colors.grey,}}>当前没有对应数据～</Text>
        </View>
      )
    } else {
       return (
        <ListView
        dataSource={this.state.dataSource.cloneWithRows(taskList.taskListData)}
        renderRow={this.renderItem}
        onScroll={this.onScroll}
        onEndReached={this.onEndReach.bind(this)}
        onEndReachedThreshold={10}
        renderFooter={this.renderFooter.bind(this)}
        style={styles.postsListView}/>
      )
    }
  }

  render() {
    const {taskList, login, route, dispatch} = this.props;
    return(
       <View style={styles.container}>
         <View style={styles.searchContainer}>
           <View style={styles.searchInputContainer}>
             <View style={styles.pickerContainer}>
             {this.renderSelect()}
             </View>
             <View style={styles.textInputContainer}>
               <TextInput
                 style={styles.textInput}
                 placeholder='请输入标题关键字搜索...'
                 onChangeText={(searchTitle) => {this.setState({searchTitle: searchTitle});}}
                 returnKeyType={'search'}/>
             </View>
           </View>
         </View>
         {this.renderListView()}

         {this.renderModel()}
       </View>
    );
  }

  onPress(post) {
    const {navigator, route} = this.props;
    let type = (route.navBarTitle == '待办') ? 'approval' : 'detail';
      navigator.push({
        name: "TaskDetail",
        component: TaskDetailContainer,
        processInstanceId: post.processInstanceId,
        taskId: post.taskId,
        processNo: post.processNo,
        processTitle: post.processTitle,
        type: type,
    });
  }

  onLeftBack() {
    const {navigator} = this.props;
    navigator.pop();
  }

  onSearch() {
    const {dispatch, route, login} = this.props;
    const dismissKeyboard = require('dismissKeyboard');
    dismissKeyboard();
    page = 1;
    canLoadMore = false;
    onEndReach = false;
    dispatch(fetchTaskList(this.props.url + 'userId=', login.rawData.userId, this.state.searchId, this.state.searchTitle, '', page));
    dispatch(startHandleTimeConsuming());
  }

  // 上拉加载
  onEndReach() {
    const {dispatch, route, login, taskList} = this.props;
    if (canLoadMore && onEndReach) {
      if(taskList.taskListHasMore)
        page ++;
      dispatch(fetchTaskList(this.props.url + 'userId=', login.rawData.userId, this.state.searchId, this.state.searchTitle, '', page));
      canLoadMore = false;
    }
  }

  onScroll() {
    if (!onEndReach)
      onEndReach = true;
  }

  cancel(){
    this.setState({showModel:false});
  }

  passSelectDate(){
    this.setState({showModel:false});
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  searchContainer: {
    flexDirection: 'column',
  },
  searchInputContainer: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: Colors.lightgrey,
  },
  textInputContainer: {
    flex: 4,
    height: 35,
    margin: 5,
    elevation: 2,
    borderRadius: 2,
    backgroundColor: Colors.white,
    borderColor: Colors.lightgrey,
    borderWidth: 1,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    backgroundColor: Colors.white,
    height: 26,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    padding: 4,
  },
  pickerContainer: {
    flex: 3,
    margin: 5,
    marginBottom: 7,
    height: 35,
    elevation: 2,
    borderRadius: 2,
    backgroundColor: Colors.white,
    borderColor: Colors.lightgrey,
  },
  modelStyle:{
    flexDirection: 'column',
    position: 'absolute',
    backgroundColor: '#fdfcf5',
    opacity: 0.98,
    borderRadius: 10,
    overflow: 'hidden',
    marginLeft:deviceWidth/8,
    width: deviceWidth- deviceWidth/4,
    height: deviceHeight- deviceHeight/3,
    marginTop:deviceHeight/8,
  },
  picker: {
    flex: 1,
  },
  postsListView: {
    backgroundColor: Colors.mainBackground,
  },
  textStyle:{
    marginTop:5,
    fontSize:20,
    fontWeight:'500',
    textAlign: 'center',
    color:'#ff8c00'
  },
  calendar: {
    height:60,
    justifyContent: 'center',
    flexDirection:'row',
  },
  button: {
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    width:70,
    height:35,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 18,
    color:'#ff8c00'
  },
  calendarContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 30,
  },
});

function mapStateToProps(state) {
  const {taskList, login} = state;
  return {
    taskList,
    login,
  }
}

export default connect(mapStateToProps)(TaskList);
