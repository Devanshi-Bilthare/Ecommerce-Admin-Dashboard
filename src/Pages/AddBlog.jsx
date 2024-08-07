import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomInput from '../Component/CustomInput';
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from "react-router-dom";
import { getBlogCategory } from "../features/bCategory/bCategorySlice";
import { createBlog,getSingleBlog,resetState, updateBlog } from "../features/blog/blogSlice";
import { RxCross2 } from "react-icons/rx";
import { useLocale } from "antd/es/locale";

let userSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
});

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const location = useLocation()
  const blogId = location.pathname.split("/")[3];
  useEffect(()=>{
    if(blogId !== undefined){
      dispatch(getSingleBlog(blogId))
      img.push(singleBlog?.images)

    }else{
      dispatch(resetState())
    }
  },[blogId])

  useEffect(() => {
    dispatch(resetState())
    dispatch(getBlogCategory());
  }, []);

  const [images, setImages] = useState([]);
  const categoryState = useSelector((state) => state.bCategory.bCategories);
  const imgState = useSelector((state) => state.upload.images.images);
  const newBlog = useSelector((state) => state.blog);
  const {isSuccess,isError,isLoading,createdBlog,updatedBlog,singleBlog} = newBlog
  useEffect(()=>{
    if(isSuccess && createdBlog){
      console.log('Blog successfully added')
      toast.success('Blog successfully added', {});
    }
    if(updatedBlog && isSuccess){
      toast.success("Blog Updated Successfully")
    }
    if(isError){
      toast.error('Something went wrong', {});
    }
  },[isSuccess,isError,isLoading])

  const img = [];
  imgState?.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });


  useEffect(()=>{
    formik.values.images = img;
  },[singleBlog?.images])

  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      title:singleBlog?.title || "",
      description:singleBlog?.description || "",
      category:singleBlog?.category || "",
      images:""
     
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if(blogId !== undefined){
        const data = {id:blogId,blogData : values}
        dispatch(updateBlog(data))
      }else{
        dispatch(createBlog(values));
      formik.resetForm();
      }
      
      setTimeout(() => {
        dispatch(resetState())
        navigate('/admin/blog-list')
      }, 3000);
    },
  });
  return (
    <div>
        <h3 className="mb-4 text-2xl font-semibold">{blogId !== undefined ? "Edit" : "Add"} Blog</h3>
        <div className="">
        <form action="" onSubmit={formik.handleSubmit} >
        <div className='mt-5'>
        </div>
          <div className="mt-4">
            <CustomInput
              type="text"
              placeholder="Enter Blog Title"
              name="title"
              onCh={formik.handleChange("title")}
              val={formik.values.title}
            />
          </div>
          <select
          className="w-full py-3 text-xl outline-none border rounded-xl px-5 mt-5 pe-5"
          id=""
          name="category"
          onChange={formik.handleChange("category")}
          value={formik.values.category}
        >
          <option>Select a Category</option>
          {categoryState.map((item, j) => {
            return (
              <option key={j} value={item.title}>
                {item.title}
              </option>
            );
          })}
        </select>
          <ReactQuill
            theme="snow"
            className="mt-3"
            name="description"
            onChange={formik.handleChange("description")}
            value={formik.values.description}
          />
           <div className="bg-white border py-10 text-center">
          <Dropzone onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        <div className="flex gap-2 mt-5">
              {
                imgState?.map((i,j)=>{
                  return <div className="relative">
                    <img src={i.url} key={j} className="w-[200px] h-[200px] object-cover" alt="" />
                    <button type="button" onClick={() => dispatch(delImg(i._public_id))} className="absolute text-white text-3xl font-bolder right-2 top-2"><RxCross2 /></button>
                  </div>
                })
              }
              
            </div>
          <button
            className=" border rounded-xl my-5 px-4 py-2 bg-green-400"
            type="submit"
          >
            {blogId !== undefined ? "Edit" : "Add"}  Blog
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddBlog