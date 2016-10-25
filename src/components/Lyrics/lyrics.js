import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const Lyrics = (props) => {
  const { value, increment, doubleAsync } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Lyrics here .....
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    margin: 20,
  },
  containerCounter: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  value: {
    width: 40,
    fontWeight: 'bold',
    color: 'limegreen',
    textAlign: 'center',
  },
  button: {
    paddingLeft: 4,
    paddingRight: 4,
    backgroundColor: 'rgb(233, 233, 233)',
    borderWidth: 1,
    borderColor: 'rgb(213, 213, 213)',
    margin: 10,
  },
  buttonText: {
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
})

export default Lyrics
