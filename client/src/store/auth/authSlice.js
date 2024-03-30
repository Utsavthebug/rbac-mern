import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../api'
import { apis} from '../../constants/url'
import {fetchStatus} from '../../constants/constants'
import { toast } from 'react-toastify'


const initialState = {
  me:undefined,
  error:"",
  status:""
}

export const fetchMe = createAsyncThunk('auth/fetchme',async(_, { rejectWithValue })=>{
    try {
        const {data}  = await axiosInstance.get(apis.me)
        return data
    } catch (error) {
      return rejectWithValue(error.response.data.error.message)
    }
})

export const loginUser = createAsyncThunk('auth/login',async(values, { rejectWithValue })=>{
  try {
      const {email,password} = values
      const {data}  = await axiosInstance.post(apis.auth('login'),{
        email,
        password
      })
      return data
  } catch (error) { 
    return rejectWithValue(error.response.data.error.message)
  }
})

export const logoutUser = createAsyncThunk('auth/logout',async(_, { rejectWithValue })=>{
  try {
      const {data}  = await axiosInstance.post(apis.auth('logout'))
      return data
  } catch (error) { 
    return rejectWithValue(error.response.data.error.message)
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

    builder.addCase(loginUser.pending,(state,action)=>{
      state.status = fetchStatus.loading
  })

  builder.addCase(loginUser.fulfilled,(state,action)=>{
      state.status = fetchStatus.succeded
      state.me = action.payload.user
      sessionStorage.setItem('token',action.payload.token)
      toast.success(action.payload.message)
  })

  builder.addCase(loginUser.rejected,(state,action)=>{
      state.status = fetchStatus.failed
      state.error = action.payload
      toast.error(action.payload)
  })


  builder.addCase(logoutUser.pending,(state,action)=>{
    state.status = fetchStatus.loading
})

builder.addCase(logoutUser.fulfilled,(state,action)=>{
    state.status = fetchStatus.succeded
    state.me = undefined
    sessionStorage.removeItem('token')
})

builder.addCase(logoutUser.rejected,(state,action)=>{
    state.status = fetchStatus.failed
    state.error = action.payload
})


  }
})

// export const { increment, decrement, incrementByAmount } = authSlice.actions

export default authSlice.reducer