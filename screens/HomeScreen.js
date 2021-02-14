import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { Header, ListItem } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import db from '../config';

export default class HomeScreen extends React.Component {
    constructor(){
        super();
        this.state={
            allRequests: []
        }
    }
    getRequests = async ()=>{
        const reqs = await db.collection('exchange_requests').get()
        reqs.docs.map((doc)=>{
            this.setState({
                allRequests: [doc.data()]
            })
            console.log(doc.data())
        })
    }
    componentDidMount(){
        this.getRequests()
    }
    renderItem = ( {item, i} )=>{
        console.log(item.item_name);
        return(
            <ListItem
                key={i}
                title={item.item_name}
                subtitle={item.description}
                titleStyle={{ color: 'black', fontWeight: 'bold'}}
                rightElement={
                    <TouchableOpacity style={{width:100,height:70}}>
                        <Text style={{color: '#fff'}}>Exchange</Text>
                    </TouchableOpacity>
                }/>
        )
    }
    render(){
        return(
            <SafeAreaProvider>
                <View style={{paddingTop:Constants.statusBarHeight}}>
                    <Header
                        centerComponent={{ text: 'Home', style: { color: '#000', fontWeight: 'bold', fontSize:20 }}}
                        containerStyle={{
                            backgroundColor: '#f4c92d',
                            justifyContent: 'space-around',
                        }}/>
                    <View>
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.allRequests}
                            renderItem={this.renderItem}/>
                    </View>
                </View>
            </SafeAreaProvider>
        );
    }
}