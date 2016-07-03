'use strict';

import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  Platform,
  StyleSheet,
} from 'react-native';

import FileManager from 'react-native-fs';
import api from "../constants/Network";
import Intent from 'react-native-android-intent';
let path = Platform.OS === 'ios' ? `${FileManager.DocumentDirectoryPath}/attachment/`:'/sdcard/attachment/';
let filePath;
import WebviewContainer from '../containers/WebviewContainer';
import {changeWebviewUrl} from '../actions/webview';
export default class AttachmentDownload extends React.Component{
  constructor(props){
    super(props);
    this.state={
      row: this.props.row,
      content: this.props.row.content,
    };
    filePath = `${path}${this.props.route.processNo}--${this.props.route.processTitle}/`;
  }

  componentWillMount(){
    let content = eval('('+this.state.content+')');
    let newContent = [];
    if(content && content != ''){
      let remoteName, localName, status;
      for(let i = 0; i < content.length; i++) {
        let contentFile = {};
        for (let name in content[i]) {
          contentFile.remoteName = name;
          contentFile.localName = content[i][name];
          contentFile.status = '立即下载';
        }
        newContent.push(contentFile);
      }

      FileManager.readDir(`${filePath}`).then((result) => {
        for (let i = 0; i < result.length; i++) {
          for(let j = 0; j < newContent.length; j++) {
              if (newContent[j].localName === result[i].name) {
                newContent[j].status = '立即查看';
              }
          }
        }
        this.setState({content: newContent,});
      }).catch((err) => {
        console.log('AttachmentDownload => err', err);
      });
    }
    this.setState({content: newContent,});
  }

  render() {
    let content = this.state.content;
    let _this = this;
    let fileView = content.map(function(file) {
      return(
        <TouchableOpacity onPress={_this.clickFile.bind(_this, file)}>
          <Text style={styles.file} numberOfLines={1}>{file.status} : {file.localName}</Text>
        </TouchableOpacity>
      )
    });
    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.tile}>{this.state.row.title}:</Text>
        <View style={{flex: 1, flexDirection: 'column'}}>
          {fileView}
        </View>
      </View>
    );
  }

  clickFile(file){
    let content = this.state.content;
    let index = content.indexOf(file);
    if(file.status === ''){
      return;
    }
    if(file.status === '立即查看'){
      if(Platform.OS === 'ios'){
        let arr = file.localName.split(".");
        let url = `${filePath}${file.localName}`;
         const {navigator, dispatch} = this.props;
         dispatch(changeWebviewUrl(url));
         navigator.push({
          name: 'WebviewContainer',
          component: WebviewContainer,
        });
      }else{
        let openPath = `${filePath}${file.localName}`;
        Intent.open(openPath, (isOpen) => {
          if(isOpen) {
          } else {
            Alert.alert('提示',`手机未安装可以打开${file.localName}的APP,请将${filePath}${file.localName}复制到其他设备查看!`,[{text: '确定',onPress: ()=>{}}]);
          }
        });
      }
    }

    if(file.status === '立即下载' || file.status === '下载失败,请重新下载...' ){
      content[index].status = '下载中....';
      let url = api.OFFICE_LIST_DOWNLOADFILE_URL + file.remoteName;
      FileManager.mkdir(filePath).then(()=>{
        FileManager.downloadFile(url,`${filePath}${file.localName}`).then((success)=>{
          content[index].status = '立即查看';
          this.setState({content: content,})
        }).catch((error)=>{
          content[index].status = '下载失败,请重新下载...';
          this.setState({content: content,})
        });
      }).catch((error)=>{
      });
      this.setState({content: content,})
      return;
    }
  }
}

var styles = StyleSheet.create({
  file: {
    flex:1,
    marginTop:5,
    marginLeft: 4,
    marginRight:4,
    fontSize:15,
    color: '#317ef3',
    overflow:'hidden',
  },
  tile: {
    marginLeft: 8,
    marginRight: 4,
    marginTop:5,
    textAlign: 'right',
    color: '#333',
    fontSize:15,
  },
});
