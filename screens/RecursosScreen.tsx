import { StyleSheet, Text, View, Button, Image, Alert, ImageBackground } from 'react-native'
import React, { useState } from 'react'
//Image expo 
import * as ImagePicker from 'expo-image-picker';
//firebase
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { storage } from '../config/Config'

import { LogBox } from 'react-native'
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
import { TouchableOpacity } from 'react-native-gesture-handler';
LogBox.ignoreAllLogs(true)





export default function RecursosScreen() {
  const [imagen, setImagen] = useState(' ');
  //cargar imagen desde la galeria
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true, //editar img true : false
      //aspect: [4, 3], //dimension de la imagen
      quality: 1, //calidad
    });

    console.log(result);

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };
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
      //const imageURL = await getDownloadURL(storageRef);
      //console.log('URL de desacarga de la imagen', imageURL);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/originals/12/ff/18/12ff181f4872a4160653181d3bab54b8.jpg' }}
      style={styles.backgroundImage}
    >



      <View style={styles.container}>
        <Text> </Text>
        <Text style={styles.text}>Subir imagen desde la galeria</Text>
        <Text> </Text>
        <TouchableOpacity onPress={() => pickImage()} style={styles.touchable}>
          <Text style={styles.text}>Seleccionar imagen</Text>
        </TouchableOpacity>
        <Image source={{ uri: imagen }} style={styles.img} />

        <TouchableOpacity onPress={() => subirImagen('Avatar1')}style={styles.touchable} >
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