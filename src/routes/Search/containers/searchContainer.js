import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import NumberPad from '../../../components/NumberPad/NumberPad'

var {
  height: deviceHeight
} = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    justifyContent: 'center',
    // padding: 50,
    backgroundColor: 'rgba(23, 115, 55, 0.1)',
    // alignItems: 'center',
    // backgroundColor: 'blue',
    // backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'black',
    borderWidth: 2,
    // backgroundColor:"transparent",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(52,52,52,0.5)"

  }
});


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { searchKey: '' };

    this.handleSongSearch = this.handleSongSearch.bind(this);
    this.handleNumPadTab = this.handleNumPadTab.bind(this);
    this.handleClearAll = this.handleClearAll.bind(this);
  }

  handleSongSearch() {
    console.log('handleSongSearch....', this.state);
    // Actions.lyrics({ key: this.state.searchKey });
    let searchKey = this.state.searchKey;
    Actions.dismiss();

    // Actions.lyrics({ lyrics: searchKey });
    // Actions.pop();
    // Actions.lyrics();

  }
  handleNumPadTab(value) {
    // console.log(value);
    // console.log('handleNumPadTab called....', this.state);
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
  handleCancel() {
    Actions.pop();
  }

  render() {
    return (
      <View style={styles.container} >
        <NumberPad
          searchKey={this.state.searchKey}
          onNumPadTab={this.handleNumPadTab}
          onSongSearch={this.handleSongSearch}
          onClearAll={this.handleClearAll}
          onCancel={this.handleCancel} />
      </View>
    );
  }
}

export default Search;