let defaultstate = { data: [] }

const logInUserWithGoogleAuthReducer = (state = defaultstate, action) => {
  switch (action.type) {
    case "ADD_DATA_FROM_GOOGLEAUTH":
      return { ...state, data: action.payload }
    default: return state
  }
}

export default logInUserWithGoogleAuthReducer;