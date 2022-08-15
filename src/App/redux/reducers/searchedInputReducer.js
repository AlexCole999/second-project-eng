let defaultstate = ''

const searchedInputReducer = (state = defaultstate, action) => {
  switch (action.type) {
    case "CHANGE_SEARCHED_INPUT":
      return action.payload
    default: return state
  }
}

export default searchedInputReducer;