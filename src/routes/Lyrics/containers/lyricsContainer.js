import React, { Component, PropTypes } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
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
  }
});


class LyricsContainer extends Component {
  constructor(props) {
    super(props);
    this.offset = 0;
    this.song = realm.objects('Song');
    this.state = {
      isOpen: false,
      searchKey: '',
      scrollDirection: SCROLLUP
    }
    // this.state = { searchKey: '' };
    this.handleScroll = this.handleScroll.bind(this);
    this.handleOpenNumPad = this.handleOpenNumPad.bind(this);
    this.handleSongSearch = this.handleSongSearch.bind(this);
    this.handleNumPadTab = this.handleNumPadTab.bind(this);
    this.handleClearAll = this.handleClearAll.bind(this);
    this.handleAddFavourite = this.handleAddFavourite.bind(this);
    this.handleCloseNumPad = this.handleCloseNumPad.bind(this);
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
    console.log('handleSongSearch....', this.state);
    let searchKey = this.state.searchKey;
    this.setState({
      isOpen: false
    })
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

  handleAddFavourite() {
    // console.log('add to Favourite...');
  }

  handleScroll(event) {
    // console.log('handleScroll...', event);
    let currentOffset = event.nativeEvent.contentOffset.y;
    // console.log(this.offset, currentOffset);
    let direction = currentOffset > this.offset ? 'down' : 'up';
    this.offset = currentOffset;
    this.setState({
      scrollDirection: direction
    })
  }

  componentWillMount() {
    console.log('props..', this.props)
    // console.log(selection);
  }

  handleNumPad() {

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
          <Lyrics {...this.props} />
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
      </View>
    );
  }
}

LyricsContainer.propTypes = {
  lyrics: PropTypes.object.isRequired
}

const mapActionCreators = {
  selection
}

const mapStateToProps = (state) => ({
  searchKey: state.searchKey
})

export default connect(mapStateToProps, mapActionCreators)(LyricsContainer)
