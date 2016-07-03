'use strict';

import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
  Platform,
} from 'react-native';

import NavigationBar from '../ZqOfficeNavigationBar';
import FileManager from 'react-native-fs';
import Colors from '../../constants/Colors';
import api from "../../constants/Network";
import {Base64Encode, Base64Decode} from '../../utils/Base64';
import Spinner from '../../lib/react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import {startHandleTimeConsuming, stopHandleTimeConsuming} from '../../actions/timeConsuming';

const deviceHeight = Dimensions.get('window').height-10;
const deviceWidth = Dimensions.get('window').width;
const root =  Platform.OS === 'ios'? `${FileManager.DocumentDirectoryPath}` : `/sdcard`;
const tipContent =  Platform.OS === 'ios'? '未发现附件,请把文件放置于该APP的Documents文件夹下!' : '未发现文件!';
var currentPath = '';
var arrUploadFiles = new Array();
var totalFileNum;
var fileIndex;

{
  var fileIcons = new Map();
  fileIcons.set('apk', require('../../img/file/apk.png'));
  fileIcons.set('doc', require('../../img/file/doc.png'));
  fileIcons.set('docx', require('../../img/file/docx.png'));
  fileIcons.set('jpg', require('../../img/file/jpg.png'));
  fileIcons.set('png', require('../../img/file/png.png'));
  fileIcons.set('m4a', require('../../img/file/m4a.png'));
  fileIcons.set('mp4', require('../../img/file/mp4.png'));
  fileIcons.set('mp3', require('../../img/file/mp3.png'));
  fileIcons.set('pdf', require('../../img/file/pdf.png'));
  fileIcons.set('ppt', require('../../img/file/ppt.png'));
  fileIcons.set('pptx', require('../../img/file/pptx.png'));
  fileIcons.set('rar', require('../../img/file/rar.png'));
  fileIcons.set('txt', require('../../img/file/txt.png'));
  fileIcons.set('xls', require('../../img/file/xls.png'));
  fileIcons.set('xlsx', require('../../img/file/xlsx.png'));
  fileIcons.set('zip', require('../../img/file/zip.png'));
  fileIcons.set('file', require('../../img/file/unknow.png'));
  fileIcons.set('directory', require('../../img/file/directory.png'));
}

class FileSelect extends React.Component{
  constructor(props){
    super(props);
    this.state={
      row: this.props.row,
      fileList: [],
      upLoading: false,
      spinnerContent: '正在上传,请稍候...',
    };
    currentPath = `${root}`;
    this.upload = this.upload.bind(this);
  }

  componentDidMount(){
    this.refreshFileList();
  }

  _renderFileItem(){
    if (this.state.fileList.length) {
        return this.state.fileList.map((rowData)=>{
          let icon;
          if(rowData.isDirectory()){
            icon = fileIcons.get('directory');
          }else{
            let ary = rowData.name.split('.');
            let end = ary[ary.length - 1].toLowerCase();
            if(end==='apk' || end==='doc' || end==='docx' || end==='jpg' ||
                end==='m4a' || end==='mp4' || end==='pdf' || end==='ppt' ||
                end==='pptx' || end==='rar' || end==='txt' || end==='xls' ||
                end==='xlsx' || end==='zip' || end==='png' || end==='mp3'){
              icon = fileIcons.get(end);
            }
            else{
              icon = fileIcons.get('file');
            }
          }
          return (
            <View style={[{flex: 1},{justifyContent: 'center'}]}>
              <TouchableOpacity onPress={this.clickFile.bind(this, rowData)}>
                <View style={{height: 56,flexDirection: 'row'}}>
                  <View style={{flexDirection: 'row', alignItems: 'center', flex: 9}}>
                    <Image source={icon} style={{width: 40, height: 40, marginLeft: 16, marginRight:16, marginTop:8, marginBottom: 8}}/>
                    <Text numberOfLines={3} style ={{width: deviceWidth - 80}}>{rowData.name}</Text>
                  </View>
                  {rowData.select && this.renderSelectArrow()}
                </View>
              </TouchableOpacity>
              <View style={{height:1, marginLeft: 16, backgroundColor:'#ccc'}}/>
            </View>
          );
        });
      }else {
        return(
            <View style={[{flex: 1},{justifyContent: 'center'}]}>
                <Text numberOfLines = {0} style={styles.textStyle} >{tipContent}</Text>
            </View>
        );
      }
  }

  renderSelectArrow() {
    return(
      <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
        <Image style={{width: 20, height: 20}} source={require('../../img/icon/icon-agree.png')}/>
      </View>
    )
  }

  render() {
    let rightButtonTitle = '';
    let fileList = this.state.fileList;
    for(let i = 0; i < fileList.length; i++){
      if(fileList[i].select){
        rightButtonTitle = '上传';
        break;
      }
    }
    return(
      <View style={{flex: 1}}>
        <NavigationBar title={'文件选择'} titleColor={Colors.white}
          backgroundColor={Colors.mainColor} rightButtonTitle={rightButtonTitle}
          rightButtonTitleColor={'#fff'} onRightButtonPress={this.upload}
          leftButtonIcon={require('../../img/office/icon-backs.png')}
          onLeftButtonPress={this.onLeftBack.bind(this)} />
        <ScrollView style={{position: 'absolute',flex:1, height: deviceHeight-60, width: deviceWidth}}>
          {this._renderFileItem()}
        </ScrollView>
        <View>
          <Spinner visible={this.state.upLoading} text={this.state.spinnerContent}/>
        </View>
      </View>
    );
  }

  clickFile(rowData){
    if(rowData.isDirectory()){
      currentPath = rowData.path;
      this.refreshFileList();
    }else{
      let fileList = this.state.fileList;
      for(let i = 0; i < fileList.length; i++){
        if(fileList[i].name == rowData.name)
          fileList[i].select = fileList[i].select ? false : true;
      }
      this.setState({
        fileList: fileList,
      });
    }
  }

  inArray(val) {
    let arr = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'png', 'jpg', 'jpeg', 'bmp', 'gif'];
    if (arr.indexOf(val) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  upload(){
    Alert.alert('', '确认上传?', [{text:'上传',onPress: ()=>{
      arrUploadFiles.length = 0;
      let fileList = this.state.fileList;
      for(let i = 0; i < fileList.length; i++){
        if(fileList[i].select){
          if(fileList[i].size >= 10000000){
            Alert.alert('', '文件:\"' + fileList[i].name + '\""大小超过10M', [{text:'确认',onPress: ()=>{}}]);
            return;
          }
          let extension = fileList[i].name.split('.');
          if(!this.inArray(extension.pop())){
            Alert.alert('', '文件:\"' + fileList[i].name + '\""格式不支持', [{text:'确认',onPress: ()=>{}}]);
            return;
          }
          let uploadFile = {};
          uploadFile.uri = `file://${fileList[i].path}`;
          uploadFile.type = 'application/octet-stream';
          uploadFile.name = Base64Encode(fileList[i].name);
          uploadFile.fileName = fileList[i].name;
          arrUploadFiles.push(uploadFile);
        }
      }
      if(arrUploadFiles.length > 10){
        Alert.alert('', '文件个数超过10个', [{text:'确认',onPress: ()=>{}}]);
        return;
      }
      this.setState({
        upLoading: true,
      });
      totalFileNum = arrUploadFiles.length;
      fileIndex = 0;
      this.props.dispatch(startHandleTimeConsuming());
      this.doUpload();
    }},{text:'取消',onPress: ()=>{}}])
  }

  doUpload(){
    let form = new FormData();
    let file = arrUploadFiles.pop();
    form.append('fileName', file.fileName);
    form.append('model', 'form');
    form.append('files', file);
    fetch(api.OFFICE_LIST_UPLOADFILE_URL, {
      body: form,
      method: "post",
      headers: {"Content-Type": "multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d"}
    }).then((response) => {
      return response.json();
    }).then((responseData) => {
    if(responseData.code === 'success'){
      fileIndex += 1;
      this.setState({
        spinnerContent: '已上传: ' + fileIndex + '/' + totalFileNum,
      });
      //回调所选文件信息
      this.props.route.selectFile(responseData.path, file.fileName, fileIndex);
      if(arrUploadFiles.length > 0)
        this.doUpload();
      else {
        this.setState({
          upLoading: false,
        });
        this.props.dispatch(stopHandleTimeConsuming());
        Alert.alert('提示','文件上传成功!',[{text: '确定',onPress: ()=>{}}]);
        this.props.navigator.pop();
      }
    } else {
      this.setState({
        upLoading: false,
      });
      this.props.dispatch(stopHandleTimeConsuming());
      Alert.alert('提示',responseData.msg,[{text: '确定',onPress: ()=>{}}]);
    }
  }).catch((error) => {
    this.setState({
      upLoading: false,
    });
    this.props.dispatch(stopHandleTimeConsuming());
    Alert.alert('提示','文件上传失败,请重新上传!',[{text: '确定',onPress: ()=>{}}]);
    console.log('error-->>',error);
   }).done();

  }

  refreshFileList(){ //刷新文件列表
    FileManager.readDir(currentPath).then((result)=>{
      let tempArr=[];
      for (var i = 0; i < result.length; i++) {
        if (result[i].name != '.DS_Store') {
          tempArr.push(result[i])
        }
      }
      this.setState({
        fileList: tempArr,
      });
    }).catch((error)=>{
      console.log(error);
    });
  }

  onLeftBack(){
    if (this.state.upLoading == false) {
        if(currentPath != root){
          let pathAry = currentPath.split('/');
          let newPath = '';
          let i = 0;
          for(; i < pathAry.length - 1; i++){
            if(pathAry[i] != ''){
              newPath=newPath + '/'+pathAry[i];
            }
          }
          currentPath = newPath;
          this.refreshFileList();
        } else {
          this.props.navigator.pop();
        }
    }
  }
}

function mapStateToProps(state) {
  const {timeConsuming} = state;
  return {
    timeConsuming,
  }
}

export default connect(mapStateToProps)(FileSelect);

var styles = StyleSheet.create({
  textStyle: {
    marginLeft:10,
    marginRight:10,
    fontSize:16,
    fontWeight:'500',
    textAlign: 'center',
    color:'#ff8c00',
  },
});
