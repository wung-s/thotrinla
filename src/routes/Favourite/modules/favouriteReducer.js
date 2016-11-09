const initialState = 0

export default function counter(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + action.value
    default:
      return state
  }
}
