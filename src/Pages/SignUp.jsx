import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useFormik} from 'formik'
import * as Yup from 'yup';
import {useDispatch,useSelector} from 'react-redux'
import { registerUser } from '../features/auth/authSlice';
import CustomInput from '../Component/CustomInput';

let userSchema = Yup.object().shape({
  firstname: Yup.string().required("First Name is required"),
  lastname: Yup.string().required("Last Name is required"),
  mobile: Yup.number().required("Mobile Name is required"),
  email: Yup.string().email("Email should be valid").required("Email is required"),
  password: Yup.string().required("Password is required"),
});


const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      firstname:'',
      lastname:'',
      mobile:'',
      email: '',
      password:''
    },
    validationSchema:userSchema,
    onSubmit: values => {
        const userData = {
            ...values,
            role: 'admin'
          };
      dispatch(registerUser(userData))
      alert(JSON.stringify(userData, null, 2));
    },
  });
  const {user,isLoading,isError,isSuccess,message} = useSelector((state)=> state.auth)
  useEffect(() => {
    if(isSuccess){
      navigate('/')
    }else{
      navigate("")
    }
  },[user,isLoading,isError,isSuccess])
  return (
    <>
        <div className='w-full py-20 px-[5%] flex justify-center items-center bg-[#F5F5F7]'>
            <form action="" onSubmit={formik.handleSubmit} className='w-full md:w-[40vw] p-5 bg-white rounded-xl'>
                <h2 className='text-3xl font-semibold text-center'>Create Account</h2>
                <CustomInput type="text" placeholder='First Name' name="firstname" 
                  onCh={formik.handleChange("firstname")}
                  val={formik.values.firstname}   />
                  <div className='text-red-400 ms-2 mt-2 text-sm'>
                  {formik.touched.firstname && formik.errors.firstname ? (
                    <div>{formik.errors.firstname}</div>
                  ) : null}
                </div>
                <CustomInput type="text" placeholder='Last Name' name="lastname" 
                  onCh={formik.handleChange("lastname")}
                  val={formik.values.lastname}   />
                  <div className='text-red-400 ms-2 mt-2 text-sm'>
                  {formik.touched.lastname && formik.errors.lastname ? (
                    <div>{formik.errors.lastname}</div>
                  ) : null}
                </div>
                <CustomInput type="email" placeholder='Email' name="email" 
                  onCh={formik.handleChange("email")}
                  val={formik.values.email}  />
                  <div className='text-red-400 ms-2 mt-2 text-sm'>
                  {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                  ) : null}
                </div>
                   <CustomInput type="number" placeholder='Mobile' name="mobile" 
                  onCh={formik.handleChange("mobile")}
                  val={formik.values.mobile}  />
                  <div className='text-red-400 ms-2 mt-2 text-sm'>
                  {formik.touched.mobile && formik.errors.mobile ? (
                    <div>{formik.errors.mobile}</div>
                  ) : null}
                </div>
                <CustomInput type="password" placeholder='Password' name="password" 
                  onCh={formik.handleChange("password")}
                  val={formik.values.password}  />
                  <div className='text-red-400 ms-2 mt-2 text-sm'>
                  {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                  ) : null}
                </div>
                <div className='flex gap-2 justify-center my-5'>
                    <button type='submit' className='uppercase bg-[#232F3E] hover:bg-amber-500 text-white px-7 py-3 rounded-[30px]'>Create</button>
                </div>
            </form>
        </div>
    </>
  )
}

export default Signup