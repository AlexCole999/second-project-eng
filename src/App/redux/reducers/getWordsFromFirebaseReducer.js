let defaultstate = { data: [] }

const getWordsFromFirebaseReducer = (state = defaultstate, action) => {
  switch (action.type) {
    case "ADD_DATA_FROM_FIREBASE":
      return { ...state, data: action.someproperty }
    default: return state
  }
}

export default getWordsFromFirebaseReducer;