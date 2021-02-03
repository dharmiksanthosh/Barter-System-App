import React,{Component} from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import Constants from 'expo-constants';
import firebase from 'firebase';
import db from '../config'

export default class Login extends Component {
  constructor(){
    super()
      this.state = {emailId:'', passward:''}
    }

  UserLogin = (emailId,passward)=>{
    return(
      firebase.auth().signInWithEmailAndPassword(emailId,passward).then(()=>{
        return(
          Alert.alert('Login Successful')
        )
        })
        .catch((error)=>{
          return(
            Alert.alert(error.message)
          )
        }
      )
      )
  }

    UserSignUp = (emailId,passward)=>{
    return(
      firebase.auth().createUserWithEmailAndPassword(emailId,passward).then(()=>{
        return(
          Alert.alert('SignUp Successful')
        )
        })
        .catch((error)=>{
          return(
            Alert.alert(error.message)
          )
        }
      )
      )
  }

  render(){
      return (
        <View style={styles.container}>
     <View style={styles.container}>
      <Text style = {styles.text}>Barter System App</Text>
      <Text style = {styles.text2}>Start Barter System Today</Text>
      <Image style={{width:200,height:200,marginLeft:70,marginTop:-500}} source ={{uri:'https://thumbs.dreamstime.com/b/                       barter-commerce-trade-transaction-economic-concept-exchange-swap-goods-drawing-illustration-vector-75029629.jpg'}}/>
    </View>

    <View style={styles.container2}>
      <TextInput style = {styles.loginbox}
      placeholder = 'abc@xyz.com'
      keyboardType = 'email-address'
      onChangeText = {(text)=>{ this.setState({ emailId: text }) }}
      ></TextInput>

      <TextInput style = {styles.loginbox}
      placeholder = 'enter your passward'
      secureTextEntry = 'passward'
      onChangeText = {(text)=>{ this.setState({ passward: text }) }}>
      </TextInput>

      <TouchableOpacity style = {styles.button} onPress={()=>{
        this.UserLogin(this.state.emailId,this.state.passward)
      }}>
      <Text>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity  style = {styles.button}
      onPress = {()=>{this.UserSignUp(this.state.emailId,this.state.passward)}}
      >
      <Text>Sign Up</Text>
      </TouchableOpacity>
    </View>
    </View>

  );
  }

  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#68C6B8',
  },
  text:{
    marginTop:10,
    marginBottom:500,
    alignSelf:'center',
    fontSize:25,
    textDecorationLine: 'underline',
  },
  text2:{
    marginTop:10,
    alignSelf:'center',
    fontSize:15,
  },
  loginbox:{
    borderColor:'black',
    justifyContent:'center',
    backgroundColor:'white',
    marginBottom:5,
    borderRadius:10
  },
  container2:{
    flex:1,
    alignItems:'center',
    marginTop:1,
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