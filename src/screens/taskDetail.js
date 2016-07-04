'use strict';

import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  Navigator,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';

import Colors from '../constant/Colors';
// import NavigationBar from '../component/ZqOfficeNavigationBar';
import AttachmentDownload from '../component/AttachmentDownload';
import {fetchTaskDetail} from '../actions/taskDetail';
// import TaskApprovalContainer from '../containers/TaskApprovalContainer';
import readTable from './readTable';
import Spinner from '../lib/react-native-loading-spinner-overlay';
// import TaskDetailContainer from '../containers/TaskDetailContainer';
import {startHandleTimeConsuming, stopHandleTimeConsuming} from '../actions/timeConsuming';
import {TASKDETAIL_URL, LINK_TASK} from '../constant/Network';
import {showAlert} from '../utils/RequestUtils';

class taskDetail extends React.Component {
  constructor(props) {
    super(props);
    this.onApproval = this.onApproval.bind(this);
    this.onLeftBack = this.onLeftBack.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {taskDetail} = nextProps;
    if(taskDetail.taskDetailFetched){
      nextProps.dispatch(stopHandleTimeConsuming());
      if(taskDetail.error){
        showAlert(taskDetail.error);
      }
    }
  }

  componentWillUnmount() {
    this.didFocusSubscription.remove();
  }

  componentDidMount() {
    const {dispatch, route, navigator} = this.props;
    let url;
    if(!this.didFocusSubscription) {
      if (this.props.route.type === 'link') {
        url = LINK_TASK + 'linkedProcessNo=' + route.linkedProcessNo;
      } else {
        url = TASKDETAIL_URL + 'processInstanceId=' + route.processInstanceId;
      }
      dispatch(fetchTaskDetail(url));
      dispatch(startHandleTimeConsuming());
    }

    this.didFocusSubscription = navigator.navigationContext.addListener('willfocus', (event) => {
      if(event.data.route.name == 'TaskDetail'){
        if (event.data.route.type === 'link') {
          if(!route.linkedProcessNo)
            return;
          url = LINK_TASK + 'linkedProcessNo=' + route.linkedProcessNo;
        } else {
          if(!route.processInstanceId)
            return;
          url = TASKDETAIL_URL + 'processInstanceId=' + route.processInstanceId;
        }
        dispatch(fetchTaskDetail(url));
        dispatch(startHandleTimeConsuming());
      }
    });
  }

  renderTableView() {
    const {taskDetail, navigator} = this.props;
    return  taskDetail.tableList.map((rowData) => {
      return (
        <TouchableOpacity onPress={() => {
          navigator.push({
            name: "ReadTable",
            component: readTable,
            tableData: rowData,
          });
        }}>
          <Text style={{alignSelf:'center',marginTop:8,marginBottom:8,color:'#36a9e1',fontSize:16,}}>{rowData.code}>></Text>
        </TouchableOpacity>
      );
    });
  }

  renderTaskView() {
    const {taskDetail, route, navigator} = this.props;
    return taskDetail.content.map((rowData)=>{
      if (rowData.hide){
        return(<View></View>)
      }
      if(rowData.type === 'text' && rowData.detailType === 'file') {
        //屏蔽模板下载 仅web端需要
        if(rowData.title === ' ')
          return;
        return (<AttachmentDownload {...this.props} row={rowData} processInstanceId={route.processInstanceId} navigator={navigator}/>);
      } else if (rowData.type === 'text' && rowData.detailType === 'linked_process_no') {
        return (
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginLeft: 8,marginRight: 4,marginTop:5,textAlign: 'right',color: '#333',fontSize:15,}}>{rowData.title}:</Text>
            <TouchableOpacity onPress={()=>{
                navigator.push({
                  name: "TaskDetail",
                  component: TaskDetailContainer,
                  type: 'link',
                  linkedProcessNo: rowData.content,
                  processNo: route.processNo,
                  processTitle: route.processTitle,
                  });}}>
              <Text style={{marginLeft: 4,color: '#317ef3',marginRight:8,fontSize:15,marginTop:5,flex:1,}} multiline={true}>{rowData.content}</Text>
            </TouchableOpacity>
          </View>);
      } else {
        return (
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginLeft: 8,marginRight: 4,marginTop:5,textAlign: 'right',color: '#333',fontSize:15,}}>{rowData.title}:</Text>
            <Text style={{marginLeft: 4,color: '#999',marginRight:8,fontSize:15,marginTop:5,flex:1,}} multiline={true}>{rowData.content}</Text>
          </View>
          );
        }
    });
  }

  renderHistoricView(){
    const {taskDetail} = this.props;
    return taskDetail.historicTasks.map((rowData)=>{
      if(rowData.deleteReason === '跳过')
        return;
      return (
        <View style={{flexDirection: 'row', }}>
          <View style={{position: 'absolute',flex: 1,width: 1,height:1000,marginLeft:27,backgroundColor:'#ccc',}}/>
          <View style={{width: 56,alignItems: 'center',elevation: 2}}>
            <Image style={{marginTop: 8,width: 48,height: 48,borderRadius: 24,borderWidth: 2,borderColor: '#fff',}} source={require('../img/icon/icon-avatar.png')}/>
          </View>
          <View style={{marginTop: 14,elevation: 2}}>
            <Image source={require('../img/icon/icon-arrow.png')} style={{width: 5,height: 10,}}/>
          </View>
          <View style={{flex: 1,marginTop:8,marginBottom:8,marginRight: 8,padding: 8,backgroundColor:'#fff', borderRadius:2, elevation: 2}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
              <View style={{flexDirection: 'row',alignItems: 'center',}}>
                <Text style={{color: '#333',fontSize: 15,}}>{rowData.assignee}</Text>
              </View>
              <Text style={{fontSize: 15,marginTop:2,color: '#999',}}>{rowData.endTime}</Text>
            </View>
            <View style={{marginTop:4,}}>
              <Text style={{fontSize: 12,marginRight: 8}}>{rowData.approvalRemark}</Text>
              <Text style={{fontSize: 13,color: '#444',alignSelf: 'flex-end'}}>{rowData.approvalComments}</Text>
            </View>
          </View>
        </View>
      );
    });
  }

  renderFAB(){
    const {route} = this.props;
    if(route.type === 'approval'){
      return (
        <TouchableOpacity style={{width: 56,height: 56,borderRadius: 28,backgroundColor: Colors.mainColor,
            position: 'absolute',bottom: 10,right: 10,elevation: 4,justifyContent: 'center',alignItems: 'center'}}
            onPress={this.onApproval}
          onLongPress={()=>console.log('长按隐藏图标,未处理')}>
          <Image style={{width: 32,height: 32}} source={require('../img/icon/icon-fb-edit.png')}/>
        </TouchableOpacity>
      );
    }else{
      return (<View/>);
    }
  }

  renderProcessNo() {
    if (this.props.route.type === 'link') {
      return (
         <Text style={{color:'#999', fontSize: 14}}>单号:{this.props.route.linkedProcessNo}</Text>
       );
    } else {
      return(
            <Text style={{color:'#999', fontSize: 14}}>单号:{this.props.route.processNo}</Text>
      );
    }
  }

  render() {
    const {taskDetail, route} = this.props;
    return (
      <View style={styles.container}>

        <ScrollView style={{backgroundColor: '#EFEFEF',}}>
          <View style={{backgroundColor: 'white',margin: 8,borderRadius: 2,elevation: 3,padding: 8}}>
          {this.renderProcessNo()}
            <Text style={{color: '#111',margin: 8,marginTop:16,fontSize:20,textAlign:'center',}}>{taskDetail.name}</Text>
            <View>
              {this.renderTaskView()}
            </View>
            {this.renderTableView()}
          </View>
          <View style={{}}>
            {this.renderHistoricView()}
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center',marginBottom: 8,}}>
            <View style={{width: 10,height: 10,borderRadius: 5,borderWidth: 2,borderColor: Colors.mainBackground,backgroundColor:'#ccc',marginLeft: 22,}}/>
            <Text style={{marginLeft: 8,color: '#333',fontSize:15,}}>发起申请</Text>
          </View>
        </ScrollView>
        {this.renderFAB()}
        <View>
          <Spinner visible={taskDetail.taskDetailFetching} text={'加载中,请稍后...'}/>
        </View>
      </View>
    );
  }

  onApproval(){
    const {navigator, route} = this.props;
    navigator.push({
      name: "TaskApproval",
      component: TaskApprovalContainer,
      taskId: route.taskId,
      processInstanceId: route.processInstanceId,
    });
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  postsListView: {
    backgroundColor: Colors.mainBackground,
  },
  tableCell: {
    height: 48,
    width: 96,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  }
});



function mapStateToProps(state) {
  const {taskDetail} = state;
  return {
    taskDetail,
  }
}

export default connect(mapStateToProps)(taskDetail);
