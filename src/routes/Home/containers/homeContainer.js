import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, ListView } from 'react-native'
import { Actions } from 'react-native-router-flux'

import realm from '../../../db/schema'

class Home extends Component {
  constructor(props) {
    super(props);
    console.log('constructor...');
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.songInDB = realm.objects('Song').sorted('key');
    this.state = {
      dataSource: ds.cloneWithRows(this.songInDB)
    };
  }

  onPress() {
    console.log('onPress....');
    Actions.lyrics();
    // Actions.searchModal();
  }

  componentWillMount() {
    console.log('will Mount..');
    // console.log('song count: ', this.songInDB.length);
    // console.log(song);
    if (this.songInDB.length <= 0) {
      var song = require('../../../db/seed')
      console.log('songs are: ....', song);
      this.persistToDatabase(song);
    }
    // console.log('first song chorus: ', this.songInDB[0].chorus);
  }

  persistToDatabase(data) {
    realm.write(() => {
      data.forEach(currentSong => {
        console.log('writing..', currentSong);
        realm.create('Song', currentSong);
      });
    });
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => (
          <View style={styles.listItem}>
            <TouchableOpacity style={styles.list} onPress={() => this.onPress()}>
              <Text style={styles.text}>{rowData.key} {rowData.title}</Text>
            </TouchableOpacity>
          </View>
        )}
        />
    )
  }
}

const styles = StyleSheet.create({
  listItem: {
    height: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#5EC2B7',
    borderStyle: 'solid',
    borderColor: '#F2F6F9',
    borderWidth: 1,
    paddingHorizontal: 5
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
