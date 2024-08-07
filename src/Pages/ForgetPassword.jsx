import React from 'react'
import { Link } from 'react-router-dom'
import CustomInput from '../Component/CustomInput'

const ForgetPassword = () => {
  return (
    <>
      <div className='w-full min-h-[100vh] py-20 px-[5%] flex justify-center items-center bg-[#F5F5F7]'>
            <form action="" className='w-dull md:w-[40vw] p-5 bg-white rounded-xl'>
                <h2 className='text-3xl font-semibold text-center'>Reset your Password</h2>
                <p className='text-center text-gray-400 mt-5 text-xl'>We will send you an email to reset your password</p>
                <CustomInput type="email" placeholder='Email' />
                  <div className='flex flex-col items-center justify-center mt-5'>
                    <button className='uppercase bg-[#232F3E] hover:bg-amber-500 text-white px-7 py-3 rounded-[30px]'>Submit</button> <br />
                    <Link to='/login' className='text-xl'>Cancel</Link>
                  </div>
            </form>
        </div>
    </>
  )
}

export default ForgetPassword