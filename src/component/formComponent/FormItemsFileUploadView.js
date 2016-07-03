'use strict';

import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';

import Colors from '../../constants/Colors';
import FileSelect from './FileSelect';

export default class FormItemsFileUploadView extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      row: this.props.row,
      fileName: '',
      arrUploadFiles: [],
    };
    this.onSelect = this.onSelect.bind(this);
  }

  // componentDidMount(){
  //   if(this.state.row.content && this.state.row.fileName){
  //     this.selectFile(this.state.row.content, this.state.row.fileName);
  //   }
  // }

  render() {
    let _this = this;
    var fileView = this.state.arrUploadFiles.map(function(file) {
      return(
        <View style={styles.container}>
          <View style={formComponentStyles.titleContainer}>
            <Text style={formComponentStyles.title}>
              {file.fileIndex}
            </Text>
          </View>

          <View style={[styles.contentContainer]}>
            <Text numberOfLines={3} allowFontScaling={true} style={styles.content}>
            {file.fileName}
            </Text>
          </View>

          <TouchableOpacity onPress={()=>{
            if(file.fileName && file.fileName != ''){
              Alert.alert('','确定删除该附件?',[{text: '确定',onPress: ()=>{
                _this.selectFile('', '', file.fileIndex);
              }},{text: '取消',onPress: ()=>{}}]);
            }
          }}>
            <Image source={require('../../img/icon/sq_icon_del.png')} style={styles.pic} />
          </TouchableOpacity>
        </View>
      )
    });
    return(
      <View style={formComponentStyles.container}>
        <View style={formComponentStyles.titleContainer}>
          <Text style={formComponentStyles.title}>
            {this.state.row.title}
          </Text>
        </View>
        <View style={{flex: 1, flexDirection: 'column',}}>
          {fileView}
        </View>
        <TouchableOpacity onPress={this.onSelect}>
          <Image source={require('../../img/icon/sq_icon_upload.png')} style={styles.pic} />
        </TouchableOpacity>
      </View>
    );
  }

  onSelect(){
    this.props.navigator.push({
      name: 'fileSelect',
      component: FileSelect,
      selectFile: this.selectFile.bind(this),
    });
  }

  selectFile(result, fileName, fileIndex){
    let name = this.state.row.name + fileIndex;
    let extraData = {};
    extraData.type = 'fj';
    extraData.name = '' + this.state.row.name;
    extraData.index = fileIndex;
    this.props.onUserInput(name, result, extraData);
    this.props.onUserInput(`${name}OriginalFileName`, fileName);
    let file = {};
    file.fileName = fileName;
    file.fileIndex = fileIndex;
    //删除附件
    if(fileName == ''){
      for(let i = 0; i < this.state.arrUploadFiles.length; i++){
        if(this.state.arrUploadFiles[i].fileIndex == fileIndex){
          let tmpArrUploadFiles = this.state.arrUploadFiles;
          tmpArrUploadFiles.splice(i, 1);
          this.setState({
            arrUploadFiles: tmpArrUploadFiles,
          });
        }
      }
    //添加附件
    } else {
      let tmpArrUploadFiles = this.state.arrUploadFiles;
      //如果被选择的附件继续从１开始，说明用户重新上传了，此时清空之前的文件数组
      if(fileIndex == 1)
        tmpArrUploadFiles = [];
      tmpArrUploadFiles.push(file);
      this.setState({
        arrUploadFiles: tmpArrUploadFiles,
      });
    }
  }

}

var formComponentStyles = require('./styles');
var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor:Colors.white,
  },
  contentContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 8,
    marginTop: 8,
    marginBottom: 8,
    marginRight:10,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,

  },
  content: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    alignItems: 'center',
    width: 180,
  },
  pic:{
    marginRight:16,
    alignItems: 'center',
    height:32,
    width:32,
  },

});
