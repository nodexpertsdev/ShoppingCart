import React from 'react';
import PropTypes from 'prop-types';

import {
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  Alert,
  TextInput,
} from 'react-native';
import styles from '../styles/style';

const MycardScreen = props => (
  <View style={styles.ProfileScreenStyle.slideInnerContainer}>
    <View style={styles.ProfileScreenStyle.shadow} />
    <View style={[styles.sharedStyles.centerItems, styles.ProfileScreenStyle.innerContainer]}>
      <ScrollView contentContainerStyle={styles.sharedStyles.centerItems} >
        <View style={{ paddingTop: 10 }}>
          <View style={styles.sharedStyles.seprator} />
          <View style={styles.AddressScreenStyle.headerContainer}>
            <Text style={styles.AddressScreenStyle.headerStyle}>American Express</Text>
            <Image source={require('../Images/amrican_expres.png')} style={styles.MyCardScreenStyle.cardImage} />
          </View>
          <View style={styles.AddressScreenStyle.headerContainer}>
            <View>
              <Text style={{ fontSize: 10 }}>8156-XXXX-XXXX-5894</Text>
            </View>
            <View style={styles.MyCardScreenStyle.cvvContainer}>
              <Text style={{ fontSize: 10 }}>CVV</Text>
              <TextInput underlineColorAndroid="transparent" maxLength={4} placeholder="CVV" secureTextEntry style={styles.MyCardScreenStyle.cvvTextinput} />
              <Image source={require('../Images/cvv.png')} style={styles.MyCardScreenStyle.cvvImage} />
            </View>
          </View>
          <Text style={styles.MyCardScreenStyle.securityFont}>
            Your card details are secured via 128 bit encryption by verisign
          </Text>
          <View style={styles.sharedStyles.seprator} />
          <View style={styles.AddressScreenStyle.headerContainer}>
            <Text style={styles.MyCardScreenStyle.defaultText}>Default</Text>
            <Image source={require('../Images/del_brown.png')} style={styles.AddressScreenStyle.defaultAddressImage} />
          </View>
          <View style={styles.sharedStyles.seprator} />
        </View>
        <View style={{ paddingTop: 10 }}>
          <View style={styles.sharedStyles.seprator} />
          <View style={styles.AddressScreenStyle.headerContainer}>
            <Text style={styles.AddressScreenStyle.headerStyle}>HSBC</Text>
            <Image source={require('../Images/master_card.jpg')} style={styles.MyCardScreenStyle.cardImage} />
          </View>
          <View style={styles.AddressScreenStyle.headerContainer}>
            <View>
              <Text style={{ fontSize: 10 }}>8156-XXXX-XXXX-5894</Text>
            </View>
            <View style={styles.MyCardScreenStyle.cvvContainer}>
              <Text style={{ fontSize: 10 }}>CVV</Text>
              <TextInput underlineColorAndroid="transparent" maxLength={4} placeholder="CVV" secureTextEntry style={styles.MyCardScreenStyle.cvvTextinput} />
              <Image source={require('../Images/cvv.png')} style={styles.MyCardScreenStyle.cvvImage} />
            </View>
          </View>
          <Text style={styles.MyCardScreenStyle.securityFont}>
            Your card details are secured via 128 bit encryption by verisign
          </Text>
          <View style={styles.sharedStyles.seprator} />
          <View style={styles.AddressScreenStyle.headerContainer}>
            <Text style={styles.MyCardScreenStyle.defaultText}>Default</Text>
            <Image source={require('../Images/del_brown.png')} style={styles.AddressScreenStyle.defaultAddressImage} />
          </View>
          <View style={styles.sharedStyles.seprator} />
        </View>
        <View style={{ paddingTop: 10 }}>
          <View style={styles.sharedStyles.seprator} />
          <View style={styles.AddressScreenStyle.headerContainer}>
            <Text style={styles.AddressScreenStyle.headerStyle}>HDFC</Text>
            <Image source={require('../Images/master_card.jpg')} style={styles.MyCardScreenStyle.cardImage} />
          </View>
          <View style={styles.AddressScreenStyle.headerContainer}>
            <View>
              <Text style={{ fontSize: 10 }}>8156-XXXX-XXXX-5894</Text>
            </View>
            <View style={styles.MyCardScreenStyle.cvvContainer}>
              <Text style={{ fontSize: 10 }}>CVV</Text>
              <TextInput underlineColorAndroid="transparent" maxLength={4} placeholder="CVV" secureTextEntry style={styles.MyCardScreenStyle.cvvTextinput} />
              <Image source={require('../Images/cvv.png')} style={styles.MyCardScreenStyle.cvvImage} />
            </View>
          </View>
          <Text style={styles.MyCardScreenStyle.securityFont}>
            Your card details are secured via 128 bit encryption by verisign
          </Text>
          <View style={styles.sharedStyles.seprator} />
          <View style={styles.AddressScreenStyle.headerContainer}>
            <Text style={styles.MyCardScreenStyle.defaultText}>Default</Text>
            <Image source={require('../Images/del_brown.png')} style={styles.AddressScreenStyle.defaultAddressImage} />
          </View>
          <View style={styles.sharedStyles.seprator} />
        </View>
        <View style={styles.AddressScreenStyle.addLinkContainer}>
          <TouchableOpacity onPress={() => Alert.alert('Pressed')} >
            <Text style={[styles.ProfileScreenStyle.valueText, { color: 'blue' }]}>Add New Card</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
    <View style={[styles.ProfileScreenStyle.cutLeft, { backgroundColor: props.cutColor }]} />
    <View style={[styles.ProfileScreenStyle.cutRight, { backgroundColor: props.cutColor }]} />
  </View>
);

MycardScreen.propTypes = {
  cutColor: PropTypes.string.isRequired,
};

export default MycardScreen;
