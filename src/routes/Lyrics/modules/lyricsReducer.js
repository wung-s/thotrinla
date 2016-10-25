const INCREMENT = 'INCREMENT'

export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(increment(getState().counter))
        resolve()
      }, 400)
    })
  }
}

export const increment = (value = 1) => ({
  type: INCREMENT,
  value
})

const initialState = 0

export default function lyrics(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return state + action.value
    default:
      return state
  }
}
