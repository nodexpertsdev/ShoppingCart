import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from '../styles/style';

const BackButton = props => (
  <TouchableOpacity onPress={props.back} style={styles.titleBackButton.wrapper}>
    <Image source={require('../Images/back_btn.png')} style={styles.titleBackButton.image} />
  </TouchableOpacity>
);

BackButton.propTypes = {
  back: PropTypes.func.isRequired,
};

export default BackButton;
