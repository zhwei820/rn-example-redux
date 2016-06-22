'use strict';

import {
    View,
    Text,
    Image,
    StyleSheet,
    AsyncStorage,
    Animated,
    Easing,
    ScrollView,
    ActivityIndicator,
    ActivityIndicatorIOS,
    TouchableOpacity,
} from 'react-native';

import React, {
    Component,
    PropTypes
} from 'react';
//获取相应的请求接口
import Dimensions from 'Dimensions';

const BASE64_ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAABQBAMAAAD8TNiNAAAAJ1BMVEUAAACqqqplZWVnZ2doaGhqampoaGhpaWlnZ2dmZmZlZWVmZmZnZ2duD78kAAAADHRSTlMAA6CYqZOlnI+Kg/B86E+1AAAAhklEQVQ4y+2LvQ3CQAxGLSHEBSg8AAX0jECTnhFosgcjZKr8StE3VHz5EkeRMkF0rzk/P58k9rgOW78j+TE99OoeKpEbCvcPVDJ0OvsJ9bQs6Jxs26h5HCrlr9w8vi8zHphfmI0fcvO/ZXJG8wDzcvDFO2Y/AJj9ADE7gXmlxFMIyVpJ7DECzC9J2EC2ECAAAAAASUVORK5CYII=';

const SCROLL_THROTTLE = 16;

const REFRESH_STATE = {
    waitForRefresh: 0,
    couldRefresh: 1,
    refreshing: 2,
    refreshEnd: 3,
};

export default class extends Component {
    static propTypes = {
        waitForRefreshText: PropTypes.string,
        couldRefreshText: PropTypes.string,
        refreshingText: PropTypes.string,
        refreshEndText: PropTypes.string,

        indicatorImg: PropTypes.object,
        indicatorArrowImg: PropTypes.object,

        onRefresh: PropTypes.func.isRequired,

        onScrollChange: PropTypes.func,

        showArrowImg: PropTypes.bool,
        refreshing: PropTypes.bool
    };

    static defaultProps = {
        waitForRefreshText: '下拉可以刷新',
        couldRefreshText: '释放立即刷新',
        refreshingText: '正在刷新数据中..',
        refreshEndText: '刷新结束',

        indicatorArrowImg: {
          style:'',
          url:''
        },
        indicatorImg: {
          style:'',
          url:''
        },

        onScrollChange: () => {},

        onRefresh: () => {},

        showArrowImg: true,
        refreshing: false
    };

    constructor(props) {
        super(props);

        this.state = {
            prState: REFRESH_STATE.waitForRefresh,
            prArrowDeg: new Animated.Value(0),
        };

        this.dragFlag = false; //scrollview是否处于拖动状态的标志
    }

    onScroll(e) {
        var y = e.nativeEvent.contentOffset.y;

	    if (this.dragFlag) {
            if (y <= -50) {
    	        this.setState({
    	            prState: REFRESH_STATE.couldRefresh
    	        });
              	Animated.timing(this.state.prArrowDeg, {
                    toValue: 1,
                    duration: 100,
                    easing: Easing.inOut(Easing.quad)
                }).start();

            } else {
             	this.setState({
                	prState: REFRESH_STATE.waitForRefresh
              	});
              	Animated.timing(this.state.prArrowDeg, {
                    toValue: 0,
                    duration: 100,
                    easing: Easing.inOut(Easing.quad)
                }).start();
            }
	    }

        this.props.onScrollChange(e);
    }

    // 手指离开
    onScrollEndDrag(e) {
        let y = e.nativeEvent.contentOffset.y;
        this.dragFlag = false;

        if (y <= 0) {
            if (this.state.prState === REFRESH_STATE.couldRefresh) {
                this.scrollView.scrollTo({
                    x: 0,
                    y: -50,
                    animated: true
                });
                this.setState({
                    prState: REFRESH_STATE.refreshing,
                    prArrowDeg:new Animated.Value(0),
                });

                this.props.onRefresh();
            }
        }
    }

    // 手指未离开
    onScrollBeginDrag(e) {
	    this.dragFlag = true;
    }

    renderNormalContent() {
        let jsxArr = [];

        if (this.props.showArrowImg) {
            if (this.state.prState === REFRESH_STATE.refreshing) {
                jsxArr = jsxArr.concat(this.generateIndicatorImg());
            } else {
                jsxArr = jsxArr.concat(this.generateIndicatorArrowImg());
            }
        }

        jsxArr.push(this.generatePrTitle());

        return (
          	<View style={{alignItems:'center'}}>
	          	<View style={styles.indicatorContent}>
	              	{jsxArr.map((item,index)=>{
	                	return <View key={index}>{item}</View>
	              	})}
	          	</View>
          	</View>
        );
    }

    generateIndicatorImg () {
        let jsxArr = [];
        let indicatorStyle = styles.indicatorStyle;

        if (this.props.indicatorImg.url) {
            if (this.props.indicatorImg.style) {
                indicatorStyle = this.props.indicatorImg.style;
            }

            jsxArr.push(<Image style={indicatorStyle} source={{uri:this.props.indicatorImg.url}}/>);
        } else {
            jsxArr.push(<ActivityIndicatorIOS style={indicatorStyle} animated={true}/>);
        }

        return jsxArr;
    }

    generateIndicatorArrowImg () {
        let transform = [
            {
                rotate:this.state.prArrowDeg.interpolate({
                    inputRange: [0,1],
                    outputRange: ['0deg', '-180deg']
                })
            }
        ];
        let arrowStyle = {
            position:'absolute',
            width:14,
            height:23,
            left:-50,
            top:-4,
            transform: transform
        };

        let jsxArr = [];

        if (this.props.indicatorArrowImg.url) {
            if (this.props.indicatorArrowImg.style) {
                arrowStyle = this.props.arrowStyle.style;
            }

            jsxArr.push(<Animated.Image style={arrowStyle} resizeMode={'contain'} source={{uri: this.props.indicatorArrowImg.url}}/>);
        } else {
            jsxArr.push(<Animated.Image style={arrowStyle} resizeMode={'contain'} source={{uri: BASE64_ICON}}/>);
        }

        return jsxArr;
    }

    generatePrTitle() {
        let prTitle = '';

        switch(this.state.prState) {
            case REFRESH_STATE.waitForRefresh:
                prTitle = this.props.waitForRefreshText;
                break;
            case REFRESH_STATE.couldRefresh:
                prTitle = this.props.couldRefreshText;
                break;
            case REFRESH_STATE.refreshing:
                prTitle = this.props.refreshingText;
                break;
            case REFRESH_STATE.refreshEnd:
                prTitle = this.props.refreshEndText;
                break;
        }

        return this.wrapPrTitleInTextElement(prTitle);
    }

    wrapPrTitleInTextElement (prTitle) {
        return <Text style={styles.prStateStyle}>{prTitle}</Text>
    }

    renderIndicatorContent() {
       	let jsx = [this.renderNormalContent()];

        return (
            <View style={styles.pullRefresh}>
                {
                  jsx.map((item,index)=>{
                    return <View key={index}>{item}</View>
                  })
                }
            </View>
        );

    }

    scrollToTopWhenRefreshEnd () {
        if (this.state.prState === REFRESH_STATE.refreshEnd) {
            setTimeout(() => {
                this.scrollView.scrollTo({
                    x: 0,
                    y: 0,
                    animated: true
                });
            }, 500);
        }
    }

    componentWillReceiveProps (nextProps) {
        if (this.state.prState === REFRESH_STATE.refreshing && nextProps.refreshing === false) {
            this.setState({
                prState: REFRESH_STATE.refreshEnd
            });
        }
    }

    render() {
        this.scrollToTopWhenRefreshEnd();

        return (
            <ScrollView
                ref = {scrollView => this.scrollView = scrollView}
                {...this.props}
                scrollEventThrottle = {SCROLL_THROTTLE}
                scrollEnabled = {this.state.prState !== REFRESH_STATE.refreshing}
                onScrollEndDrag = {(e)=>this.onScrollEndDrag(e)}
                onScrollBeginDrag={()=>this.onScrollBeginDrag()}
                onScroll={(e)=>this.onScroll(e)}>
                    {this.renderIndicatorContent()}
                    {this.props.children}
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    pullRefresh:{
        position:'absolute',
        top:-50,
        left:0,
        right:0,
        height:50,
        backgroundColor:'#efefef',
        alignItems:'center',
        justifyContent:'flex-end'
    },
    prStateStyle: {
        marginBottom:15,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize:12,
    },
    indicatorStyle: {
		position:'absolute',
      	width:16,
      	height:16,
      	left: -50,
      	top: 0,
      	marginBottom:15,
    },
    indicatorContent:{
        flexDirection:'row',
        marginBottom:5
    }
});
