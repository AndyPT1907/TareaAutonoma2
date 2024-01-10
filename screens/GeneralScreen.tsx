import { Alert, Button, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../config/Config'

import { LogBox } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
LogBox.ignoreAllLogs(true)


export default function GeneralScreen() {
  const [imagen, setImagen] = useState('');

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  }
  //SUBIR IMAGEN A FIREBASE
  async function subirImagen(nombre) {
    const storageRef = ref(storage, 'avatars/' + nombre);

    try {
      const response = await fetch(imagen);
      const blob = await response.blob();

      await uploadBytes(storageRef, blob, {
        contentType: 'image/jpg'
      });

      console.log('La imagen se subió con éxito');
      Alert.alert('Mensaje', 'La imagen se subio con exito')

      // Obtiene la URL de la imagen
      const imageURL = await getDownloadURL(storageRef);
      console.log('URL de desacarga de la imagen', imageURL);
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <ImageBackground
      source={{ uri: 'https://cdn.ipadizate.com/2022/09/iPhone-14-Starlight-wallpaper.png' }}
      style={styles.backgroundImage}
    >

      <View style={styles.container}>
        <Text> </Text>
        <Text style={styles.text}>Tomar foto desde la camara</Text>
        <Text> </Text>
        <TouchableOpacity onPress={() => pickImage()} style={styles.touchable}>
          <Text style={styles.text}>Seleccionar imagen</Text>
        </TouchableOpacity>
        <Image source={{ uri: imagen }} style={styles.img}  />
        <TouchableOpacity onPress={() => subirImagen('Avatar2')} style={styles.touchable}>
          <Text style={styles.text}>Cargar imagen</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,

    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontStyle: 'italic',
    //backgroundColor: '#ffd700', // Amarillo
    padding: 5,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  img: {
    width: 300,
    height: 300,
    resizeMode: 'contain'


  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Opciones: 'cover', 'contain', 'stretch', 'repeat', 'center'
    justifyContent: 'center',
  },
  touchable: {
    backgroundColor: 'green', // Puedes ajustar el color del fondo del TouchableOpacity
    padding: 10,
    borderRadius: 5,
  },

})