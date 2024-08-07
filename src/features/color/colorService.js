import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/config";

const getColors = async ()=>{
    const response = await axios.get(`${base_url}color`)
    
    return response.data
}

const createColors = async (color)=>{
    const response = await axios.post(`${base_url}color/create`,color,config)
    return response.data
}

const updateColor = async (data)=>{
    const {colorData,id} = data
    const response = await axios.put(`${base_url}color/${id}`,{title:colorData.title},config)
    return response.data
}

const getSingleColor = async (id)=>{
    const response = await axios.get(`${base_url}color/${id}`)
    return response.data
}

const deleteColor = async (id)=>{
    const response = await axios.delete(`${base_url}color/${id}`,config)
    return response.data
}


const colorService = {getColors,createColors,updateColor,getSingleColor,deleteColor}

export default colorService
