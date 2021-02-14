import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList, Alert } from 'react-native';
import Constants from 'expo-constants';
import { Header } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import db from '../config';

export default class ExchangeScreen extends React.Component {
    constructor(){
        super();
        this.state={
            itemName: '',
            description: '',
            viewRequests: false,
            viewAddItem: false
        }
    }
    addItem = (itemName,description)=>{
        db.collection("exchange_requests").add({
            'item_description': itemName,
            'description': description
        })
        this.setState({
            itemName: '',
            description: ''
        })
        this.props.navigation.navigate('HomeScreen')
    }
    render(){
        return(
            <SafeAreaProvider>
                <View style={{paddingTop:Constants.statusBarHeight}}>
                    <Header
                            centerComponent={{ text: 'Exchange', style: { color: '#000', fontWeight: 'bold', fontSize:20 }}}
                            containerStyle={{
                                backgroundColor: '#f4c92d',
                                justifyContent: 'space-around',
                            }}/>
                </View>
                <View style={{flex:1,alignItems: 'center'}}>
                    <Image style={{width:200,height:200, alignSelf:'center'}} source={require('../assets/exchange.png')}/>
                    <TextInput
                        style={styles.input}
                        placeholder={'Item Name'}
                        onChangeText={(text)=>{this.setState({itemName:text})}}
                        value={this.state.itemName}/>
                    <TextInput
                            style={[styles.input,{height:50,marginTop:15}]}
                            placeholder={'Description'}
                            multiline={true}
                            numberOfLines={8}
                            onChangeText={(text)=>{this.setState({description: text})}}
                            value={this.state.description}/>
                    <TouchableOpacity
                        style={[styles.button,{marginTop:10}]}
                        onPress={()=>{this.addItem(this.state.itemName, this.state.description)}}>
                            <Text style={{color:'#fff', fontSize:16, fontWeight:'bold',alignSelf:'center'}}>Add Item</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaProvider>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        width:250,
        height:35,
        borderWidth:2,
        borderRadius:10,
        justifyContent:'center'
    },
    button: {
        width:100,
        height:40,
        backgroundColor: 'orange',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:2,
        borderRadius:25
    }
})