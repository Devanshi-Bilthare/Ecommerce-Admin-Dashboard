import { createSlice ,createAsyncThunk,createAction} from "@reduxjs/toolkit";
import colorService from "./colorService";

export const getColors = createAsyncThunk('color/get-colors',async(thunkApi)=>{
    try{
        return await colorService.getColors()
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const createColor = createAsyncThunk('color/create-color',async(colorData,thunkApi)=>{
    try{
        return await colorService.createColors(colorData)
    }catch(err){
        return thunkApi.rejectWithValue(err) 
    }
})

export const updateColor = createAsyncThunk('color/update-color',async(colorData,thunkApi)=>{
    try{
        return await colorService.updateColor(colorData)
    }catch(err){
        return thunkApi.rejectWithValue(err) 
    }
})

export const getSingleColor = createAsyncThunk('color/get-color',async(id,thunkApi)=>{
    try{
        return await colorService.getSingleColor(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const deleteColor = createAsyncThunk('color/delete-color',async(id,thunkApi)=>{
    try{
        return await colorService.deleteColor(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const resetState=createAction('Reset_all')

const initialState = {
    colors:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:""
}

export const colorSlice = createSlice({
    name:'colors',
    initialState,
    reducers:{
       
    },
    extraReducers:(builder)=>{
        builder.addCase(getColors.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getColors.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError =false
            state.isSuccess = true
            state.colors= action.payload
        })
        .addCase(getColors.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(createColor.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(createColor.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError =false
            state.isSuccess = true
            state.createdColor= action.payload
        })
        .addCase(createColor.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(getSingleColor.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getSingleColor.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError =false
            state.isSuccess = true
            state.singleColor= action.payload.title
        })
        .addCase(getSingleColor.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(updateColor.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(updateColor.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError =false
            state.isSuccess = true
            state.updatedColor= action.payload.title
        })
        .addCase(updateColor.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(deleteColor.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(deleteColor.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError =false
            state.isSuccess = true
            state.deletedColor= action.payload.title
        })
        .addCase(deleteColor.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(resetState,()=> initialState)
    }
})

export default colorSlice.reducer