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

const getSingleOrder = async (id) => {
    const response = await axios.get(
      `${base_url}user/getSingleOrder/${id}`,
      config
    );
  
    return response.data;
  };

  const updateOrder = async (data) => {
    const response = await axios.put(
      `${base_url}user/update-order/${data.id}`,{status:data.status},
      config
    );
  
    return response.data;
  };

  const getMonthlyOrderDetails = async (id) => {
    const response = await axios.get(
      `${base_url}user/getMonthWiseOrderDetails`,
      config
    );
  
    return response.data;
  };

  const getYearlyStats = async (id) => {
    const response = await axios.get(
      `${base_url}user/getYearlyTotalOrders`,
      config
    );
  
    return response.data;
  };


const authService = {login,getOrders,getSingleOrder,getMonthlyOrderDetails,getYearlyStats,updateOrder}

export default authService
