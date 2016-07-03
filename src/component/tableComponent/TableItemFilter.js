'use strict';

import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native';

import Colors from '../../constants/Colors';

import TextItem from './TextItem';
import TextareaItem from './TextareaItem';
import IntItem from './IntItem';
import DateItem from './DateItem';
import DateTimeItem from './DateTimeItem';
import CheckBoxItem from './CheckBoxItem';

export default class TableItemFilter extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        row: this.props.row,
      };
  }

  renderTableItem() {
    var _props = this.props;
    let value = this.props.value;
    if(this.state.row.type === 'text'){
      return(<TextItem row={this.state.row} onUserInput={(key, value) => this.props.onUserInput(key, value)} value={value}/>);
    }
    if(this.state.row.type === 'int'){
        return(<IntItem row={this.state.row} onUserInput={(key, value) => this.props.onUserInput(key, value)} value={value}/>);
    }
    if(this.state.row.type === 'standardDate'){
      return(<DateItem row={this.state.row} onUserInput={(key, value) => this.props.onUserInput(key, value)} value={value} refs={_props.refs} />);
    }
    if(this.state.row.type === 'fullDate'){
      return(<DateTimeItem row={this.state.row} onUserInput={(key, value) => this.props.onUserInput(key, value)} value={value} refs={_props.refs}/>);
    }
    if(this.state.row.type === 'textarea'){
      return(<TextareaItem row={this.state.row} onUserInput={(key, value) => this.props.onUserInput(key, value)} value={value}/>);
    }
    if(this.state.row.type === 'checkbox'){
      return(<CheckBoxItem row={this.state.row} onUserInput={(key, value) => this.props.onUserInput(key, value)} value={value}/>);
    }
  }

  render() {
    return(
      <View >
        {this.renderTableItem()}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    height:50,
  },
});
