import React from 'react'
import {
  Text,
  Image,
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native'

const Loading = () => {
  return(
    <View style={styles.container}>
        <View>
          <Image style={styles.homeImage} source={require('../assets/images/logo-v3.png')} />
        </View>
        <ActivityIndicator
            animating={true}
            style={[styles.centering, { backgroundColor: 'transparent', height: 80 }]}
            size="large"
            />
        <Text style={{paddingTop: 15, textAlign: 'center'}}> Setting up the app ... </Text>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  homeImage: {
    width: 280,
    height: 150,
    resizeMode: 'contain'
  },
});

export default Loading;