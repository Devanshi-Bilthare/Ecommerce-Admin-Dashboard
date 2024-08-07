import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/config";

const getProductCategory = async ()=>{
    const response = await axios.get(`${base_url}productCategory`)
    
    return response.data
}

const createProductCategory = async (cat)=>{
    const response = await axios.post(`${base_url}productCategory/create`,cat,config)
    return response.data
}

const updateProductCategory = async (data)=>{
    const {catData,id} = data
    const response = await axios.put(`${base_url}productCategory/${id}`,{title:catData.title},config)
    return response.data
}

const getSingleProductCategory = async (id)=>{
    const response = await axios.get(`${base_url}productCategory/${id}`)
    return response.data
}

const deleteProductCategory = async (id)=>{
    const response = await axios.delete(`${base_url}productCategory/${id}`,config)
    return response.data
}


const pCategoryService = {getProductCategory,createProductCategory,updateProductCategory,getSingleProductCategory,deleteProductCategory}

export default pCategoryService
