let defaultstate = { data: [] }

const getBasesList = (state = defaultstate, action) => {
  switch (action.type) {
    case "GET_BASES_LIST":
      return { ...state, data: action.payload }
    default: return state
  }
}

export default getBasesList;