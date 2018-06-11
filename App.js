import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
//import { Constants } from 'expo';

import AddressScreen from './app/components/AddressScreen';
import ProfileScreen from './app/components/ProfileScreen';
import MycardScreen from './app/components/MycardScreen';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {},
  view: {
    marginTop: 100,
    backgroundColor: 'blue',
    width: width - 80,
    margin: 10,
    // height: 200,
    borderRadius: 10,
    //paddingHorizontal : 30
  },
  view2: {
    marginTop: 100,
    backgroundColor: 'red',
    width: width - 80,
    margin: 10,
    // height: 200,
    borderRadius: 10,
    //paddingHorizontal : 30
  },
});

export default class App extends Component {
  componentDidMount() {
		setTimeout(() => { this.scrollView.scrollTo({ x: -30 })}, 1); // scroll view position fix
	}
	
  render() {
    return (
      <ScrollView 
        ref={(scrollView) => { this.scrollView = scrollView; }}
        style={styles.container}
        //pagingEnabled={true}
        horizontal
        decelerationRate={0}
        snapToInterval={width - 60}
        snapToAlignment="center"
        contentInset={{
          top: 0,
          left: 30,
          bottom: 0,
          right: 30,
        }}>
        <View style={styles.view}>
          <MycardScreen />
        </View>
        <View style={styles.view2}>
          <ProfileScreen />
        </View>
        <View style={styles.view2}>
          <AddressScreen />
        </View>
      </ScrollView>
    );
  }
}
