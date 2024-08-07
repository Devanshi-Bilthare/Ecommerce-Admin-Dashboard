import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/config";

const getBrands = async ()=>{
    const response = await axios.get(`${base_url}brand`)
    
    return response.data
}

const createBrand = async (brand)=>{
    const response = await axios.post(`${base_url}brand/create`,brand,config)
    return response.data
}

const updateBrand = async (data)=>{
    const {brandData,id} = data
    const response = await axios.put(`${base_url}brand/${id}`,{title:brandData.title},config)
    return response.data
}

const getSingleBrand = async (id)=>{
    const response = await axios.get(`${base_url}brand/${id}`)
    return response.data
}

const deleteBrand = async (id)=>{
    const response = await axios.delete(`${base_url}brand/${id}`,config)
    return response.data
}

const brandService = {getBrands,createBrand,getSingleBrand,updateBrand,deleteBrand}

export default brandService
