import React, { PropTypes } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'


const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15
  },
  text: {
    color: 'darkgrey'
  },
  textBlock: {
    textAlign: 'left',
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
  let tmpArr = stanza.split('\n').reduce(function (newStanza, currItem) {
    if (currItem)
      newStanza.push(currItem);
    return newStanza;
  }, []).join('\n');
  return tmpArr;
}

function getBlockUI(stanza, stanzaCnt = 0, currentStanzaNo = 0, fontSize) {
  let indicatorFontSize = fontSize - 6;
  let currentTextBlock = removeExtraNewLine(stanza).split('\n').map(function (currentLine, index) {
    return (
      <Text key={index} style={[styles.text, styles.textBlock, {fontSize }]}>
        {currentLine}
      </Text>
    )
  })

  if (currentStanzaNo <= stanzaCnt && stanzaCnt != 0) {
    return (
      <View style={styles.para}>
        <Text style={[styles.text, { fontSize: indicatorFontSize } ]}>{currentStanzaNo}</Text>
        {currentTextBlock}
      </View>
    )
  } else if (stanzaCnt === 0 && currentStanzaNo === 0) {
    return (
      <View style={styles.para}>
        <Text style={[styles.text, { fontSize: indicatorFontSize } ]}>Chorus:</Text>
        {currentTextBlock}
      </View>
    )
  }
}

const Lyrics = ({ lyrics, fontSize }) => {
  return (
    <View style={styles.container}>
      {lyrics.firstStanza ? getBlockUI(lyrics.firstStanza, lyrics.stanzaCnt, 1, fontSize) : null}
      {lyrics.chorus ? getBlockUI(lyrics.chorus, 0, 0, fontSize) : null}
      {lyrics.secondStanza ? getBlockUI(lyrics.secondStanza, lyrics.stanzaCnt, 2, fontSize) : null}
      {lyrics.thirdStanza ? getBlockUI(lyrics.thirdStanza, lyrics.stanzaCnt, 3, fontSize) : null}
      {lyrics.fourthStanza ? getBlockUI(lyrics.fourthStanza, lyrics.stanzaCnt, 4, fontSize) : null}
      {lyrics.fifthStanza ? getBlockUI(lyrics.fifthStanza, lyrics.stanzaCnt, 5, fontSize) : null}
    </View>
  )
}

Lyrics.propTypes = {
  lyrics: PropTypes.object.isRequired,
  fontSize: PropTypes.number.isRequired
}
Lyrics.defaultProps = {
  fontSize: 20
}



export default Lyrics
