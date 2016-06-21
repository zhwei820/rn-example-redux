import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  View
} from 'react-native';

const styles = require('./styles');

const { bool, func, number, string } = React.PropTypes;

const window = Dimensions.get('window');

const SCROLLVIEW_REF = 'ScrollView';

const pivotPoint = (a, b) => (a - b);

const renderEmpty = () => <View/>;

// Override `toJSON` of interpolated value because of
// an error when serializing style on view inside inspector.
// See: https://github.com/jaysoo/react-native-parallax-scroll-view/issues/23
const interpolate = (value, opts) => {
  const x = value.interpolate(opts);
  x.toJSON = () => x.__getValue();
  return x;
};

// Properties accepted by `ParallaxScrollView`.
const IPropTypes = {
  fadeOutForeground: bool,
  fadeOutBackground: bool,
  contentBackgroundColor: string,
  onChangeHeaderVisibility: func,
  parallaxHeaderHeight: number.isRequired,
  renderFixedHeader: func,
  renderForeground: func,
  renderScrollComponent: func,
  renderStickyHeader: func,
  stickyHeaderHeight: number,
  contentContainerStyle: View.propTypes.style
};

class ParallaxScrollView extends Component {
  constructor(props) {
    super(props);
    if (props.renderStickyHeader && !props.stickyHeaderHeight) {
      console.warn('Property `stickyHeaderHeight` must be set if `renderStickyHeader` is used.');
    }
    if (props.renderParallaxHeader !== renderEmpty && !props.renderForeground) {
      console.warn('Property `renderParallaxHeader` is deprecated. Use `renderForeground` instead.');
    }
    this.state = {
      scrollY: new Animated.Value(0),
      viewHeight: window.height,
      viewWidth: window.width
    };
    this._footerComponent = { setNativeProps() {} }; // Initial stub
    this._footerHeight = 0;
  }

  render() {
    const {
      children,
      contentBackgroundColor,
      fadeOutForeground,
      fadeOutBackground,
      parallaxHeaderHeight,
      renderFixedHeader,
      renderForeground,
      renderParallaxHeader,
      renderScrollComponent,
      renderStickyHeader,
      stickyHeaderHeight,
      style,
      contentContainerStyle,
      ...scrollViewProps
    } = this.props;

    let backgroundColor = "transparent";

    const foreground = this._renderForeground({ fadeOutForeground, parallaxHeaderHeight, stickyHeaderHeight, renderForeground: renderForeground || renderParallaxHeader });
    const bodyComponent = this._wrapChildren(children, { contentBackgroundColor, stickyHeaderHeight, contentContainerStyle });
    const maybeStickyHeader = this._maybeRenderStickyHeader({ parallaxHeaderHeight, stickyHeaderHeight, backgroundColor, renderFixedHeader, renderStickyHeader });
    const scrollElement = renderScrollComponent(scrollViewProps);

    return (
      <View style={[style, styles.container]}
            onLayout={(e) => this._maybeUpdateViewDimensions(e)}>
        {
          React.cloneElement(scrollElement, {
              ref: SCROLLVIEW_REF,
              style: [styles.scrollView, scrollElement.props.style],
              scrollEventThrottle: 16,
            },
            foreground,
            bodyComponent,
          )
        }
      </View>
    );
  }


  _maybeUpdateViewDimensions(e) {
    const { nativeEvent: { layout: { width, height} } } = e;

    if (width !== this.state.viewWidth || height !== this.state.viewHeight) {
      this.setState({
        viewWidth: width,
        viewHeight: height
      });
    }
  }


  _renderForeground({ fadeOutForeground, parallaxHeaderHeight, stickyHeaderHeight, renderForeground }) {
    const { scrollY } = this.state;
    const p = pivotPoint(parallaxHeaderHeight, stickyHeaderHeight);
    return (
      <View style={styles.parallaxHeaderContainer}>
        <Animated.View
          style={[styles.parallaxHeader, {
                  height: parallaxHeaderHeight,
                  opacity: fadeOutForeground
                     ? interpolate(scrollY, {
                      inputRange: [0, p *  (1/2), p * (3/4), p],
                      outputRange: [1, 0.3, 0.1, 0],
                      extrapolate: 'clamp'
                    })
                    : 1
                }]}>
            <View style={{ height: parallaxHeaderHeight }}>
              { renderForeground() }
            </View>
        </Animated.View>
      </View>
    );
  }

  _wrapChildren(children, { contentBackgroundColor, stickyHeaderHeight, contentContainerStyle }) {
    const { viewHeight } = this.state;
    const containerStyles = [{backgroundColor: contentBackgroundColor}];

    if(contentContainerStyle)
      containerStyles.push(contentContainerStyle);

    return (
      <View
        style={containerStyles}

              >
        { children }
      </View>
    );
  }

  _maybeRenderStickyHeader({ parallaxHeaderHeight, stickyHeaderHeight, backgroundColor, renderFixedHeader, renderStickyHeader }) {
    const { viewWidth, scrollY } = this.state;
    if (renderStickyHeader || renderFixedHeader) {
      const p = pivotPoint(parallaxHeaderHeight, stickyHeaderHeight);
      return (
        <View style={[styles.stickyHeader, { width: viewWidth, ...(stickyHeaderHeight ? { height: stickyHeaderHeight } : null ) }]}>
          {
            renderStickyHeader
              ? (
                <Animated.View
                  style={{
                  backgroundColor: backgroundColor,
                  height: stickyHeaderHeight,
                  opacity: interpolate(scrollY, {
                    inputRange: [0, p],
                    outputRange: [0, 1],
                    extrapolate: 'clamp'
                  })
                }}>
                  <Animated.View
                    style={{
                    transform: [{
                      translateY: interpolate(scrollY, {
                        inputRange: [0, p],
                        outputRange: [stickyHeaderHeight, 0],
                        extrapolate: 'clamp'
                      })
                    }]
                  }}>
                    { renderStickyHeader() }
                  </Animated.View>
                </Animated.View>
              )
              : null
          }
          { renderFixedHeader && renderFixedHeader() }
        </View>
      );
    } else {
      return null;
    }
  }
}

ParallaxScrollView.propTypes = IPropTypes;

ParallaxScrollView.defaultProps = {
  contentBackgroundColor: '#fff',
  fadeOutForeground: true,
  onChangeHeaderVisibility: () => {},
  renderScrollComponent: props => <ScrollView {...props}/>,
  renderParallaxHeader: renderEmpty, // Deprecated (will be removed in 0.18.0)
  renderForeground: null,
  stickyHeaderHeight: 0,
  contentContainerStyle: null
};

module.exports = ParallaxScrollView;
