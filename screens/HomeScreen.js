import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { ListItem } from 'react-native-elements';
import db from '../config';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MyHeader from '../conponents/MyHeader'
import { ScrollView } from 'react-native-gesture-handler';

export default class Home extends React.Component {
    constructor(){
        super()
        this.state={
            requestedItemList: [],
        }
    }
    getRequestedItemList =()=>{
        this.requestRef = db.collection('exchange_requests')
            .onSnapshot((snapshot)=>{
                var requestedItemList = snapshot.docs.map(document=>document.data());
                console.log(requestedItemList)
                this.setState({
                    requestedItemList: requestedItemList
                })
                console.log(this.state.requestedItemList)
            })
    }
    componentDidMount(){
        this.getRequestedItemList();
    }
    render(){
        return(
            <SafeAreaProvider>
            <View style={{paddingTop:Constants.statusBarHeight}}>
                <MyHeader
                    title='Home'
                    bellPressAction={()=>{this.props.navigation.navigate('Notification')}}
                    barPressAction={()=>{this.props.navigation.toggleDrawer()}}
                />
                <View>
                    <ScrollView>
                        <FlatList
                            keyExtractor={(item,index)=>index.toString()}
                            data={this.state.requestedItemList}
                            renderItem={({item,key})=>{
                                return (
                                    <ListItem
                                        key={key}
                                        bottomDivider>
                                        <Image style={{height:100,width:100}} source={{uri:item.imageUrl}}/>    
                                            <ListItem.Content style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                                                <ListItem.Title style={{color:'#000',fontWeight:'bold'}}>{item.item_description}</ListItem.Title>
                                                <ListItem.Subtitle style={{color:'#090',fontWeight:'bold'}}>{item.description}</ListItem.Subtitle>
                                                <TouchableOpacity
                                                    style={styles.button}
                                                    onPress={()=>{this.props.navigation.navigate('ReciverList',{'details':item})}}>
                                                        <Text style={{color:'black',alignItems:'center',justifyContent:'center'}}>View</Text>
                                                </TouchableOpacity>
                                            </ListItem.Content>
                                    </ListItem>
                                )
                            }}
                        />
                    </ScrollView>
                </View>
            </View>
            </SafeAreaProvider>
        );
    }
}

const styles = StyleSheet.create({
    button:{
        width:40,
        height:20,
        backgroundColor:'orange'
    }
})