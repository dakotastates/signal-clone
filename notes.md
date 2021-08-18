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
- Import Safe Area view and scroll view from react-native

    <SafeAreaView>
      <ScrollView>

      </ScrollView>
    </SafeAreaView>

- create a components folder and a file called CustomListItem.js
  - import listitem and avatar
    - import { ListItem, Avatar } from 'react-native-elements';
  - return

      <ListItem>
        <Avatar
          rounded
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
          }}
        />
        <ListItem.Content>
          <ListItem.Title style={{fontWeight: '800'}}>
            Chat
          </ListItem.Title>
          <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
            This is a test subtitle
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>

  - NOTE: ellipsizeMode gives a ... if lines are too long
  - Pass in some props, id, chatName, enterChat
- Login User
  - update sign in with

      const signIn = () =>{
        auth.signInWithEmailAndPassword(email, password).catch(error => alert(error))
      }
- Logout user in Home
  - Add button/Avatar
  - User LayoutEffect with an Avatar

      useLayoutEffect(()=>{
        navigation.setOptions({
          title: 'Signal Clone',
          headerStyle: { backgroundColor: '#fff'},
          headerTitleStyle: {color: 'black'},
          headerTintColor: 'black',
          headerLeft: () => (
            <View style={{ marginLeft: 20 }}>
              <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
              <Avatar
                rounded
                source={{ uri: auth?.currentUser?.photoURL }}
              />
              </TouchableOpacity>
            </View>
          ),
        });
      }, [])

  - NOTE: TouchableOpacity dims the color when clicked or touched.

  - Create signout user function

    const signOutUser = () =>{
      auth.signOut().then(()=>{
        navigation.replace('Login')
      })
    }

  - In HomeScreen, header right

        headerRight: () => (
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 80,
            marginRight: 20
          }}>
            <TouchableOpacity activeOpacity={0.5}>
              <AntDesign name='camerao' size={24} color='black' />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.5}>
              <SimpleLineIcons name='pencil' size={24} color='black' />
            </TouchableOpacity>
          </View>
        )
    - Put navigation as an argument for the LayoutEffect
      - }, [navigation])
    - On pencil icon add
      - onPress={() => navigation.navigate('AddChat')}
- create add Chat screen
  - Update app.js to include AddChatScreen and create a basic AddChatScreen.js file
  - useLayoutEffect

      useLayoutEffect(()=>{
        navigation.setOptions({
          title: 'Add a new Chat',
          headerBackTitle: 'Chats'
        })
      }, [])

  - import useState and create an input
    -   const [input, setInput] = useState('')
  - return a view with an input to create the chat

      <View style={styles.container}>
        <Input
          placeholder='Enter a Chat Name'
          value={input}
          onChangeText={text => setInput(text)}
          leftIcon={
            <Icon name='wechat' type='antdesign' size={24} color='black'/>
          }
        />
        <Button onPress={createChat} title='Create new Chat' />
      </View>
  - create the createChat function
    - import the db
      - import { db } from '../firebase'
    -  create createChat function

        const createChat = async () =>{
          await db.collection('chats').add({
            chatName: input
          }).then(() => {
            navigation.goBack()
          }).catch(error => alert(error))
        }

  - Go into firebase to create the db
    - Click on cloud firestore
    - If you submit from the create chat form the data should show up here.
- To retrieve all the chats from the database, in HomeScreen create a useEffect and set state for chats

    useEffect(()=>{
      const unsubscribe = db.collection('chats').onSnapshot(snapshot =>(
        setChats(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))
      ))
      return unsubscribe;
    }, [])

  - usestate
    - const [chats, setChats] = useState([]);

  - update the return to iterate over the chats in state

      <SafeAreaView>
        <ScrollView>
            {chats.map(({id, data: { chatName}}) => (
              <CustomListItem key={id} id={id} chatName={chatName}/>
            ))}
        </ScrollView>
      </SafeAreaView>

  - Pass data into Custom List Item component
  - Update the List item component

      <ListItem key={id} bottomDivider>
        <Avatar
          rounded
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
          }}
        />
        <ListItem.Content>
          <ListItem.Title style={{fontWeight: '800'}}>
            {chatName}
          </ListItem.Title>
          <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
            ABC
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
  - Make list items clickable
    - on the list item add an onpress
      -     <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
- Create the Chat Screen, ChatScreen.js, import in app.js and create the streen
- in homescreen create a function called enterchat

    const enterChat = (id, chatName) => {
      navigation.navigate('Chat', {
        id,
        chatName
      });
    };

- pass enterChat in as props to CustomListItem
- useLayoutEffect to create a custom, dynamic header with chat name in header

    useLayoutEffect(()=>{
        navigation.setOptions({
          title: 'Chat',
          headerBackTitleVisable: false,
          headerTitleAlign: 'left',
          headerTitle: () => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Avatar rounded source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
              }} />
              <Text
                style={{ color:'white', marginLeft: 10, fontWeight: '700'}}
              >
                {route.params.chatName}
              </Text>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={navigation.goBack}
            >
              <AntDesign name='arrowleft' size={24} color='white' />
            </TouchableOpacity>
          )
        });
    }, [navigation])

  -
