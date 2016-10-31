import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native'
import { Actions} from 'react-native-router-flux'

const SideMenu = (props) => {
  // const { value, increment, doubleAsync } = props;
  return (
    <ScrollView>
      <View >
        <Image style={styles.homeImage} source={require('../../assets/images/church.jpg')} />
      </View>
      <View style={styles.item}>
        <Text style={styles.text}>
          Home
        </Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.text}>
          Preface
        </Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.text}>
          About
        </Text>
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'white',
  // },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white'
  },
  item: {
    // paddingLeft: 10,
    // paddingRight: 4,
    // paddingVertical: 20,
    // paddingVertical: 5,
    backgroundColor: '#747274',
    minHeight: 55,
    // borderWidth: 1,
    borderColor: 'rgb(213, 213, 213)',
    // margin: 10,
    borderTopWidth: 1,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  homeImage: {
    width: 300,
    height: 150
  }
})

export default SideMenu
