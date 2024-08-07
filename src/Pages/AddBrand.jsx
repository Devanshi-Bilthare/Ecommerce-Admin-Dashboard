import React, { useEffect } from 'react'
import CustomInput from '../Component/CustomInput'
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { useFormik } from "formik";
import * as Yup from "yup";
import { createBrand,getSingleBrand,resetState, updateBrand } from '../features/brand/brandSlice';


let userSchema = Yup.object().shape({
  title: Yup.string().required("Brand name is required"),
});

const AddBrand = () => {
  const dispatch = useDispatch()
  const location = useLocation();
  const navigate = useNavigate();
  const brandId = location.pathname.split("/")[3];
  const newBrand = useSelector((state) => state.brand);
  const {isSuccess,isError,isLoading,createdBrand,singleBrand,updatedBrand} = newBrand
  useEffect(()=>{
    if(brandId !== undefined){
      dispatch(getSingleBrand(brandId))
      

    }else{
      dispatch(resetState())
    }
  },[brandId])

  useEffect(()=>{
    if(isSuccess && createdBrand){
      toast.success('Brand successfully added', {});
    }
    if(updatedBrand && isSuccess){
      toast.success("Brand Updated Successfully")
    }
    if(isError){
      toast.error('Something went wrong', {});
    }
  },[isSuccess,isError,isLoading])


  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      title:singleBrand || "" ,
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if(brandId !== undefined){
        const data = {id:brandId,brandData : values}
        dispatch(updateBrand(data))
      }else{
        dispatch(createBrand(values));
        formik.resetForm();
      }
      
      

      setTimeout(() => {
        dispatch(resetState())
        navigate('/admin/list-brand')
      }, 300);
    },
  });
  return (
    <div>
         <h3 className="mb-4 text-2xl font-semibold">{brandId !== undefined ? "Edit" : "Add"} Brand</h3>
         <div>
            <form action="" onSubmit={formik.handleSubmit}>
                <CustomInput type='text' placeholder='Enter Brand Name '
                 name="title"
                 onCh={formik.handleChange("title")}
                 val={formik.values.title}
                />
                <div className="text-red-500 mt-2 ">
          {formik.touched.title && formik.errors.title}
        </div>
                <button
                className=" border rounded-xl my-5 px-4 py-2 bg-green-400"
                type="submit"
                >
                    {brandId !== undefined ? "Edit" : "Add"} Brand
                </button>
            </form>
         </div>
    </div>
  )
}

export default AddBrand