import React from 'react';
import { StackNavigator } from 'react-navigation';
import BackButton from '../subComponents/BackButton';
import LoginScreen from '../components/logicStackScreens/LoginScreen';
import SignupScreen from '../components/logicStackScreens/SignupScreen';
import ForgotPasswordScreen from '../components/logicStackScreens/ForgotPasswordScreen';
import VerificationScreen from '../components/logicStackScreens/VerificationScreen';
import SetPasswordScreen from '../components/logicStackScreens/SetPasswordScreen';

const LoginStack = StackNavigator({
  loginScreen: { screen: LoginScreen },
  signupScreen: { screen: SignupScreen },
  forgotPasswordScreen: { screen: ForgotPasswordScreen },
  verificationScreen: { screen: VerificationScreen },
  setPasswordScreen: { screen: SetPasswordScreen },
}, {
  headerMode: 'float',
  navigationOptions: ({ navigation }) => ({
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
    gesturesEnabled: false,
    headerLeft: <BackButton back={() => navigation.goBack()} />,
    headerTintColor: 'black',
  }),
});

export default LoginStack;
