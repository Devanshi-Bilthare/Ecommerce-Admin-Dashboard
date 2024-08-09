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

export const getOrderByUser = createAsyncThunk('order/get-order',async(id,thunkApi)=>{
    try{
        return await authService.getOrder()
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
        .addCase(getOrderByUser.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getOrderByUser.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = true
            state.orderByUser =action.payload
        })
        .addCase(getOrderByUser.rejected,(state,action)=>{
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
    }
})

export default authSlice.reducer