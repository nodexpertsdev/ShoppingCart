import React, { Component } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import {
  View,
  SafeAreaView,
} from 'react-native';
import ProfileScreen from './ProfileScreen';
import AddressScreen from './AddressScreen';
import MycardScreen from './MycardScreen';
import style, { wp, viewportWidth, viewportHeight } from '../styles/style';

const colors = { black: '#1a1917' };

export const ENTRIES1 = [
  { item: 1 },
  { item: 2 },
  { item: 3 },
];

const slideWidth = wp(75, viewportWidth);
const itemHorizontalMargin = wp(2, viewportWidth);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + (itemHorizontalMargin * 2);
const backgroundColor = ['#4ED9D4', '#bbe491', '#FAB87F'];

export default class ScreenSwiper extends Component {
  static navigationOptions = {
    title: 'My Profile',
    headerTitleStyle: {
      color: '#fff',
      flex: 1,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 1,
    };
  }

  renderItemWithParallax = ({ item, index }) => {
    if (index === 0) {
      return <AddressScreen cutColor={backgroundColor[this.state.activeSlide]} />;
    }
    if (index === 1) {
      return <ProfileScreen cutColor={backgroundColor[this.state.activeSlide]} />;
    }
    return <MycardScreen cutColor={backgroundColor[this.state.activeSlide]} />;
  }

  render() {
    const bgColor = backgroundColor[this.state.activeSlide];
    return (
      <SafeAreaView style={[style.sharedStyles.mainContainer, { backgroundColor: bgColor }]} >
        <View style={[style.screenSwiperStyle.subContainer,
          { backgroundColor: bgColor, top: wp(8, viewportHeight) }]}
        >
          <Carousel
            ref={(c) => { this.slider1Ref = c; }}
            data={ENTRIES1}
            renderItem={this.renderItemWithParallax}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            hasParallaxImages
            firstItem={1}
            inactiveSlideScale={0.90}
            inactiveSlideOpacity={0.7}
            // inactiveSlideShift={20}
            containerCustomStyle={style.screenSwiperStyle.slider}
            contentContainerCustomStyle={style.screenSwiperStyle.sliderContentContainer}
            // loop
            // loopClonesPerSide={2}
            // autoplay
            // autoplayDelay={500}
            // autoplayInterval={3000}
            onSnapToItem={index => this.setState({ activeSlide: index })}
          />
          <Pagination
            dotsLength={ENTRIES1.length}
            activeDotIndex={this.state.activeSlide}
            containerStyle={style.screenSwiperStyle.paginationContainer}
            dotColor="rgba(255, 255, 255, 0.92)"
            dotStyle={style.screenSwiperStyle.paginationDot}
            inactiveDotColor={colors.black}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            carouselRef={this.slider1Ref}
            tappableDots={!!this.slider1Ref}
          />
        </View>
      </SafeAreaView>
    );
  }
}
