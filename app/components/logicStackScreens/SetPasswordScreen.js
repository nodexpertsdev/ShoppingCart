import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import _ from 'lodash';

import {
  View,
  Text,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from '../../styles/style';

class SetPasswordScreen extends Component {
  static navigationOptions = {
    title: 'Set Password',
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
      password: null,
      confirmPassword: null,
    };
    this.inputRefs = [];
  }

  saveData = (data, field) => this.setState({ [field]: data });

  save = () => {
    if (this.state.password && this.state.confirmPassword && this.state.password === this.state.confirmPassword) { // eslint-disable-line
      Alert.alert(`Matched ${this.state.password}`);
    } else {
      Alert.alert('Not Matched');
    }
    this.setState({ password: null, confirmPassword: null });
  }

  render() {
    return (
      <ImageBackground source={require('../../Images/bg_leaf.png')} style={styles.sharedStyles.backgroundImage} >
        <KeyboardAwareScrollView contentContainerStyle={styles.editProfileScreenStyle.subContainer}>
          <Image source={require('../../Images/password_img.png')} style={[styles.sharedStyles.screenBanner, { flex: 2 }]} />
          <View style={styles.sharedStyles.subComponent}>
            <View style={{ flex: 7, alignItems: 'center' }} >
              <View style={[styles.sharedStyles.flexBoard, { justifyContent: 'space-evenly' }]}>
                <Text style={styles.sharedStyles.h1Text}>Reset Your Password ?</Text>
                <Text style={{ fontWeight: 'bold', color: '#1f1f1f', fontSize: 13 }}>Enter new password and tap on save</Text>
              </View>
              <View style={styles.SetPasswordScreenStyle.passFieldWrapper}>
                <View style={styles.sharedStyles.inputBlackBackground}>
                  <TextInput value={this.state.password} autoFocus returnKeyType="next" onSubmitEditing={() => this.confirmPass.focus()} blurOnSubmit={false} style={{ color: 'white', flex: 1, textAlign: 'center' }} secureTextEntry placeholder="Password" placeholderTextColor="white" underlineColorAndroid="transparent" onChangeText={text => this.saveData(text, 'password')} />
                </View>
                <View style={styles.sharedStyles.inputBlackBackground}>
                  <TextInput ref={(input) => { this.confirmPass = input; }} value={this.state.confirmPassword} style={{ color: 'white', flex: 1, textAlign: 'center' }} secureTextEntry placeholder="Confirm Password" placeholderTextColor="white" underlineColorAndroid="transparent" onChangeText={text => this.saveData(text, 'confirmPassword')} />
                </View>
              </View>
            </View>
            <View style={[styles.sharedStyles.screenBottomContainer, { flex: 2, justifyContent: 'center' }]}>
              <TouchableOpacity
                style={styles.sharedStyles.button}
                onPress={this.save}
              >
                <Text style={styles.sharedStyles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}

SetPasswordScreen.propTypes = {
  navigation: PropTypes.object.isRequired, // eslint-disable-line
  sendOtp: PropTypes.func.isRequired, // eslint-disable-line
};

const mapStateToProps = state => ({
  navigation: state.nav,
});

const mapDispatchToProps = dispatch => ({
  sendOtp: () => dispatch({ type: 'Send_OTP' }), // eslint-disable-line
});

export default connect(mapStateToProps, mapDispatchToProps)(SetPasswordScreen);
