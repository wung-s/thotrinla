import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    justifyContent: 'center',
    padding: 50,
    // alignItems: 'center',
    backgroundColor: '#FF8200',
    // borderColor: 'black'
    // borderWidth: 2,
    // marginHorizontal: 20,
    // marginTop: 40
  },

  numPadRow: {
    flexDirection: 'row',
    borderColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 5
  },
  numPadElem: {
    width: 80,
    height: 80,
    backgroundColor: 'powderblue'
  },
  numText: {
    color: 'white', fontSize: 40
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

  class Search extends Component {
    constructor(props) {
      super(props);
      console.log('Search constructor....');
      this.state = { searchKey: '' };
      this.handleSongSearch = this.handleSongSearch.bind(this);
      // this.handleNumPadTab = this.handleNumPadTab.bind(this);

    }
    handleSongSearch() {
      console.log('handleSongSearch....')
    }
    handleNumPadTab(value) {
      console.log(value);
      console.log('handleNumPadTab called....', this.state);
      if(this.state.searchKey.length < 3) {
        this.setState({
          searchKey: this.state.searchKey + value
        })
      }

    }
/*<View>
    <Text style={{color: 'white'}} >
      {this.state.searchKey}
    </Text>
  </View>*/
    render() {
      return (
        <View style={styles.container}>
          <View style={{ flexDirection: 'row'}}>
            <Text style={{ flex: 2, fontSize: 40 }}>{this.state.searchKey} </Text>
            <TouchableOpacity style={{flex: 1, backgroundColor: '#1A281F'}} onPress={() => this.setState({searchKey: ''})}>
              <Text style={{color: 'white', fontSize: 40}}> Clear </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.numPadRow}>
            <TouchableOpacity style={[ styles.numPadElem, {backgroundColor: 'powderblue'}]} onPress={this.handleNumPadTab.bind(this, '1')}>
              <Text style={styles.numText}> 1 </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[ styles.numPadElem, {backgroundColor: 'skyblue'}]} onPress={this.handleNumPadTab.bind(this, '2')}>
              <Text style={styles.numText}> 2 </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[ styles.numPadElem, {backgroundColor: 'steelblue'}]} onPress={this.handleNumPadTab.bind(this, '3')}>
              <Text style={styles.numText}> 3 </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.numPadRow}>
            <TouchableOpacity style={[ styles.numPadElem, {backgroundColor: 'powderblue'}]} onPress={this.handleNumPadTab.bind(this, '4')}>
              <Text style={styles.numText}> 4 </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[ styles.numPadElem, {backgroundColor: 'skyblue'}]} onPress={this.handleNumPadTab.bind(this, '5')}>
              <Text style={styles.numText}> 5 </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[ styles.numPadElem, {backgroundColor: 'steelblue'}]} onPress={this.handleNumPadTab.bind(this, '6')}>
              <Text style={styles.numText}> 6 </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.numPadRow}>
            <TouchableOpacity style={[ styles.numPadElem, {backgroundColor: 'powderblue'}]} onPress={this.handleNumPadTab.bind(this, '7')}>
              <Text style={styles.numText}> 7 </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[ styles.numPadElem, {backgroundColor: 'skyblue'}]} onPress={this.handleNumPadTab.bind(this, '8')}>
              <Text style={styles.numText}> 8 </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[ styles.numPadElem, {backgroundColor: 'steelblue'}]} onPress={this.handleNumPadTab.bind(this, '9')}>
              <Text style={styles.numText}> 9 </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.numPadRow}>
            <TouchableOpacity style={[ styles.numPadElem, {backgroundColor: 'powderblue'}]} onPress={this.handleNumPadTab.bind(this, '0')}>
              <Text style={styles.numText}> 0 </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.numPadElem} onPress={() => Actions.pop() }>
              <Text style={styles.text}> Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.numPadElem} onPress={() => this.handleSongSearch()}>
              <Text style={styles.text}> Ok </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
}

export default Search;