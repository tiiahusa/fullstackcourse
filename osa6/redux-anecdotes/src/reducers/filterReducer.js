const filterReducer = (state = 'ALL', action) => {
    switch (action.type) {
      case 'SET_FILTER':
        return action.payload
      default:
        return state
    }
}

export const filterChange = filter => {
    console.log("Filter changeen tullaan ", filter)
    return {
      type: 'SET_FILTER',
      payload: filter,
    }
}
  
export default filterReducer