import React, { useEffect } from 'react'
import CustomInput from '../Component/CustomInput'
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useFormik } from "formik";
import * as Yup from "yup";
import {createCoupon,getSingleCoupon,resetState, updateCoupon} from '../features/coupon/couponSlice'


let userSchema = Yup.object().shape({
  name: Yup.string().required("Coupon name is required"),
  expiry: Yup.date().required("Expiry Date is required"),
  discount: Yup.number().required("Discount is required"),
});
const AddCoupon = () => {
    const dispatch = useDispatch()
  const location = useLocation();
    const navigate = useNavigate()
  const couponId = location.pathname.split("/")[3];
    const newCoupon = useSelector((state) => state.coupon);
    const {isSuccess,isError,isLoading,createdCoupon,singleCoupon,updatedCoupon} = newCoupon

    const changeDateFormet = (date) => {
      const newDate = new Date(date).toISOString().split('T')[0];
      return newDate;
    };
  
    useEffect(()=>{
      if(couponId !== undefined){
        dispatch(getSingleCoupon(couponId))
      }else{
        dispatch(resetState())
      }
    },[couponId])

    useEffect(()=>{
      if(isSuccess && createdCoupon){
        toast.success('Coupon successfully added', {});
      }
      if(updatedCoupon && isSuccess){
        toast.success("Coupon Updated Successfully")
      }
      if(isError){
        toast.error('Something went wrong', {});
      }
    },[isSuccess,isError,isLoading])
  
    const formik = useFormik({
      enableReinitialize:true,
      initialValues: {
        name:singleCoupon?.name || "",
        expiry: singleCoupon?.expiry ? changeDateFormet(singleCoupon.expiry) : "",
        discount:singleCoupon?.discount || ""
      },
      validationSchema: userSchema,
      onSubmit: (values) => {
        if(couponId !== undefined){
          const data = {id:couponId,couponData:values}
          dispatch(updateCoupon(data))
        }else{
          dispatch(createCoupon(values));
        formik.resetForm();
        }
        
        
        setTimeout(() => {
          dispatch(resetState())
          navigate('/admin/coupon-list')
        }, 300);
      },
    });
    return (
      <div>
           <h3 className="mb-4 text-2xl font-semibold">{couponId !== undefined ? "Edit" : "Add"} Coupon</h3>
           <div>
              <form action="" onSubmit={formik.handleSubmit}>
                  <CustomInput type='text' placeholder='Enter Coupon Name '
                   name="name"
                   onCh={formik.handleChange("name")}
                   val={formik.values.name}
                  />
                  <div className="text-red-500 mt-2 ">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput type='Date' placeholder='Enter Expiry Date '
                   name="expiry"
                   onCh={formik.handleChange("expiry")}
                   val={formik.values.expiry}
                  />
                  <div className="text-red-500 mt-2 ">
            {formik.touched.expiry && formik.errors.expiry}
          </div>
          <CustomInput type='Number' placeholder='Enter Discount '
                   name="discount"
                   onCh={formik.handleChange("discount")}
                   val={formik.values.discount}
                  />
                  <div className="text-red-500 mt-2 ">
            {formik.touched.discount && formik.errors.discount}
          </div>
                  <button
                  className=" border rounded-xl my-5 px-4 py-2 bg-green-400"
                  type="submit"
                  >
                      {couponId !== undefined ? "Edit" : "Add"}  Coupon
                  </button>
              </form>
           </div>
      </div>
    )
}

export default AddCoupon