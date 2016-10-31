import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    margin: 20,
  }
})


class PrefaceContainer extends Component {
  constructor(props) {
    super(props);
    console.log('Preface constructor....');

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Preface !
      </Text>
      </View>
    );
  }
}

export default PrefaceContainer;