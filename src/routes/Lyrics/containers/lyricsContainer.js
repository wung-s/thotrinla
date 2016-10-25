import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
const Realm = require('realm');
import { increment, doubleAsync } from '../modules/lyricsReducer'
import Lyrics from '../../../components/Lyrics/lyrics'


class LyricsContainer extends Component {
  render() {
    let realm = new Realm({
      schema: [{ name: 'Dog', properties: { name: 'string' } }]
    });

    realm.write(() => {
      realm.create('Dog', { name: 'Rex' });
    });

    return (
      <ScrollView>
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
      </ScrollView >
    );
  }
}

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
  }
});


const mapActionCreators = {
  increment,
  doubleAsync
}

const mapStateToProps = (state) => ({
  value: state.counter,
})

export default connect(mapStateToProps, mapActionCreators)(LyricsContainer)
