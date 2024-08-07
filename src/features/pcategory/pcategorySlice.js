import { createSlice ,createAsyncThunk,createAction} from "@reduxjs/toolkit";
import pCategoryService from "./pcategoryService";

export const getProductCategory = createAsyncThunk('category/get-pCategories',async(thunkApi)=>{
    try{
        return await pCategoryService.getProductCategory()
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const createProductCategory = createAsyncThunk('pcategory/create-pCategory',async(catData,thunkApi)=>{
    try{
        return await pCategoryService.createProductCategory(catData)
    }catch(err){
        return thunkApi.rejectWithValue(err) 
    }
})

export const updateProductCategory = createAsyncThunk('pCategory/update-pCategory',async(catData,thunkApi)=>{
    try{
        return await pCategoryService.updateProductCategory(catData)
    }catch(err){
        return thunkApi.rejectWithValue(err) 
    }
})

export const getSingleProductCategory = createAsyncThunk('pCategory/get-pCategory',async(id,thunkApi)=>{
    try{
        return await pCategoryService.getSingleProductCategory(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const deleteProductCategory = createAsyncThunk('pCategory/delete-pCategory',async(id,thunkApi)=>{
    try{
        return await pCategoryService.deleteProductCategory(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const resetState=createAction('Reset_all')

const initialState = {
    pCategories:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:""
}

export const productCategorySlice = createSlice({
    name:'pCategories',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getProductCategory.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getProductCategory.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError =false
            state.isSuccess = true
            state.pCategories= action.payload
        })
        .addCase(getProductCategory.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(createProductCategory.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(createProductCategory.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError =false
            state.isSuccess = true
            state.createdCategory= action.payload
        })
        .addCase(createProductCategory.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(getSingleProductCategory.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getSingleProductCategory.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError =false
            state.isSuccess = true
            state.singleCategory= action.payload.title
        })
        .addCase(getSingleProductCategory.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(updateProductCategory.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(updateProductCategory.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError =false
            state.isSuccess = true
            state.updatedProductCategory= action.payload
        })
        .addCase(updateProductCategory.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(deleteProductCategory.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(deleteProductCategory.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError =false
            state.isSuccess = true
            state.deletedProductCategory= action.payload
        })
        .addCase(deleteProductCategory.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(resetState,()=> initialState)
    }
})

export default productCategorySlice.reducer