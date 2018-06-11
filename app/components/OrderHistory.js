import React, { Component } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import colorData from '../config/color';
import styles from '../styles/style';
import { ToolTip } from '../subComponents';

const tooltipData = [{
  label: 'Delivery Date',
  selected: true,
}, {
  label: 'Order Date',
  selected: false,
}, {
  label: 'Quantity',
  selected: false,
}];

class OrderHistory extends Component {
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
    this.props.changeTooltipData();
  }

  myView = () => (
    <View style={{
      flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 8, paddingBottom: 8,
    }}
    >
      <Image source={require('../Images/sort_by.png')} style={[styles.ProductListStyle.searchIcon, { marginRight: 4 }]} />
      <Text style={styles.ProductListStyle.tabTitle}>Sort By</Text>
    </View>
  );

  listItem = (listData, index) => (
    <TouchableOpacity onPress={this.props.orderDetails}>
      <View key={`data${index + 1}`} style={styles.OrderHistotyStyle.listItemStyle} >
        {/* <View style={styles.OrderHistotyStyle.line} /> */}
        <View style={styles.OrderHistotyStyle.rowContainer} >
          <Text style={{ color: listData.statrtColor, fontSize: 16, fontWeight: 'bold' }} > {listData.title}</Text>
          <View style={{ borderRadius: 6, backgroundColor: listData.statrtColor, paddingHorizontal: 6 }} >
            <Text style={{
                color: 'white', fontWeight: 'bold', fontSize: 14,
              }}
            >Delivered
            </Text>
          </View>
        </View>
        <View style={[styles.CreateListStyles.rowContainer, { marginTop: 10 }]} >
          <View style={{ flexDirection: 'row' }} >
            <Text style={styles.OrderHistotyStyle.itemHeaderStyle} > Order Date:</Text>
            <Text style={styles.OrderHistotyStyle.itemValueStyle} > {listData.dueDate}</Text>
          </View>
          <View style={{ flexDirection: 'row' }} >
            <Text style={styles.OrderHistotyStyle.itemHeaderStyle} > Delivery Date:</Text>
            <Text style={styles.OrderHistotyStyle.itemValueStyle} > {listData.lastUpdate}</Text>
          </View>
        </View>
        <View style={styles.ProductListStyle.optionContainerStyle}>
          <View style={{ flexDirection: 'row' }} >
            <Text style={styles.OrderHistotyStyle.itemHeaderStyle} > Items:</Text>
            <Text style={styles.OrderHistotyStyle.itemValueStyle} > {listData.totalItem}</Text>
          </View>
          <View style={{ flexDirection: 'row' }} >
            <Text style={styles.OrderHistotyStyle.itemHeaderStyle} > Total:</Text>
            <Text style={styles.OrderHistotyStyle.itemValueStyle} > {listData.paybleAmount}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../Images/refresh.png')} style={[styles.ProductListStyle.searchIcon, { marginRight: 4 }]} />
            <Text style={[styles.ProductListStyle.tabTitle, { color: colorData.repeatOrderColor }]}>Repeat Order</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={styles.MyOrderListStyles.mainContainer} >
        <View style={styles.OrderHistotyStyle.container}>
          <View style={styles.OrderHistotyStyle.sortByStyle}>
            <ToolTip myView={this.myView()} />
          </View>
          {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', margin: 8 }}>
            <Image source={require('../Images/sort_by.png')} style={[styles.ProductListStyle.searchIcon, { marginRight: 4 }]} />
            <Text style={styles.ProductListStyle.tabTitle}>Sort By</Text>
          </View> */}
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

OrderHistory.propTypes = {
  navigation: PropTypes.object.isRequired, // eslint-disable-line
  changeTooltipData: PropTypes.func.isRequired,
  orderDetails: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  navigation: state.nav,
});

const mapDispatchToProps = dispatch => ({
  changeTooltipData: () => dispatch({ type: 'TOOLTIP_DATA', tooltipData }),
  orderDetails: () => dispatch({ type: 'OrderDetail' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
