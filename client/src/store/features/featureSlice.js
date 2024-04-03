import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api";
import { apis } from "../../constants/url";
import { fetchStatus } from "../../constants/constants";

const initialState = {
    features:[],
    error:"",
    status:""
}

export const fetchfeatures = createAsyncThunk('features/fetch',async(_,{rejectWithValue})=>{
    try {
        const {data} = await axiosInstance.get(apis.feature.root)
        return data
    } catch (error) {
      return rejectWithValue(error.response.data.error.message)   
    }
})


export const createFeatures = createAsyncThunk('features/create',async(values,{rejectWithValue})=>{
    try {
        const {data} = await axiosInstance.post(apis.feature.root,values)
        return data
    } catch (error) {
      return rejectWithValue(error.response.data.error.message)   
    }
})


export const updateFeatures = createAsyncThunk('features/update',async(values,{rejectWithValue})=>{
    try {
        const {id,...rest} = values
        const {data} = await axiosInstance.patch(apis.feature.individual(id),rest)
        return data
    } catch (error) {
      return rejectWithValue(error.response.data.error.message)   
    }
})


export const deleteFeatures = createAsyncThunk('features/delete',async(id,{rejectWithValue})=>{
    try {
        await axiosInstance.delete(apis.feature.individual(id))
        return id
    } catch (error) {
      return rejectWithValue(error.response.data.error.message)   
    }
})



export const featureSlice = createSlice({
    name:'roles',
    initialState,
    reducers:{

    },
    extraReducers:(builder) =>{
        //fetch features
        builder.addCase(fetchfeatures.pending,(state,action)=>{
            state.status = fetchStatus.loading
        })
    
        builder.addCase(fetchfeatures.fulfilled,(state,action)=>{
            state.status = fetchStatus.succeded
            state.features = action.payload.data
        })
    
        builder.addCase(fetchfeatures.rejected,(state,action)=>{
            state.status = fetchStatus.failed
            state.error = action.payload
        })


        //create features
        builder.addCase(createFeatures.pending,(state,action)=>{
            state.status = fetchStatus.loading
        })
    
        builder.addCase(createFeatures.fulfilled,(state,action)=>{
            state.status = fetchStatus.succeded
            state.features.push(action.payload.data)
        })
    
        builder.addCase(createFeatures.rejected,(state,action)=>{
            state.status = fetchStatus.failed
            state.error = action.payload
        })

        //update features 
        builder.addCase(updateFeatures.pending,(state,action)=>{
            state.status = fetchStatus.loading
        })
    
        builder.addCase(updateFeatures.fulfilled,(state,action)=>{
            state.status = fetchStatus.succeded
            const data = action.payload.data
            const intermediate_state = state.features.filter((feature)=>feature.feature_id!=data.feature_id)
            intermediate_state.unshift(data)
            state.features = intermediate_state
        })
    
        builder.addCase(updateFeatures.rejected,(state,action)=>{
            state.status = fetchStatus.failed
            state.error = action.payload
        })


        //delete features
        builder.addCase(deleteFeatures.pending,(state,action)=>{
            state.status = fetchStatus.loading
        })
    
        builder.addCase(deleteFeatures.fulfilled,(state,action)=>{
            state.status = fetchStatus.succeded
            console.log(action.payload,'xxx')
            state.features = state.features.filter((feature)=>feature.feature_id!=action.payload)
            })
    
        builder.addCase(deleteFeatures.rejected,(state,action)=>{
            state.status = fetchStatus.failed
            state.error = action.payload
        })

    }

})

export default featureSlice.reducer