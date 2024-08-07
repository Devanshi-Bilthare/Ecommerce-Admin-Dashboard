import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/config";

const getBlogCategory = async ()=>{
    const response = await axios.get(`${base_url}blogCategory`)
    
    return response.data
}

const createBlogCategory = async (cat)=>{
    const response = await axios.post(`${base_url}blogCategory/create`,cat,config)
    return response.data
}

const updateBlogCategory = async (data)=>{
    const {bCatData,id} = data
    const response = await axios.put(`${base_url}blogCategory/${id}`,{title:bCatData.title},config)
    return response.data
}

const getSingleBlogCategory= async (id)=>{
    const response = await axios.get(`${base_url}blogCategory/${id}`)
    return response.data
}

const deleteBlogCategory= async (id)=>{
    const response = await axios.delete(`${base_url}blogCategory/${id}`,config)
    return response.data
}



const bCategoryService = {getBlogCategory,createBlogCategory,updateBlogCategory,getSingleBlogCategory,deleteBlogCategory}

export default bCategoryService
