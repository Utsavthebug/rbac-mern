import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api";
import { apis } from "../../constants/url";
import { fetchStatus } from "../../constants/constants";

const initialState = {
    roles:[],
    error:"",
    status:""
}

export const fetchRoles = createAsyncThunk('roles/fetch',async(_,{rejectWithValue})=>{
    try {
        const {data} = await axiosInstance.get(apis.role.root())
        return data
    } catch (error) {
      return rejectWithValue(error.response.data.error.message)   
    }
})

const roleSlice = createSlice({
    name:'roles',
    initialState,
    reducers:{

    },
    extraReducers:(builder) =>{
        builder.addCase(fetchRoles.pending,(state,action)=>{
            state.status = fetchStatus.loading
        })
    
        builder.addCase(fetchRoles.fulfilled,(state,action)=>{
            state.status = fetchStatus.succeded
            state.roles = action.payload.data
        })
    
        builder.addCase(fetchRoles.rejected,(state,action)=>{
            state.status = fetchStatus.failed
            state.error = action.payload
        })
    }

})

export default roleSlice.reducer