import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  reducers: {
    filterChange(state, action) {
      const filt = action.payload
      return state.filter(n => n.content.toLowerCase().includes(filt.toLowerCase()))
    }
  }
})

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer
/*
const filterReducer = (state = 'ALL', action) => {
    switch (action.type) {
      case 'SET_FILTER':

        return action.payload
      default:
        return state
    }
}

export const filterChange = filter => {
    return {
      type: 'SET_FILTER',
      payload: filter,
    }
}
  
export default filterReducer*/