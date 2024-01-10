import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function WelcomeScreen() {
  return (
    <ImageBackground
      source={{uri : 'https://e0.pxfuel.com/wallpapers/374/900/desktop-wallpaper-fondos-de-pantalla-sigueme-judith-estefani-iphone-fondos-de-pantalla-fondos-de-pantalla-black-fondos-phone-graphic-artist.jpg'}}
      style={styles.backgroundImage}
    >
      <View>
    <Text>WelcomeScreen</Text>
  </View>




    </ImageBackground>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Opciones: 'cover', 'contain', 'stretch', 'repeat', 'center'
    justifyContent: 'center',
  },
  
})