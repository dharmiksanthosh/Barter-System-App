import React,{Component} from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import firebase from 'firebase';
import Header from '../conponents/Header';
import db from '../config';

export default class Login extends Component {
  constructor(){
    super()
      this.state = {emailId:'', passward:''}
    }

    login = async (email,password)=>{
        if (email && password) {
            try {
                const response = await firebase.auth().signInWithEmailAndPassword(email,password)
                return Alert.alert('Loged in Succesfully')
            } catch (error) {
                switch (error.code) {
                    case 'auth/user-not-found':
                            Alert.alert('User does not exists', 'User Does Not Exist, please Sign Up');
                            console.log('User does not exists');
                        break;
                    case 'auth/invaild-email':
                            Alert.alert('Incorrect email or password');
                            console.log('incorrect email or password');
                        break;
                    default:

                        break;
                }
            }
        } else {
            Alert.alert('Enter Email and Password')
        }
    }
    userSignUp = async (email,password,cpassword)=>{
        if (password == cpassword) {
            firebase.auth().createUserWithEmailAndPassword(email,password)
                .then((response)=>{
                    return Alert.alert('User Added','User Added Succesfully')
                })
                .catch(function(error){
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    return Alert.alert(errorMessage)
                })
            db.collection('Users').add({
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                address: this.state.address,
                contact: this.state.contact,
                username: this.state.email
            })
        } else {
            return Alert.alert('Password does not match')
        }
    }
  render(){
      return (
        <KeyboardAvoidingView behavior={Platform.OS === "android" ? "padding" : "height"} style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <Header/>
                    <View>
                        <Image style={{width:'256px',height:'157.5px',margin:30,marginBottom:50,alignSelf:'center'}} source ={require('../assets/barter.png')}/>
                    </View>
                    <View styles={styles.inputView}>
                        <View style={{flexDirection:'row',alignSelf:'center',marginBottom:15}}>
                            <Image style={{width:25,height:20,marginRight:-32,marginTop:7}} source={require('../assets/mail.png')}/>
                            <TextInput
                                style={styles.input}
                                placeholder="abc@example.com"
                                keyboardType="email-address"
                                onChangeText={(text)=>{this.setState({email:text})}}/>
                        </View>
                        <View style={{flexDirection:'row',alignSelf:'center'}}>
                            <Image style={{width:20,height:20,marginRight:-28,marginTop:5}} source={require('../assets/pw.png')}/>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Password"
                                secureTextEntry={true}
                                onChangeText={(text)=>{this.setState({password:text})}}/>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={[styles.login,{marginTop:10}]}
                            onPress={()=>{
                                this.login(this.state.email,this.state.password)
                            }}>
                                <Text style={styles.loginText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={[styles.login,{marginTop:5}]}
                            onPress={()=>{}}>
                                <Text style={styles.loginText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
    );
  }

  }
const styles = StyleSheet.create({
  input: {
      width:250,
      height:35,
      borderWidth:2,
      borderRadius:10,
      paddingLeft:35
  },
  login: {
      height:30,
      width:90,
      borderWidth:2,
      borderRadius:50,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#e8a41f',
      alignSelf: 'center'
  },
  button:{
    borderColor:'white',
    justifyContent:'center',
    backgroundColor:'#E35E28',
    marginBottom:5,
    borderRadius:8,
    width:100 ,
    alignItems:'center'   
  }
});