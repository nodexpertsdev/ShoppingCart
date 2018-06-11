import React, { Component } from 'react';
import {
  Text,
  Image,
  View,
  SectionList,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import colorData from '../config/color';
import styles from '../styles/style';
import { BackButton } from '../subComponents';

const { NotificationStyle } = styles;

class Notification extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Notification',
    headerLeft: <BackButton back={() => navigation.navigate('Home')} />,
    headerTitleStyle: {
      flex: 1,
      color: colorData.titleColor,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });

  getItem = index => (
    <View key={index} style={NotificationStyle.itemStyle}>
      <View style={NotificationStyle.itemContainerStyle}>
        <Image source={require('../Images/truck.png')} style={styles.NotificationStyle.iconStyle} />
      </View>
      <View style={NotificationStyle.leftContainerStyle}>
        <View style={styles.MyOrderListStyles.imageContainerStyle}>
          <Image source={require('../Images/clock.png')} style={styles.MyOrderListStyles.iconStyle} />
          <Text style={styles.NotificationStyle.imageTextStyle}> Just Now</Text>
        </View>
        <View style={{ marginTop: 8 }}>
          <Text style={styles.NotificationStyle.textStyle} >Your
            <Text style={styles.NotificationStyle.boldTextStyle}> order is placed</Text>
            <Text style={styles.NotificationStyle.textStyle} >
              , you will receive soon, Good day!
            </Text>
          </Text>
        </View>
      </View>
    </View>
  )

  render() {
    return (
      <View style={styles.MyOrderListStyles.mainContainer} >
        <View style={styles.NotificationStyle.container}>
          <SectionList
            renderItem={({ item, index, section }) => this.getItem(index)}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={NotificationStyle.notificationHeaderStyle}>{title}
              </Text>)}
            sections={[
              { title: 'Today', data: ['item1', 'item2'] },
              { title: 'Yesterday', data: ['item3', 'item4'] },
              { title: '10 Feb 2018', data: ['item5', 'item6', 'item7'] },
            ]}
            stickySectionHeadersEnabled={false}
            keyExtractor={(item, index) => item + index}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
}

Notification.propTypes = {
  navigation: PropTypes.object.isRequired, // eslint-disable-line
};

const mapStateToProps = state => ({
  navigation: state.nav,
});

// const mapDispatchToProp = dispatch => ({
// });

export default connect(mapStateToProps, null)(Notification);

