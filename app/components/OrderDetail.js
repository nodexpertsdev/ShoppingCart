import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import colorData from '../config/color';
import styles from '../styles/style';
import { BackButton } from '../subComponents';

const upArrowImage = require('../Images/up-arrow.png');
const downArrowImage = require('../Images/down-arrow.png');

class OrderDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Order Details',
    headerLeft: <BackButton back={() => navigation.navigate('Home')} />,
    headerTitleStyle: {
      flex: 1,
      color: colorData.titleColor,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16,
    },
    drawerLockMode: 'locked-closed',
  });
  constructor(props) {
    super(props);
    this.state = {
      isAccordianOpen: true,
    };
  }
  itemList = [{
    key: 'data1',
    title: 'Birthday celebration office',
  },
  {
    key: 'data2',
    title: 'Home Grocery Daily Life',
  },
  {
    key: 'data3',
    title: 'Marriage Anniversary',
  },
  {
    key: 'data4',
    title: 'Daily Life Grocery',
  },
  {
    key: 'data5',
    title: 'Grocery list',
  },
  {
    key: 'data6',
    title: 'Marriage Anniversary',
  },
  {
    key: 'data7',
    title: 'Daily Life Grocery',
  },
  {
    key: 'data8',
    title: 'Grocery list',
  },
  {
    key: 'data9',
    title: 'Daily Life Grocery',
  },
  {
    key: 'data10',
    title: 'Grocery list',
  },
  {
    key: 'data11',
    title: 'Marriage Anniversary',
  }];

  accordianList = [{
    label: 'Total Items',
    value: 14,
    itemLableStyle: { fontSize: 14, fontWeight: 'normal', color: colorData.accordianItemColor },
    itemValueStyle: { fontSize: 14, fontWeight: 'normal', color: colorData.accordianItemColor },
  }, {
    label: 'Sub Total',
    value: '$220',
    itemLableStyle: { fontSize: 14, fontWeight: 'bold', color: colorData.accordianItemColor },
    itemValueStyle: { fontSize: 14, fontWeight: 'normal', color: colorData.accordianItemColor },
  }, {
    label: 'Taxes & Charges',
    value: '$22',
    itemLableStyle: { fontSize: 14, fontWeight: 'normal', color: colorData.accordianItemColor },
    itemValueStyle: { fontSize: 14, fontWeight: 'normal', color: colorData.accordianItemColor },
  }, {
    label: 'Shipping Charges',
    value: '$12',
    itemLableStyle: { fontSize: 14, fontWeight: 'normal', color: colorData.accordianItemColor },
    itemValueStyle: { fontSize: 14, fontWeight: 'normal', color: colorData.accordianItemColor },
  }, {
    label: 'Applied Coupon',
    value: 'GET10',
    itemLableStyle: { fontSize: 14, fontWeight: 'normal', color: colorData.redTextColor },
    itemValueStyle: { fontSize: 14, fontWeight: 'normal', color: colorData.redTextColor },
  }, {
    label: 'Total Amount',
    value: '$250',
    itemLableStyle: { fontSize: 17, fontWeight: 'bold', color: colorData.blackTextColor },
    itemValueStyle: { fontSize: 17, fontWeight: 'bold', color: colorData.redTextColor },
  }]

  listItem = (data, index) => (
    <View key={`data${index + 1}`} style={styles.OrderDetailStyle.listItemStyle}>
      <View style={{ flexDirection: 'row', flex: 7, alignItems: 'center' }}>
        <Image source={require('../Images/fruit_jam.png')} style={{ height: 35, width: 25, resizeMode: 'contain' }} />
        <Text style={styles.OrderDetailStyle.listItemTextStyle} > Fruit jam</Text>
      </View>
      <View style={{ flexDirection: 'row', flex: 2.5, alignItems: 'center', justifyContent: 'flex-end' }}>
        <Text style={[styles.OrderDetailStyle.listItemTextStyle, { fontSize: 13, marginRight: 8 }]}>2 Pcs</Text>
        <Text style={[styles.OrderDetailStyle.listItemTextStyle, { color: colorData.redTextColor, fontSize: 15 }]} > $29</Text>
      </View>
    </View>
  );

  accordianHeader = () => {
    const imageUri = this.state.isAccordianOpen ? downArrowImage : upArrowImage;
    return (
      <View style={styles.OrderDetailStyle.accordianHeaderStyle}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: colorData.blackTextColor }} > Cart Summary</Text>
        <View style={{ flexDirection: 'row' }}>
          {!this.state.isAccordianOpen ?
            <Text style={{ color: colorData.blackTextColor, fontSize: 16, fontWeight: 'bold', marginRight: 10 }}>$220</Text> : null}
          <Image source={imageUri} style={styles.MyOrderListStyles.iconStyle} />
        </View>
      </View>
    );
  };

  accordianContent = (data, index) => (
    <View
      key={`data${index + 1}`}
      style={index === 5 ? [styles.OrderDetailStyle.accordianListItemStyle, { borderBottomWidth: 0, borderBottomColor: 'transparent' }] :
        styles.OrderDetailStyle.accordianListItemStyle}
    >
      <Text style={data.itemLableStyle} > {data.label}</Text>
      <Text style={data.itemValueStyle} >{data.value}</Text>
    </View>
  );

  render() {
    return (
      <View style={styles.MyOrderListStyles.mainContainer}>
        <View style={styles.OrderDetailStyle.container}>
          <View style={styles.OrderDetailStyle.rowContainer} >
            <Text style={{ color: colorData.cyanColor, fontSize: 16, fontWeight: 'bold' }} > Home Grocery Daily Life</Text>
            <View style={{ borderRadius: 6, backgroundColor: colorData.cyanColor, paddingHorizontal: 6 }} >
              <Text style={{
                color: 'white', fontWeight: 'bold', fontSize: 14,
              }}
              >Delivered
              </Text>
            </View>
          </View>
          <View style={styles.OrderDetailStyle.dateContainerStyle} >
            <View style={{ flexDirection: 'row' }} >
              <Text style={styles.OrderHistotyStyle.itemHeaderStyle} > Order Date:</Text>
              <Text style={styles.OrderHistotyStyle.itemValueStyle} > 17 jan 2018</Text>
            </View>
            <View style={{ flexDirection: 'row' }} >
              <Text style={styles.OrderHistotyStyle.itemHeaderStyle} > Delivery Date:</Text>
              <Text style={styles.OrderHistotyStyle.itemValueStyle} > 20 jan 2018</Text>
            </View>
          </View>

          <FlatList
            data={this.itemList}
            renderItem={({ item, index }) => this.listItem(item, index)}
            style={{ height: 100, marginBottom: 20 }}
          />

          <Accordion
            sections={['Section 1']}
            renderHeader={this.accordianHeader}
            renderContent={() => this.accordianList.map((data, index) =>
              this.accordianContent(data, index))}
            initiallyActiveSection={0}
            onChange={() => this.setState({ isAccordianOpen: !this.state.isAccordianOpen })}
          />
          <TouchableOpacity style={[styles.sharedStyles.button, { alignSelf: 'center', marginTop: 10 }]}>
            <Text style={styles.sharedStyles.buttonText}>Repeat Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


OrderDetail.propTypes = {
  navigation: PropTypes.object.isRequired, // eslint-disable-line
  // onGoingOrder: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  navigation: state.nav,
});

// const mapDispatchToProps = dispatch => ({
//   createList: () => dispatch({ type: 'CreateList' }),
//   // onGoingOrder: () => dispatch({ type: 'OnGoingOrder' }),
// });

export default connect(mapStateToProps, null)(OrderDetail);
