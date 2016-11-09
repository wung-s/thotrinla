import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { ListView } from 'realm/react-native'
import ListRow from '../../../components/ListRow/ListRow'
import realm from '../../../db/schema'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 3
  },
  noFavContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 30
  }
})


class FavouriteContainer extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.songInDBRef = realm.objects('Song');
    this.favDbRef = realm.objects('Favourite');
    // this.state = {
    //   dataSource: this.ds.cloneWithRows(this.songInDB)
    // };
    this.showLyrics = this.showLyrics.bind(this);
    this.getQuery = this.getQuery.bind(this);
  }

  showLyrics(songNo) {
    // console.log('title: ', title);
    Actions.lyrics({ songNo: songNo })
    // Actions.lyrics({ title: title, songNo: songNo })
  }

  getQuery() {
    let songNos = '';
    // console.log('length: ', this.favDbRef.length);
    if (this.favDbRef.length >= 1) {
      songNos = this.favDbRef.reduce(function (songNos, currSong) {
        songNos.push(`songNo == ${currSong.songNo}`);
        return songNos;
      }, []).join(' OR ');
    }
    return songNos;
    // return 'songNo == 219 OR songNo == 267';
  }

  componentWillMount() {
    console.log(this.getQuery());
    let query = this.getQuery();
    let songList = [];
    if (query !== '')
      songList = this.songInDBRef.filtered(query);
    this.setState({
      dataSource: this.ds.cloneWithRows(songList)
    })
  }

  renderSongList() {
    return (<ListView
      dataSource={this.state.dataSource}
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
    if (this.favDbRef.length >= 1) {
      return (
        <View style={styles.container}>
          {this.renderSongList()}
        </View>
      )

    } else
      return (
        <View style={styles.noFavContainer}>
          <Text style={styles.text}> No favourites added yet </Text>
        </View>
      )
  }
}

export default FavouriteContainer;