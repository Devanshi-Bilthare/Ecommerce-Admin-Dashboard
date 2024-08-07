import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/config";

const getCoupons = async ()=>{
    const response = await axios.get(`${base_url}coupon`,config)
    
    return response.data
}

const createCoupon = async (coupon)=>{
    const response = await axios.post(`${base_url}coupon/create`,coupon,config)
    return response.data
}


const updateCoupon= async (data)=>{
    const {couponData,id} = data
    const response = await axios.put(`${base_url}coupon/${id}`,couponData,config)
    return response.data
}

const getSingleCoupon= async (id)=>{
    const response = await axios.get(`${base_url}coupon/${id}`,config)
    return response.data
}

const deleteCoupon= async (id)=>{
    const response = await axios.delete(`${base_url}coupon/${id}`,config)
    return response.data
}



const couponService = {getCoupons,createCoupon,updateCoupon,getSingleCoupon,deleteCoupon}

export default couponService
