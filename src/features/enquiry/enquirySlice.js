import { createSlice ,createAsyncThunk, createAction} from "@reduxjs/toolkit";
import enquiryService from "./enquiryService";


export const getEnquiries = createAsyncThunk('enquiry/get-enquiries',async(thunkApi)=>{
    try{
        return await enquiryService.getEnquiry()
    }catch(err){
        return thunkApi.rejectWithValue(err) 
    }
})

export const getSingleEnquiry = createAsyncThunk('enquiry/get-enquiry',async(id,thunkApi)=>{
    try{
        return await enquiryService.getSingleEnquiry(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const updateEnquiry = createAsyncThunk('enquiry/update-enquiry',async(enq,thunkApi)=>{
    try{
        return await enquiryService.updateEnquiry(enq)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const deleteEnquiry = createAsyncThunk('enquiry/delete-enquiry',async(id,thunkApi)=>{
    try{
        return await enquiryService.deleteEnquiry(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const resetState=createAction('Reset_all')


const initialState = {
    enquiries:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:""
}

export const enquirySlice = createSlice({
    name:'enquiries',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getEnquiries.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getEnquiries.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError =false
            state.isSuccess = true
            state.enquiries= action.payload
        })
        .addCase(getEnquiries.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(getSingleEnquiry.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getSingleEnquiry.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError =false
            state.isSuccess = true
            state.singleEnquiry= action.payload
        })
        .addCase(getSingleEnquiry.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(updateEnquiry.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(updateEnquiry.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError =false
            state.isSuccess = true
            state.updatedEnquiry= action.payload
        })
        .addCase(updateEnquiry.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(deleteEnquiry.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(deleteEnquiry.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError =false
            state.isSuccess = true
            state.deletedEnquiry= action.payload
        })
        .addCase(deleteEnquiry.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(resetState,()=> initialState)

    }
})

export default enquirySlice.reducer