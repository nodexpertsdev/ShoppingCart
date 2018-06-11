import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../navigator';

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('loginStack');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
// const secondAction = AppNavigator.router.getActionForPathAndParams('drawerStack');
const initialNavState = AppNavigator.router.getStateForAction(tempNavState);

function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case 'loginStack':
      nextState = AppNavigator.router.getStateForAction(
        // NavigationActions.back(),
        NavigationActions.navigate({ routeName: 'loginStack' }),
        state,
      );
      break;
    case 'Login':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'loginScreen' }),
        // NavigationActions.back(),
        state,
      );
      break;
    case 'Signup':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'signupScreen' }),
        state,
      );
      break;
    case 'ForgotPass':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'forgotPasswordScreen' }),
        state,
      );
      break;
    case 'VerifyOTP':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'verificationScreen' }),
        state,
      );
      break;
    case 'SetPass':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'setPasswordScreen' }),
        state,
      );
      break;
    case 'drawerScreen':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'PrimaryDrawer' }),
        state,
      );
      break;
    case 'profileScreen':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Profile' }),
        state,
      );
      break;
    case 'editProfile':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'EditProfile' }),
        state,
      );
      break;
    case 'LOGOUT':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate({ routeName: 'loginStack' })],
        }),
        state,
      );
      break;
    case 'AddAddress':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'AddAddress' }),
        state,
      );
      break;
    case 'Home':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Home' }),
        state,
      );
      break;
    case 'CreateList':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'CreateList' }),
        state,
      );
      break;
    case 'MyOrderList':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'MyOrderList' }),
        state,
      );
      break;
    case 'DrawerToggle':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'DrawerToggle' }),
        state,
      );
      break;
    case 'NotificationList':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'NotificationList' }),
        state,
      );
      break;
    case 'ProductList':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'ProductList' }),
        state,
      );
      break;
    case 'OrderDetail':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'OrderDetail' }),
        state,
      );
      break;
    case 'OrderHistory':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'OrderHistory' }),
        state,
      );
      break;
    case 'MyOrder':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'MyOrder' }),
        state,
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

export default nav;
