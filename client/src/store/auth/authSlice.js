import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../api'
import { userApi } from '../../constants/url'
import {fetchStatus} from '../../constants/constants'

const initialState = {
  me:{},
  error:"",
  status:""
}

export const fetchMe = createAsyncThunk('auth/fetchme',async(_, { rejectWithValue })=>{
    try {
        const {data}  = axiosInstance.get(userApi.me)
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers:(builder) =>{
    builder.addCase(fetchMe.pending,(state,action)=>{
        state.status = fetchStatus.loading
    })

    builder.addCase(fetchMe.fulfilled,(state,action)=>{
        state.status = fetchStatus.succeded
        state.me = action.payload
    })

    builder.addCase(fetchMe.rejected,(state,action)=>{
        state.status = fetchStatus.failed
        state.error = action.payload
    })
  }
})

// export const { increment, decrement, incrementByAmount } = authSlice.actions

export default authSlice.reducer