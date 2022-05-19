import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/user/userSlice'
import reservationReducer from '../features/reservation/reservationSlice'
import uiReducer from '../features/ui/uiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    reservation: reservationReducer,
    ui: uiReducer,
  },
})
