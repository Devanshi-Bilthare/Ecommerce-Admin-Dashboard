import { createSlice ,createAsyncThunk,createAction} from "@reduxjs/toolkit";
import couponService from './couponService'

export const getCoupons = createAsyncThunk('coupon/get-coupons',async(thunkApi)=>{
    try{
        return await couponService.getCoupons()
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const createCoupon = createAsyncThunk('coupon/create-coupon',async(couponData,thunkApi)=>{
    try{
        return await couponService.createCoupon(couponData)
    }catch(err){
        return thunkApi.rejectWithValue(err) 
    }
})

export const updateCoupon = createAsyncThunk('coupon/update-coupon',async(couponData,thunkApi)=>{
    try{
        return await couponService.updateCoupon(couponData)
    }catch(err){
        return thunkApi.rejectWithValue(err) 
    }
})

export const getSingleCoupon = createAsyncThunk('coupon/get-coupon',async(id,thunkApi)=>{
    try{
        return await couponService.getSingleCoupon(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const deleteCoupon = createAsyncThunk('coupon/delete-coupon',async(id,thunkApi)=>{
    try{
        return await couponService.deleteCoupon(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const resetState=createAction('Reset_all')

const initialState = {
    coupons:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:""
}

export const couponSlice = createSlice({
    name:'coupons',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getCoupons.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getCoupons.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError =false
            state.isSuccess = true
            state.coupons= action.payload
        })
        .addCase(getCoupons.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(createCoupon.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(createCoupon.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError =false
            state.isSuccess = true
            state.createdCoupon= action.payload
        })
        .addCase(createCoupon.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(getSingleCoupon.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getSingleCoupon.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError =false
            state.isSuccess = true
            state.singleCoupon= action.payload
        })
        .addCase(getSingleCoupon.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(updateCoupon.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(updateCoupon.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError =false
            state.isSuccess = true
            state.updatedCoupon= action.payload
        })
        .addCase(updateCoupon.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(deleteCoupon.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(deleteCoupon.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError =false
            state.isSuccess = true
            state.deletedCoupon= action.payload.title
        })
        .addCase(deleteCoupon.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =true
            state.isSuccess = false
            state.message = action.error
        })

        .addCase(resetState,()=> initialState)
    }
})

export default couponSlice.reducer