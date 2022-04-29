let defaultstate = { data: [] }

const getTranslatesFromYandexDictionaryReducer = (state = defaultstate, action) => {
  switch (action.type) {
    case "GET_TRANSLATES_FROM_YANDEX_DICTIONARY":
      return { ...state, data: action.payload }
    default: return state
  }
}

export default getTranslatesFromYandexDictionaryReducer;