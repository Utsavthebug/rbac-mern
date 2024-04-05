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

export const createRole = createAsyncThunk('roles/create',async(values,{rejectWithValue})=>{
    try {
        const {data} = await axiosInstance.post(apis.role.root(),values)
        return data
    } catch (error) {
      return rejectWithValue(error.response.data.error.message)   
    }
})

export const deleteRole = createAsyncThunk('roles/delete',async(id,{rejectWithValue})=>{
    try {
        await axiosInstance.delete(apis.role.individual(id))
        return id
    } catch (error) {
      return rejectWithValue(error.response.data.error.message)   
    }
})


export const updateRole = createAsyncThunk('roles/update',async(data,{rejectWithValue})=>{
    try {
        const {roleId,...values} = data
        const response =  await axiosInstance.patch(apis.role.individual(roleId),values)
        return response.data
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
        //fetch roles 
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

        //create roles 
        builder.addCase(createRole.pending,(state,action)=>{
            state.status = fetchStatus.loading
        })
    
        builder.addCase(createRole.fulfilled,(state,action)=>{
            state.status = fetchStatus.succeded
            state.roles.push(action.payload.data)
        })
    
        builder.addCase(createRole.rejected,(state,action)=>{
            state.status = fetchStatus.failed
            state.error = action.payload
        })

        //delete role 
        builder.addCase(deleteRole.pending,(state,action)=>{
            state.status = fetchStatus.loading
        })
    
        builder.addCase(deleteRole.fulfilled,(state,action)=>{
            state.status = fetchStatus.succeded
            console.log('xx',action.payload)
            state.roles = state.roles.filter((data)=>data?.role_id!==action.payload)

            // state.roles.push(action.payload.data)
        })
    
        builder.addCase(deleteRole.rejected,(state,action)=>{
            state.status = fetchStatus.failed
            state.error = action.payload
        })

        //update Role 
        builder.addCase(updateRole.pending,(state,action)=>{
            state.status = fetchStatus.loading
        })
    
        builder.addCase(updateRole.fulfilled,(state,action)=>{
            state.status = fetchStatus.succeded
            console.log('edit action',action.payload)
            // state.roles = state.roles.filter((data)=>data?.role_id!==action.payload)

        })
    
        builder.addCase(updateRole.rejected,(state,action)=>{
            state.status = fetchStatus.failed
            state.error = action.payload
        })

    }

})

export default roleSlice.reducer