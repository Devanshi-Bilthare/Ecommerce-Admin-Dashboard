import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/config";

const getEnquiry = async ()=>{
    const response = await axios.get(`${base_url}enquiry`)
    return response.data
}

const getSingleEnquiry = async (id)=>{
    const response = await axios.get(`${base_url}enquiry/${id}`)
    return response.data
}

const updateEnquiry = async (data)=>{
    const response = await axios.put(`${base_url}enquiry/${data.id}`,{status:data.enq},config)
    return response.data
}



const deleteEnquiry = async (id)=>{
    const response = await axios.delete(`${base_url}enquiry/${id}`,config)
    return response.data
}

const enquiryService = {getEnquiry,deleteEnquiry,getSingleEnquiry,updateEnquiry}

export default enquiryService
