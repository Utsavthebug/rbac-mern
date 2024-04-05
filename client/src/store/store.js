import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import roleReducer from './roles/roleSlice'
import usersReducer from './users/userSlice'
import featureReducer from './features/featureSlice'

export const store = configureStore({
  reducer: {
    auth:authReducer,
    role:roleReducer,
    users:usersReducer,
    features:featureReducer
  },
})