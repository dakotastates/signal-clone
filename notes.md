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
        imputContainer:{},
        button: {},
      })

  -
