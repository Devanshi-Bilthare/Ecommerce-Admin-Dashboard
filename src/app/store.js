import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";
import colorReducer from "../features/color/colorSlice";
import productCategoryReducer  from "../features/pcategory/pcategorySlice";
import blogReducer from "../features/blog/blogSlice";
import blogCategoryReducer  from "../features/bCategory/bCategorySlice";
import enquiryReducer from "../features/enquiry/enquirySlice";
import uploadReducer from "../features/upload/uploadSlice";
import couponReducer from "../features/coupon/couponSlice";



export const store = configureStore({
    reducer:{
        auth:authReducer,
        customer:customerReducer,
        product:productReducer,
        brand:brandReducer,
        color:colorReducer,
        pCategory:productCategoryReducer,
        blog:blogReducer,
        bCategory:blogCategoryReducer,
        enquiry:enquiryReducer,
        upload:uploadReducer,
        coupon:couponReducer
    }
})