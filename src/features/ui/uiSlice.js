import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  refresh: false,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addNewRoom: (state, actions) => {
      state.refresh = !state.refresh
    },
  },
})

export const { addNewRoom } = uiSlice.actions
export default uiSlice.reducer
