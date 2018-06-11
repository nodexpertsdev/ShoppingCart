import React from 'react';
import {
  Animated,
  Easing,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import DrawerButton from '../subComponents/DrawerButton';
import ScreenSwiper from '../components/ScreenSwiper';
import EditProfilScreen from '../components/ProfileScreens/EditProfileScreen';
import AddAddressScreen from '../components/AddressScreens/AddAddressScreen';
import HomeScreen from '../components/Home';
import CreateListScreen from '../components/CreateList';
import MyOrderList from '../components/MyOrderList';
import Notification from '../components/Notification';
import ProductListView from '../components/ProductList';
import TabNavigation from './tab';
import OrderDetailScreen from '../components/OrderDetail';
import OrderHistory from '../components/OrderHistory';

export const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0,
  },
});

const StackConfig = {
  transitionConfig: noTransitionConfig,
  navigationOptions: ({ navigation }) => ({
    gesturesEnabled: false,
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: 'transparent',
      borderBottomWidth: 0,
      shadowOpacity: 0,
      shadowOffset: {
        height: 0,
      },
      shadowRadius: 0,
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      elevation: 0,
    },
    headerLeft: <DrawerButton drawer={() => navigation.navigate('DrawerOpen')} />,
  }),
};

const stackScreen = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  OrderDetail: {
    screen: OrderDetailScreen,
  },
  OrderHistory: {
    screen: OrderHistory,
  },
  CreateList: {
    screen: CreateListScreen,
  },
  Profile: {
    screen: ScreenSwiper,
  },
  EditProfile: {
    screen: EditProfilScreen,
  },
  AddAddress: {
    screen: AddAddressScreen,
  },
}, { ...StackConfig });

export default stackScreen;

export const MyOrderListScreen = StackNavigator({
  MyOrderListView: {
    screen: MyOrderList,
  },
}, { ...StackConfig });

export const NotificationScreen = StackNavigator({
  NotificationView: {
    screen: Notification,
  },
}, { ...StackConfig });

export const ProductListScreen = StackNavigator({
  ProductList: {
    screen: ProductListView,
  },
}, { ...StackConfig });

export const MyOrderScreen = StackNavigator({
  MyOrder: {
    screen: TabNavigation,
  },
}, { ...StackConfig });
