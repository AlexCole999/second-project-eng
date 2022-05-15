let defaultstate = { word: { word: 'Загрузка...', translates: [{ language: 'en-ru', translate: '' }] } }

const getWordsFromFirebaseReducer = (state = defaultstate, action) => {
  switch (action.type) {
    case "ADD_DATA_FROM_FIREBASE":
      return action.payload
    default: return state
  }
}

export default getWordsFromFirebaseReducer;