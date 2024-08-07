import { createSlice ,createAsyncThunk, createAction} from "@reduxjs/toolkit";
import blogService from './blogService'


export const getBlogs = createAsyncThunk('blog/get-blogs',async(thunkApi)=>{
    try{
        return await blogService.getBlogs()
    }catch(err){
        return thunkApi.rejectWithValue(err) 
    }
})

export const createBlog = createAsyncThunk('blog/create-blog',async(blogData,thunkApi)=>{
    try{
        return await blogService.createBlog(blogData)
    }catch(err){
        return thunkApi.rejectWithValue(err) 
    }
})

export const updateBlog = createAsyncThunk('blog/update-blog',async(blogData,thunkApi)=>{
    try{
        return await blogService.updateBlog(blogData)
    }catch(err){
        return thunkApi.rejectWithValue(err) 
    }
})

export const getSingleBlog = createAsyncThunk('blog/get-blog',async(id,thunkApi)=>{
    try{
        return await blogService.getSingleBlog(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const deleteBlog = createAsyncThunk('blog/delete-blog',async(id,thunkApi)=>{
    try{
        return await blogService.deleteBlog(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const resetState=createAction('Reset_all')

const initialState = {
    blogs:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:""
}

export const blogSlice = createSlice({
    name:'blogs',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getBlogs.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getBlogs.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError =false
            state.isSuccess = true
            state.blogs= action.payload
        })
        .addCase(getBlogs.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(createBlog.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(createBlog.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError =false
            state.isSuccess = true
            state.createdBlog= action.payload
        })
        .addCase(createBlog.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(getSingleBlog.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getSingleBlog.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError =false
            state.isSuccess = true
            state.singleBlog= action.payload
        })
        .addCase(getSingleBlog.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(updateBlog.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(updateBlog.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError =false
            state.isSuccess = true
            state.updatedBlog= action.payload
        })
        .addCase(updateBlog.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(deleteBlog.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(deleteBlog.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError =false
            state.isSuccess = true
            state.deletedBlog= action.payload
        })
        .addCase(deleteBlog.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(resetState,()=> initialState)
    }
})

export default blogSlice.reducer