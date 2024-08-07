import { createSlice ,createAsyncThunk,createAction} from "@reduxjs/toolkit";
import brandService from "./brandService";

export const getBrands = createAsyncThunk('brand/get-brands',async(thunkApi)=>{
    try{
        return await brandService.getBrands()
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const createBrand = createAsyncThunk('brand/create-brand',async(brandData,thunkApi)=>{
    try{
        return await brandService.createBrand(brandData)
    }catch(err){
        return thunkApi.rejectWithValue(err) 
    }
})

export const updateBrand = createAsyncThunk('brand/update-brand',async(brandData,thunkApi)=>{
    try{
        return await brandService.updateBrand(brandData)
    }catch(err){
        return thunkApi.rejectWithValue(err) 
    }
})

export const getSingleBrand = createAsyncThunk('brand/get-brand',async(id,thunkApi)=>{
    try{
        return await brandService.getSingleBrand(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const deleteBrand = createAsyncThunk('brand/delete-brand',async(id,thunkApi)=>{
    try{
        return await brandService.deleteBrand(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const resetState=createAction('Reset_all')

const initialState = {
    brands:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:""
}

export const brandSlice = createSlice({
    name:'brands',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getBrands.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getBrands.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError =false
            state.isSuccess = true
            state.brands= action.payload
        })
        .addCase(getBrands.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(createBrand.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(createBrand.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError =false
            state.isSuccess = true
            state.createdBrand= action.payload
        })
        .addCase(createBrand.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(getSingleBrand.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getSingleBrand.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError =false
            state.isSuccess = true
            state.singleBrand= action.payload.title
        })
        .addCase(getSingleBrand.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(updateBrand.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(updateBrand.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError =false
            state.isSuccess = true
            state.updatedBrand= action.payload.title
        })
        .addCase(updateBrand.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(deleteBrand.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(deleteBrand.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError =false
            state.isSuccess = true
            state.deletedBrand= action.payload.title
        })
        .addCase(deleteBrand.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =true
            state.isSuccess = false
            state.message = action.error
        })

        .addCase(resetState,()=> initialState)
    }
})

export default brandSlice.reducer