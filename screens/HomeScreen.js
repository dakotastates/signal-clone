import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import CustomListItem from '../components/CustomListItem'
import { Avatar } from 'react-native-elements';
import { auth, db } from '../firebase'

const HomeScreen = ({ navigation }) => {
  const signOutUser = () =>{
    auth.signOut().then(()=>{
      navigation.replace('Login')
    })
  }

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

  return(
    <SafeAreaView>
      <ScrollView>
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({

})
