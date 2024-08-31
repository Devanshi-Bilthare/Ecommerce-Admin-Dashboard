import React, { useEffect, useState } from "react";
import "react-widgets/styles.css";
import CustomInput from "../Component/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { message, Upload } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getProductCategory } from "../features/pcategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import {Select} from 'antd'
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { RxCross2 } from "react-icons/rx";
import { createProduct,resetState } from "../features/product/productSlice";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

let userSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required"),
  brand: Yup.string().required("Brand is required"),
  category: Yup.string().required("Category is required"),
  tags: Yup.string().required("Tag is required"),
  color: Yup.array().min(1,"Pick atleast one color").required("Color is required"),
  quantity: Yup.number().required("Quantity is required"),
});

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [color, setColor] = useState([]);
  // const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getProductCategory());
    dispatch(getColors());
  }, []);

  const brandState = useSelector((state) => state.brand.brands);
  const categoryState = useSelector((state) => state.pCategory.pCategories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);
  const {isSuccess,isError,isLoading} = newProduct
  const createdProduct = newProduct.createProduct
  useEffect(()=>{
    if(isSuccess && createdProduct){
      console.log('product successfully added')
      toast.success('Product successfully added', {});
    }
    if(isError){
      toast.error('Something went wrong', {});
    }
  },[isSuccess,isError,isLoading])

  const coloropt = [];
  colorState.forEach((i) => {
    coloropt.push({
      label: i.title,
      value: i._id,
    });
  });

  // const img = [];
  // imgState?.forEach((i) => {
  //   img.push({
  //     public_id: i.public_id,
  //     url: i.url,
  //   });
  // });


  useEffect(()=>{
    formik.values.color = color ? color : " ";
    formik.values.images = imgState.url;
  },[color])

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
       tags:"",
      color: [],
      quantity: "",
      images:"",
     
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(createProduct(values));
      formik.resetForm();
      setColor(null);

      setTimeout(() => {
        dispatch(resetState())
        navigate('/admin/list-product')
      }, 3000);
    },
  });

  const handleColors = (e) => {
    setColor(e);
  };


  return (
    <div>
      <h3 className="mb-4 text-2xl font-semibold">Add Product</h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <CustomInput
          type="text"
          placeholder="Enter Product title"
          name="title"
          onCh={formik.handleChange("title")}
          val={formik.values.title}
        />

        <div className="text-red-500 mt-2 ">
          {formik.touched.title && formik.errors.title}
        </div>

        <ReactQuill
          theme="snow"
          className="mt-3"
          name="description"
          onChange={formik.handleChange("description")}
          value={formik.values.description}
        />

        <div className="text-red-500 mt-2 ">
          {formik.touched.description && formik.errors.description}
        </div>

        <CustomInput
          type="number"
          placeholder="Enter Product Price "
          name="price"
          onCh={formik.handleChange("price")}
          val={formik.values.price}
        />

        <div className="text-red-500 mt-2 ">
          {formik.touched.price && formik.errors.price}
        </div>

        <select
          className="w-full py-3 text-xl outline-none border rounded-xl px-5 mt-5 pe-5"
          id=""
          name="brand"
          onChange={formik.handleChange("brand")}
          value={formik.values.brand}
        >
          <option>Select a brand</option>
          {brandState.map((item, j) => {
            return (
              <option key={j} value={item.title}>
                {item.title}
              </option>
            );
          })}
        </select>
        <div className="text-red-500 mt-2 ">
          {formik.touched.brand && formik.errors.brand}
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

        <div className="text-red-500 mt-2 ">
          {formik.touched.category && formik.errors.category}
        </div>

        <select
          className="w-full py-3 text-xl outline-none border rounded-xl px-5 mt-5 pe-5"
          id=""
          name="tags"
          onChange={formik.handleChange("tags")}
          value={formik.values.tags}
        >
          <option disabled>Select a Tag</option>
          <option value="featured">Featured</option>
          <option value="popular">Popular</option>
          <option value="special">Special</option>
          
        </select>

        <div className="text-red-500 mt-2 ">
          {formik.touched.tags && formik.errors.tags}
        </div>

        <Select
            mode="multiple"
            allowClear
            className="w-full"
            placeholder="Select colors"
            defaultValue={color}
            onChange={(i) => handleColors(i)}
            options={coloropt}
          />
        <div className="text-red-500 mt-2 ">
          {formik.touched.color && formik.errors.color}
        </div>

        <CustomInput
          type="number"
          placeholder="Enter Quantity"
          classname="mb-2"
          name="quantity"
          onCh={formik.handleChange("quantity")}
          val={formik.values.quantity}
        />

        <div className="text-red-500 mt-2 ">
          {formik.touched.quantity && formik.errors.quantity}
        </div>

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
                // imgState?.map((i,j)=>{
                //   return <div className="relative">
                //     <img src={i.url} key={j} className="w-[200px] h-[200px] object-cover" alt="" />
                //     <button type="button" onClick={() => dispatch(delImg(i._public_id))} className="absolute text-white text-3xl font-bolder right-2 top-2"><RxCross2 /></button>
                //   </div>
                // })
                <img src={imgState.url} className="w-[200px] h-[200px] object-cover" alt="" />
              }
              
            </div>
        <button
          className=" border rounded-xl my-5 px-4 py-2 bg-green-400"
          type="submit"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
