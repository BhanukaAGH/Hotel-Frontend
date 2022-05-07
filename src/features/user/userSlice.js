import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

const initialState = {
  users: null,
  isLoading: false,
  isError: false,
  message: '',
}

export const getAllUsers = createAsyncThunk(
  'users/showMe',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.userData.token
      return await userService.getAllUsers(token)
    } catch (error) {
      const message = error.response.data.msg || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: {
      isLoading: false,
      isError: false,
      message: '',
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload
        state.isError = false
        state.message = ''
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false
        state.users = null
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = userSlice.actions
export default userSlice.reducer
