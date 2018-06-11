import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
  View,
  Text,
  Image,
  TextInput,
  Keyboard,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MySnackbar from '../../subComponents/MySnackbar';
import { RadioForm } from '../../subComponents';
import { request, isValidMail } from '../../config/utility';
import styles, { viewportHeight, viewportWidth, wp } from '../../styles/style';
import stringData from '../../config/string';

let errorMessage;
let emailValidationMsg = stringData.createList.warningEmailRequire;
let phoneValidationMsg = stringData.createList.warningPhoneNorequired;
let passwordValidationMsg = stringData.createList.warningPassRequired;
let confirmPasswordValidationMsg = stringData.createList.warningCnfmPassRequired;


class SignupScreen extends Component {
  static navigationOptions = {
    title: 'Sign Up',
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16,
    },
  }

  constructor(props) {
    super(props);
    this.initialState = {
      radio_props: [
        { label: 'Male', value: 0 },
        { label: 'Female', value: 1 },
        { label: 'Others', value: 2 },
      ],
      genderSelected: null,
      firstName: null,
      lastName: null,
      gender: null,
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      showValidation: false,
      isEmailValid: false,
      isPhoneValid: false,
      isPassValid: false,
      isConfirmPassValid: false,
      snackbarVisibility: false,
    };
    this.state = this.initialState;
  }

  onSelect = (value) => {
    this.setState({
      genderSelected: value,
      gender: _.toUpper(this.state.radio_props[value].label),
    });
  }

  onSubmit = async () => {
    Keyboard.dismiss();
    // this.setState({ showValidation: true });

    const {
      email, phone, firstName, password, confirmPassword,
    } = this.state;

    this.setState({
      showValidation: true,
      isEmailValid: isValidMail(email),
      isPhoneValid: this.isValidPhone(phone),
      isPassValid: this.isValidPass(password),
      isConfirmPassValid: this.isValidConfirmPass(password, confirmPassword),
    });
    if (!email) {
      emailValidationMsg = stringData.createList.warningEmailRequire;
      return null;
    }

    if (!isValidMail(email)) {
      // this.setState({ isEmailValid: false });
      emailValidationMsg = stringData.createList.warningEmail;
      return null;
    }
    if (!firstName ||
      !this.state.gender ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword ||
      !this.state.isEmailValid ||
      !this.state.isPhoneValid ||
      !this.state.isPassValid ||
      !this.state.isConfirmPassValid
    ) {
      return null;
    }
    const queryData = `{
      "firstName": "${this.state.firstName}",
      "lastName": "${this.state.lastName}",
      "email": "${this.state.email}",
      "gender": "${this.state.gender}",
      "isActive": true,
      "isVerified": true,
      "password": "${this.state.password}",
      "phone": "${this.state.phone}"
    }`;
    const query = `mutation(
      $firstName: String!,
      $lastName: String!,
      $email: String!,
      $gender: String!,
      $isActive: Boolean!,
      $isVerified: Boolean!,
      $password: String!,
      $phone: Float!
    ) {
      signUp(
        firstName: $firstName,
        lastName: $lastName,
        email: $email,
        gender: $gender,
        isActive: $isActive,
        isVerified: $isVerified,
        password: $password,
        phone: $phone
      )
    }`;
    let data = null;
    try {
      data = await request(query, queryData);
    } catch (err) {
      errorMessage = { stringData };
      this.setState({ snackbarVisibility: true });
      return null;
    }
    if (data.signUp) {
      this.setState(this.initialState);
      errorMessage = 'Signed up successfully. Please login';
      this.setState({ snackbarVisibility: true });
      return null;
    }
    if (data[0] && data[0].message) {
      errorMessage = data[0].message;
      this.setState({ snackbarVisibility: true });
    }
    return null;
  }

  newData = (text, field) => {
    const value = _.trim(text);
    this.setState({ [field]: value });
    if (this.state.showValidation) {
      this.setState({ showValidation: false });
    }
  }

  isValidPhone = (phone) => {
    if (!phone) {
      phoneValidationMsg = stringData.createList.warningPhoneNorequired;
      return false;
    }
    if (phone.length < 10) {
      phoneValidationMsg = stringData.createList.warningPhone;
      return false;
    }
    return true;
  }

  isValidPass = (pass) => {
    if (!pass) {
      passwordValidationMsg = stringData.createList.warningPassRequired;
      return false;
    }
    if (pass.length < 6) {
      passwordValidationMsg = stringData.createList.warningPassword;
      return false;
    }
    return true;
  }

  isValidConfirmPass = (pass, confirmPass) => {
    if (!confirmPass) {
      confirmPasswordValidationMsg = stringData.createList.warningCnfmPassRequired;
      return false;
    }
    if (pass !== confirmPass) {
      confirmPasswordValidationMsg = stringData.createList.warningConfirmPassword;
      return false;
    }
    return true;
  }

  render() {
    return (
      <ImageBackground source={require('../../Images/bg_leaf.png')} style={styles.sharedStyles.backgroundImage}>
        <KeyboardAwareScrollView contentContainerStyle={styles.editProfileScreenStyle.subContainer}>
          <View style={{ flex: 1 }}>
            <Image source={require('../../Images/logo_main.png')} style={styles.sharedStyles.screenBanner} />
          </View>
          <View style={{ marginTop: wp(5, viewportHeight), flex: 9, justifyContent: 'flex-start' }}>
            <View style={{ flex: 7, justifyContent: 'space-between' }} >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                  <View style={(this.state.showValidation && !this.state.firstName) ? [styles.signupScreenStyle.fieldWithRedBottom, { width: wp(40, viewportWidth) }] :
                    [styles.signupScreenStyle.fields, { width: wp(40, viewportWidth) }]}
                  >
                    <Text style={styles.signupScreenStyle.subFieldsText}>First Name</Text>
                    <TextInput value={this.state.firstName} style={styles.signupScreenStyle.textinputStyle} blurOnSubmit={false} onChangeText={text => this.newData(text, 'firstName')} returnKeyType="next" onSubmitEditing={() => this.lastNameField.focus()} placeholder="Dean" underlineColorAndroid="transparent" />
                  </View>
                  {(this.state.showValidation && !this.state.firstName) ? <Text style={styles.sharedStyles.inlineWarnignStyle}>{stringData.createList.warningFirstNameRequired}</Text> : null}
                </View>
                <View style={[styles.signupScreenStyle.fields, { width: wp(40, viewportWidth), alignSelf: 'baseline' }]}>
                  <Text style={styles.signupScreenStyle.subFieldsText}>Last Name</Text>
                  <TextInput value={this.state.lastName} style={styles.signupScreenStyle.textinputStyle} ref={(input) => { this.lastNameField = input; }} blurOnSubmit={false} onChangeText={text => this.newData(text, 'lastName')} returnKeyType="next" onSubmitEditing={() => this.emailField.focus()} placeholder="Ambrose" underlineColorAndroid="transparent" />
                </View>
              </View>
              <View style={(this.state.showValidation && !this.state.gender) ? styles.signupScreenStyle.fieldWithRedBottom : styles.signupScreenStyle.fields}>
                <Text style={styles.signupScreenStyle.subFieldsText}>Gender</Text>
                <RadioForm
                  dataWithLabel={this.state.radio_props}
                  onSelect={this.onSelect}
                  selectedData={this.state.genderSelected}
                />
              </View>
              {(this.state.showValidation && !this.state.gender) ? <Text style={styles.sharedStyles.inlineWarnignStyle}>{stringData.createList.warningGenderRequired}</Text> : null}
              <View style={(this.state.showValidation && !this.state.isEmailValid) ? styles.signupScreenStyle.fieldWithRedBottom : styles.signupScreenStyle.fields}>
                <Text style={styles.signupScreenStyle.subFieldsText}>Email</Text>
                <TextInput value={this.state.email} style={styles.signupScreenStyle.textinputStyle} ref={(input) => { this.emailField = input; }} onChangeText={text => this.newData(text, 'email')} onSubmitEditing={() => this.phoneField.focus()} blurOnSubmit={false} returnKeyType="next" placeholder="Dean_01@company.com" underlineColorAndroid="transparent" keyboardType="email-address" />
              </View>
              {(this.state.showValidation && !this.state.isPhoneValid) ? <Text style={styles.sharedStyles.inlineWarnignStyle}>{emailValidationMsg}</Text> : null}
              <View style={(this.state.showValidation && !this.state.isEmailValid) ? styles.signupScreenStyle.fieldWithRedBottom : styles.signupScreenStyle.fields}>
                <Text style={styles.signupScreenStyle.subFieldsText}>Phone Number</Text>
                <TextInput value={this.state.phone} style={styles.signupScreenStyle.textinputStyle} ref={(input) => { this.phoneField = input; }} onChangeText={text => this.newData(text, 'phone')} onSubmitEditing={() => this.passField.focus()} blurOnSubmit={false} returnKeyType="go" placeholder="885-369-6671" underlineColorAndroid="transparent" maxLength={10} keyboardType="numeric" />
              </View>
              {(this.state.showValidation && !this.state.isPhoneValid) ? <Text style={styles.sharedStyles.inlineWarnignStyle}>{phoneValidationMsg}</Text> : null}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ width: wp(40, viewportWidth) }}>
                  <View style={(this.state.showValidation && !this.state.isPassValid) ? styles.signupScreenStyle.fieldWithRedBottom : styles.signupScreenStyle.fields}>
                    <Text style={styles.signupScreenStyle.subFieldsText}>Password</Text>
                    <TextInput value={this.state.password} style={styles.signupScreenStyle.textinputStyle} ref={(input) => { this.passField = input; }} onChangeText={text => this.newData(text, 'password')} onSubmitEditing={() => this.confirmPassField.focus()} blurOnSubmit={false} returnKeyType="next" placeholder="******" underlineColorAndroid="transparent" secureTextEntry />
                  </View>
                  {(this.state.showValidation && !this.state.isPassValid) ? <Text style={styles.sharedStyles.inlineWarnignStyle}>{passwordValidationMsg}</Text> : null}
                </View>
                <View style={{ width: wp(40, viewportWidth) }}>
                  <View style={(this.state.showValidation && !this.state.isConfirmPassValid) ? styles.signupScreenStyle.fieldWithRedBottom : styles.signupScreenStyle.fields}>
                    <Text style={styles.signupScreenStyle.subFieldsText}>Confirm Password</Text>
                    <TextInput value={this.state.confirmPassword} style={styles.signupScreenStyle.textinputStyle} ref={(input) => { this.confirmPassField = input; }} onChangeText={text => this.newData(text, 'confirmPassword')} placeholder="******" underlineColorAndroid="transparent" secureTextEntry />
                  </View>
                  {(this.state.showValidation && !this.state.isConfirmPassValid) ? <Text style={styles.sharedStyles.inlineWarnignStyle}>{confirmPasswordValidationMsg}</Text> : null}
                </View>
              </View>
            </View>
            <View style={styles.sharedStyles.screenBottomContainer}>
              <TouchableOpacity
                style={[styles.sharedStyles.button, { marginBottom: wp(2, viewportHeight) }]}
                onPress={this.onSubmit}
              >
                <Text style={styles.sharedStyles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ paddingRight: 5 }}>Already have an account?</Text>
                <TouchableOpacity onPress={this.props.loginScreen} >
                  <Text style={{ color: '#38C7C2', fontWeight: 'bold' }}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
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

SignupScreen.propTypes = {
  navigation: PropTypes.object.isRequired, // eslint-disable-line
  loginScreen: PropTypes.func.isRequired,
  // verification: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  navigation: state.nav,
});

const mapDispatchToProps = dispatch => ({
  loginScreen: () => dispatch({ type: 'Login' }),
  verification: () => dispatch({ type: 'VerifyOTP' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
