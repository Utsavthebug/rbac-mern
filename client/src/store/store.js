import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import roleReducer from './roles/roleSlice'
import usersReducer from './users/userSlice'

export const store = configureStore({
  reducer: {
    auth:authReducer,
    role:roleReducer,
    users:usersReducer
  },
})