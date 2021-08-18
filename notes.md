#Plan

#Step by Step
- Install expo
  - npm install --global expo-cli
- Create the app
  - expo init signal-clone  
- Setup firebase account
  - Go to firebase console
  - Add Project, name it signal-clone
  - Go to Project Setting
  - Click on webapp icon </>
  - Type in signal-clone
  - enable firebase hosting
  - register app
  - Click next to skip SDK
  - Install Firebase CLI
    - npm install -g firebase-tools
  - Click Continue to Console
  - Copy Config File
- run yarn start
  - In browser you can view ios simulation and web simulation
  - Can also scan qr code and simulate from phone
- In app.js
  - Test if everything is working, Change some text, save and it should update
- Create a firebase.js File
  - Paste the config from firebase inside
- Install react native navigation
  - yarn add @react-navigation/native
- Install depenencies on an expo managed project
  - expo install react-native-screens react-native-safe-area-context
- Import gester handler
  - import 'react-native-gesture-handler';
- import navivation container
  - import { NavigationContainer } from '@react-navigation/native';
- Wrap entire app in NavigationContainer

    <NavigationContainer>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text>Let's Build Signal</Text>

      </View>
    </NavigationContainer>

- Install React navigation stack
  - yarn add @react-navigation/native-stack
- -  Build pages
- create new folder called screens
- Create LoginScreen.js inside folder

      import React from 'react'
      import { StyleSheet, Text, View } from 'react-native'

      const LoginScreen = () => {
        return(
          <View>
            <Text>I am the Login Screen</Text>
          </View>
        )
      }

      export default LoginScreen

      const styles = StyleSheet.create({})

- In app.js create the initial stack
  - Import
    - import { createStackNavigator } from '@react-navigation/stack';
  - const Stack = createStackNavigator();
- Import the login screen
  - import LoginScreen from './screens/LoginScreen'
- Update Navivation Container to include Stack.Navigator

      <NavigationContainer >
        <Stack.Navigator>
          <Stack.Screen name='Login' component={LoginScreen}/>
        </Stack.Navigator>
      </NavigationContainer>

- Create a global screen to apply style to all screens.
  - create variable globalScrenOptions

        const globalScreenOptions = {
          headerStyle: { backgroundColor: '#2C6BED' },
          headerTitleStyle: { color: 'white'},
          headerTintColor: 'white',
        }
  - Pass variable into Stack.Navigator
    -   <Stack.Navigator screenOptions={globalScreenOptions}>
- install react-native-elements
  - yarn add react-native-elements
- In the login screen import the elements
  - import { Button, Input, Image } from 'react-native-elements';
- import status bar
  - import { StatusBar } from 'expo-status-bar';
- Add image with Logo along with status bar

    <StatusBar style='light' />
    <Image source={{
      uri: 'https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png'
      }}
      style={{ width: 200, height: 200 }}
    />

- Add input container inside the styles

    const styles = StyleSheet.create({
      imputContainer:{},
    })

- Create a new view and include the style and an input for email

    <View style={styles.inputContainer}>
      <Input placeholder='Email' />
    </View>

- add a password field
  - <Input placeholder='Password' secureTextEntry type='password' />
- Connect the form to state using hooks

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

- update the imput fields
  - <Input placeholder='Email' autoFocus type='email' value={email} onChangeText={text => setEmail(text)}/>
  - <Input placeholder='Password' secureTextEntry type='password' value={password} onChangeText={text => setPassword(text)} />

- Outside the view create two buttons
  - <Button containerStyle={styles.button} onPress={signIn} title='Login' />
  - <Button containerStyle={styles.button} type='outline' title='Register' />
- Style outer container View
  - import KeyboardAvoidingView
    - import { KeyboardAvoidingView } from 'react-native';
  - replace the first view with KeyboardAvoidingView - This gives padding when keyboard is displayed
    - <KeyboardAvoidingView behavior='padding' style={styles.container}>
  - In stylesheet make some modifications  

      const styles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
          backgroundColor: 'white'
        },
        inputContainer:{
          width: 300,
        },
        button: {
          width: 200,
          marginTop: 10,
        },
      })

  - Add an empty view to fix a known bug
    - <View style={{height: 100 }} />
  - Create the Register screen - RegisterScreen.js
  - in app.js import register screen
    - import RegisterScreen from './screens/RegisterScreen'
  - Add screen to Navigation
    - <Stack.Screen name='Register' component={RegisterScreen}/>
  - destructure navigation props
    - const LoginScreen = ( { navigation }) => {
  - In login activation register button
    -       <Button containerStyle={styles.button} onPress={() => navigation.navigate('Register')} type='outline' title='Register' />
  - Have similar setup for Register but have name, email, password, image url state and fields
- import useLayoutEffect to change layout effects
  -  import React, { useLayoutEffect, useState } from 'react';

    useLayoutEffect(()=>{
      navigation.setOptions({
        headerBackTitle: "Login"
      })
    }, [navigation]);

- Firebase authentication setup
  - Go to authentication
  - click Get Started
  - enable email/password authenicaiton
  - click on Cloud Firestore to initialize database
  - Click create database
  - Start in test mode
  - click enable
- Now install firebase from console
    - expo install firebase
  - In firebase.js import firebase
    - import firebase from 'firebase';
  - manually import firestore and auth
    - import 'firebase/firestore';
    - import 'firebase/auth';
  - Check if firebase app is already intialized

      let app;
      if (firebase.apps.length === 0){
        app = firebase.initializeApp(firebaseConfig)
      } else {
        app = firebase.app();
      }

      const db = app.firestore();
      const auth = firebase.auth();

      export {db, auth };
- In RegisterScreen import firebase.js
  - import { auth } from '../firebase';
- update the register function

  const register = () =>{
    auth.createUserWithEmailAndPassword(email, password)
    .then(authUser =>{
      // debugger
      authUser.user.updateProfile({
        displayName: name,
        photoURL: imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
      })
    }).catch(error => alert(error.message))
  }

- In the LoginScreen use a useeffect to check if user exists and redirect if it does.

    useEffect(()=>{
      const unsubscribe = auth.onAuthStateChanged((authUser)=>{
        if(authUser){
          navigation.replace('Home')
        }
        return unsubscribe
      })
    }, [])

- Create the HomeScreen.js file with simple home text
- Import and include HomeScreen in app.js (Not going to show)
- Navigate to registration page and register a user. Should create a user and redirect to home screen. 
