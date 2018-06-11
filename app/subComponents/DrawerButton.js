import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from '../styles/style';

const DrawerButton = props => (
  <TouchableOpacity onPress={props.drawer} style={styles.titleBackButton.wrapper}>
    <Image source={require('../Images/menu2.png')} style={styles.titleBackButton.image} />
  </TouchableOpacity>
);

DrawerButton.propTypes = {
  drawer: PropTypes.func.isRequired,
};

export default DrawerButton;
