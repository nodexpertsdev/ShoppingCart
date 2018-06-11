import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TextInput,
  ImageBackground,
} from 'react-native';

import MySnackbar from '../../subComponents/MySnackbar';
import styles from '../../styles/style';
import { request, isValidMail } from '../../config/utility';
import stringData from '../../config/string';
import colorData from '../../config/color';

let emailValidationMsg = stringData.createList.warningEmailRequire;
let errorMessage;

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Sign In',
    headerLeft: null,
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
      userNameFocused: false,
      passwordFocused: false,
      username: '',
      password: '',
      showValidation: false,
      isEmailValid: true,
      snackbarVisibility: false,
      // emailValidationMsg: stringData.createList.inlineWarningMessage,
    };
  }

  onSubmit = async () => {
    Keyboard.dismiss();
    this.newData(true, 'showValidation');
    if (!this.state.username) {
      this.setState({ isEmailValid: false });
      emailValidationMsg = stringData.createList.warningEmailRequire;
      return null;
    }
    // if (!this.state.username || !this.state.password) {
    //   Alert.alert('Please Fill the Mandartory Fields');
    //   return null;
    // }
    const { username } = this.state;
    if (!isValidMail(username)) {
      this.setState({ isEmailValid: false });
      emailValidationMsg = stringData.createList.warningEmail;
      // Alert.alert('Invalid username Input');
      return null;
    }
    const queryData = `{
      "email": "${this.state.username}",
      "password": "${this.state.password}"
    }`;
    const query = `query(
      $email: String!,
      $password: String!
    ) {
      login(
        email: $email,
        password: $password
      )
    }`;
    let data = null;
    try {
      data = await request(query, queryData);
    } catch (err) {
      // Alert.alert('Some Error occured');
      errorMessage = { stringData };
      this.setState({ snackbarVisibility: true });
      return null;
    }
    if (data.login) {
      this.props.login(data.login);
      this.setState({ username: null, password: null });
      this.props.primaryScreen();
      // Alert.alert(
      //   'Login',
      //   'Login Successfull',
      //   [
      //     { text: 'OK', onPress: () => { this.setState({ username: null, password: null }); this.props.primaryScreen(); } },
      //   ],
      //   { cancelable: false },
      // );
      return null;
    }
    if (data[0] && data[0].message) {
      errorMessage = data[0].message;
      this.setState({ snackbarVisibility: true });
      // Alert.alert(`Error ${data[0].message}`);
    }
    return null;
  }

  newData = (text, field) => {
    this.setState({ [field]: text });
  }

  emailData = (text) => {
    if (!text) {
      emailValidationMsg = stringData.createList.warningEmailRequire;
    } else if (!isValidMail(text)) { emailValidationMsg = stringData.createList.warningEmail; }
    this.setState({ username: text, isEmailValid: isValidMail(text) });
  }

  render() {
    return (
      <ImageBackground source={require('../../Images/login_bg.png')} style={styles.sharedStyles.backgroundImage}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.editProfileScreenStyle.subContainer}>
            <View style={{ flex: 2, justifyContent: 'center' }}>
              <Image source={require('../../Images/logo_main.png')} style={styles.sharedStyles.screenBanner} />
            </View>
            <View style={{ flex: 4, alignItems: 'center', justifyContent: 'space-evenly' }}>
              <View style={(this.state.showValidation && !this.state.isEmailValid) ? [styles.sharedStyles.inputBoxWithIcon, { borderColor: colorData.warningColor, borderWidth: 1 }] : styles.sharedStyles.inputBoxWithIcon}>
                {this.state.userNameFocused ? <Image source={require('../../Images/user.png')} style={styles.sharedStyles.icon} /> :
                <Image source={require('../../Images/user_name_fade.png')} style={styles.sharedStyles.icon} /> }
                <TextInput onFocus={() => this.setState({ userNameFocused: true })} onChangeText={text => this.emailData(text)} returnKeyType="next" onSubmitEditing={() => this.passField.focus()} blurOnSubmit={false} onBlur={() => this.setState({ userNameFocused: false })} style={styles.sharedStyles.IcontextInput} underlineColorAndroid="transparent" placeholder="Email" keyboardType="email-address" />
              </View>
              {(this.state.showValidation && !this.state.isEmailValid) ? <Text style={styles.loginScreenStyle.inlineWarnignStyle}>{emailValidationMsg}</Text> : null}
              <View style={(this.state.showValidation && !this.state.password) ? [styles.sharedStyles.inputBoxWithIcon, { borderColor: colorData.warningColor, borderWidth: 1 }] : styles.sharedStyles.inputBoxWithIcon}>
                {this.state.passwordFocused ? <Image source={require('../../Images/password_dark.png')} style={styles.sharedStyles.icon} /> : <Image source={require('../../Images/password.png')} style={styles.sharedStyles.icon} /> }
                <TextInput ref={(input) => { this.passField = input; }} onChangeText={text => this.newData(text, 'password')} onFocus={() => this.setState({ passwordFocused: true })} onBlur={() => this.setState({ passwordFocused: false })} style={styles.sharedStyles.IcontextInput} underlineColorAndroid="transparent" placeholder="Password" secureTextEntry />
              </View>
              {(this.state.showValidation && !this.state.password) ? <Text style={styles.loginScreenStyle.inlineWarnignStyle}>{stringData.createList.warningPassRequired}</Text> : null}
              <TouchableOpacity onPress={this.props.forgotPasswordScreen} >
                <Text style={styles.sharedStyles.linkText}>
                  Forgot Your Password?
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 4, alignItems: 'center', justifyContent: 'space-between' }}>
              <TouchableOpacity style={styles.sharedStyles.button} underlayColor="transparent" onPress={this.onSubmit} >
                <Text style={styles.sharedStyles.buttonText}>Sign In</Text>
              </TouchableOpacity>
              <View style={styles.sharedStyles.linkContainer}>
                <Text style={{ paddingRight: 5 }}>Don{'\''}t have an account?</Text>
                <TouchableOpacity onPress={this.props.signupScreen} >
                  <Text style={styles.sharedStyles.linkText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ paddingVertical: 5 }}>or Via Social Media</Text>
                <Image source={require('../../Images/google_plus.png')} style={styles.loginScreenStyle.socialMediaLogin} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <MySnackbar
          snackbarVisibility={this.state.snackbarVisibility}
          message={errorMessage}
          actionHandler={() => this.setState({ snackbarVisibility: false })}
          actionText="Ok"
        />
      </ImageBackground>
    );
  }
}

// eslint-disable-next-line react/no-typos
LoginScreen.propTypes = {
  navigation: PropTypes.object.isRequired, // eslint-disable-line
  signupScreen: PropTypes.func.isRequired,
  forgotPasswordScreen: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  primaryScreen: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  navigation: state.nav,
});

const mapDispatchToProps = dispatch => ({
  login: token => dispatch({ type: 'LOGIN', token }),
  signupScreen: () => dispatch({ type: 'Signup' }),
  forgotPasswordScreen: () => dispatch({ type: 'ForgotPass' }),
  primaryScreen: () => dispatch({ type: 'drawerScreen' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
