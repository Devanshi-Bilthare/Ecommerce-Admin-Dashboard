import React, { useEffect } from 'react'
import CustomInput from '../Component/CustomInput'
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useFormik } from "formik";
import * as Yup from "yup";
import { createBlogCategory, getSingleBlogCategory, resetState, updateBlogCategory } from '../features/bCategory/bCategorySlice';

let userSchema = Yup.object().shape({
  title: Yup.string().required("Category Name is required"),
});

const AddBlogCat = () => {
  const dispatch = useDispatch()
  const location = useLocation();
  const bCatId = location.pathname.split("/")[3];
  const navigate = useNavigate()
  const newBlogCategory = useSelector((state) => state.bCategory);
  const {isSuccess,isError,isLoading,createdBlogCategory,singleBlogCategory,updatedBlogCategory} = newBlogCategory

  useEffect(()=>{
    if(bCatId !== undefined){
      dispatch(getSingleBlogCategory(bCatId))
    }else{
      dispatch(resetState())
    }
  },[bCatId])

  useEffect(()=>{
    if(isSuccess && createdBlogCategory){
      toast.success('BlogCategory successfully added', {});
    }
    if(updatedBlogCategory && isSuccess){
      toast.success("Blog Category Updated Successfully")
    }
    if(isError){
      toast.error('Something went wrong', {});
    }
  },[isSuccess,isError,isLoading])


  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      title: singleBlogCategory || "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
     if(bCatId !== undefined){
      const data = {id:bCatId,bCatData:values}
      dispatch(updateBlogCategory(data))
     }else{
      dispatch(createBlogCategory(values));
      formik.resetForm();
     }
      setTimeout(() => {
        dispatch(resetState())
        navigate('/admin/blog-category-list')
      }, 3000);
    },
  });
  return (
    <div>
         <h3 className="mb-4 text-2xl font-semibold">{bCatId !== undefined ? "Edit" : "Add"} Blog Category</h3>
         <div>
            <form action="" onSubmit={formik.handleSubmit}>
                <CustomInput type='text' placeholder='Enter Blog Catgeory'
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
                    {bCatId !== undefined ? "Edit" : "Add"} Blog Category
                </button>
            </form>
         </div>
    </div>
  )
}

export default AddBlogCat