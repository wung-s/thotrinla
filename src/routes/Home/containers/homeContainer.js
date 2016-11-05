import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, ListView } from 'react-native'
import { Actions } from 'react-native-router-flux'

import realm from '../../../db/schema'

class Home extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.songInDB = realm.objects('Song').sorted('key');
    this.state = {
      dataSource: ds.cloneWithRows(this.songInDB)
    };
    this.showLyrics = this.showLyrics.bind(this);
  }

  showLyrics(selectedSong) {
    // console.log(typeof lyrics)
    // Actions.lyrics({ lyrics: lyrics });
    Actions.lyrics({ songNo: selectedSong.key})

    // Actions.searchModal();
  }

  componentWillMount() {
    // console.log('song count: ', this.songInDB.length);
    // console.log(song);
    if (this.songInDB.length <= 0) {
      var song = require('../../../db/seed')
      // console.log('songs are: ....', song);
      this.persistToDatabase(song);
    }
    // console.log('first song chorus: ', this.songInDB[0].chorus);
  }

  persistToDatabase(data) {
    realm.write(() => {
      data.forEach(currentSong => {
        realm.create('Song', currentSong);
      });
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => (
            <TouchableOpacity style={styles.list} onPress={this.showLyrics.bind(null, rowData)}>
              <Text style={styles.text}>{rowData.key} {rowData.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    // backgroundColor: '#1abc9c',
    backgroundColor: '#20C1BC',
    paddingHorizontal: 15,
    minHeight: 45,
    // borderColor: 'rgb(213, 213, 213)',
    borderColor: 'white',
    borderTopWidth: 1,
    alignItems: 'flex-start',
    justifyContent: 'center'

  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  }
})

export default Home
