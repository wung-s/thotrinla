import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { ListView } from 'realm/react-native'

import realm from '../../../db/schema'
import ListRow from '../../../components/ListRow/ListRow'
import Loading from '../../../components/Loading'

class Home extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: this.ds.cloneWithRows([]),
      isSettingDB: true
    }
    this.songInDB = realm.objects('Song').sorted('songNo');
    this.showLyrics = this.showLyrics.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  showLyrics(songNo) {
    Actions.lyrics({ songNo: songNo })
  }

  loadData(songList) {
    // console.log('no of songs: ', songList.length);
    this.setState({
      dataSource: this.ds.cloneWithRows(songList)
    });
    this.setState({isSettingDB: false});
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
      // this.setState({isSettingDB: true});
      var song = require('../../../db/seed');
      this.persistToDatabase('Setting', [{ id: 1, fontSize: 20 }]);
      this.persistToDatabase('Song', song);
      this.loadData(realm.objects('Song').sorted('songNo'));
    } else {
      this.loadData(this.songInDB);
    }
  }

  persistToDatabase(table, data) {
    realm.write(() => {
      data.forEach(currentSong => {
        realm.create(table, currentSong);
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
          fontSize={16}
          />
      )}
      />
    );
  }

  render() {
    if(this.state.isSettingDB) {
      return(
        <Loading />
      )
    }else {
      return (
        <View style={styles.container}>
          {this.renderSongList()}
        </View>
      )
    }

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
  },
  homeImage: {
    width: 280,
    height: 150,
    resizeMode: 'contain'
  }
})

export default Home
