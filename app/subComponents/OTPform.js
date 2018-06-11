import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TextInput,
} from 'react-native';
import _ from 'lodash';
import styles from '../styles/style';

export default class OTPform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: new Array(this.props.pinLength).fill(null),
      currentIndex: 0,
    };
    this.initialState = this.state;
    this.inputRefs = [];
  }

  onKeyPress = (e) => {
    if (e.nativeEvent.key === 'Backspace') {
      const { currentIndex } = this.state;
      const nextIndex = currentIndex > 0 ? currentIndex - 1 : 0;
      if (!this.state.otp[currentIndex]) {
        this.setFocus(nextIndex);
      }
    }
  }

  onFocus = (index) => {
    this.setState({ currentIndex: index });
  }

  setFocus = (index) => {
    this.inputRefs[index].focus();
  }

  OTPchange = (text, index) => {
    const newOTP = this.state.otp.slice();
    newOTP[index] = text;
    if (index + 1 < this.props.pinLength && text) {
      this.setFocus(index + 1);
    }
    this.setState({ otp: newOTP });
    const otpString = _.join(newOTP, '');
    if (otpString.length === this.props.pinLength) {
      this.props.getOTP(otpString);
    }
  }

  OTPbox = (otpInput, i) => {
    let newOtpInputStyle = otpInput;
    if (this.state.otp[i]) {
      newOtpInputStyle = [otpInput, { backgroundColor: '#38C7C2' }];
    }
    return (
      <View style={newOtpInputStyle} key={i}>
        <TextInput
          ref={(ref) => { this.inputRefs[i] = ref; }}
          onKeyPress={e => this.onKeyPress(e)}
          onChangeText={text => this.OTPchange(text, i)}
          autoFocus={i === 0}
          style={styles.VerificationScreenStyle.otpTextInput}
          underlineColorAndroid="transparent"
          value={this.state.otp[i] ? this.state.otp[i].toString() : null}
          maxLength={1}
          onFocus={() => this.onFocus(i)}
          keyboardType="numeric"
        />
      </View>
    );
  }

  render() {
    const { otpInput } = styles.VerificationScreenStyle;
    const arr = new Array(this.props.pinLength).fill(this.OTPbox);
    return (
      <View style={styles.VerificationScreenStyle.otpInputContainer}>
        {
          arr.map((data, i) => (data(otpInput, i)))
        }
      </View>
    );
  }
}

OTPform.propTypes = {
  pinLength: PropTypes.number.isRequired,
  getOTP: PropTypes.func.isRequired,
};
