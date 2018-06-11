import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import PopoverTooltip from 'react-native-popover-tooltip';
import styles from '../styles/style';
import colorData from '../config/color';

const DEFAULT_SIZE_MULTIPLIER = 0.7;
const DEFAULT_OUTER_BORDER_WIDTH_MULTIPLIER = 0.2;
const size = 16;
const innerColor = colorData.cyanColor;
const outerColor = colorData.cyanColor;

const outerStyle = {
  borderColor: outerColor,
  width: size + (size * DEFAULT_SIZE_MULTIPLIER),
  height: size + (size * DEFAULT_SIZE_MULTIPLIER),
  borderRadius: (size + (size * DEFAULT_SIZE_MULTIPLIER)) / 2,
  borderWidth: size * DEFAULT_OUTER_BORDER_WIDTH_MULTIPLIER,
};

const innerStyle = {
  width: size,
  height: size,
  borderRadius: size / 2,
  backgroundColor: innerColor,
};

const radioStyles = StyleSheet.create({
  radio: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

const tooltipItem = (data, index, selected, isRadioType, isImage) => (
  <View key={`data${index + 1}`} style={{ flexDirection: 'row' }} >
    <View style={{ justifyContent: 'flex-start' }}>
      {
        isImage ?
        (
          <View>
            {
              isRadioType ?
                (
                  <View style={[radioStyles.radio, outerStyle]}>
                    {selected ? <View style={innerStyle} /> : null}
                  </View>
                ) :
                (<Image source={require('../Images/bag.png')} style={[styles.MyOrderListStyles.iconStyle]} />)
            }
          </View>
        ) : null
      }
    </View>
    <View style={{ justifyContent: 'center' }}>
      <Text style={[styles.toolTipStyle.text, selected ? { color: '#494848' } : null]} >{data}</Text>
    </View>
  </View>
);

const tooltipArray = (toolTipData, onClick, isRadioType, isImage, enableSelector) => {
  const arr = toolTipData.map((data, index) => ({
    label: () => tooltipItem(data.label, index, data.selected, isRadioType, isImage),
    onPress: () => onClick(index, enableSelector),
  }));
  return arr;
};

const myView = () => (
  <View style={[styles.titleBackButton.wrapper, { flexDirection: 'row' }]}>
    <Image source={require('../Images/bag.png')} style={styles.toolTipStyle.image} />
    <Image source={require('../Images/drop_down.png')} style={styles.toolTipStyle.iconStyle} />
  </View>
);

const ToolTip = props => (
  <PopoverTooltip
    setBelow
    buttonComponent={
      props.myView
    }
    items={tooltipArray(props.tooltipData, props.onClick, props.isRadioType, props.isImage, props.enableSelector)}
  />
);

ToolTip.defaultProps = {
  myView: myView(),
  isImage: true,
  isRadioType: true,
  enableSelector: true,
};

ToolTip.propTypes = {
  tooltipData: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
  })).isRequired,
  myView: PropTypes.element,
  onClick: PropTypes.func.isRequired,
  isRadioType: PropTypes.bool,
  isImage: PropTypes.bool,
  enableSelector: PropTypes.bool,
};

const mapStateToProps = state => ({
  tooltipData: state.tooltip.tooltipData,
});

const mapDispatchToProps = dispatch => ({
  onClick: (index, enableSelector) => dispatch({ type: 'TOOLTIP_CHANGE', value: index, enableSelector }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToolTip);
