import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/config";


const login = async (userData)=>{
    const response = await axios.post(`${base_url}user/login-admin`,userData)
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}

const getOrders = async ()=>{
    const response = await axios.get(`${base_url}user/getallorders`,config)
    return response.data
}

const getOrder = async (id) => {
    const response = await axios.post(
      `${base_url}user/getorderbyuser/${id}`,
      "",
      config
    );
  
    return response.data;
  };

  const getMonthlyOrderDetails = async (id) => {
    const response = await axios.get(
      `${base_url}user/getMonthWiseOrderDetails`,
      "",
      config
    );
  
    return response.data;
  };


const authService = {login,getOrders,getOrder,getMonthlyOrderDetails}

export default authService
