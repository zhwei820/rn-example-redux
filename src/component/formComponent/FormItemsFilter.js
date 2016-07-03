'use strict';

import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
} from 'react-native';

import Colors from '../../constants/Colors';
import FormItemsTextView from './FormItemsTextView';
import FormItemsTextInputView from './FormItemsTextInputView';
import FormItemsSpinnerView from './FormItemsSpinnerView';
import FormItemsRadioView from './FormItemsRadioView';
import FormItemsCheckBoxView from './FormItemsCheckBoxView';
import FormItemsDatePickerView from './FormItemsDatePickerView';
import FormItemsFileUploadView from './FormItemsFileUploadView';
import FormItemsTextIdcard from './FormItemsTextIdcard';
import FormItemsTextEmail from './FormItemsTextEmail';
import FormItemsTextInt from './FormItemsTextInt';
import FormItemsTextFloat from './FormItemsTextFloat';
import FormItemsMacros from './FormItemsMacros';
import FormItemsDateTimeView from './FormItemsDateTimeView';
import FormItemsHideView from './FormItemsHideView';
import FormItemsLinkView from './FormItemsLinkView';
import FormItemsTextareaView from './FormItemsTextareaView';
import FormItemsSelectStaff from './FormItemsSelectStaff'

export default class FormItemsFilter extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        row: this.props.row,
      };
  }

  renderFormItem() {
    let _props = this.props;
    let _row = this.state.row;
    //以下判断顺序不能动
    if (_row.hide) { //隐藏控件
      return(<FormItemsHideView row={_row} onUserInput={(key, value) => _props.onUserInput(key, value)}/>);
    }
    if(this.state.row.type === 'macros'){
      return(<FormItemsMacros {..._props} row={this.state.row} detailType={this.state.row.detailType}
        onUserInput={(key, value) => this.props.onUserInput(key, value)}/>);
    }
    if(this.state.row.type === 'text' && this.state.row.detailType === 'linked_process_no'){ //附件
      return(<FormItemsLinkView {..._props} row={this.state.row} navigator={this.props.navigator} />);
    }
    if (_row.readOnly === true) {//只读
      return(<FormItemsTextView userName={this.state.userName} row={_row}/>);
    }
    if(_row.type == 'textarea'){
      return(<FormItemsTextareaView row={_row} onUserInput={(key, value) => _props.onUserInput(key, value)}/>);
    }else if(_row.type === 'select'){
      return(<FormItemsSpinnerView row={_row} onUserInput={(key, value) => _props.onUserInput(key, value)} refs={_props.refs}/>);
    }else if(_row.type === 'radios'){
      return(<FormItemsRadioView row={_row} onUserInput={(key, value) => _props.onUserInput(key, value)}/>);
    }else if(_row.type === 'checkboxs'){
      return(<FormItemsCheckBoxView row={_row} onUserInput={(key, value) => _props.onUserInput(key, value)}/>);
    }else if(_row.type === 'selectPerson'){
      return(<FormItemsSelectStaff {..._props} row={_row} onUserInput={(key, value) => _props.onUserInput(key, value)}/>);
    }else if(_row.type === 'text' && _row.detailType === 'text'){ //普通文本
      return(<FormItemsTextInputView row={_row} onUserInput={(key, value) => _props.onUserInput(key, value)}/>);
    }else if(_row.type === 'text' && _row.detailType === 'email'){ //邮箱地址
      return(<FormItemsTextEmail row={_row} onUserInput={(key, value) => _props.onUserInput(key, value)}/>);
    }else if(_row.type === 'text' && _row.detailType === 'int'){ //整数
      return(<FormItemsTextInt row={_row} onUserInput={(key, value) => _props.onUserInput(key, value)}/>);
    }else if(_row.type === 'text' && _row.detailType === 'float'){ //小数
      return(<FormItemsTextFloat row={_row} onUserInput={(key, value) => _props.onUserInput(key, value)}/>);
    }else if(_row.type === 'text' && _row.detailType === 'idcard'){ //身份证号码
      return(<FormItemsTextIdcard row={_row} onUserInput={(key, value) => _props.onUserInput(key, value)}/>);
    }else if(_row.type === 'text' && _row.detailType === 'standardDate'){ //日期(yyyy-MM-dd)
      return(<FormItemsDatePickerView row={_row} onUserInput={(key, value) => _props.onUserInput(key, value)} refs={_props.refs} />);
    }else if(_row.type === 'text' && _row.detailType === 'fullDate'){ //日期(yyyy-MM-dd HH:mm:ss)
      return(<FormItemsDateTimeView row={_row} onUserInput={(key, value) => _props.onUserInput(key, value)} refs={_props.refs} />);
    }else if(_row.type === 'text' && _row.detailType === 'file'){ //附件
      return(<FormItemsFileUploadView {..._props} row={_row} onUserInput={(key, value, extraData) => _props.onUserInput(key, value, extraData)}
        navigator={_props.navigator} onChooseFile={(key, value) => _props.onChooseFile(key, value)} refs={_props.refs}/>);
    }else{
      return(<View/>)
    }
  }

  render() {
    return(
      <View style={styles.container}>
        {this.renderFormItem()}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});
