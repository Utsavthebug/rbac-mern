import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api";
import { apis } from "../../constants/url";
import { fetchStatus } from "../../constants/constants";

const initialState = {
    users:[],
    error:"",
    status:"",
    selectedUser:undefined
}

export const addUser = createAsyncThunk('users/add',async(values,{rejectWithValue})=>{
    try {
        const {data} = await axiosInstance.post(apis.auth('register'),values)
        return data
    } catch (error) {
      return rejectWithValue(error.response.data.error.message)   
    }
})


export const fetchAllUsers = createAsyncThunk('users/fetchall',async(params,{rejectWithValue})=>{
    try {
        const {data} = await axiosInstance.get(apis.user.root,{
            params
        })
        return data
    } catch (error) {
      return rejectWithValue(error.response.data.error.message)   
    }
})


export const deleteUser = createAsyncThunk('users/delete',async(id,{rejectWithValue})=>{
    try {
        const {data} = await axiosInstance.delete(`${apis.user.root}/${id}`)
        return data
    } catch (error) {
      return rejectWithValue(error.response.data.error.message)   
    }
})


export const editUser = createAsyncThunk('users/update',async(editData,{rejectWithValue})=>{
    try {
        const {id,...values} = editData
        const {data} = await axiosInstance.patch(`${apis.user.root}/${id}`,values)
        return data
    } catch (error) {
      return rejectWithValue(error.response.data.error.message)   
    }
})

const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers:{
        setSelectedUser:(state,action)=>{
            const userbyfind = state.users.find((user)=>user.id==action.payload)
            console.log('user by id',userbyfind)
            state.selectedUser = userbyfind
        }
    },
    extraReducers:(builder) =>{
        //adding user
        builder.addCase(addUser.pending,(state,action)=>{
            state.status = fetchStatus.loading
        })
    
        builder.addCase(addUser.fulfilled,(state,action)=>{
            state.status = fetchStatus.succeded
            state.users.unshift(action.payload.user)
        })
    
        builder.addCase(addUser.rejected,(state,action)=>{
            state.status = fetchStatus.failed
            state.error = action.payload
        })


        //fetching all users
        builder.addCase(fetchAllUsers.pending,(state,action)=>{
            state.status = fetchStatus.loading
        })
    
        builder.addCase(fetchAllUsers.fulfilled,(state,action)=>{
            state.status = fetchStatus.succeded
            state.users = action.payload.data
        })
    
        builder.addCase(fetchAllUsers.rejected,(state,action)=>{
            state.status = fetchStatus.failed
            state.error = action.payload
        })


        //deleting users
        builder.addCase(deleteUser.pending,(state,action)=>{
            state.status = fetchStatus.loading
        })
    
        builder.addCase(deleteUser.fulfilled,(state,action)=>{
            state.status = fetchStatus.succeded
            state.users = state.users.filter((user)=>user.id!=action.payload.id)
        })
    
        builder.addCase(deleteUser.rejected,(state,action)=>{
            state.status = fetchStatus.failed
            state.error = action.payload
        })

     
        //edit users
        builder.addCase(editUser.pending,(state,action)=>{
            state.status = fetchStatus.loading
        })
    
        builder.addCase(editUser.fulfilled,(state,action)=>{
            const payloaddata = action.payload.data
            //setting edit data at start 
            let deletedUser = state.users.filter((user)=> user.id!=payloaddata.id)
            deletedUser.unshift(payloaddata)
            state.users = deletedUser
            state.status = fetchStatus.succeded
        })
    
        builder.addCase(editUser.rejected,(state,action)=>{
            state.status = fetchStatus.failed
            state.error = action.payload
        })

    }

})

export const {setSelectedUser} = usersSlice.actions

export default usersSlice.reducer