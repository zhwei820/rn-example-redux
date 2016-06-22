'use strict';

import {
	ListView,
	RefreshControl,
} from 'react-native';

import React, {
	Component,
	PropTypes
} from 'react';

import Pulldown from './Pulldown';
import Platform from 'Platform';

export default class RefreshableListView extends Component {
	static propTypes = {
		waitForRefreshText: PropTypes.string,
        couldRefreshText: PropTypes.string,
        refreshingText: PropTypes.string,
        refreshEndText: PropTypes.string,

        showArrowImg: PropTypes.bool,
        refreshing: PropTypes.bool,

        indicatorImg: PropTypes.object,
        indicatorArrowImg: PropTypes.object,

        onRefresh: PropTypes.func.isRequired,
        onScroll: PropTypes.func,
	};

	static defaultProps = {
		waitForRefreshText: '下拉可以刷新',
        couldRefreshText: '释放立即刷新',
        refreshingText: '正在刷新数据中..',
        refreshEndText: '刷新结束',

        showArrowImg: true,
        refreshing: false,

        indicatorArrowImg: {
          style:'',
          url:''
        },
        indicatorImg: {
          style:'',
          url:''
        },

        onScroll: () => {},
        refreshData: () => {},
	}

	constructor (props) {
		super(props);
	}

	getPlatform () {
		return Platform.OS;
	}

	isIOS () {
		const IOS_PLATFORM = 'ios';

		return this.getPlatform() === IOS_PLATFORM;
	}

	isAndroid () {
		const ANDROID_PLATFORM = 'android';

		return this.getPlatform() === ANDROID_PLATFORM;
	}

	renderIOSRefreshableListView () {
		return (
			<ListView
				{...this.props}
				onScroll = {() => {}}
				renderScrollComponent = {props => <Pulldown {...props}></Pulldown>}
			></ListView>
		);
	}

	renderAndroidRefreshableListView () {
		return (
			<ListView
				{...this.props}
				refreshControl = {
					<RefreshControl
						colors = {this.props.colors}
						enabled = {this.props.enabled}
						progressBackgroundColor = {this.props.progressBackgroundColor}
						progressViewOffset = {this.props.progressViewOffset}
						size = {this.props.size}
						onRefresh = {this.props.onRefresh}
						refreshing = {this.props.refreshing}
					></RefreshControl>
				}
			></ListView>
		);
	}

	render () {
		if (this.isIOS()) {
			return this.renderIOSRefreshableListView();
		} else if (this.isAndroid()) {
			return this.renderAndroidRefreshableListView();
		} else {
			return null;
		}
	}
}
