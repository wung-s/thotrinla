import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import realm from '../../../db/schema'
import song from '../../../db/seed'
import { selection } from '../modules/lyricsReducer'
// import Lyrics from '../../../components/Lyrics/lyrics'
import Lyrics from '../../../components/Lyrics/lyrics'


class LyricsContainer extends Component {
  constructor(props) {
    super(props);
    this.offset = 0;
    this.song = realm.objects('Song');
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll(event) {
    // console.log('handleScroll...', event);
    let currentOffset = event.nativeEvent.contentOffset.y;
    // console.log(this.offset, currentOffset);
    let direction = currentOffset > this.offset ? 'down' : 'up';
    this.offset = currentOffset;
    // console.log(direction, currentOffset);
  }
  // persistToDatabase(data) {
  //   realm.write(() => {
  //     data.forEach(currentItem => {
  //       console.log('writing..', currentItem);
  //       realm.create('Song', currentItem);
  //     });
  //   });
  // }

  componentWillMount() {
    // this.persistToDatabase(song);
    console.log('props..', this.props)
    // console.log(selection);
  }

  render() {
    return (
      <ScrollView onScroll={this.handleScroll}>
        <Lyrics />
      </ScrollView >
    );
  }
}


// Count of Dogs in Realm: {realm.objects('Dog').length}
// Count of Songs in Realm: {realmSong.objects('Song').length}
const styles = StyleSheet.create({
});


const mapActionCreators = {
  selection
}

const mapStateToProps = (state) => ({
  searchKey: state.searchKey
})

export default connect(mapStateToProps, mapActionCreators)(LyricsContainer)
