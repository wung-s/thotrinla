import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, ListView } from 'react-native'
import { Actions } from 'react-native-router-flux'

import realm from '../../../db/schema'
// import song from '../../../db/seed'

class Home extends Component {
  constructor(props) {
    super(props);
    console.log('constructor...');
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    // this.songInDB = [{ key: 1, title: 'First Song' }, { key: 2, title: 'Second Song' }, { key: 3, title: 'Third Song' }]
    this.songInDB = realm.objects('Song');
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
    console.log('first song chorus: ', this.songInDB[0].chorus);
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
      <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
        <ListView style={styles.listContainer}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => (
            <View>
              <TouchableOpacity style={styles.list} onPress={() => this.onPress()}>
                <Text style={styles.text}>{rowData.key} {rowData.title}</Text>
              </TouchableOpacity>
            </View>
          )}
          />

      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DC5BB',
  },
  list: {
    backgroundColor: '#A5C4D4',
    borderStyle: 'dashed',
    borderWidth: 1,
    height: 60,
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }, actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  }
  // title: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   margin: 10,
  // },
  // text: {
  //   fontSize: 18,
  //   textAlign: 'center',
  //   margin: 10,
  //   marginTop: 20
  // },
  // buttonText: {
  //   fontSize: 15,
  //   textAlign: 'center',
  //   margin: 10,
  //   color: 'deepskyblue',
  //   textDecorationLine: 'underline',
  //   textDecorationStyle: 'solid',
  //   textDecorationColor: 'deepskyblue',
  // },
  // image: {
  //   width: 100,
  //   height: 100
  // }
})

export default Home
