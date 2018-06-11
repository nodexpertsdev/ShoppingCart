import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  View,
  Text,
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from '../../styles/style';

class ForgotPasswordScreen extends Component {
  static navigationOptions = {
    title: 'Reset Password',
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16,
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      email: null,
    };
  }

  send = () => {
    if (!this.state.email) {
      Alert.alert('Email field can not be left blank');
      return false;
    }
    this.props.sendOTP();
    return true;
  }

  render() {
    return (
      <ImageBackground source={require('../../Images/bg_leaf.png')} style={styles.sharedStyles.backgroundImage}>
        <KeyboardAwareScrollView contentContainerStyle={styles.editProfileScreenStyle.subContainer}>
          <Image source={require('../../Images/reset_password.png')} style={[styles.sharedStyles.screenBanner, { flex: 2 }]} />
          <View style={styles.sharedStyles.subComponent}>
            <View style={{ flex: 8, alignItems: 'center' }} >
              <View style={styles.sharedStyles.flexBoard}>
                <Text style={styles.sharedStyles.h1Text}>Forgot Your Password ?</Text>
                <View style={{ alignItems: 'center' }}>
                  <Text>
                    Please enter your registered Email Address to
                  </Text>
                  <Text>reset your password</Text>
                </View>
              </View>
              <View style={styles.forgotPassScreenStyle.emailInputWrapper}>
                <View style={styles.sharedStyles.inputBlackBackground}>
                  <TextInput style={{ color: 'white', flex: 1, textAlign: 'center' }} placeholder="Enter Email Address Here" placeholderTextColor="white" underlineColorAndroid="transparent" keyboardType="email-address" onChangeText={text => this.setState({ email: text })} />
                </View>
              </View>
            </View>
            <View style={[styles.sharedStyles.screenBottomContainer, { justifyContent: 'center' }]}>
              <TouchableOpacity
                style={styles.sharedStyles.button}
                onPress={this.send}
              >
                <Text style={styles.sharedStyles.buttonText}>Send OTP</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}

ForgotPasswordScreen.propTypes = {
  navigation: PropTypes.object.isRequired, // eslint-disable-line
  sendOTP: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  navigation: state.nav,
});

const mapDispatchToProps = dispatch => ({
  sendOTP: () => dispatch({ type: 'VerifyOTP' }), // eslint-disable-line
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen);
