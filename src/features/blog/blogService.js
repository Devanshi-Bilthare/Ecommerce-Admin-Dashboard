import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/config";

const getBlogs = async ()=>{
    const response = await axios.get(`${base_url}blog`)
    
    return response.data
}

const createBlog = async (blog)=>{
    const response = await axios.post(`${base_url}blog/create`,blog,config)
    return response.data
}

const updateBlog = async (data)=>{
    const {blogData,id} = data
    const response = await axios.put(`${base_url}blog/${id}`,blogData,config)
    return response.data
}

const getSingleBlog = async (id)=>{
    const response = await axios.get(`${base_url}blog/${id}`)
    return response.data
}

const deleteBlog = async (id)=>{
    const response = await axios.delete(`${base_url}blog/${id}`,config)
    return response.data
}


const blogService = {getBlogs,createBlog,deleteBlog,getSingleBlog,updateBlog}

export default blogService
