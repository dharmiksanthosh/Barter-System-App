import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Welcome from './screens/LoginScreen';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { AppDrawerNavigator } from './conponents/AppDrawerNavigator';

export default class App extends React.Component {
  render(){
    return (
      <AppContainer/>
    );
  }
}
const switchNavigator = createSwitchNavigator({
  Welcome:{screen: Welcome},
  Drawer:{screen:AppDrawerNavigator},
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