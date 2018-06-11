import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Picker } from 'react-native-picker-dropdown';
import { BackButton } from '../../subComponents';
import RadioForm from '../../subComponents/RadioForm';
import styles from '../../styles/style';
import stringData from '../../config/string';

export default class AddAddressScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Add Address',
    headerLeft: <BackButton back={() => navigation.goBack()} />,
    headerTitleStyle: {
      flex: 1,
      color: '#000',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16,
    },
    drawerLockMode: 'locked-closed',
  });

  constructor(props) {
    super(props);
    this.state = {
      name: null,
      phone: null,
      addLine1: null,
      addLine2: null,
      addStreet: null,
      addPostalCode: 'Postal Code',
      addCountry: 'Country',
      addDefault: false,
      showValidation: false,
      addType: null,
      radio_props: [
        { label: 'Home', value: 0 },
        { label: 'Office', value: 1 },
      ],
      default_field_radio_props: [
        { label: 'Make it Default', value: 0 },
      ],
    };
  }

  onSubmit = () => {
    this.newData(true, 'showValidation');
  }

  newData = (text, field) => {
    this.setState({ [field]: text });
    if (this.state.showValidation) {
      this.setState({ showValidation: false });
    }
  }

  render() {
    return (
      <View style={styles.editProfileScreenStyle.mainContainer}>
        <KeyboardAwareScrollView contentContainerStyle={styles.editProfileScreenStyle.subContainer}>
          <View style={styles.editProfileScreenStyle.formContainer} >
            <View style={[styles.editProfileScreenStyle.formFieldContainer, { flex: 3 }]}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, paddingRight: 5 }}>
                  <TextInput underlineColorAndroid="transparent" placeholder="Full Name" blurOnSubmit={false} returnKeyType="next" onChangeText={text => this.newData(text, 'name')} onSubmitEditing={() => this.phoneField.focus()} />
                  <View style={(this.state.showValidation && !this.state.name) ? styles.sharedStyles.redSeprator : styles.sharedStyles.seprator} />
                  { (this.state.showValidation && !this.state.name) ? <Text style={styles.sharedStyles.inlineWarnignStyle}>{stringData.createList.inlineWarningMessage}</Text> : null }
                </View>
                <View style={{ flex: 1 }}>
                  <TextInput underlineColorAndroid="transparent" ref={(input) => { this.phoneField = input; }} keyboardType="numeric" placeholder="Phone Number" blurOnSubmit={false} returnKeyType="next" onChangeText={text => this.newData(text, 'phone')} onSubmitEditing={() => this.addressLine1.focus()} />
                  <View style={(this.state.showValidation && !this.state.phone) ? styles.sharedStyles.redSeprator : styles.sharedStyles.seprator} />
                  { (this.state.showValidation && !this.state.phone) ? <Text style={styles.sharedStyles.inlineWarnignStyle}>{stringData.createList.inlineWarningMessage}</Text> : null }
                </View>
              </View>
              <View>
                <TextInput underlineColorAndroid="transparent" ref={(input) => { this.addressLine1 = input; }} placeholder="Address Line 1" blurOnSubmit={false} returnKeyType="next" onChangeText={text => this.newData(text, 'addLine1')} onSubmitEditing={() => this.addressLine2.focus()} />
                <View style={(this.state.showValidation && !this.state.addLine1) ? styles.sharedStyles.redSeprator : styles.sharedStyles.seprator} />
                { (this.state.showValidation && !this.state.addLine1) ? <Text style={styles.sharedStyles.inlineWarnignStyle}>{stringData.createList.inlineWarningMessage}</Text> : null }
              </View>
              <View>
                <TextInput underlineColorAndroid="transparent" ref={(input) => { this.addressLine2 = input; }} placeholder="Address Line 2 (optional)" blurOnSubmit={false} returnKeyType="next" onChangeText={text => this.newData(text, 'addLine2')} onSubmitEditing={() => this.street.focus()} />
                <View style={styles.sharedStyles.seprator} />
              </View>
              <View>
                <TextInput underlineColorAndroid="transparent" ref={(input) => { this.street = input; }} placeholder="Street" blurOnSubmit={false} /* returnKeyType="next" */ onChangeText={text => this.newData(text, 'addStreet')} /* onSubmitEditing={() => this.postalCode.focus()} */ />
                
                <View style={(this.state.showValidation && !this.state.addStreet) ? styles.sharedStyles.redSeprator : styles.sharedStyles.seprator} />
                { (this.state.showValidation && !this.state.addStreet) ? <Text style={styles.sharedStyles.inlineWarnignStyle}>{stringData.createList.inlineWarningMessage}</Text> : null }
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, paddingRight: 5 }}>
                  <Picker
                    selectedValue={this.state.addPostalCode}
                    onValueChange={value => this.newData(value, 'addPostalCode')}
                    prompt="Choose your addPostalCode"
                    mode="dialog"
                    textStyle={{ color: 'black' }}
                    cancel
                  >
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="Ruby" value="ruby" />
                    <Picker.Item label="Python" value="python" />
                    <Picker.Item label="Elm" value="elm" />
                  </Picker>
                  <View style={(this.state.showValidation && this.state.addPostalCode === 'Postal Code') ? styles.sharedStyles.redSeprator : styles.sharedStyles.seprator} />
                  { (this.state.showValidation && this.state.addPostalCode === 'Postal Code') ? <Text style={styles.sharedStyles.inlineWarnignStyle}>{stringData.createList.inlineWarningMessage}</Text> : null }
                </View>
                <View style={{ flex: 1 }}>
                  <Picker
                    selectedValue={this.state.addCountry}
                    onValueChange={value => this.newData(value, 'addCountry')}
                    prompt="Choose your addCountry"
                    mode="dialog"
                    textStyle={{ color: 'black' }}
                    cancel
                  >
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="Ruby" value="ruby" />
                    <Picker.Item label="Python" value="python" />
                    <Picker.Item label="Elm" value="elm" />
                  </Picker>
                  <View style={(this.state.showValidation && this.state.addCountry === 'Country') ? styles.sharedStyles.redSeprator : styles.sharedStyles.seprator} />
                  { (this.state.showValidation && this.state.addCountry === 'Country') ? <Text style={styles.sharedStyles.inlineWarnignStyle}>{stringData.createList.inlineWarningMessage}</Text> : null }
                </View>
              </View>
              <View>
                <Text style={{ paddingBottom: 5, color: '#1f1f1f' }}>Address Type</Text>
                <RadioForm
                  dataWithLabel={this.state.radio_props}
                  onSelect={value => this.newData(value, 'addType')}
                  selectedData={this.state.addType}
                />
                <View style={(this.state.showValidation && !this.state.addType && this.state.addType !== 0) ?
                  [styles.sharedStyles.redSeprator, { paddingTop: 5 }] : [styles.sharedStyles.seprator, { paddingTop: 5 }]}
                />
                { (this.state.showValidation && !this.state.addType && this.state.addType !== 0) ? <Text style={styles.sharedStyles.inlineWarnignStyle}>{stringData.createList.inlineWarningMessage}</Text> : null }
              </View>
              <View>
                <RadioForm
                  dataWithLabel={this.state.default_field_radio_props}
                  onSelect={value => this.newData(value, 'addDefault')}
                  selectedData={this.state.addDefault}
                />
              </View>
            </View>
            <View style={[styles.editProfileScreenStyle.submitButtonContainer, { flex: 1 }]}>
              <TouchableOpacity style={styles.sharedStyles.button} onPress={this.onSubmit} >
                <Text style={styles.sharedStyles.buttonText}>Add Address</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
