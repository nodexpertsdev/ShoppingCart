import React from 'react';
import SnackBar from 'react-native-snackbar-component';
import PropTypes from 'prop-types';
import stringData from '../config/string';


const MySnackbar = props => (
  <SnackBar
    visible={props.snackbarVisibility}
    textMessage={props.message}
    actionHandler={props.actionHandler}
    actionText={props.actionText}
  />
);

MySnackbar.propTypes = {
  snackbarVisibility: PropTypes.bool.isRequired,
  message: PropTypes.string,
  actionHandler: PropTypes.func.isRequired,
  actionText: PropTypes.string,
};

MySnackbar.defaultProps = {
  message: stringData.createList.errorMessage,
  actionText: stringData.createList.ok,
};

export default MySnackbar;
