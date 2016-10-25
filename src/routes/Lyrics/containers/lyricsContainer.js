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
      <View>
        <Text>
          Count of Dogs in Realm: {realm.objects('Dog').length}
        </Text>
      </View>
    );
  }
}


const mapActionCreators = {
  increment,
  doubleAsync
}

const mapStateToProps = (state) => ({
  value: state.counter,
})

export default connect(mapStateToProps, mapActionCreators)(LyricsContainer)
