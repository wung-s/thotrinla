import React, { PropTypes } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'


const SideMenu = (props, context) => {
  console.log(props, context, Actions);
  const drawer = context.drawer;
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
      <TouchableOpacity style={styles.item} onPress={() => { console.log('preface', drawer); Actions.preface() } }>
        <Text style={styles.text}>
          Preface
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => { console.log('about', drawer); Actions.about() } }>
        <Text style={styles.text}>
          About
        </Text>
      </TouchableOpacity>

    </ScrollView>
  )
}

const contextTypes = {
  drawer: React.PropTypes.object
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white'
  },
  item: {
    backgroundColor: '#747274',
    minHeight: 55,
    borderColor: 'rgb(213, 213, 213)',
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
