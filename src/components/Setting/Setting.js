import React, { PropTypes } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Slider } from 'react-native'



const Setting = ({onSlidingCompleteHandler, fontSize}) => {
  console.log(onSlidingCompleteHandler, fontSize);
  return (
    <View>
      <Text style={{fontSize}}> Font Size: {fontSize} </Text>
      <Slider
        // onSlidingComplete={(value) => onSlidingCompleteHandler.bind(null, value) }
        // onSlidingComplete={(value) => console.log(value)}
        onSlidingComplete={(value) => { onSlidingCompleteHandler.bind(null, value) } }
        minimumValue={12}
        maximumValue={20}
        step={2}
        />
    </View>
  )
}
Setting.propTypes = {
  onSlidingCompleteHandler: PropTypes.func.isRequired,
  fontSize: PropTypes.number.isRequired
}

export default Setting;