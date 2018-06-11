import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TextInput,
  Image,
} from 'react-native';
import colorData from '../config/color';
import Styles from '../styles/style';

const { ProductListStyle } = Styles;

const SearchBar = props => (
  <View style={{ marginBottom: 10, marginLeft: 10, marginRight: 10 }} >
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image source={require('../Images/search.png')} style={{ width: 18, height: 18, marginRight: 4 }} />
      <TextInput
        placeholder="Search for Products"
        placeholderTextColor="grey"
        underlineColorAndroid="transparent"
        onChangeText={text => props.onTextChange(text)}
        style={{ flex: 1 }}
      />
      <Image source={require('../Images/barcode.png')} style={ProductListStyle.searchIcon} />
    </View>
    {
      props.requireBelowBorder ? (<View style={{
        borderBottomColor: colorData.lineColor,
        borderBottomWidth: 1,
        marginTop: 4,
        }}
      />) : null
    }
  </View>
);

SearchBar.defaultProps = {
  requireBelowBorder: true,
};

SearchBar.propTypes = {
  onTextChange: PropTypes.func.isRequired,
  requireBelowBorder: PropTypes.bool,
};

export default SearchBar;
