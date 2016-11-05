import React, { PropTypes } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'


const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15
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
})

function removeExtraNewLine(stanza) {
  let tmpArr = stanza.split('\n').reduce(function(newStanza, currItem) {
    if(currItem)
      newStanza.push(currItem);
    return newStanza;
  }, []).join('\n');
  return tmpArr;
}

function getBlockUI(stanza, stanzaCnt = 0, currentStanzaNo  = 0) {
  let currentStanzaText = removeExtraNewLine(stanza).split('\n').map(function(currentLine, index) {
      return(
        <Text key={index} style={styles.text}>
          {currentLine}
        </Text>
      )
    })

  if(currentStanzaNo <= stanzaCnt && stanzaCnt != 0) {
    return(
      <View style={styles.para}>
        {currentStanzaText}
      </View>
    )
  }else if( stanzaCnt === 0 && currentStanzaNo === 0) {
    return(
      <View style={styles.para}>
        {currentStanzaText}
      </View>
    )
  }
}

const Lyrics = ({ lyrics }) => {
  // const { value, increment, doubleAsync } = props;
  // const { lyrics } = props;
  // console.log(lyrics, 'chorus: ',lyrics.chorus);
  return (
    <View style={styles.container}>
      {lyrics.firstStanza ? getBlockUI(lyrics.firstStanza, lyrics.stanzaCnt, 1) : null }
      {lyrics.chorus ? getBlockUI(lyrics.chorus) : null}
      {lyrics.secondStanza ? getBlockUI(lyrics.secondStanza, lyrics.stanzaCnt, 2) : null }
      {lyrics.thirdStanza ? getBlockUI(lyrics.thirdStanza, lyrics.stanzaCnt, 3) : null }
      {lyrics.fourthStanza ? getBlockUI(lyrics.fourthStanza, lyrics.stanzaCnt, 4) : null }
      {lyrics.fifthStanza ? getBlockUI(lyrics.fifthStanza, lyrics.stanzaCnt, 5) : null }
    </View>
  )
}

Lyrics.propTypes = {
  lyrics: PropTypes.object.isRequired
}



export default Lyrics
