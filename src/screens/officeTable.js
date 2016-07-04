'use strict'

import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  DeviceEventEmitter,
} from 'react-native';

import Colors from '../constants/Colors';
import NavigationBar from '../components/ZqOfficeNavigationBar';
import TableItemFilter from '../components/tableComponent/TableItemFilter';
import ModalCalendar from "../components/modalCalendar";
import DatePicker from "../components/datePicker";
import {handleUserInput, assignTableData, changeKeyboardSpace, assignTableInputData, onEditLine, onClearEdit} from "../actions/officeForm";

var keyboardHeight = 0 ;
var _refs;
var rowID = undefined;

export default class OfficeTable extends React.Component {
  constructor(props){
    super(props);
    this.onLeftBack = this.onLeftBack.bind(this);
    this.onClear = this.onClear.bind(this);
    this.updateKeyboardSpace = this.updateKeyboardSpace.bind(this);
    this.resetKeyboardSpace = this.resetKeyboardSpace.bind(this);
  }

  componentDidMount() {
    const {dispatch} = this.props;
    //刷新一次render 为refs赋值
    dispatch(changeKeyboardSpace(0));
    if (Platform.OS === 'ios') {
      //添加代理事件
      DeviceEventEmitter.addListener('keyboardWillShow', this.updateKeyboardSpace);
      DeviceEventEmitter.addListener('keyboardWillHide', this.resetKeyboardSpace);
    }
  }

  //页面移除代理
  componentWillUnmount () {
    if (Platform.OS === 'ios') {
  　 　DeviceEventEmitter.removeAllListeners('keyboardWillShow');
  　 　DeviceEventEmitter.removeAllListeners('keyboardWillHide');
    }
  }

  //更新键盘位置
  updateKeyboardSpace (frames) {
    //获取键盘高度
    const keyboardSpace = frames.endCoordinates.height;
    keyboardHeight = keyboardSpace;
    const {dispatch} = this.props;
    dispatch(changeKeyboardSpace(keyboardSpace));
  }

  resetKeyboardSpace () {
    keyboardHeight = 0;
    const {dispatch} = this.props;
    dispatch(changeKeyboardSpace(0));
  }

  renderTableInput() {
    let _this = this;
    const {officeForm, dispatch, route} = this.props;
    return(
      officeForm.tableData[route.tableId].titleVo.map((rowData)=>{
        const {officeForm} = this.props;
        let value = officeForm.tableInputData[rowData.title];
        return <TableItemFilter row={rowData} onUserInput={(userInputKey, userInputValue) =>
        dispatch(handleUserInput('table', userInputKey, userInputValue))} value={value} refs={_refs}/>
      })
    );
  }

  renderTableTitle(){
    const {officeForm, route} = this.props;
    let _this = this;
    // 表格的标题单元格
    if(officeForm.tableData[route.tableId].titleVo){
      return (
        officeForm.tableData[route.tableId].titleVo.map((rowData)=>{
          if(rowData.type && rowData.type === 'int'){
            return (
              <View style={styles.cell}>
                <TouchableOpacity onPress={this.onSum.bind(_this, rowData.title)}>
                  <Text style={{color: Colors.mainColor}}>{rowData.title}</Text>
                </TouchableOpacity>
              </View>
            );
          }else{
            return (
              <View style={styles.cell}>
                <Text>{rowData.title}</Text>
              </View>
            );
          }
        })
      );
    }else {
      return (<View/>);
    }
  }

  renderTableBody(){
    const {officeForm, route} = this.props;
    let _this = this;
    var lineID = -1;
    return (
      officeForm.tableData[route.tableId].data.map((rowData)=>{
        lineID++;
        const {route} = _this.props;
        var item = officeForm.tableData[route.tableId].titleVo.map((row)=>{
          let key = row.title;
          let value = rowData[key] ? rowData[key] : '';
          return (
            <TouchableOpacity onPress={()=>{
              Alert.alert('',`${key} \n ${value}`,[{text: '确定',}])
            }}>
              <View style={styles.cell}>
                <Text numberOfLines={2} >{rowData[key]}</Text>
              </View>
            </TouchableOpacity>
          );
        });
        return(
          <View style={{flexDirection: 'row'}}>
            <View style={[styles.cell, {flexDirection: 'row',justifyContent: 'space-around'}]}>
              <TouchableOpacity style={{width: 32,height: 32}} onPress={this.onDeleteLine.bind(this, lineID)}>
                <Image style={{width: 32,height: 32}} source={require('../img/icon/sq_icon_del.png')}/>
              </TouchableOpacity>
              <TouchableOpacity style={{width: 32,height: 32}} onPress={this.onEditLine.bind(this, lineID)}>
                <Image style={{width: 32,height: 32}} source={require('../img/icon/sq_icon_edit.png')}/>
              </TouchableOpacity>
            </View>
            {item}
          </View>
        );
      })
    );
  }

  renderModel(){
    if (Platform.OS=='ios') {
      return(<DatePicker ref={'datepicker'}/>  )
    } else {
      return(<ModalCalendar ref={'modalcalendar'}/>)
    }
  }

  render() {
    _refs = this.refs;
    const {officeForm, route} = this.props;
    var titleName = officeForm.tableData[route.tableId].code ? officeForm.tableData[route.tableId].code : '';
    return(
      <View style={styles.background} >
        <NavigationBar
          title={titleName} titleColor={Colors.white}
          backgroundColor={Colors.mainColor} onLeftButtonPress={this.onLeftBack}
          leftButtonIcon={require('../img/office/icon-backs.png')}/>
        <ScrollView
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={true}
        ref='keyboardView'
        keyboardDismissMode='interactive'
        contentInset={{bottom: officeForm.keyboardSpace}}
        >
          <View>
            {this.renderTableInput()}{/**用户输入项 **/}
            <View style={{flexDirection: 'row',height: 48,justifyContent: 'space-between',}}>
              <TouchableOpacity style={{flex: 1,margin:8,backgroundColor: Colors.mainColor,borderRadius:2,alignItems: 'center',justifyContent: 'center'}}
                onPress={this.onClear}>
                <View style={{}}>
                  <Text>清空</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{flex: 1,margin:8,backgroundColor: Colors.mainColor,borderRadius:2,alignItems: 'center',justifyContent: 'center'}}
                onPress={this.onSavaToTableData.bind(this)}>
                  <Text >存表</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal={true}>
              <View style={{padding: 8}}>
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.cell}>
                    <Text>操作</Text>
                  </View>
                  {this.renderTableTitle()}
                </View>
                {this.renderTableBody()}
              </View>
            </ScrollView>
          </View>
        </ScrollView>
        {this.renderModel()}
      </View>
    );
  }

  onLeftBack(){
    this.props.navigator.pop();
  }

  onSavaToTableData(){
    const {officeForm, dispatch, route} = this.props;
    let tableData = officeForm.tableData;
    if(JSON.stringify(officeForm.tableInputData) == '{}' && rowID == undefined){
        Alert.alert('提示','当前行没有任何数据,确定提交?',[{text: '确定',
          onPress: ()=>{
            tableData[route.tableId].data.push(officeForm.tableInputData);
            dispatch(assignTableData(tableData));
          }},{text: '取消',onPress: ()=>{}}]);
    } else if (rowID != undefined) {
       tableData[route.tableId].data[rowID] = officeForm.tableInputData;
       rowID = undefined;
      dispatch(assignTableData(tableData));
    } else {
      tableData[route.tableId].data.push(officeForm.tableInputData);
      dispatch(assignTableData(tableData));
    }
  }

  onClear(){
    const {dispatch,officeForm,route} = this.props;
    dispatch(onClearEdit({}));
    dispatch(assignTableInputData({}));
  }

  onSum(key){
    const {officeForm, dispatch, route} = this.props;
    let sum = 0;
    officeForm.tableData[route.tableId].data.map((rowData)=>{
      if(rowData[key] != undefined && rowData[key] != ''){
        sum += parseFloat(rowData[key])
      }
    });
    sum = sum.toFixed(3);
    Alert.alert('',`${key}合计:${sum}`,[{text: '确定',}]);
  }

  onDeleteLine(lineID){
    const {officeForm, dispatch, route} = this.props;
    let tableData = officeForm.tableData;
    tableData[route.tableId].data.splice(lineID, 1);
    dispatch(assignTableData(tableData));
  }

  onEditLine(lineID){
    const {officeForm, dispatch, route} = this.props;
    let tableData = officeForm.tableData[route.tableId];
    let data = tableData.data;
    let temp = data[lineID];
    rowID =lineID;
    dispatch(onEditLine(temp));
  }
};

var styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
  },
  cell: {
    overflow:'hidden',
    width: 112,
    height: 48,
    borderWidth: 1,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
