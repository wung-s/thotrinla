import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  ListView
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'
// import { ListView } from 'realm/react-native'
import ListRow from '../../../components/ListRow/ListRow'
import realm from '../../../db/schema'



const styles = StyleSheet.create({
  noFavContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 3
  },
  backTextWhite: {
    color: '#FFF'
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0
  }

})


class FavouriteContainer extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.songInDBRef = realm.objects('Song');
    this.favDbRef = realm.objects('Favourite');
    this.state = {
      dataSource: '',
      listViewData: realm.objects('Favourite').sorted('songNo')
    };
    this.showLyrics = this.showLyrics.bind(this);
    this.getQuery = this.getQuery.bind(this);
    this.allFavSongs = this.allFavSongs.bind(this);
    this.renderSongList = this.renderSongList.bind(this);
    this.removeFavourite = this.removeFavourite.bind(this);
  }

  showLyrics(songNo) {
    Actions.lyrics({ songNo: songNo })
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
    let query = this.getQuery();
    let songList = [];
    if (query !== '')
      songListRef = this.songInDBRef.filtered(query).sorted('songNo');
    this.setState({
      listViewData: this.allFavSongs(songListRef)
    })
  }

  allFavSongs(data) {
    let allFavSong = data.reduce(function (allFavSong, currSong) {
      allFavSong.push({ songNo: currSong.songNo, title: currSong.title })
      return allFavSong;
    }, []);
    return allFavSong;
  }
  removeFavourite(secId, rowId, rowMap) {
    // console.log('removeFavourite...', secId, rowId, rowMap);
    rowMap[`${secId}${rowId}`].closeRow();
    let newListViewData = [...this.state.listViewData];
    let songToDelete = newListViewData[rowId];
    newListViewData.splice(rowId, 1);
    let query = this.getQuery();
    let songList = this.songInDBRef.filtered(query).sorted('songNo');
    realm.write(() => {
      let toDelete = this.favDbRef.filtered(`songNo == ${songToDelete.songNo}`);
      realm.delete(toDelete);
    });
    this.setState({ listViewData: newListViewData });
  }

  renderSongList() {
    let songList = this.state.listViewData;
    return (
      <SwipeListView
        dataSource={this.ds.cloneWithRows(songList)}
        renderRow={data => (
          <TouchableHighlight
            onPress={this.showLyrics.bind(this, data.songNo)}
            style={styles.rowFront}
            // underlayColor={'#AAA'}
            >
            <View>
              <Text>{data.songNo}   {data.title}</Text>
            </View>
          </TouchableHighlight>
        )}
        renderHiddenRow={(data, secId, rowId, rowMap) => (
          <View style={styles.rowBack}>
            <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={_ => this.removeFavourite(secId, rowId, rowMap)}>
              <Text style={styles.backTextWhite}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        disableRightSwipe={true}
        rightOpenValue={-75}
        />
    )
  }

  render() {
    console.log('no of fav songs: ', this.favDbRef.length);
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