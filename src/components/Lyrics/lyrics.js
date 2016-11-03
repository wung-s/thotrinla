import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'


const styles = StyleSheet.create({
  container: {
    paddingLeft: 15
  },
  text: {
    fontSize: 20,
    textAlign: 'left'
  },
  para: {
    paddingTop: 20
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  }
})

const Lyrics = (props) => {
  // const { value, increment, doubleAsync } = props;
  return (
    <View style={styles.container}>
      <View style={styles.para}>
        <Text style={styles.text}>
          1 Ringkapha tuina, Jesu Iwui
            </Text>
        <Text style={styles.text}>
          Varewui leikashi sachitheihao
            </Text>
        <Text style={styles.text}>
          Morei pheomida ili huimi
            </Text>
        <Text style={styles.text}>
          Chonmeili mida ili thanmi
            </Text>
      </View>
      <View style={styles.para}>
        <Text style={styles.text}>
          2 Ringkapha tuina, Jesu Iwui
            </Text>
        <Text style={styles.text}>
          Varewui leikashi sachitheihao
            </Text>
        <Text style={styles.text}>
          Morei pheomida ili huimi
            </Text>
        <Text style={styles.text}>
          Chonmeili mida ili thanmi
            </Text>
      </View>
      <View style={styles.para}>
        <Text style={styles.text}>
          3 Ringkapha tuina, Jesu Iwui
            </Text>
        <Text style={styles.text}>
          Varewui leikashi sachitheihao
            </Text>
        <Text style={styles.text}>
          Morei pheomida ili huimi
            </Text>
        <Text style={styles.text}>
          Chonmeili mida ili thanmi
            </Text>
      </View>
      <View style={styles.para}>
        <Text style={styles.text}>
          4 Ringkapha tuina, Jesu Iwui
            </Text>
        <Text style={styles.text}>
          Varewui leikashi sachitheihao
            </Text>
        <Text style={styles.text}>
          Morei pheomida ili huimi
            </Text>
        <Text style={styles.text}>
          Chonmeili mida ili thanmi
            </Text>
      </View>
      <View style={styles.para}>
        <Text style={styles.text}>
          5 Ringkapha tuina, Jesu Iwui
            </Text>
        <Text style={styles.text}>
          Varewui leikashi sachitheihao
            </Text>
        <Text style={styles.text}>
          Morei pheomida ili huimi
            </Text>
        <Text style={styles.text}>
          Chonmeili mida ili thanmi
            </Text>
      </View>
      <View style={styles.para}>
        <Text style={styles.text}>
          6 Ringkapha tuina, Jesu Iwui
            </Text>
        <Text style={styles.text}>
          Varewui leikashi sachitheihao
            </Text>
        <Text style={styles.text}>
          Morei pheomida ili huimi
            </Text>
        <Text style={styles.text}>
          Chonmeili mida ili thanmi
            </Text>
      </View>
    </View>
  )
}


export default Lyrics
