import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { ListView } from 'realm/react-native';

import realm from '../../../db/schema'
import ListRow from '../../../components/ListRow/ListRow'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: null
    }
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.songInDB = realm.objects('Song').sorted('songNo');
    this.showLyrics = this.showLyrics.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  showLyrics(songNo, title) {
    // console.log('title: ', title);
    Actions.lyrics({ songNo: songNo })
    // Actions.lyrics({ title: title, songNo: songNo })
  }

  loadData(songList) {
    this.state = {
      dataSource: this.ds.cloneWithRows(songList)
    };
  }

  // renderSeperator(sectionID, rowID, adjacentRowHighlighted) {
  //   // console.log('renderSeperator', sectionID, rowID, adjacentRowHighlighted);
  //   return (
  //     <View style={styles.seperator}>
  //       <Text> Hehe </Text>
  //     </View>
  //   )
  // }

  componentWillMount() {
    if (this.songInDB.length <= 0) {
      var song = require('../../../db/seed');
      this.persistToDatabase(song);
      this.loadData(realm.objects('Song').sorted('songNo'));
    } else
      this.loadData(this.songInDB);
  }

  persistToDatabase(data) {
    realm.write(() => {
      data.forEach(currentSong => {
        realm.create('Song', currentSong);
      });
    });
  }

  renderSongList() {
    return (<ListView
      dataSource={this.state.dataSource}
      // renderSeperator={this.renderSeperator}
      renderRow={(rowData) => (
        <ListRow
          {...rowData}
          onSongSelect={this.showLyrics}
          />
      )}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderSongList()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 3
  },
  seperator: {
    height: 5,
    backgroundColor: 'white'
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  }
})



export default Home
