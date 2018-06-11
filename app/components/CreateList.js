import React, { Component } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Image,
  View,
  Keyboard,
} from 'react-native';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Contacts from 'react-native-contacts';
import CheckBox from 'react-native-check-box';
import DateTimePicker from 'react-native-modal-datetime-picker';
import LinearGradient from 'react-native-linear-gradient';
import MySnackbar from '../subComponents/MySnackbar';
import stringData from '../config/string';
import colorData, { getGredientColorList } from '../config/color';
import { parseDate, request, getUnusedColorData } from '../config/utility';
import styles from '../styles/style';

import { BackButton } from '../subComponents';

const { CreateListStyles } = styles;
// const today = parseDate(new Date());
let message;
let selectedColorIndex;
let dueDate = '';
class CreateList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Create list',
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
    // const date = today;
    this.state = {
      isDateTimePickerVisible: false,
      date: '',
      listName: null,
      snackbarVisibility: false,
      showValidation: false,
      isColorSelected: false,
      checkStatus: true,
      isFirstTime: true, // user creating the list first time
      defaultListName: '',
      arr: [],
    };
  }

  async componentDidMount() {
    const query = `query{
      findAllList{
        name,
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
      let defaultListName = null;
      const usedColor = data.findAllList.map((listData) => {
        if (listData.isDefault) {
          defaultListName = listData.name;
        }
        return listData.listColor;
      });
      this.setState({
        checkStatus: false,
        isFirstTime: false,
        defaultListName: `Default Now: ${defaultListName}`,
        arr: getUnusedColorData(getGredientColorList(), usedColor),
      });
    } else {
      this.setState({ arr: getGredientColorList() });
    }
    return null;
  }

  onCheckChanged = () => {
    if (!this.state.isFirstTime) {
      this.setState({ checkStatus: !this.state.checkStatus });
    }
  }
  onCreate = async () => {
    this.setState({ showValidation: true });
    if (!this.state.listName) {
      return null;
    }
    if (!this.state.isColorSelected) {
      return null;
    }
    const queryData = `{
      "name": "${this.state.listName}",
      "dueDate": "${dueDate}",
      "listColor": ${selectedColorIndex},
      "isDefault": ${this.state.checkStatus}
    }`;
    const query = `mutation(
      $name: String!,
      $dueDate: String!,
      $listColor: Int!,
      $isDefault: Boolean!
    ) {
      createList(
        name: $name,
        dueDate: $dueDate,
        listColor: $listColor,
        isDefault: $isDefault
      ){
       _id
      }
    }`;
    let data = null;
    try {
      data = await request(query, queryData, this.props.token);
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

    if (data.createList._id) {
      this.props.myList();
      return null;
    }
    return null;
  }

  onTouchCircle = (index) => {
    const arr = this.state.arr.map((data, i) => {
      const newData = data;

      if (i === index) {
        newData.isSelected = true;
        selectedColorIndex = data.id;
        return newData;
      }
      newData.isSelected = false;
      return newData;
    });
    this.setState({ isColorSelected: true, showValidation: false, arr });
    // this.setState({ arr });
  }

  handleDatePicked = (date) => {
    const selectedDate = parseDate(date);
    if (date <= new Date()) {
      // message = stringData.createList.warningDate;
      // this.setState({ snackbarVisibility: true });
      Alert.alert(
        stringData.createList.warnignTitle,
        stringData.createList.warningDate,
      );
    } else {
      dueDate = date;
      this.setState({ date: selectedDate });
      this.hideDateTimePicker();
    }
  };

  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  switchToMyOrderList = () => {
    this.props.myList();
  }

  showContact = () => {
    Contacts.checkPermission((err, permission) => {
      /* Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED; */ // eslint-disable-line
      if (permission === 'undefined') {
        Contacts.requestPermission((error, permissions) => {
          // ...
        });
      }
      if (permission === 'authorized') {
        // yay!

        Contacts.getAll((error, contacts) => {
          if (err === 'denied') {
            // error
          } else {
            // contacts returned in []
          }
        });
      }
      if (permission === 'denied') {
        // x.x
        console.log('contact permission denied');
      }
    });
  }

  gredientCircleItem = (data, index) => (
    <TouchableOpacity key={`data${index + 1}`} onPress={() => this.onTouchCircle(index)} >
      <LinearGradient
        start={{ x: 0.0, y: 0.5 }}
        end={{ x: 0.5, y: 1.0 }}
        locations={[0.5, 1]}
        colors={[data.gredientColor1,
        data.gredientColor2]}
        style={[CreateListStyles.circle, data.isSelected ? { borderColor: '#000', borderWidth: 1, marginLeft: 8 } : { marginLeft: 8 }]}
      />
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={[styles.sharedStyles.mainContainer, { backgroundColor: 'white' }]}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={CreateListStyles.container}>
            <View>
              <Text style={CreateListStyles.textStyle}>Enter list Name</Text>
              <TextInput
                onChangeText={(text =>
                  this.setState({ listName: text.trim(), showValidation: false }))}
                underlineColorAndroid="transparent"
                style={[CreateListStyles.textInputStyle, { marginTop: 7 }]}
              />
              <View style={(this.state.showValidation && !this.state.listName) ?
                { borderBottomColor: colorData.warningColor, borderBottomWidth: 1 } :
                { borderBottomColor: colorData.lineColor, borderBottomWidth: 1 }}
              />
              {(this.state.showValidation && !this.state.listName) ?
                <Text style={styles.sharedStyles.inlineWarnignStyle}>
                  {stringData.createList.warningListName}
                </Text> : null}
            </View>
            <View style={CreateListStyles.itemContainer} >
              <Text style={CreateListStyles.textStyle}>Due Date</Text>
              <TouchableOpacity onPress={this.showDateTimePicker}>
                <View style={CreateListStyles.rowContainer}>
                  <Text style={CreateListStyles.textValueStyle}>{this.state.date}</Text>
                  <Image source={require('../Images/calendar.png')} style={CreateListStyles.iconStyle} />
                </View>
              </TouchableOpacity>
              <View style={CreateListStyles.line} />
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this.handleDatePicked}
                onCancel={this.hideDateTimePicker}
              />
            </View>
            <View style={CreateListStyles.itemContainer}>
              <Text style={CreateListStyles.textStyle}>Select Collaborators</Text>
              <View style={CreateListStyles.rowContainer}>
                <Text style={CreateListStyles.textValueStyle}>Select From Contact list</Text>
                <Image source={require('../Images/person.png')} style={CreateListStyles.iconStyle} />
              </View>
              <View style={CreateListStyles.line} />
            </View>
            <View style={CreateListStyles.itemContainer}>
              <Text style={CreateListStyles.textStyle}>Select colour for your list</Text>
              <View style={[CreateListStyles.colorContainer, { marginTop: 10 }]}>
                {
                  this.state.arr.map((data, index) => this.gredientCircleItem(data, index))
                }
              </View>
              <View style={(this.state.showValidation && !this.state.isColorSelected) ?
                CreateListStyles.warningline : CreateListStyles.line}
              />
              {(this.state.showValidation && !this.state.isColorSelected) ?
                <Text style={styles.sharedStyles.inlineWarnignStyle}>
                  {stringData.createList.warningColorSelection}
                </Text> : null}
            </View>
            <View style={CreateListStyles.itemContainer}>
              <View style={CreateListStyles.rowContainer}>
                <Text style={{ fontSize: 13, color: colorData.greyTextColor }}>
                  Make it Default
                </Text>
                <CheckBox
                  onClick={() => this.onCheckChanged()}
                  isChecked={this.state.checkStatus}
                  disabled={this.state.isFirstTime}
                />
              </View>
              <Text style={{ fontSize: 10, color: colorData.lightgreyTextColor }}>
                {this.state.defaultListName}
              </Text>
            </View>
            <View style={CreateListStyles.iconContainer}>
              <TouchableOpacity onPress={() => this.onCreate()} >
                <Image source={require('../Images/done.png')} style={CreateListStyles.rightIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
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

CreateList.propTypes = {
  navigation: PropTypes.object.isRequired, // eslint-disable-line
  myList: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  navigation: state.nav,
  token: state.login.token,
});

const mapDispatchToProps = dispatch => ({
  myList: () => dispatch({ type: 'MyOrderList' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateList);

