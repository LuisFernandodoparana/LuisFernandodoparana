import React from 'react'
import { View, Text, StyleSheet, Button, Pressable, Image } from 'react-native'
import { useRoute } from '@react-navigation/native'


export default function LinkNotification({ navigation }) {

  const routes = useRoute();

  return (
    <View style={Styles.Conteiner}>
      <View>
        <Text style={Styles.Title}>Restaurante Trattoria</Text>
        <Image
        style={Styles.Image}
        source={require('../image/prato.jpg')}/>
      </View>
      <View style={Styles.Notification}>
        <Text style={Styles.NotificationText}>{routes.params.notificationTitle}</Text>
        <Text style={Styles.NotificationText}>{routes.params.notificationBody}</Text>
      </View>
      <View>
        <Pressable
          onPress={() => navigation.goBack()}
          style={Styles.Button}>
          <Text
            style={Styles.ButtonText}
          >Olhar o Cardapio
          </Text>
        </Pressable>
      </View>
    </View>
  )
}
const Styles = StyleSheet.create({
  Conteiner: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  Image:{
    width:300,
    height:150,
    borderRadius:4
  },
  Notification:{
    marginBottom:9,
  },
  NotificationText:{
    textAlign:'center',
    color:'#705e61'
  },
  Title:{
    fontSize:20,
    textAlign:'center',
    color:'#705e61',
    marginBottom:9
  },
  Button: {
    width: 240,
    height: 35,
    backgroundColor: '#bc3e55',
    borderRadius: 4,
    justifyContent: 'center'
  },
  ButtonText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',

  }
})
