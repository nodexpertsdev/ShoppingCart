import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RadioButton from 'react-native-radio-button';
import PropTypes from 'prop-types';

import styles from '../styles/style';

const RadioButtonWithLabel = (radioLabel, selected, i, onSelect) => (
  <View style={styles.radioFormStyle.radioButton} key={radioLabel} >
    <RadioButton size={16} innerColor="#38C7C2" outerColor="#38C7C2" isSelected={selected} onPress={() => onSelect(i)} />
    <TouchableOpacity style={styles.radioFormStyle.button} onPress={() => onSelect(i)} >
      <Text style={styles.radioFormStyle.label} >{radioLabel}</Text>
    </TouchableOpacity>
  </View>
);

const RadioForm = props => (
  <View style={styles.radioFormStyle.radioForm} >
    {
      props.dataWithLabel.map((data, i) => {
        if (props.selectedData !== null && props.selectedData === i) {
          return (
            RadioButtonWithLabel(data.label, true, i, props.onSelect)
          );
        }
        return (
          RadioButtonWithLabel(data.label, false, i, props.onSelect)
        );
      })
    }
  </View>
);

RadioForm.propTypes = {
  dataWithLabel: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number,
  })).isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedData: PropTypes.any, // eslint-disable-line
};

export default RadioForm;
