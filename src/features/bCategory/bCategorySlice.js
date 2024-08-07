import { createSlice ,createAsyncThunk, createAction} from "@reduxjs/toolkit";
import bCategoryService from "./bCategoryService";

export const getBlogCategory = createAsyncThunk('category/get-bCategories',async(thunkApi)=>{
    try{
        return await bCategoryService.getBlogCategory()
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const createBlogCategory = createAsyncThunk('category/create-bCategories',async(catData,thunkApi)=>{
    try{
        return await bCategoryService.createBlogCategory(catData)
    }catch(err){
        return thunkApi.rejectWithValue(err) 
    }
})


export const updateBlogCategory = createAsyncThunk('category/update-bCategories',async(blogCateData,thunkApi)=>{
    try{
        return await bCategoryService.updateBlogCategory(blogCateData)
    }catch(err){
        return thunkApi.rejectWithValue(err) 
    }
})

export const getSingleBlogCategory = createAsyncThunk('category/get-bCategory',async(id,thunkApi)=>{
    try{
        return await bCategoryService.getSingleBlogCategory(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const deleteBlogCategory = createAsyncThunk('category/delete-bCategories',async(id,thunkApi)=>{
    try{
        return await bCategoryService.deleteBlogCategory(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})


export const resetState=createAction('Reset_all')

const initialState = {
    bCategories:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:""
}

export const blogCategorySlice = createSlice({
    name:'bCategories',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getBlogCategory.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getBlogCategory.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError =false
            state.isSuccess = true
            state.bCategories= action.payload
        })
        .addCase(getBlogCategory.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(createBlogCategory.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(createBlogCategory.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError =false
            state.isSuccess = true
            state.createdBlogCategory= action.payload
        })
        .addCase(createBlogCategory.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(getSingleBlogCategory.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getSingleBlogCategory.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError =false
            state.isSuccess = true
            state.singleBlogCategory= action.payload.title
        })
        .addCase(getSingleBlogCategory.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(updateBlogCategory.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(updateBlogCategory.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError =false
            state.isSuccess = true
            state.updatedBlogCategory= action.payload.title
        })
        .addCase(updateBlogCategory.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(deleteBlogCategory.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(deleteBlogCategory.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError =false
            state.isSuccess = true
            state.deletedBlogCategory= action.payload.title
        })
        .addCase(deleteBlogCategory.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =true
            state.isSuccess = false
            state.message = action.error
        })

        .addCase(resetState,()=> initialState)
    }
})

export default blogCategorySlice.reducer