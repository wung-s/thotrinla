import React, { PropTypes } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'

const contextTypes = {
  drawer: React.PropTypes.object
};

const propTypes = {
  name: PropTypes.string,
  sceneStyle: View.propTypes.style,
  title: PropTypes.string,
};

const SideMenu = (props, context) => {
  const drawer = context.drawer;

  return (
    <ScrollView>
      <View style={styles.logoWrapper}>
        <Image style={styles.homeImage} source={require('../../assets/images/4C_3.jpg')} />
      </View>
      <TouchableOpacity style={styles.item} onPress={() => { drawer.close(); Actions.home() } } >
        <Text style={styles.text}>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => { drawer.close(); Actions.preface() } }>
        <Text style={styles.text}>
          Preface
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => { drawer.close(); Actions.favourite() } }>
        <Text style={styles.text}>
          Favourite
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => { drawer.close(); Actions.about() } }>
        <Text style={styles.text}>
          About
        </Text>
      </TouchableOpacity>

    </ScrollView>
  )
}

SideMenu.contextTypes = contextTypes;
SideMenu.propTypes = propTypes;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white'
  },
  item: {
    backgroundColor: '#1abc9c',
    minHeight: 55,
    borderColor: 'rgb(213, 213, 213)',
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'

  },
  logoWrapper: {
    padding: 10,
    // justifyContent: 'center'
    // width: 280,
    // height: 150,
  },
  homeImage: {
    width: 280,
    height: 150,
    resizeMode: 'contain'
  }
})

export default SideMenu
