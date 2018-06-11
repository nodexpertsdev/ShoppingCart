import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  View,
} from 'react-native';

import { DrawerButton } from '../subComponents';

import styles from '../styles/style';
import colorData from '../config/color';

const { HomeStyle } = styles;

class Home extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Create List',
    headerLeft: <DrawerButton drawer={() => navigation.navigate('DrawerOpen')} />,
    headerTitleStyle: {
      flex: 1,
      color: colorData.titleColor,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });

  render() {
    return (
      <ImageBackground source={require('../Images/bg.png')} style={{ width: '100%', height: '100%' }}>
        <View style={HomeStyle.container}>
          <TouchableOpacity onPress={this.props.createList} >
            <Text style={HomeStyle.username}>Hey, Alexa!</Text>
          </TouchableOpacity>
          <View style={HomeStyle.innerContainer} >
            <Text style={HomeStyle.discover}> Feeling lonely here, create a new list</Text>
            <Image source={require('../Images/fruit.png')} style={{ width: 250, height: 250 }} resizeMode="contain" />
            <TouchableOpacity onPress={this.props.createList} >
              <Image source={require('../Images/ic_add.png')} style={HomeStyle.iconStyle} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.object.isRequired, // eslint-disable-line
  createList: PropTypes.func.isRequired,
  // onGoingOrder: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  navigation: state.nav,
});

const mapDispatchToProps = dispatch => ({
  createList: () => dispatch({ type: 'CreateList' }),
  // onGoingOrder: () => dispatch({ type: 'OnGoingOrder' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
