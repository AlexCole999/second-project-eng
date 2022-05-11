let defaultstate = 'en-ru'

const changeSelectedLanguageReducer = (state = defaultstate, action) => {
  switch (action.type) {
    case "CHANGE_SELECTED_LANGUAGE":
      return action.payload
    default: return state
  }
}

export default changeSelectedLanguageReducer;