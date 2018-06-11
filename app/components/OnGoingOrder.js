import React, { Component } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import colorData from '../config/color';
import styles from '../styles/style';
import { ToolTip } from '../subComponents';

const { MyOrderListStyles } = styles;

const tooltipData = [{
  label: 'Cancel',
  selected: true,
}, {
  label: 'Email Invoice',
  selected: true,
}];

class OnGoingOrder extends Component {
  constructor(props) {
    super(props);

    this.itemList = [{
      key: 'data1',
      title: 'Birthday celebration office',
      dueDate: '12 feb 2018',
      delayBy: '10 Days',
      lastUpdate: '1 jan 2018',
      totalItem: '47',
      paybleAmount: '$400',
      statrtColor: colorData.gredientColor1,
      middleColor: colorData.gredientColor2,
    },
    {
      key: 'data2',
      title: 'Home Grocery Daily Life',
      dueDate: '15 feb 2018',
      delayBy: '12 Days',
      lastUpdate: '3 jan 2018',
      totalItem: '47',
      paybleAmount: '$560',
      statrtColor: colorData.gredientColor3,
      middleColor: colorData.gredientColor4,
    },
    {
      key: 'data3',
      title: 'Marriage Anniversary',
      dueDate: '12 feb 2018',
      delayBy: '10 Days',
      lastUpdate: '1 jan 2018',
      totalItem: '47',
      paybleAmount: '$400',
      statrtColor: colorData.gredientColor5,
      middleColor: colorData.gredientColor6,
    },
    {
      key: 'data4',
      title: 'Daily Life Grocery',
      dueDate: '12 feb 2018',
      delayBy: '10 Days',
      lastUpdate: '1 jan 2018',
      totalItem: '47',
      paybleAmount: '$400',
      statrtColor: colorData.gredientColor7,
      middleColor: colorData.gredientColor8,
    },
    {
      key: 'data5',
      title: 'Grocery list',
      dueDate: '12 feb 2018',
      delayBy: '10 Days',
      lastUpdate: '1 jan 2018',
      totalItem: '47',
      paybleAmount: '$400',
      statrtColor: colorData.gredientColor9,
      middleColor: colorData.gredientColor10,
    }];
  }

  componentDidMount() {
    console.log('on going did mount called');
    this.props.changeTooltipData();
  }
  myTooltipView = () => (
    <Image source={require('../Images/ellipse.png')} style={{ width: 15, height: 15, padding: 10 }} />
  );

  listItem = (listData, index) => (
    <View key={`data${index + 1}`} style={{ marginBottom: 10, flex: 1 }} >
      <LinearGradient
        start={{ x: 0.0, y: 0.5 }}
        end={{ x: 0.5, y: 1.0 }}
        locations={[0.5, 1]}
        colors={[listData.statrtColor, listData.middleColor]}
        style={{ padding: 7, borderRadius: 8 }}
      >
        <View >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
            <TouchableOpacity style={{ flex: 4, justifyContent: 'space-between' }} onPress={this.props.orderDetails}>
              {/* <View style={{ flex: 4, justifyContent: 'space-between' }} > */}
              <Text style={{ color: 'white' }} > {listData.title}</Text>
              <View style={MyOrderListStyles.line} />
              {/* </View> */}
            </TouchableOpacity>
            <View style={MyOrderListStyles.collabImageContainer} >
              <Image source={require('../Images/profile.png')} style={MyOrderListStyles.imageStyle} />
              <ToolTip
                myView={this.myTooltipView()}
                isRadioType={false}
                isImage={false}
                enableSelector={false}
              />
            </View>
          </View>
          <TouchableOpacity onPress={this.props.orderDetails}>
            <View style={MyOrderListStyles.row}>
              {/* <TouchableOpacity style={{ flexDirection: 'row', flex: 2 }} onPress={this.props.orderDetails}>
              <View style={{ flexDirection: 'row', flex: 2 }}> */}
              <View style={MyOrderListStyles.column} >
                <View style={MyOrderListStyles.imageContainerStyle}>
                  <Image source={require('../Images/Due_date.png')} style={MyOrderListStyles.iconStyle} />
                  <Text style={MyOrderListStyles.imageTextStyle} >Order Date</Text>
                </View>
                <Text style={MyOrderListStyles.textStyle}> 2 May 2018</Text>
              </View>
              <View style={MyOrderListStyles.column}>
                <View style={MyOrderListStyles.imageContainerStyle}>
                  <Image source={require('../Images/delay_by.png')} style={MyOrderListStyles.iconStyle} />
                  <Text style={MyOrderListStyles.imageTextStyle} > Delivery On</Text>
                </View>
                <Text style={MyOrderListStyles.textStyle}> 5 May 2018</Text>
              </View>
              {/* </View>
            </TouchableOpacity> */}
              <View style={MyOrderListStyles.column} />
              <View style={[MyOrderListStyles.column, { borderLeftColor: 'black', borderLeftWidth: 1 }]}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }} > 80</Text>
                <Text style={{ color: '#000000', fontSize: 13 }} >Total Items</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

      </LinearGradient>
      <View style={[MyOrderListStyles.gredientStyle, { justifyContent: 'flex-end' }]} >
        <Text style={{ color: '#76726C', fontSize: 10 }} > Payable Amount </Text>
        <Text style={{
          fontSize: 15, fontWeight: 'bold', color: listData.statrtColor, marginLeft: 8,
        }}
        >$480
        </Text>
      </View>
    </View>
  );

  render() {
    return (
      <View style={styles.MyOrderListStyles.mainContainer} >
        <View style={styles.OrderHistotyStyle.container}>
          <FlatList
            data={this.itemList}
            renderItem={({ item, index }) => this.listItem(item, index)}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
}

OnGoingOrder.propTypes = {
  navigation: PropTypes.object.isRequired, // eslint-disable-line
  orderDetails: PropTypes.func.isRequired,
  changeTooltipData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  navigation: state.nav,
});

const mapDispatchToProps = dispatch => ({
  orderDetails: () => dispatch({ type: 'OrderDetail' }),
  changeTooltipData: () => dispatch({ type: 'TOOLTIP_DATA', tooltipData }),
});

export default connect(mapStateToProps, mapDispatchToProps)(OnGoingOrder);
