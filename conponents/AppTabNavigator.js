import * as React from 'react';
import { Text, Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from '../screens/HomeScreen';
import Exchange from '../screens/ExchangeScreen';

export const AppTabNavigator = createBottomTabNavigator({
        HomeScreen: {screen: Home},
        ExchangeScreen: {screen: Exchange}
    },
    {
        defaultNavigationOptions: ({ navigation }) =>({
          tabBarIcon: () =>{
            const routeName = navigation.state.routeName;
    
            if (routeName === 'ExchangeScreen') {
              return (
                <Image style={{width:40,height:40}} source={require('../assets/exchange.png')}/>
              )
            } else if (routeName === 'HomeScreen') {
              return (
                <Image style={{width:40,height:40}} source={require('../assets/home.png')}/>
              )
            }
          },
          tabBarLabel: () =>{
            const routeName = navigation.state.routeName;
    
            if (routeName === 'ExchangeScreen') {
              return <Text style={{textAlign:'center',marginBottom:5}}>Exchange</Text>
            } else if (routeName === 'HomeScreen') {
                return <Text style={{textAlign:'center'}}>Home</Text>
            }
          },
          tabBarOptions: {
            activeTintColor:'black',
            activeBackgroundColor:'#ccc',
            style: {
                backgroundColor: '#f7f7f7',
                height: 70
            },
          }
        })
    }
)