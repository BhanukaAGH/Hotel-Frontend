import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  userData: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  addUser: false,
}

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (error) {
      const message = error.response.data.msg || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    const message = error.response.data.msg || error.message
    return thunkAPI.rejectWithValue(message)
  }
})

// Add New User - System Admin
export const addNewuser = createAsyncThunk(
  'auth/addNewuser',
  async (user, thunkAPI) => {
    try {
      return await authService.addNewUser(user)
    } catch (error) {
      const message = error.response.data.msg || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
      state.addUser = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userData = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.userData = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userData = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.userData = null
      })
      .addCase(addNewuser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addNewuser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.addUser = true
      })
      .addCase(addNewuser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.addUser = false
        state.message = action.payload
      })
      .addCase(logout.fulfilled, (state) => {
        state.userData = null
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
