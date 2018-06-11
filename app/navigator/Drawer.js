import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { DrawerNavigator, SafeAreaView } from 'react-navigation';
import stackScreen, { MyOrderListScreen, NotificationScreen, ProductListScreen, MyOrderScreen } from './drawerStack';
import menuItems from '../config/menu';

const activeTintColor = '#fff';
const activeBackgroundColor = 'rgba(118, 209, 144, 1)';
const inactiveTintColor = 'rgba(0, 0, 0, .87)';
const inactiveBackgroundColor = 'transparent';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 10,
    width: 15,
    alignItems: 'center',
  },
  inactiveIcon: {
    /*
     * Icons have 0.54 opacity according to guidelines
     * 100/87 * 54 ~= 62
     */
    opacity: 0.62,
  },
  label: {
    margin: 16,
    fontWeight: 'bold',
  },
  iconImage: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },
  profileContainer: {
    height: 140,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: 'contain',
  },
  drawerFooter: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#1f1f1f',
  },
  menuContainer: {
    flex: 4,
    marginVertical: 10,
  },
  menuImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

const DrawerContent = (props) => {
  const { activeItemKey } = props;

  const onItemPress = (focused, action) => {
    props.onClick('DrawerToggle');
    if (!focused) {
      props.onClick(action);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Menu</Text>
      </View>
      <View style={styles.profileContainer}>
        <Image source={require('../Images/picture.png')} style={styles.profileImage} />
        <View style={{ marginLeft: 8 }}>
          <Text style={{ color: '#000', fontSize: 20 }}>
          Dean Ambrose
          </Text>
          <TouchableOpacity onPress={props.profileScreen} >
            <Text style={{ color: '#76D190', fontWeight: 'bold', fontSize: 12 }}>
              View Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.menuContainer} forceInset={{ top: 'always', horizontal: 'never' }}>
        {
          menuItems.map((items, i) => {
            const focused = activeItemKey === items.action;
            const backgroundColor = focused ? activeBackgroundColor : inactiveBackgroundColor;
            const color = focused ? activeTintColor : inactiveTintColor;
            if (items.action) {
              return (
                <TouchableOpacity key={`menu${i + 0}`} style={[styles.item, { backgroundColor }]} onPress={() => onItemPress(focused, items.action)} >
                  <View style={styles.icon}>
                    <Image source={items.icon} style={styles.iconImage} />
                  </View>
                  <Text style={[styles.label, { color }]}>{items.label}</Text>
                </TouchableOpacity>
              );
            }
            return (
              <TouchableOpacity key={`menu${i + 0}`} style={[styles.item, { backgroundColor }]} onPress={() => onItemPress(focused, items.action)}>
                <View style={styles.icon}>
                  <Image source={items.icon} style={styles.iconImage} />
                </View>
                <Text style={[styles.label, { color }]}>{items.label}</Text>
              </TouchableOpacity>
            );
          })
        }
      </ScrollView>
      <View style={styles.drawerFooter}>
        <Text style={{ fontSize: 10 }}>Version 2.6.01 Copyright @ Shopping</Text>
      </View>
    </SafeAreaView>
  );
};

DrawerContent.propTypes = {
  navigation: PropTypes.object.isRequired, // eslint-disable-line
  onClick: PropTypes.func.isRequired,
  profileScreen: PropTypes.func.isRequired,
  activeItemKey: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired, //eslint-disable-line
};

const mapStateToProps = state => ({
  navigation: state.nav,
});

const mapDispatchToProps = dispatch => ({
  onClick: data => dispatch({ type: data }),
  profileScreen: () => dispatch({ type: 'profileScreen' }),
});

const NewDrawerContent = connect(mapStateToProps, mapDispatchToProps)(DrawerContent);

const Drawer = DrawerNavigator({
  PrimaryDrawer: { screen: stackScreen },
  MyOrderList: { screen: MyOrderListScreen },
  NotificationList: { screen: NotificationScreen },
  ProductList: { screen: ProductListScreen },
  MyOrder: { screen: MyOrderScreen },
}, {
  gesturesEnabled: false,
  contentComponent: props => <NewDrawerContent {...props} />,
  drawerBackgroundColor: '#fff',
});

export default Drawer;
