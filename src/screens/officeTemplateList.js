'use strict'

import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  ListView,
  TouchableHighlight,
  View,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';

import Colors from '../constant/Colors';
// import NavigationBar from '../components/ZqOfficeNavigationBar';
// import OfficeFormContainer from '../container/OfficeFormContainer'
import {fetchOfficeTemplateList} from '../reducers/officeTemplateList/officeTemplateListAction';
import {startHandleTimeConsuming, stopHandleTimeConsuming} from '../reducers/timeConsuming/timeConsumingAction';
import Spinner from '../lib/react-native-loading-spinner-overlay';
import {showAlert} from '../utils/RequestUtils';

class OfficeTemplateList extends React.Component {
  constructor(props){
    super(props);

    this.renderItem = this.renderItem.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {officeTemplateList} = nextProps;
    if(officeTemplateList.templateListFetched){
      nextProps.dispatch(stopHandleTimeConsuming());
      if(officeTemplateList.error){
        showAlert(officeTemplateList.error);
      }
    }
  }

  componentDidMount() {
    const {dispatch, route} = this.props;
    const { login } = this.props;
    dispatch(fetchOfficeTemplateList(this.props.templateOption.id, login.rawData.userId));
    dispatch(startHandleTimeConsuming());
  }

  render() {
    const {route, officeTemplateList} = this.props;
    return(
       <View style={styles.background}>
         <ListView
           dataSource={officeTemplateList.templateListData}
           renderRow={this.renderItem}/>

       </View>
    );
 }

  renderItem(officeFormData){
    return (
      <TouchableHighlight onPress={this.onSelect.bind(this, officeFormData)}>
        <View style={styles.BigView}>
          <View style={styles.leftView}>
            <Text style={styles.textStyle} numberOfLines={1}>{officeFormData.name}</Text>
          </View>
          <View style={styles.rightView}>
            <Image style={styles.postButton} source={require('../img/icon/icon-next.png')}/>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  onLeftBack() {
    const {navigator} = this.props;
    navigator.pop();
  }

  onSelect(officeFormData){
    // const {navigator} = this.props;
    // navigator.push({
    //   name: "OfficeForm",
    //   component: OfficeFormContainer,
    //   officeFormData: officeFormData,
    // });
    this.props.navigator.push({
      title: officeFormData.name,
      screen: "example.OfficeForm",
      animated: true,
      passProps: {
        officeFormData: officeFormData,
      }

    })

  }
};

var styles = StyleSheet.create({
  BigView:{
    backgroundColor:'white',
    borderBottomWidth:1,
    borderBottomColor:Colors.lightgrey,
    flexDirection: 'row',
    height:44,
  },
  leftView:{
    flex:9.5,
    marginTop:10,
    marginBottom:10,
    marginLeft:10,
    flexDirection:'row',
  },
  background:{
    flex: 1,
    backgroundColor: Colors.mainBackground,
  },
 postButton: {
    width: 8,
    height: 13,
		margin: 15,
		alignSelf: 'center',
		justifyContent: 'center'
	},
  textStyle:{
    fontSize:14,
    color:Colors.black,
  },
});

function mapStateToProps(state) {
  const {officeTemplateList,login} = state;
  return {
    officeTemplateList,
    login,
  }
}

export default connect(mapStateToProps)(OfficeTemplateList);
