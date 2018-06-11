import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import styles from '../styles/style';

const ProfileScreen = props => (
  <View style={styles.ProfileScreenStyle.slideInnerContainer}>
    <View style={styles.ProfileScreenStyle.shadow} />
    <View style={styles.ProfileScreenStyle.innerContainer}>
      <ScrollView contentContainerStyle={styles.sharedStyles.mainContainer} >
        <View style={styles.ProfileScreenStyle.mainContainer} >
          <View style={styles.ProfileScreenStyle.editContainer}>
            <TouchableOpacity onPress={props.editProfile} >
              <Image source={require('../Images/pencil.png')} style={styles.ProfileScreenStyle.editButton} />
            </TouchableOpacity>
          </View>
          <View style={styles.ProfileScreenStyle.dataContainer}>
            <Text style={[styles.ProfileScreenStyle.valueText, { fontSize: 20 }]}>
              Dean Ambrose
            </Text>
          </View>
          <View style={[styles.sharedStyles.seprator, { marginHorizontal: 20 }]} />
          <View style={styles.ProfileScreenStyle.dataContainer}>
            <Text>Email Address</Text>
            <Text style={styles.ProfileScreenStyle.valueText}>Dean_01@gmail.com</Text>
          </View>
          <View style={[styles.sharedStyles.seprator, { marginHorizontal: 20 }]} />
          <View style={styles.ProfileScreenStyle.dataContainer}>
            <Text>Phone No.</Text>
            <Text style={styles.ProfileScreenStyle.valueText}>885-859-0004</Text>
          </View>
          <View style={[styles.sharedStyles.seprator, { marginHorizontal: 20 }]} />
          <View style={styles.ProfileScreenStyle.dataContainer}>
            <Text>Password</Text>
            <TouchableOpacity>
              <Text style={[styles.ProfileScreenStyle.valueText, { color: 'blue' }]}>Change Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
    {/* <View style={styles.ProfileScreenStyle.profilePicture} /> */}
    <Image source={require('../Images/picture.png')} style={styles.ProfileScreenStyle.profilePicture} />
    <View style={[styles.ProfileScreenStyle.cutLeft, { backgroundColor: props.cutColor }]} />
    <View style={[styles.ProfileScreenStyle.cutRight, { backgroundColor: props.cutColor }]} />
  </View>
);

ProfileScreen.propTypes = {
  cutColor: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired, // eslint-disable-line
  editProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  navigation: state.nav,
});

const mapDispatchToProps = dispatch => ({
  editProfile: () => dispatch({ type: 'editProfile' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
