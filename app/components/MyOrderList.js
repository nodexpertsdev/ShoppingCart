import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  Alert,
  Image,
  View,
  ListView,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { Fab } from 'native-base';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import colorData, { getGredientColorList } from '../config/color';
import stringData from '../config/string';
import styles from '../styles/style';
import { DrawerButton, ToolTip, SearchBar, MySnackbar } from '../subComponents';
import { request, parseDateInMMMFrmt } from '../config/utility';

const { MyOrderListStyles } = styles;

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
let message;

class MyOrderList extends Component {
    static navigationOptions = ({ navigation }) => ({
      title: 'My Lists',
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
      this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      this.state = {
        snackbarVisibility: false,
        itemList: [],
        listViewData: Array(20).fill('').map((_, i) => ({ key: `${i}`, text: `item #${i}` })),
      };
    }

    componentDidMount() {
      this.props.changeTooltipData();
      this.getOrderListData();
    }

    onRowDidOpen = (rowKey, rowMap) => {
      setTimeout(() => {
        this.closeRow(rowMap, rowKey);
      }, 2000);
    }
    getOrderListData = async () => {
      const query = `query{
        findAllList{
          name,
          dueDate,
          updatedAt,
          listColor,
          isDefault,
        }
      }`;
      let data = null;
      try {
        data = await request(query, null, this.props.token);
      } catch (err) {
        message = stringData.createList.errorMessage;
        this.setState({ snackbarVisibility: true });
        return null;
      }
      if (data[0] && data[0].message) {
        ([{ message }] = data);
        this.setState({ snackbarVisibility: true });
        return null;
      }
      if (data.findAllList.length > 0) {
        const itemList = data.findAllList.map((itemData) => {
          const tempData = itemData;
          tempData.dueDate = parseDateInMMMFrmt(itemData.dueDate);
          tempData.updatedAt = parseDateInMMMFrmt(itemData.updatedAt);
          tempData.listColor = getGredientColorList()[itemData.listColor];
          return tempData;
        });
        this.setState({ itemList: data.findAllList });
        return null;
      }
      return null;
    }
    closeRow(rowMap, rowKey) {
      if (rowMap[rowKey]) {
        this.closeRow();
      }
    }

    deleteRow(rowMap, rowKey) {
      this.closeRow(rowMap, rowKey);
      const newData = [...this.state.listViewData];
      const prevIndex = this.state.listViewData.findIndex(item => item.key === rowKey);
      newData.splice(prevIndex, 1);
      this.setState({ listViewData: newData });
    }
    editPress = () => {
      Alert.alert('edit');
    }

    deletePress = () => {
      Alert.alert('delete');
    }
    callCreateList= () => {
      this.props.createList();
    }

    listItem = (listData, index) => (
      <SwipeRow key={`listData${index + 1}`} leftOpenValue={75} rightOpenValue={-75}>
        <View style={MyOrderListStyles.standaloneRowBack}>
          <TouchableOpacity onPress={() => this.editPress()}>
            <Image source={require('../Images/ic_edit.png')} style={MyOrderListStyles.deleteImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.deletePress()}>
            <Image source={require('../Images/delete.png')} style={MyOrderListStyles.deleteImage} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this.props.orderDetail}>
          <View style={{ marginBottom: 10, flex: 1 }} >
            <LinearGradient
              start={{ x: 0.0, y: 0.5 }}
              end={{ x: 0.5, y: 1.0 }}
              locations={[0.5, 1]}
              colors={[listData.listColor.gredientColor1, listData.listColor.gredientColor2]}
              style={{ padding: 7, borderRadius: 8 }}
            >
              <View >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                  <View style={{ flex: 4, justifyContent: 'space-between' }} >
                    <Text style={{ color: 'white' }} > {listData.name}</Text>
                    <View style={MyOrderListStyles.line} />
                  </View>
                  <View style={MyOrderListStyles.collabImageContainer} >
                    <Image source={require('../Images/profile.png')} style={MyOrderListStyles.imageStyle} />
                  </View>
                </View>
                <View style={MyOrderListStyles.row} >
                  <View style={MyOrderListStyles.column} >
                    <View style={MyOrderListStyles.imageContainerStyle}>
                      <Image source={require('../Images/Due_date.png')} style={MyOrderListStyles.iconStyle} />
                      <Text style={MyOrderListStyles.imageTextStyle} > Due Date</Text>
                    </View>
                    <Text style={MyOrderListStyles.textStyle}> {listData.dueDate}</Text>
                  </View>
                  <View style={MyOrderListStyles.column}>
                    <View style={MyOrderListStyles.imageContainerStyle}>
                      <Image source={require('../Images/delay_by.png')} style={MyOrderListStyles.iconStyle} />
                      <Text style={MyOrderListStyles.imageTextStyle} > Delay By</Text>
                    </View>
                    <Text style={MyOrderListStyles.textStyle}> {listData.delayBy}</Text>
                  </View>
                  <View style={MyOrderListStyles.column}>
                    <View style={MyOrderListStyles.imageContainerStyle}>
                      <Image source={require('../Images/latest_update.png')} style={MyOrderListStyles.iconStyle} />
                      <Text style={MyOrderListStyles.imageTextStyle} > Last Update</Text>
                    </View>
                    <Text style={MyOrderListStyles.textStyle} >{listData.updatedAt}</Text>
                  </View>
                  <View style={[MyOrderListStyles.column, { borderLeftColor: 'black', borderLeftWidth: 1 }]}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }} > 0</Text>
                    <Text style={{ color: '#000000', fontSize: 13 }} >Total Items</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
            <View style={MyOrderListStyles.gredientStyle} >
              <Text style={{ color: '#76726C', fontSize: 10 }} > Payable Amount </Text>
              <Text style={{
                fontSize: 15, fontWeight: 'bold', color: listData.statrtColor, marginLeft: 8,
                }}
              >$ 0
              </Text>
              <View style={{ flex: 1 }}>
                <Text style={MyOrderListStyles.placeOrderStyle} >Place Order </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </SwipeRow>
    );

    render() {
      return (
        <View style={[styles.sharedStyles.mainContainer, { backgroundColor: 'white' }]}>
          <View style={MyOrderListStyles.container} >
            <SearchBar onTextChange={() => {}} />
            <SwipeListView
              dataSource={this.ds.cloneWithRows(this.state.itemList)}
              renderRow={(data, secId, rowId, rowMap) => (
                this.listItem(data, secId)
              )}
              enableEmptySections
            />
            <Fab
              direction="up"
              containerStyle={{}}
              style={{ backgroundColor: '#57D892' }}
              position="bottomRight"
              onPress={() => this.callCreateList()}
            >
              <Text>+</Text>
            </Fab>
          </View >
          <MySnackbar
            snackbarVisibility={this.state.snackbarVisibility}
            message={message}
            actionHandler={() => this.setState({ snackbarVisibility: false })}
            actionText="Ok"
          />
        </View>
      );
    }
}

MyOrderList.defaultProps = {
  token: null,
};

MyOrderList.propTypes = {
  navigation: PropTypes.object.isRequired, // eslint-disable-line
  changeTooltipData: PropTypes.func.isRequired,
  createList: PropTypes.func.isRequired,
  orderDetail: PropTypes.func.isRequired,
  token: PropTypes.string,
};

const mapStateToProps = state => ({
  navigation: state.nav,
  token: state.login.token,
});

const mapDispatchToProp = dispatch => ({
  changeTooltipData: () => dispatch({ type: 'TOOLTIP_DATA', tooltipData }),
  createList: () => dispatch({ type: 'CreateList' }),
  orderDetail: () => dispatch({ type: 'OrderDetail' }),
});

export default connect(mapStateToProps, mapDispatchToProp)(MyOrderList);
