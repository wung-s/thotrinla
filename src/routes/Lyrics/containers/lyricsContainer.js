import React, { Component, PropTypes } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
  Slider
} from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import realm from '../../../db/schema'
import song from '../../../db/seed'
import { selection } from '../modules/lyricsReducer'
// import Lyrics from '../../../components/Lyrics/lyrics'
import Lyrics from '../../../components/Lyrics/lyrics'
import NumberPad from '../../../components/NumberPad/NumberPad'
import Setting from '../../../components/Setting/Setting'

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
  modalNumpad: {
    // height: 300
    backgroundColor: "transparent"
  },
  modalSetting: {
    height: 150,
    // backgroundColor: "transparent"
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
    color: "grey",
    fontSize: 16
  },
  textLabel: {
    fontSize: 16
  },
  textBtn: {
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  btnSetting: {
    flex: .5,
    justifyContent:'center',
    backgroundColor: 'powderblue',
    height: 50
  }
});


class LyricsContainer extends Component {
  constructor(props) {
    super(props);
    this.offset = 0;
    this.songDbRef = realm.objects('Song');
    this.favDbRef = realm.objects('Favourite');
    this.settingDbRef = realm.objects('Setting').filtered('id == 1')[0];
    this.state = {
      isNumpadOpen: false,
      searchKey: '',
      scrollDirection: SCROLLUP,
      isLoading: false,
      song: [],
      isSettingOpen: false,
      fontSize: this.settingDbRef.fontSize
    }
    this.fontSizeBefore = this.settingDbRef.fontSize;
    this.currSongNo = props.songNo;
    this.handleScroll = this.handleScroll.bind(this);
    this.handleOpenNumPad = this.handleOpenNumPad.bind(this);
    this.handleSongSearch = this.handleSongSearch.bind(this);
    this.handleNumPadTab = this.handleNumPadTab.bind(this);
    this.handleClearAll = this.handleClearAll.bind(this);
    this.handleAddFavourite = this.handleAddFavourite.bind(this);
    this.handleCloseNumPad = this.handleCloseNumPad.bind(this);
    this.initiateTimer = this.initiateTimer.bind(this);
    this.updateCurrentSong = this.updateCurrentSong.bind(this);
    this.handleOpenSetting = this.handleOpenSetting.bind(this);
    this.handleSlidingComplete = this.handleSlidingComplete.bind(this);
    this.handleSettingConfirm = this.handleSettingConfirm.bind(this);
    this.handleSettingCancel = this.handleSettingCancel.bind(this);
    this.persistToDatabase = this.persistToDatabase.bind(this);
  }

  handleOpenNumPad(id) {
    this.setState({
      isNumpadOpen: true,
      isSettingOpen: false,
      searchKey: ''
    });
  }

  handleCloseNumPad() {
    this.setState({
      isNumpadOpen: false
    })
  }

  handleSongSearch() {
    let searchKey = this.state.searchKey;
    let searchResult = this.getSongFromDb(+searchKey);
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
      this.showToaster('Added to your favourites list');
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
      isNumpadOpen: false
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

  persistToDatabase(table, data) {
    realm.write(() => {
      data.forEach(currentData => {
        realm.create(table, {id: 1, fontSize: currentData.fontSize}, true);
      });
    });
  }

  handleOpenSetting() {
    this.setState({
      isSettingOpen: true,
      isNumpadOpen: false
    });
  }
  handleSlidingComplete(value) {
    console.log('slidingcomplete.. ', value);
    this.setState({ fontSize: value });
  }
  handleSettingCancel() {
    this.setState({
      isSettingOpen: false,
      fontSize: this.fontSizeBefore
    });
  }
  handleSettingConfirm() {
    this.persistToDatabase('Setting', [{fontSize: +this.state.fontSize}])
    this.setState({
      isSettingOpen: false
    })
  }

  initiateTimer() {
    setTimeout(function () {
      this.setState({
        isLoading: false
      })
    }.bind(this), 10000);
  }


  renderActionButton() {
    if (this.state.scrollDirection === SCROLLUP) {
      return (
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='steelblue' title="Number Pad" onPress={this.handleOpenNumPad}>
            <Icon name="dialpad" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='powderblue' title="Favourite" onPress={this.handleAddFavourite}>
            <Icon name="favorite-border" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='grey' title="Settings" onPress={this.handleOpenSetting}>
            <Icon name="settings" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      )
    } else
      return null
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView onScroll={this.handleScroll}>
          <Lyrics lyrics={this.state.song} fontSize={this.state.fontSize}/>
        </ScrollView >
        {this.renderActionButton()}
        <Modal isOpen={this.state.isNumpadOpen} onClosed={this.closeModal5} style={[styles.modal, styles.modalNumpad]} position={"center"} >
          <NumberPad
            searchKey={this.state.searchKey}
            onNumPadTab={this.handleNumPadTab}
            onSongSearch={this.handleSongSearch}
            onClearAll={this.handleClearAll}
            onCancel={this.handleCloseNumPad} />
        </Modal>
        <Modal isOpen={this.state.isLoading} swipeToClose={false} entry="top" style={[styles.modal, styles.modalNumpad]} position={"center"} >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25 }}> Loading </Text>
          <ActivityIndicator
            animating={this.state.isLoading}
            style={[styles.centering, { backgroundColor: 'transparent', height: 80 }]}
            size="large"
            />
        </Modal>
        <Modal isOpen={this.state.isSettingOpen} swipeToClose={false} style={[styles.modal, styles.modalSetting]} position={"center"} >
          <View style={{ backgroundColor: 'white', width: 200 }}>
            {/*<Setting onSlidingCompleteHandler={this.handleSlidingComplete} fontSize={this.state.fontSize} />*/}
            <Text style={[styles.text, styles.textLabel]}> Font Size: {this.state.fontSize} </Text>
            <Slider
              onSlidingComplete={(value) => this.handleSlidingComplete(value)}
              minimumValue={12}
              maximumValue={26}
              step={2}
              value={this.settingDbRef.fontSize}
              />
            <View style={{flex: 1, flexDirection: 'row', justifyContent:'center', paddingTop: 20}}>
              <TouchableOpacity style={[styles.btnSetting, {backgroundColor: 'powderblue'}]} onPress={this.handleSettingCancel}>
                <Text style={[styles.text, styles.textBtn]}> Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btnSetting, { backgroundColor: 'steelblue'}]} onPress={this.handleSettingConfirm} >
                <Text style={[styles.text, styles.textBtn]}> Ok </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

LyricsContainer.propTypes = {
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
