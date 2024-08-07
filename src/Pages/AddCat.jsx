import React, { useEffect } from 'react'
import CustomInput from '../Component/CustomInput'
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useFormik } from "formik";
import * as Yup from "yup";
import { createProductCategory ,getSingleProductCategory,resetState, updateProductCategory} from '../features/pcategory/pcategorySlice';

let userSchema = Yup.object().shape({
  title: Yup.string().required("Category Name is required"),
});

const AddCat = () => {
  const dispatch = useDispatch()
  const location = useLocation();
  const navigate = useNavigate()
  const pCatId = location.pathname.split("/")[3];

  const newCategory = useSelector((state) => state.pCategory);
  const {isSuccess,isError,isLoading,createdCategory,singleCategory,updatedProductCategory} = newCategory
  useEffect(()=>{
    if(pCatId !== undefined){
      dispatch(getSingleProductCategory(pCatId))
      

    }else{
      dispatch(resetState())
    }
  },[pCatId])

  useEffect(()=>{
    if(isSuccess && createdCategory){
      toast.success('Category successfully added', {});
    }
    if(updatedProductCategory && isSuccess){
      toast.success("Product Category Updated Successfully")
    }
    if(isError){
      toast.error('Something went wrong', {});
    }
  },[isSuccess,isError,isLoading])


  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      title: singleCategory || "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if(pCatId !== undefined){
        const data ={id:pCatId,catData:values}
        dispatch(updateProductCategory(data))
      }else{
        dispatch(createProductCategory(values));
      formik.resetForm();
      }
      

      setTimeout(() => {
        dispatch(resetState())
        navigate('/admin/list-category')
      }, 300);
    },
  });
  return (
    <div>
         <h3 className="mb-4 text-2xl font-semibold">{pCatId !== undefined ? "Edit" : "Add"} Category</h3>
         <div>
            <form action="" onSubmit={formik.handleSubmit}>
                <CustomInput type='text' placeholder='Enter Category '
                name="title"
                onCh={formik.handleChange("title")}
                val={formik.values.title}/>
                <div className="text-red-500 mt-2 ">
          {formik.touched.title && formik.errors.title}
        </div>
                <button
                className=" border rounded-xl my-5 px-4 py-2 bg-green-400"
                type="submit"
                >
                    {pCatId !== undefined ? "Edit" : "Add"} Category
                </button>
            </form>
         </div>
    </div>
  )
}

export default AddCat