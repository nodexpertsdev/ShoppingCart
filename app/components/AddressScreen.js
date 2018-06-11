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

const AddressScreen = props => (
  <View style={styles.ProfileScreenStyle.slideInnerContainer}>
    <View style={styles.ProfileScreenStyle.shadow} />
    <View style={[styles.sharedStyles.centerItems, styles.ProfileScreenStyle.innerContainer]}>
      <ScrollView contentContainerStyle={[styles.sharedStyles.centerItems]} >
        <View style={{ paddingTop: 10 }}>
          <View style={[styles.sharedStyles.seprator]} />
          <View style={styles.AddressScreenStyle.headerContainer}>
            <Text style={styles.AddressScreenStyle.headerStyle}>Address 1</Text>
            <Image source={require('../Images/right_icon.png')} style={styles.AddressScreenStyle.defaultAddressImage} />
          </View>
          <View style={[styles.sharedStyles.seprator]} />
          <View style={styles.AddressScreenStyle.addressContainer}>
            <View style={styles.AddressScreenStyle.nameContainer}>
              <Text style={styles.AddressScreenStyle.nameFont}>Dean Ambrose</Text>
              <View style={styles.AddressScreenStyle.addressTypeContainer}>
                <Text style={styles.AddressScreenStyle.addressTypeFont}>HOME</Text>
              </View>
            </View>
            <Text style={styles.AddressScreenStyle.addressFont}>
              Sight Street North Avenue Park - Pocket 2
            </Text>
            <Text style={styles.AddressScreenStyle.addressFont}>1350 Rene-Levesque Bvd West</Text>
            <Text style={styles.AddressScreenStyle.addressFont}>HuntsVille QC</Text>
            <Text style={styles.AddressScreenStyle.addressFont}>H3G IT4 - 35801</Text>
            <View style={styles.AddressScreenStyle.toolsContainer}>
              <TouchableOpacity>
                <Image source={require('../Images/pencil_icon.png')} style={[styles.AddressScreenStyle.toolsItemImage, { marginRight: 5 }]} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require('../Images/delete_icon.png')} style={styles.AddressScreenStyle.toolsItemImage} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ paddingVertical: 10 }}>
          <View style={[styles.sharedStyles.seprator]} />
          <View style={styles.AddressScreenStyle.headerContainer}>
            <Text style={styles.AddressScreenStyle.headerStyle}>Address 1</Text>
            <Image source={require('../Images/right_grey_icon.png')} style={styles.AddressScreenStyle.defaultAddressImage} />
          </View>
          <View style={[styles.sharedStyles.seprator]} />
          <View style={styles.AddressScreenStyle.addressContainer}>
            <View style={styles.AddressScreenStyle.nameContainer}>
              <Text style={styles.AddressScreenStyle.nameFont}>Dean Ambrose</Text>
              <View style={styles.AddressScreenStyle.addressTypeContainer}>
                <Text style={styles.AddressScreenStyle.addressTypeFont}>HOME</Text>
              </View>
            </View>
            <Text style={styles.AddressScreenStyle.addressFont}>
              Sight Street North Avenue Park - Pocket 2
            </Text>
            <Text style={styles.AddressScreenStyle.addressFont}>1350 Rene-Levesque Bvd West</Text>
            <Text style={styles.AddressScreenStyle.addressFont}>HuntsVille QC</Text>
            <Text style={styles.AddressScreenStyle.addressFont}>H3G IT4 - 35801</Text>
            <View style={styles.AddressScreenStyle.toolsContainer}>
              <TouchableOpacity>
                <Image source={require('../Images/pencil_icon.png')} style={[styles.AddressScreenStyle.toolsItemImage, { marginRight: 5 }]} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require('../Images/delete_icon.png')} style={styles.AddressScreenStyle.toolsItemImage} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.AddressScreenStyle.addLinkContainer}>
          <TouchableOpacity onPress={props.addAddress} >
            <Text style={[styles.ProfileScreenStyle.valueText, { color: 'blue' }]}>Add New Address</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
    <View style={[styles.ProfileScreenStyle.cutLeft, { backgroundColor: props.cutColor }]} />
    <View style={[styles.ProfileScreenStyle.cutRight, { backgroundColor: props.cutColor }]} />
  </View>
);

AddressScreen.propTypes = {
  cutColor: PropTypes.string.isRequired,
  addAddress: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  navigation: state.nav,
});

const mapDispatchToProps = dispatch => ({
  addAddress: () => dispatch({ type: 'AddAddress' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressScreen);
