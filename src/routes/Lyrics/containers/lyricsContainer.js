import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import realm from '../../../db/schema'
import song from '../../../db/seed'
import { increment, doubleAsync } from '../modules/lyricsReducer'
import Lyrics from '../../../components/Lyrics/lyrics'


class LyricsContainer extends Component {
  constructor(props) {
    super(props);
    this.offset = 0;
    this.song = realm.objects('Song');
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll(event) {
    console.log('handleScroll...', event);
    let currentOffset = event.nativeEvent.contentOffset.y;
    console.log(this.offset, currentOffset);
    let direction = currentOffset > this.offset ? 'down' : 'up';
    this.offset = currentOffset;
    console.log(direction, currentOffset);
  }
  persistToDatabase(data) {
    // if (this.song.length < 1) {
    realm.write(() => {
      data.forEach(currentItem => {
        console.log('writing..', currentItem);
        realm.create('Song', currentItem);
      });
      // realm.create('Song', data);
    });
    // }
  }

  componentWillMount() {
    this.persistToDatabase(song);
  }

  render() {
    console.log('data from render', realm.objects('Song'));
    console.log(realm.path);
    return (
      <ScrollView onScroll={this.handleScroll}>
        {/*Rest of App come ABOVE the action button component!*/}

        <View style={styles.container}>
          <View style={styles.para}>
            <Text style={styles.text}>
              1 Ringkapha tuina, Jesu Iwui
            </Text>
            <Text style={styles.text}>
              Varewui leikashi sachitheihao
            </Text>
            <Text style={styles.text}>
              Morei pheomida ili huimi
            </Text>
            <Text style={styles.text}>
              Chonmeili mida ili thanmi
            </Text>
          </View>
          <View style={styles.para}>
            <Text style={styles.text}>
              2 Ringkapha tuina, Jesu Iwui
            </Text>
            <Text style={styles.text}>
              Varewui leikashi sachitheihao
            </Text>
            <Text style={styles.text}>
              Morei pheomida ili huimi
            </Text>
            <Text style={styles.text}>
              Chonmeili mida ili thanmi
            </Text>
          </View>
          <View style={styles.para}>
            <Text style={styles.text}>
              3 Ringkapha tuina, Jesu Iwui
            </Text>
            <Text style={styles.text}>
              Varewui leikashi sachitheihao
            </Text>
            <Text style={styles.text}>
              Morei pheomida ili huimi
            </Text>
            <Text style={styles.text}>
              Chonmeili mida ili thanmi
            </Text>
          </View>
          <View style={styles.para}>
            <Text style={styles.text}>
              4 Ringkapha tuina, Jesu Iwui
            </Text>
            <Text style={styles.text}>
              Varewui leikashi sachitheihao
            </Text>
            <Text style={styles.text}>
              Morei pheomida ili huimi
            </Text>
            <Text style={styles.text}>
              Chonmeili mida ili thanmi
            </Text>
          </View>
          <View style={styles.para}>
            <Text style={styles.text}>
              5 Ringkapha tuina, Jesu Iwui
            </Text>
            <Text style={styles.text}>
              Varewui leikashi sachitheihao
            </Text>
            <Text style={styles.text}>
              Morei pheomida ili huimi
            </Text>
            <Text style={styles.text}>
              Chonmeili mida ili thanmi
            </Text>
          </View>
          <View style={styles.para}>
            <Text style={styles.text}>
              6 Ringkapha tuina, Jesu Iwui
            </Text>
            <Text style={styles.text}>
              Varewui leikashi sachitheihao
            </Text>
            <Text style={styles.text}>
              Morei pheomida ili huimi
            </Text>
            <Text style={styles.text}>
              Chonmeili mida ili thanmi
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.welcome}>
            Count of Songs in Realm: {realm.objects('Song').length}
          </Text>
        </View>

      </ScrollView >
    );
  }
}
// Count of Dogs in Realm: {realm.objects('Dog').length}
// Count of Songs in Realm: {realmSong.objects('Song').length}
const styles = StyleSheet.create({
  container: {
    paddingLeft: 15
  },
  text: {
    fontSize: 20,
    textAlign: 'left'
  },
  para: {
    paddingTop: 20
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  }
});


const mapActionCreators = {
  increment,
  doubleAsync
}

const mapStateToProps = (state) => ({
  value: state.counter,
})

export default connect(mapStateToProps, mapActionCreators)(LyricsContainer)
