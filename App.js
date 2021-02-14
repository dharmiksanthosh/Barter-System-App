import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/LoginScreen';
import { AppTabNavigator } from './conponents/AppTabNavigator';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

export default class App extends React.Component {
  render(){
    return (
      <AppContainer/>
    );
  }
}
const switchNavigator = createSwitchNavigator({
  Login:{screen: Login},
  BottomTab:{screen:AppTabNavigator}
})
const AppContainer = createAppContainer(switchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
