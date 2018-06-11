import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import LoginStack from './loginStack';
import Drawer from './Drawer';
import { addListener } from '../utils/redux';
import { noTransitionConfig } from './drawerStack';

export const AppNavigator = StackNavigator({
  loginStack: { screen: LoginStack },
  drawerStack: { screen: Drawer },
}, {
  headerMode: 'none',
  title: 'Main',
  initialRouteName: 'loginStack',
  transitionConfig: noTransitionConfig,
  navigationOptions: {
    gesturesEnabled: false,
  },
});

const AppWithNavigationState = (props) => {
  const { dispatch, nav } = props;
  return (
    <AppNavigator
      navigation={addNavigationHelpers({
        dispatch,
        state: nav,
        addListener,
      })}
    />
  );
};

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
