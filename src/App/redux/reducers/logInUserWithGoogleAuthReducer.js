let defaultstate = { data: [] }

const logInUserWithGoogleAuthReducer = (state = defaultstate, action) => {
  switch (action.type) {
    case "LOG_IN_USER_WITH_GOOGLEAUTH":
      return { ...state, data: action.payload }
    default: return state
  }
}

export default logInUserWithGoogleAuthReducer;