import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import reservationService from './reservationService'

const initialState = {
  reservation: null,
  reservations: null,
  availability: false,
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: '',
}

// Make Reservation
export const makeReservation = createAsyncThunk(
  'reservation/makeReservation',
  async (reservationData, thunkAPI) => {
    try {
      return await reservationService.makeReservation(reservationData)
    } catch (error) {
      const message = error.response.data.msg || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get Reservations
export const getAllReservations = createAsyncThunk(
  'reservation/getAllReservations',
  async (_, thunkAPI) => {
    try {
      const userId = thunkAPI.getState().auth.userData.user.userId
      return await reservationService.getAllReservations(userId)
    } catch (error) {
      const message = error.response.data.msg || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Cancel Reservation
export const cancelReservation = createAsyncThunk(
  'reservation/cancelReservation',
  async (reservationId, thunkAPI) => {
    try {
      return await reservationService.cancelReservation(reservationId)
    } catch (error) {
      const message = error.response.data.msg || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Check Availabbility
export const checkAvailability = createAsyncThunk(
  'reservation/checkAvailability',
  async (availabilityData, thunkAPI) => {
    try {
      return await reservationService.checkAvailability(availabilityData)
    } catch (error) {
      const message = error.response.data.msg || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false
      state.isLoading = false
      state.isError = false
      state.message = ''
    },
    temporaryReservation: (state, action) => {
      state.reservation = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeReservation.pending, (state) => {
        state.isLoading = true
      })
      .addCase(makeReservation.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isLoading = false
        state.reservation = action.payload
        state.isError = false
        state.message = ''
      })
      .addCase(makeReservation.rejected, (state, action) => {
        state.isSuccess = false
        state.isLoading = false
        state.reservation = null
        state.isError = true
        state.message = action.payload
      })

      .addCase(getAllReservations.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllReservations.fulfilled, (state, action) => {
        state.isLoading = false
        state.reservations = action.payload
        state.isError = false
        state.message = ''
      })
      .addCase(getAllReservations.rejected, (state, action) => {
        state.isLoading = false
        state.reservations = null
        state.isError = true
        state.message = action.payload
      })

      .addCase(cancelReservation.pending, (state) => {
        state.isLoading = true
      })
      .addCase(cancelReservation.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
        state.message = ''
      })
      .addCase(cancelReservation.rejected, (state, action) => {
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(checkAvailability.pending, (state) => {
        state.isLoading = true
      })
      .addCase(checkAvailability.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isLoading = false
        state.availability = action.payload
        state.isError = false
        state.message = ''
      })
      .addCase(checkAvailability.rejected, (state, action) => {
        state.isSuccess = false
        state.isLoading = false
        state.availability = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset, temporaryReservation } = reservationSlice.actions
export default reservationSlice.reducer
