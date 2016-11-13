import React, { PropTypes } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialIcons'

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
    <ScrollView style={styles.sideMenuWrapper}>
      <View style={styles.logoWrapper}>
        <Image style={styles.homeImage} source={require('../../assets/images/4C_3.jpg')} />
      </View>
      <TouchableOpacity style={styles.item} onPress={() => { drawer.close(); Actions.home() } } >
        <View style={styles.sideMenuItemWrapper}>
          <Icon name="home" style={styles.sideMenuIcon} />
          <Text style={[styles.text, styles.sideMenuText]} >
            Home
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => { drawer.close(); Actions.preface() } } >
        <View style={styles.sideMenuItemWrapper}>
          <Icon name="label" style={styles.sideMenuIcon} />
          <Text style={[styles.text, styles.sideMenuText]} >
            Preface
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => { drawer.close(); Actions.favourite() } } >
        <View style={styles.sideMenuItemWrapper}>
          <Icon name="favorite" style={styles.sideMenuIcon} />
          <Text style={[styles.text, styles.sideMenuText]} >
            Favourite
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => { drawer.close(); Actions.about() } } >
        <View style={styles.sideMenuItemWrapper}>
          <Icon name="info" style={styles.sideMenuIcon} />
          <Text style={[styles.text, styles.sideMenuText]} >
            About
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  )
}

SideMenu.contextTypes = contextTypes;
SideMenu.propTypes = propTypes;

const styles = StyleSheet.create({
  text: {
    color: 'white'
  },
  sideMenuWrapper: {
    backgroundColor: '#135352'
  },
  logoWrapper: {
    paddingVertical: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  homeImage: {
    width: 280,
    height: 150,
    resizeMode: 'contain'
  },
  sideMenuItemWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5
  },
  item: {
    minHeight: 50,
    borderColor: 'grey',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1
  },
  sideMenuIcon: {
    fontSize: 25,
    color: 'white',
    flex: .2
  },
  sideMenuText: {
    flex: .8,
    fontSize: 20,
    color: 'white'
  }
})

export default SideMenu
