import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, ListView } from 'react-native'
import { Actions } from 'react-native-router-flux'
const Realm = require('realm');


class Home extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.allSongs = [{ number: 1, title: 'First Song' }, { number: 2, title: 'Second Song' }, { number: 3, title: 'Third Song' }]
    this.state = {
      dataSource: ds.cloneWithRows(this.allSongs)
    };
  }

  onPress() {
    Actions.lyrics();
  }

  render() {
    // let realm = new Realm({
    //   schema: [{ name: 'Dog', properties: { name: 'string' } }]
    // });

    // realm.write(() => {
    //   realm.create('Dog', { name: 'Rex' });
    // });

    return (
      <View>
        <ListView style={styles.listContainer}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => (
            <View>
              <TouchableOpacity style={styles.list} onPress={() => this.onPress()}>
                <Text style={styles.text}>{rowData.number} {rowData.title}</Text>
              </TouchableOpacity>
            </View>
          )}
          />
      </View>
    )
  }
}

// <View style={styles.container}>
//         <View style={{ height: 50, backgroundColor: 'powderblue' }} />
//         <View style={{ width: 50, height: 50, backgroundColor: 'skyblue' }} />
//         <View style={{ width: 50, height: 50, backgroundColor: 'steelblue' }} />
//       </View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#9DC5BB',
  },
  list: {
    backgroundColor: '#17B890',
    borderStyle: 'dashed',
    borderWidth: 1,
    height: 60,
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
  // title: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   margin: 10,
  // },
  // text: {
  //   fontSize: 18,
  //   textAlign: 'center',
  //   margin: 10,
  //   marginTop: 20
  // },
  // buttonText: {
  //   fontSize: 15,
  //   textAlign: 'center',
  //   margin: 10,
  //   color: 'deepskyblue',
  //   textDecorationLine: 'underline',
  //   textDecorationStyle: 'solid',
  //   textDecorationColor: 'deepskyblue',
  // },
  // image: {
  //   width: 100,
  //   height: 100
  // }
})

export default Home
