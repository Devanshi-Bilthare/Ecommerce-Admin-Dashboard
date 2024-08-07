import React, { useEffect } from 'react'
import CustomInput from '../Component/CustomInput'
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useFormik } from "formik";
import * as Yup from "yup";
import { createColor,getSingleColor,resetState, updateColor } from '../features/color/colorSlice';
import { updateBrand } from '../features/brand/brandSlice';


let userSchema = Yup.object().shape({
  title: Yup.string().required("Color Name name is required"),
});


const AddColor = () => {
  const dispatch = useDispatch()
  const location = useLocation();
  const navigate = useNavigate()
  const colorId = location.pathname.split("/")[3];
  const newColor = useSelector((state) => state.color);
  const {isSuccess,isError,isLoading,createdColor,singleColor,updatedColor} = newColor
  useEffect(()=>{
    if(colorId !== undefined){
      dispatch(getSingleColor(colorId))
      

    }else{
      dispatch(resetState())
    }
  },[colorId])
  useEffect(()=>{
    if(isSuccess && createdColor){
      toast.success('Color successfully added', {});
    }
    if(updatedColor && isSuccess){
      toast.success("Color Updated Successfully")
    }
    if(isError){
      toast.error('Something went wrong', {});
    }
  },[isSuccess,isError,isLoading])


  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      title: singleColor || "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if(colorId !== undefined){
        const data = {id:colorId,colorData:values}
        dispatch(updateColor(data))
      }else{
        dispatch(createColor(values));
      formik.resetForm();
      }
      setTimeout(() => {
        dispatch(resetState())
        navigate('/admin/list-color')
      }, 300);
    },
  });
  return (
    <div>
         <h3 className="mb-4 text-2xl font-semibold">{colorId !== undefined ? "Edit" : "Add"} Color</h3>
         <div>
            <form action="" onSubmit={formik.handleSubmit}>
                <CustomInput type='color' placeholder="Enter Product Color"
                 name="title" 
                 onCh={formik.handleChange("title")}
                 val={formik.values.title}
                 classname="h-16"
                />
                 <div className="text-red-500 mt-2 ">
          {formik.touched.title && formik.errors.title}
        </div>
                <button
                className=" border rounded-xl my-5 px-4 py-2 bg-green-400"
                type="submit"
                >
                    {colorId !== undefined ? "Edit" : "Add"}Color
                </button>
            </form>
         </div>
    </div>
  )
}

export default AddColor