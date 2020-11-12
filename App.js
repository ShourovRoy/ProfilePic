import React, {useState} from 'react'
import {Text, View, StyleSheet, Button, TouchableOpacity, Image} from 'react-native'

import {RNCamera} from 'react-native-camera'

const PendingView = () => (
  <View
    style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
  >
    <Text>Hey There</Text>
  </View>
)

const App = () => {
  const [image, setImage] = useState(null)

  const takePicture = async (camera) => {
    try {
      const options = {quality: 0.9, base64: false}
      const data = await camera.takePictureAsync(options)
      setImage(data.uri)

    } catch (error) {
      console.warn(error)
    }
  }

  return (
    <View style={styles.container}>
      {image ? (
        <Text>iMAGE IS THERE</Text>
      ) : (
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'longer text to use camera',
            buttonPositive: 'OK',
            buttonNegative: 'Cancle'
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio',
            message: 'longer text to use audio',
            buttonPositive: 'OK',
            buttonNegative: 'Cancle'
          }}
        >
          {({camera, status}) => {
            if(status !== 'READY') return <PendingView />
            return(
              <View style={{flex: 0, flexDirection: 'row', justifyContent:'center'}}>
                <TouchableOpacity onPress={() => takePicture(camera)}>
                  <Text>Snap</Text>
                </TouchableOpacity>
              </View>
            )
          }}
        </RNCamera>
      )}
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a79df'
  },
  preview: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})