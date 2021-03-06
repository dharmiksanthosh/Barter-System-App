import * as React from 'react';
import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Platform } from 'react-native';
import db from '../config';
import firebase from 'firebase'
import { Header } from 'react-native-elements';
import Constants from 'expo-constants';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Alert } from 'react-native';
import MyHeader from '../conponents/MyHeader';

export default class UserDetail extends React.Component{
    constructor(){
        super();
        this.state={
            first_name: '',
            last_name: '',
            address: '',
            contact: '',
            emailId: '',
            docId: ''
        }
    }
    getUserDetails = async ()=>{
        var user = firebase.auth().currentUser.email;
        console.log(user,firebase.auth());
        db.collection('Users')
            .where('username','==',user)
            .get()
            .then(snapshot=>{
                snapshot.forEach(doc=>{
                    var data = doc.data();
                    this.setState({
                        emailId:user,
                        first_name:data.first_name,
                        last_name:data.last_name,
                        address:data.address,
                        contact:data.contact,
                        docId:doc.id
                    })
                })
            })
    }
    updateUserDeatils = ()=>{
        db.collection('Users')
            .doc(this.state.docId)
            .update({
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                address: this.state.address,
                contact: this.state.contact,
            })
        Alert.alert('Profile Updated')
    }
    componentDidMount(){
        this.getUserDetails();
    }
    render(){
        return(
            <SafeAreaProvider>
            <KeyboardAvoidingView behavior={Platform.OS === "android" ? "padding" : "height"} style={[styles.container,{paddingTop:Constants.statusBarHeight}]}>
                
                    <View>
                    <View>
                        <MyHeader
                            title='Update Profile'
                            bellPressAction={()=>{this.props.navigation.navigate('Notification')}}
                            barPressAction={()=>{this.props.navigation.toggleDrawer()}}/>
                    </View>
                    <View style={{flex:1,alignItems:'center'}}>
                        <TextInput
                            style={styles.modalInput}
                            placeholder={"First Name"}
                            onChangeText={(text)=>{this.setState({first_name:text})}}
                            maxLength={15}
                            value={this.state.first_name}/>
                        <TextInput
                            style={styles.modalInput}
                            placeholder={"Last Name"}
                            onChangeText={(text)=>{this.setState({last_name:text})}}
                            maxLength={15}
                            value={this.state.last_name}/>
                        <TextInput
                            style={styles.modalInput}
                            value={this.state.emailId}/>
                        <TextInput
                            style={styles.modalInput}
                            placeholder={"Address"}
                            onChangeText={(text)=>{this.setState({address:text})}}
                            multiline={true}
                            value={this.state.address}/>
                        <TextInput
                            style={styles.modalInput}
                            placeholder={"Mobile no"}
                            onChangeText={(text)=>{this.setState({contact:text})}}
                            maxLength={10}
                            keyboardType={'number-pad'}
                            value={this.state.contact}/>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={()=>{this.updateUserDeatils()}}>
                                <Text style={{fontSize:15,textAlign:'center'}}>Save</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                
            </KeyboardAvoidingView>
            </SafeAreaProvider>
        );
    }
} 

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
   
    button: {
        height:30,
        width:90,
        borderWidth:2,
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#e8a41f',
        alignSelf: 'center'
    },
    modalInput: {
        width:250,
        height:35,
        borderWidth:2,
        borderRadius:10,
        marginHorizontal:15,
        marginBottom:5,
        paddingLeft:10
    },
 
  });