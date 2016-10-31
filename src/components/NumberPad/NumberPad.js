import React, { PropTypes } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  numPadWrapper: {
    backgroundColor: '#FF8200',
    padding: 20,
    borderWidth: 2,
    borderColor: '#FF8200'
  },
  numPadRow: {
    flexDirection: 'row',
    borderColor: 'transparent',
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

const propTypes = {
  onClearAll: PropTypes.func,
  onNumPadTab: PropTypes.func,
  onSongSearch: PropTypes.func,
  searchKey: PropTypes.string,
  onCancel: PropTypes.func
};

const NumberPad = (props) => {
  const { onClearAll, onNumPadTab, onSongSearch, searchKey, onCancel } = props;
  return (
    <View style={styles.numPadWrapper}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ flex: 2, fontSize: 40 }}>{searchKey} </Text>
        <TouchableOpacity style={{ flex: 1, backgroundColor: '#1A281F' }} onPress={onClearAll}>
          <Text style={{ color: 'white', fontSize: 40 }}> Clear </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.numPadRow}>
        <TouchableOpacity style={[styles.numPadElem, { backgroundColor: 'powderblue' }]} onPress={onNumPadTab.bind(null, '1')}>
          <Text style={styles.numText}> 1 </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.numPadElem, { backgroundColor: 'skyblue' }]} onPress={onNumPadTab.bind(null, '2')}>
          <Text style={styles.numText}> 2 </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.numPadElem, { backgroundColor: 'steelblue' }]} onPress={onNumPadTab.bind(null, '3')}>
          <Text style={styles.numText}> 3 </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.numPadRow}>
        <TouchableOpacity style={[styles.numPadElem, { backgroundColor: 'powderblue' }]} onPress={onNumPadTab.bind(null, '4')}>
          <Text style={styles.numText}> 4 </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.numPadElem, { backgroundColor: 'skyblue' }]} onPress={onNumPadTab.bind(null, '5')}>
          <Text style={styles.numText}> 5 </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.numPadElem, { backgroundColor: 'steelblue' }]} onPress={onNumPadTab.bind(null, '6')}>
          <Text style={styles.numText}> 6 </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.numPadRow}>
        <TouchableOpacity style={[styles.numPadElem, { backgroundColor: 'powderblue' }]} onPress={onNumPadTab.bind(null, '7')}>
          <Text style={styles.numText}> 7 </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.numPadElem, { backgroundColor: 'skyblue' }]} onPress={onNumPadTab.bind(null, '8')}>
          <Text style={styles.numText}> 8 </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.numPadElem, { backgroundColor: 'steelblue' }]} onPress={onNumPadTab.bind(null, '9')}>
          <Text style={styles.numText}> 9 </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.numPadRow}>
        <TouchableOpacity style={[styles.numPadElem, { backgroundColor: 'powderblue' }]} onPress={onNumPadTab.bind(null, '0')}>
          <Text style={styles.numText}> 0 </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.numPadElem} onPress={onCancel}>
          <Text style={styles.text}> Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.numPadElem} onPress={onSongSearch} >
          <Text style={styles.text}> Ok </Text>
        </TouchableOpacity>
      </View >
    </View >
  )
}

NumberPad.propTypes = propTypes;
export default NumberPad
