import { TabNavigator, TabBarTop } from 'react-navigation';
import OrderHistory from '../components/OrderHistory';
import OnGoingOrder from '../components/OnGoingOrder';
import colorData from '../config/color';

const MyTabNavigator = TabNavigator(
  {
    OnGoingOrder: { screen: OnGoingOrder },
    OrderHistory: { screen: OrderHistory },
  },
  {
    navigationOptions: ({ navigation }) => ({

      title: 'My Orders',
      headerTitleStyle: {
        flex: 1,
        color: colorData.titleColor,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
      },
      tabBarLabel: () => {
        const { routeName } = navigation.state;
        let tabName;
        if (routeName === 'OnGoingOrder') {
          tabName = 'Ongoing Orders';
        } else if (routeName === 'OrderHistory') {
          tabName = 'Order History';
        }
        return tabName;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#38C7C2',
      inactiveTintColor: '#676767',
      labelStyle: { fontSize: 14, fontWeight: 'bold' },
      upperCaseLabel: false,
      style: {
        // marginTop: 63,
        backgroundColor: 'white',
      },
      indicatorStyle: {
        backgroundColor: colorData.cyanColor,
      },
    },
    // tabBarComponent: TabBarBottom,
    tabBarPosition: 'top',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarComponent: TabBarTop,
  },
);

MyTabNavigator.navigationOptions = {
  headerStyle: {
    backgroundColor: 'white',
    borderBottomWidth: 0,
  },
};

export default MyTabNavigator;
