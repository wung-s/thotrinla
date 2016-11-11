import React, { Component, PropTypes } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  ToastAndroid
} from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import realm from '../../../db/schema'
import song from '../../../db/seed'
import { selection } from '../modules/lyricsReducer'
// import Lyrics from '../../../components/Lyrics/lyrics'
import Lyrics from '../../../components/Lyrics/lyrics'
import NumberPad from '../../../components/NumberPad/NumberPad'

import ActionButton from 'react-native-action-button'
// import Icon from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Modal from 'react-native-modalbox'
// import Button from 'react-native-button'

const SCROLLUP = 'up';
const SCROLLDOWN = 'down';
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  wrapper: {
    paddingTop: 50,
    flex: 1
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  modal2: {
    height: 230,
    backgroundColor: "#3B5998"
  },

  modal3: {
    height: 300,
    width: 300
  },

  modal4: {
    // height: 300
    backgroundColor: "transparent"
  },

  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10
  },

  btnModal: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: "transparent"
  },

  text: {
    color: "black",
    fontSize: 22
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  }
});


class LyricsContainer extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    // this.props.navigationState.title = props.title;
    this.offset = 0;
    this.songDbRef = realm.objects('Song');
    this.favDbRef = realm.objects('Favourite');
    this.state = {
      isOpen: false,
      searchKey: '',
      scrollDirection: SCROLLUP,
      isLoading: false,
      song: []
    }
    this.currSongNo = props.songNo;
    // console.log(this.songDbRef.filtered('key == "371"').length);
    // this.state = { searchKey: '' };
    this.handleScroll = this.handleScroll.bind(this);
    this.handleOpenNumPad = this.handleOpenNumPad.bind(this);
    this.handleSongSearch = this.handleSongSearch.bind(this);
    this.handleNumPadTab = this.handleNumPadTab.bind(this);
    this.handleClearAll = this.handleClearAll.bind(this);
    this.handleAddFavourite = this.handleAddFavourite.bind(this);
    this.handleCloseNumPad = this.handleCloseNumPad.bind(this);
    this.initiateTimer = this.initiateTimer.bind(this);
    this.updateCurrentSong = this.updateCurrentSong.bind(this);
  }

  handleOpenNumPad(id) {
    this.setState({
      isOpen: true,
      searchKey: ''
    });
  }


  handleCloseNumPad() {
    this.setState({
      isOpen: false
    })
  }

  handleSongSearch() {
    // console.log('handleSongSearch....', this.state);
    let searchKey = this.state.searchKey;
    let searchResult = this.getSongFromDb(+searchKey);
    console.log('searchResult', searchResult);
    // Actions.refresh({ songNo: +searchKey})
    // Actions.pop();
    if (searchResult) {
      this.updateCurrentSong(searchResult);
    }
  }
  handleNumPadTab(value) {
    if (this.state.searchKey.length < 3) {
      this.setState({
        searchKey: this.state.searchKey + value
      })
    }
  }
  handleClearAll() {
    this.setState({
      searchKey: ''
    })
  }

  showToaster(message) {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
    )
  }

  handleAddFavourite() {
    // console.log('add to Favourite...');
    let result = this.favDbRef.filtered(`songNo == ${this.currSongNo}`);
    let currSongNo = this.currSongNo;
    if (result.length < 1) {
      realm.write(() => {
        realm.create('Favourite', {
          songNo: currSongNo
        });
      });
      this.showToaster('Added to your favourites list')
      // console.log('write complete..');
    } else
      this.showToaster('Already in the list');
  }

  handleScroll(event) {
    let currentOffset = event.nativeEvent.contentOffset.y;
    let direction = currentOffset > this.offset ? 'down' : 'up';
    this.offset = currentOffset;
    this.setState({
      scrollDirection: direction
    })
  }

  getSongFromDb(songNo) {
    let result = this.songDbRef.filtered(`songNo == ${songNo}`);
    return (result.length > 0 ? result[0] : false);
  }

  updateCurrentSong(searchResult) {
    this.props.navigationState.title = searchResult.songNo + '   ' + searchResult.title;
    this.setState({
      song: searchResult,
      isOpen: false
    })
  }

  componentWillMount() {
    let searchResult = this.getSongFromDb(this.currSongNo);
    if (searchResult) {
      this.updateCurrentSong(searchResult);
    }
  }

  componentDidMount() {
    // this.initiateTimer();
  }

  componentWillUnmount() {
    console.log('component unmounted...');
  }

  handleNumPad() {

  }

  initiateTimer() {
    setTimeout(function () {
      this.setState({
        isLoading: false
      })
    }.bind(this), 10000);
  }


  getActionButton() {
    if (this.state.scrollDirection === SCROLLUP) {
      return (
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="Number Pad" onPress={this.handleOpenNumPad}>
            <Icon name="dialpad" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Favourite" onPress={this.handleAddFavourite}>
            <Icon name="favorite-border" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          {/*<ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => { } }>
            <Icon name="md-done-all" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          */}
        </ActionButton>
      )
    } else
      return null
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView onScroll={this.handleScroll}>
          <Lyrics lyrics={this.state.song} />
        </ScrollView >
        {this.getActionButton()}
        <Modal isOpen={this.state.isOpen} onClosed={this.closeModal5} style={[styles.modal, styles.modal4]} position={"center"} >
          <NumberPad
            searchKey={this.state.searchKey}
            onNumPadTab={this.handleNumPadTab}
            onSongSearch={this.handleSongSearch}
            onClearAll={this.handleClearAll}
            onCancel={this.handleCloseNumPad} />
        </Modal>
        <Modal isOpen={this.state.isLoading} swipeToClose={false} entry="top" style={[styles.modal, styles.modal4]} position={"center"} >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25 }}> Loading </Text>
          <ActivityIndicator
            animating={this.state.isLoading}
            style={[styles.centering, { backgroundColor: 'transparent', height: 80 }]}
            size="large"
            />
        </Modal>

      </View>
    );
  }
}

LyricsContainer.propTypes = {
  // lyrics: PropTypes.object.isRequired
  songNo: PropTypes.number.isRequired,
  navigationState: PropTypes.object.isRequired
}

const mapActionCreators = {
  selection
}

const mapStateToProps = (state) => ({
  searchKey: state.searchKey
})

export default connect(mapStateToProps, mapActionCreators)(LyricsContainer)
