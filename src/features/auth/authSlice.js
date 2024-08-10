import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const getUserFromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')):null

const initialState ={
    user:getUserFromLocalStorage,
    orders:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:""
}

export const login = createAsyncThunk('auth/admin-login',async(user,thunkApi)=>{
    try{
        return await authService.login(user)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})


export const getOrders = createAsyncThunk('order/get-orders',async(thunkApi)=>{
    try{
        return await authService.getOrders()
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const getSingleOrder = createAsyncThunk('order/get-order',async(id,thunkApi)=>{
    try{
        return await authService.getSingleOrder(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const updateOrder = createAsyncThunk('order/update-order',async(data,thunkApi)=>{
    try{
        return await authService.updateOrder(data)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const getMonthlyOrderDetails = createAsyncThunk('order/get-orderDetails',async(id,thunkApi)=>{
    try{
        return await authService.getMonthlyOrderDetails()
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const getYearlyStats = createAsyncThunk('order/get-yearlyDetails',async(thunkApi)=>{
    try{
        return await authService.getYearlyStats()
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder.addCase(login.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(login.rejected,(state)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.user = null
        })
        .addCase(getOrders.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getOrders.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = true
            state.orders =action.payload
        })
        .addCase(getOrders.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(getSingleOrder.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getSingleOrder.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = true
            state.singleOrder =action.payload
        })
        .addCase(getSingleOrder.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(getMonthlyOrderDetails.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getMonthlyOrderDetails.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = true
            state.monthlyOrderDetails =action.payload
        })
        .addCase(getMonthlyOrderDetails.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(getYearlyStats.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getYearlyStats.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = true
            state.YearltOrderDetails =action.payload
        })
        .addCase(getYearlyStats.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(updateOrder.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(updateOrder.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = true
            state.YearltOrderDetails =action.payload
        })
        .addCase(updateOrder.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.message = action.error
        })
    }
})

export default authSlice.reducer