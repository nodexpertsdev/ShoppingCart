import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
  View,
  FlatList,
  ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import colorData from '../config/color';
import styles from '../styles/style';
import { DrawerButton, ToolTip, SearchBar } from '../subComponents';

const { ProductListStyle } = styles;

const listImg = require('../Images/view_type.png');
const gridImg = require('../Images/grid_view.png');

const tooltipData = [{
  label: 'B\'day Celebration Office',
  selected: true,
}, {
  label: 'Home Grocery Daily Life',
  selected: false,
}, {
  label: 'Marriage Anniversary',
  selected: false,
}, {
  label: 'Daily Life Grocery',
  selected: false,
}];


class ProductList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Products',
    headerLeft: <DrawerButton drawer={() => navigation.navigate('DrawerOpen')} />,
    headerRight: <ToolTip isRadioType={false} />,
    headerTitleStyle: {
      flex: 1,
      color: colorData.titleColor,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });

  constructor(props) {
    super(props);
    this.state = {
      GridColumnsValue: false,
      dataSource: [1, 2, 3, 4, 5, 6],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.props.changeTooltipData();
  }

  getListItem = (data) => {
    if (this.state.GridColumnsValue) {
      return this.listItem(data);
    }
    return this.gridItem(data);
  }

  ChangeListViewType = () => {
    this.setState({
      GridColumnsValue: !this.state.GridColumnsValue,
    });
  }

  gridItem = data => (
    <View style={ProductListStyle.gridItemStyle}>
      {this.renderOutOfStockView(true, true)}
      <Image source={require('../Images/shampoo.png')} style={ProductListStyle.gridItemImageStyle} />
      <Text style={[ProductListStyle.previousRate, { textDecorationLine: 'line-through', textDecorationColor: colorData.redTextColor }]}>MRP $12</Text>
      <Text style={ProductListStyle.listItemTitle} >Pulpy Fruit Jam</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={ProductListStyle.finalRate} >$20</Text>
        <Text style={[
            ProductListStyle.previousRate,
            { color: colorData.lightgreyTextColor, marginLeft: 4 }]}
        >
          25% off
        </Text>
      </View>
      <View style={ProductListStyle.gridItemNotifyContainerStyle} />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={require('../Images/notify.png')} style={{ width: 12, height: 12, marginRight: 5 }} />
        <Text style={{ color: colorData.redTextColor, fontSize: 11, fontWeight: '600' }}>Notify Me</Text>
      </View>
    </View>
  )

  listItem = data => (
    <View style={ProductListStyle.listItemStyle}>
      <View style={ProductListStyle.listItemFinalRateConatienrStyle}>
        <Text style={ProductListStyle.finalRate} >$60</Text>
        <Text style={ProductListStyle.previousRate} >25% off</Text>
      </View>
      <View style={ProductListStyle.listItemImageStyle}>
        <Image source={require('../Images/shampoo.png')} style={{ width: 100, height: 100, marginRight: 10 }} />
        <View>
          <Text style={ProductListStyle.listItemTitle} >Pulpy Fruit Jam</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[ProductListStyle.listItemQuantity, { textDecorationLine: 'line-through', textDecorationColor: colorData.lightgreyTextColor }]}>100</Text>
            <Text style={ProductListStyle.listItemQuantity} >,250 gms</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <Image source={require('../Images/notify.png')} style={{ width: 12, height: 12, marginRight: 5 }} />
            <Text style={{ color: colorData.redTextColor, fontSize: 11, fontWeight: '600' }}>Notify Me</Text>
          </View>
        </View>
      </View>
      {this.renderOutOfStockView(true, false)}
    </View>
  )

  renderOutOfStockView = (isoutOfStock, isGridItem) => {
    if (isoutOfStock) {
      return (
        <View style={{
          padding: 8,
          borderBottomLeftRadius: isGridItem ? 25 : 0,
          borderTopRightRadius: isGridItem ? 8 : 0,
          borderTopLeftRadius: isGridItem ? 0 : 25,
          borderBottomRightRadius: isGridItem ? 0 : 8,
          alignSelf: 'flex-end',
          backgroundColor: colorData.lightRedColor,
        }}
        >
          <Text style={{ color: 'red', fontSize: 14, fontWeight: '600' }}>Out of stock</Text>
        </View>);
    }
    return null;
  }

  render() {
    const viewTypeImageUrl = this.state.GridColumnsValue ? listImg : gridImg;
    return (
      <ImageBackground source={require('../Images/product_bg.png')} style={{ width: '100%', height: '100%' }} >
        <View style={ProductListStyle.container} >
          <SearchBar onTextChange={() => {}} requireBelowBorder={false} />
          <View style={ProductListStyle.optionContainerStyle}>
            <TouchableOpacity onPress={() => this.ChangeListViewType()}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  source={viewTypeImageUrl}
                  style={[ProductListStyle.searchIcon, { marginRight: 4 }]}
                />
                <Text style={ProductListStyle.tabTitle}>View Type</Text>
              </View>
            </TouchableOpacity>
            <View style={ProductListStyle.verticalLine} />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Image source={require('../Images/sort_by.png')} style={[ProductListStyle.searchIcon, { marginRight: 4 }]} />
              <Text style={ProductListStyle.tabTitle}>Sort By</Text>
            </View>
            <View style={ProductListStyle.verticalLine} />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Image source={require('../Images/filter_type.png')} style={[ProductListStyle.searchIcon, { marginRight: 4 }]} />
              <Text style={ProductListStyle.tabTitle}>Filter Type</Text>
            </View>
          </View>
          <FlatList
            data={this.state.dataSource}
            renderItem={({ item }) => this.getListItem(item)}
            numColumns={this.state.GridColumnsValue ? 1 : 2}
            key={(this.state.GridColumnsValue) ? 'ONE COLUMN' : 'TWO COLUMN'}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ImageBackground>
    );
  }
}


ProductList.propTypes = {
  navigation: PropTypes.object.isRequired, // eslint-disable-line
  changeTooltipData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  navigation: state.nav,
});

const mapDispatchToProp = dispatch => ({
  changeTooltipData: () => dispatch({ type: 'TOOLTIP_DATA', tooltipData }),
});

export default connect(mapStateToProps, mapDispatchToProp)(ProductList);
