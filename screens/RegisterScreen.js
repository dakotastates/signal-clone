import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const register = () =>{
    
  }

  return(
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style='light' />
      <Text h3 style={{ marginBottom: 50 }}>
        Create a Signal Account
      </Text>
      <View style={styles.inputContainer}>
        <Input placeholder='Full Name' autoFocus type='text' value={name} onChangeText={text => setName(text)}/>
        <Input placeholder='Email' type='email' value={email} onChangeText={text => setEmail(text)}/>
        <Input placeholder='Password' secureTextEntry type='password' value={password} onChangeText={text => setPassword(text)} />
        <Input
          placeholder='Profile Picture URL (optional)'
          type='text' value={imageUrl}
          onChangeText={text => setImageUrl(text)}
          onSubmitEditing={register}
          />

      </View>

      <Button containerStyle={styles.button} onPress={register} title='Login' />
      <Button containerStyle={styles.button} onPress={() => navigation.navigate('Login')} type='outline' title='Login' />
      <View style={{height: 100 }} />
    </KeyboardAvoidingView>

  )
}

export default RegisterScreen

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
