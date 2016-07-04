'use strict';

import React from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
    Alert,
    DeviceEventEmitter,
    Platform,
} from 'react-native';
import { connect } from 'react-redux';

import Colors from '../constant/Colors';
// import NavigationBar from '../component/ZqOfficeNavigationBar';
import FormItemsFilter from '../component/formComponent/FormItemsFilter';
import DatePicker from "../component/datePicker";
import DateTimePicker from "../component/dateTimePicker";
import SelectItem from "../component/selectItem";
import ModalCalendar from "../component/modalCalendar";
// import OfficeTableContainer from '../containers/OfficeTableContainer';
import Spinner from '../lib/react-native-loading-spinner-overlay';
import {fetchOfficeForm, changeKeyboardSpace, handleUserInput, assignTableData, fetchCommitOfficeForm} from "../actions/officeForm";
import {startHandleTimeConsuming, stopHandleTimeConsuming} from '../reducers/timeConsuming/timeConsumingAction';
import {showAlert} from '../utils/RequestUtils';
var FileUpload = require('NativeModules').FileUpload;

var mustToInputItems = {};
var inputItems = [];
var formView = <View/>;
var tableView = <View/>;

export default class officeForm extends React.Component {
  constructor(props) {
    super(props);

    this.onLeftBack = this.onLeftBack.bind(this);
    this.onCommit = this.onCommit.bind(this);
    this.updateKeyboardSpace = this.updateKeyboardSpace.bind(this);
    this.resetKeyboardSpace = this.resetKeyboardSpace.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {officeForm} = nextProps;
    if(officeForm.formFetched){
      nextProps.dispatch(stopHandleTimeConsuming());
      if(officeForm.error){
        showAlert(officeForm.error);
      } else {
        let _this = this;
          for (var i = 0; i < officeForm.formData.content.length; i++) {
              var item = officeForm.formData.content[i];
              if (item.required) {
                mustToInputItems[item.name] = item.title;
              }
          }
          formView = officeForm.formData.content.map(function(row) {
            return <FormItemsFilter {..._this.props} row={row} refs={_this.refs} onUserInput={(userInputKey, userInputValue, extraData) => {
                nextProps.dispatch(handleUserInput('form', userInputKey, userInputValue, extraData))
                if (inputItems.indexOf(userInputKey) === -1) {
                  inputItems.push(userInputKey);
                }
              }}/>
          });
          let index = -1
          tableView = officeForm.formData.listctrlVoList.map((rowData)=>{
            index++;
            return (
              <View style={{backgroundColor:'white', height:50}}>
                <TouchableOpacity onPress={this.onClickTable.bind(this, rowData, index)} >
                  <Text style={{alignSelf:'center', marginTop:20, marginBottom:20, color:'#36a9e1', fontSize:16}}>{rowData.code}>></Text>
                </TouchableOpacity>
              </View>);
          });
      }
    }
    if(officeForm.formCommitted){
      nextProps.dispatch(stopHandleTimeConsuming());
      if(officeForm.commitResult === "success"){
        Alert.alert('','提交成功!',[{text: '确定', onPress: () =>{}},]);
        nextProps.navigator.pop();
      }else if(officeForm.commitResult === 'failure'){
        Alert.alert('','提交失败!',[{text: '确定'},]);
      }else if(officeForm.error){
        showAlert(officeForm.error);
      }
    }
  }

  componentDidMount() {
    const {dispatch, route} = this.props;
    dispatch(fetchOfficeForm(route.officeFormData.id));
    dispatch(startHandleTimeConsuming());
    if (Platform.OS === 'ios') {
      dispatch(changeKeyboardSpace(0));
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
    formView = <View/>;
    tableView = <View/>;
    mustToInputItems = {};
    inputItems = [];
  }

  shouldComponentUpdate (nextProps, nextState) {
    const {officeForm} = nextProps;
    return officeForm.formFetched || officeForm.formFetching
      || officeForm.formCommitted || officeForm.formCommitting
      || officeForm.keyboardSpace !== this.props.officeForm.keyboardSpace;
  }

  //更新键盘位置
  updateKeyboardSpace (frames) {
    //获取键盘高度
    const keyboardSpace = frames.endCoordinates.height;
    const {dispatch} = this.props;
    dispatch(changeKeyboardSpace(keyboardSpace));
  }

  resetKeyboardSpace () {
    const {dispatch} = this.props;
    dispatch(changeKeyboardSpace(0));
  }

  judgeAllMustItems(){
    for (var item in mustToInputItems) {
      let _item = item;
      if(_item == 'fj')
        _item = `${_item}1`;
      if (inputItems.indexOf(_item) === -1) {
        Alert.alert('', mustToInputItems[item] + '未填写', [ {text: '确定', onPress: ()=>{}}]);
        return false;
      }
    }
    return true;
  }

  render() {
    const {officeForm, route} = this.props;
    return (
      <View style={styles.container}>

        <ScrollView style={styles.formViewContainer}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={true}
          ref='keyboardView'
          keyboardDismissMode='interactive'
          contentInset={{bottom: officeForm.keyboardSpace}}>
            {formView}
            {tableView}
        </ScrollView>

        <ModalCalendar ref={'modalcalendar'}/>
        <DatePicker ref={'datepicker'}/>
        <DateTimePicker ref={'datetimepicker'}/>
        <SelectItem ref={'selectItem'}/>
        <View>
          <Spinner visible={officeForm.formFetching} text={'加载中,请稍后...'}/>
          <Spinner visible={officeForm.formCommitting} text={'提交中,请稍后...'}/>
        </View>
      </View>
    );
  }


  onCommit() {
    // if(!this.judgeAllMustItems())
    //   return;
    let check = this.checkData();
    if(check.errorType == 1){
      Alert.alert('',`${check.msg}`,[{text: '确定',onPress : ()=>{}}]);
    }else if(check.errorType == 2){
      Alert.alert('',`${check.msg}`,[{text: '确定',onPress : ()=>{}}]);
    }else if(check.errorType == 0){
      const {officeForm, route, dispatch, login} = this.props;
      dispatch(startHandleTimeConsuming());
      dispatch(fetchCommitOfficeForm(officeForm.formInputData, officeForm.tableData,
        route.officeFormData.id, login.rawData.userId));
    }
  }

  checkData(){
    const {officeForm} = this.props;
    let json = eval('(' + officeForm.formInputData + ')');
    let ary = officeForm.formData.content.concat();
    ary.reverse();
    let result = {msg: '', errorType: 0};
    for(let item of ary){
      if(item.required){ //判断必填想
        let _item = {};
        _item.detailType = item.detailType;
        _item.name = item.name;
        _item.title = item.title;
        if(_item.detailType == 'file')
          _item.name = `${item.name}1`;
        //后两个“或” 是判断 下拉组件 和 时间组件的必填校验 比较简单粗暴 待优化
        if(!json[_item.name] || json[_item.name] == '' || json[_item.name] == '请选择' || json[_item.name] == ' 00:00'){
          result.msg = `${item.title} 为必填项,请填写后再提交!`;
          result.errorType = 1;  //未填写
        }
      }
      //类型检测,正则表达式来自后端,本人概不负责(包括身份证校验)
      if(json[item.name] && json[item.name] != ''){
        let checkType;
        if( !item.readOnly && item.detailType === 'email'){
          // checkType = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
          checkType = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/;
          if(!checkType.test(json[item.name])){
            result.msg = `${item.title} 格式错误(应为邮箱),请重新检查填写再提交!`;
            result.errorType = 2;  //格式错误
          }
        }

        if( !item.readOnly && item.detailType === 'int'){
          checkType = /^-?\d+$/;
          if(!checkType.test(json[item.name])){
            result.msg = `${item.title} 格式错误(应为整数),请重新检查填写再提交!`;
            result.errorType = 2;  //格式错误
          }
        }
        if( !item.readOnly && item.detailType === 'float'){
          checkType = /^(-?\d+)(\.\d+)?$/;
          //checkType = /^\d+\.\d+$/;
          if(!checkType.test(json[item.name])){
            result.msg = `${item.title} 格式错误(应为数字),请重新检查填写再提交!`;
            result.errorType = 2;  //格式错误
          }
        }

        if( !item.readOnly && item.detailType === 'idcard'){
          // checkType = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
          if(!this.checkIdcard(json[item.name])){
            result.msg = `${item.title} 格式错误(应为身份证),请重新检查填写再提交!`;
            result.errorType = 2;  //格式错误
          }
        }
      }
    }
    return result;
  }

  checkIdcard(idcard) {
    let Errors=new Array(
      "验证通过!",
      "身份证号码位数不对!",
      "身份证号码出生日期超出范围或含有非法字符!",
      "身份证号码校验错误!",
      "身份证地区非法!"
    );
    let area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",
      42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",
      81:"香港",82:"澳门",91:"国外"};
    let ereg;
    let Y,JYM;
    let S,M;
    let idcard_array = new Array();
    idcard_array = idcard.split("");
    /*地区检验*/
    if(area[parseInt(idcard.substr(0,2))]==null) {
      return false;
    }
    /*身份号码位数及格式检验*/
    switch(idcard.length){
    case 15:
        if ( (parseInt(idcard.substr(6,2))+1900) % 4 == 0 || ((parseInt(idcard.substr(6,2))+1900) % 100 == 0 && (parseInt(idcard.substr(6,2))+1900) % 4 == 0 )){
          ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;//测试出生日期的合法性
        } else {
          ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;//测试出生日期的合法性
        }
        if(ereg.test(idcard)){
          return true;
        } else {
          return false;
        }
        break;

    case 18:
      //18位身份号码检测
      //出生日期的合法性检查
      //闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
      //平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
      if ( parseInt(idcard.substr(6,4)) % 4 == 0 || (parseInt(idcard.substr(6,4)) % 100 == 0 && parseInt(idcard.substr(6,4))%4 == 0 )){
        ereg=/^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;//闰年出生日期的合法性正则表达式
      } else {
        ereg=/^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;//平年出生日期的合法性正则表达式
      }
      if(ereg.test(idcard)){//测试出生日期的合法性
        //计算校验位
        S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
        + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9
        + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
        + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5
        + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8
        + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
        + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2
        + parseInt(idcard_array[7]) * 1
        + parseInt(idcard_array[8]) * 6
        + parseInt(idcard_array[9]) * 3 ;
        Y = S % 11;
        M = "F";
        JYM = "10X98765432";
        M = JYM.substr(Y,1);/*判断校验位*/
        if(M == idcard_array[17]){
          return true; /*检测ID的校验位*/
        } else {
          return false;
        }
      }
      else {
        return false;
      }
      break;
    default:
      return false;
    }
  }

  onClickTable(data, id) {
    const {navigator, dispatch, officeForm} = this.props;
    let unitData = officeForm.tableData;
    unitData[id] = data;
    dispatch(assignTableData(unitData));
    navigator.push({
      name: "OfficeTable",
      component: OfficeTableContainer,
      tableId: id,
    });
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    height: 100,
    backgroundColor: Colors.mainBackground
  },
  formViewContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  calendarContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30
  },
  button: {
    height: 34,
    flexDirection: 'row',
    backgroundColor: Colors.mainColor,
    justifyContent: 'center',
    borderRadius: 8,
    margin: 5,
    marginLeft: 30,
    marginRight: 30
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 18,
    color: Colors.white
  }
});


function mapStateToProps(state) {
  const {officeForm, login} = state;
  return {
    officeForm,
    login,
  }
}

export default connect(mapStateToProps)(officeForm);
