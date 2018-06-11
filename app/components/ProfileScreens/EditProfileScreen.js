import React, { Component } from 'react';
import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BackButton } from '../../subComponents';
import styles from '../../styles/style';

export default class EditProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Edit Profile',
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
      email: null,
    };
  }

  newData = (text, field) => {
    this.setState({ [field]: text });
  }

  render() {
    return (
      <View style={styles.editProfileScreenStyle.mainContainer}>
        <KeyboardAwareScrollView contentContainerStyle={styles.editProfileScreenStyle.subContainer}>
          <View style={{ flex: 2 }}>
            <View style={styles.sharedStyles.selfCenterItems}>
              <Image source={require('../../Images/picture.png')} style={styles.editProfileScreenStyle.profileImage} />
              <TouchableOpacity style={styles.editProfileScreenStyle.changeProfileButton}>
                <Image source={require('../../Images/camera.png')} style={styles.editProfileScreenStyle.changeProfileButtonImage} />
              </TouchableOpacity>
            </View>
            <View style={styles.sharedStyles.selfCenterItems}>
              <Text style={styles.editProfileScreenStyle.nameText}>Dean Ambrose</Text>
            </View>
          </View>
          <View style={[styles.editProfileScreenStyle.formContainer, { flex: 3 }]} >
            <View style={styles.editProfileScreenStyle.formFieldContainer}>
              <View style={{ flex: 3, justifyContent: 'space-evenly' }}>
                <View>
                  <TextInput placeholder="Full Name" underlineColorAndroid="transparent" blurOnSubmit={false} returnKeyType="next" onChangeText={text => this.newData(text, 'name')} onSubmitEditing={() => this.phoneField.focus()} />
                  <View style={styles.sharedStyles.seprator} />
                </View>
                <View>
                  <TextInput ref={(input) => { this.phoneField = input; }} keyboardType="numeric" underlineColorAndroid="transparent" placeholder="Phone Number" blurOnSubmit={false} returnKeyType="next" onChangeText={text => this.newData(text, 'phone')} onSubmitEditing={() => this.email.focus()} />
                  <View style={styles.sharedStyles.seprator} />
                </View>
                <View>
                  <TextInput ref={(input) => { this.email = input; }} placeholder="Email Address" underlineColorAndroid="transparent" onChangeText={text => this.newData(text, 'email')} />
                  <View style={styles.sharedStyles.seprator} />
                </View>
              </View>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={styles.editProfileScreenStyle.changePassContainer}>
                  <Text style={{ color: '#1f1f1f' }}>Password</Text>
                  <TouchableOpacity>
                    <Text style={{ color: '#3D7FE2' }}>Change Password</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.editProfileScreenStyle.submitButtonContainer}>
              <TouchableOpacity style={styles.sharedStyles.button}>
                <Text style={styles.sharedStyles.buttonText}>Save Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
