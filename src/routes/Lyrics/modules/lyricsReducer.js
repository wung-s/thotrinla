const SONG_SELECTION = 'SONG_SELECTION'
const initialState = {
  searckKey: null,
  lyrics:
  {
    key: null,
    title: null,
    stanzaCnt: null,
    firstStanza: null,
    secondStanza: null,
    thirdStanza: null,
    fourthStanza: null,
    fifthStanza: null,
    sixthStanza: null,
    chorus: null
  }
}

export const selection = (value = initialState) => {
  // console.log('selection...', value);
  return {
    type: SONG_SELECTION,
    value: value
  }
}

export default function lyrics(state = initialState, action) {
  // console.log('lyrics...', action, state);
  switch (action.type) {
    case SONG_SELECTION:
      return Object.assign({}, state)
    default:
      return state
  }
}
