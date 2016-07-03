'use strict';

import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';

import Colors from '../../constants/Colors';
import TaskDetailContainer from '../../containers/TaskDetailContainer';

export default class FormItemsLinkView extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      row: this.props.row,
    };
  }


    render() {
        return(
            <View style={formComponentStyles.container}>
                <View style={formComponentStyles.titleContainer}>
                    <Text style={formComponentStyles.title}>
                        {this.state.row.title}
                    </Text>
                </View>
                <View style={styles.contentContainer}>
                    <TouchableOpacity style={{flex: 1, flexDirection: 'row',alignItems: 'center'}} onPress={this.onPress.bind(this)}>
                        <Text numberOfLines={1} allowFontScaling={true} style={styles.content}>
                            {this.state.row.content}
                        </Text>
                        <Image source={require('../../img/icon/link.png')} style={styles.pic} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    onPress(){
        if(this.state.row.readOnly){
            if(this.state.row.content && this.state.row.content != ''){
                this.props.navigator.push({
                  name: 'taskDetail',
                  component: TaskDetailContainer,
                  type: 'link',
                  linkedProcessNo: this.state.row.content,
                });
            }
        } else {
            Alert.alert('','抱歉!现在移动端的关联单不提供输入.',[{text: '确定',onPress: ()=>{}}])
        }
    }

}

var formComponentStyles = require('./styles');
var styles = StyleSheet.create({
  contentContainer:{
    flex: 1,
    marginLeft: 8,
    marginTop: 8,
    marginBottom: 8,
    marginRight:10,
    borderRadius: 5,
  },
  content: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    flex: 1,
  },
  pic:{
    alignSelf: 'flex-end',
    height: 32,
    width: 32,
  },

});
