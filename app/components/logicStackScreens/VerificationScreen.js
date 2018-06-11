import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { OTPform } from '../../subComponents';

import styles from '../../styles/style';

class VerificationScreen extends Component {
  static navigationOptions = {
    title: 'Verification',
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
      otp: '',
    };
  }

  onSubmit = () => {
    this.props.setPass();
  }

  setOtp = (otp) => {
    this.setState({ otp });
  }

  render() {
    return (
      <ImageBackground source={require('../../Images/bg_leaf.png')} style={styles.sharedStyles.backgroundImage}>
        <KeyboardAwareScrollView contentContainerStyle={styles.editProfileScreenStyle.subContainer}>
          <Image source={require('../../Images/verification_img.png')} style={[styles.sharedStyles.screenBanner, { flex: 2 }]} />
          <View style={styles.sharedStyles.subComponent}>
            <View style={{ flex: 7, alignItems: 'center' }} >
              <View style={styles.sharedStyles.flexBoard}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={styles.sharedStyles.h1Text}>We have sent you an OTP on</Text>
                  <Text style={{ paddingTop: 15, fontWeight: 'bold' }}>Dean.01@gmail.com</Text>
                </View>
                <View style={[styles.VerificationScreenStyle.OTPInputWrapper, { flex: 2 }]}>
                  <Text style={[styles.sharedStyles.h1Text, { paddingVertical: 10, color: '#1f1f1f' }]}>Enter your OTP here</Text>
                  <OTPform pinLength={4} getOTP={this.setOtp} />
                </View>
              </View>
            </View>
            <View style={[styles.sharedStyles.screenBottomContainer, { justifyContent: 'space-evenly' }]}>
              <TouchableOpacity style={styles.sharedStyles.button} onPress={this.onSubmit}>
                <Text style={styles.sharedStyles.buttonText}>Verify</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.sharedStyles.linkText}>Resend Code</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}

VerificationScreen.propTypes = {
  navigation: PropTypes.object.isRequired, // eslint-disable-line
  setPass: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  navigation: state.nav,
});

const mapDispatchToProps = dispatch => ({
  setPass: () => dispatch({ type: 'SetPass' }), // eslint-disable-line
});

export default connect(mapStateToProps, mapDispatchToProps)(VerificationScreen);
