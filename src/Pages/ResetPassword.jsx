import React from 'react'
import CustomInput from '../Component/CustomInput'

const ResetPassword = () => {
  return (
    <>
        <div className='w-full min-h-[100vh] py-20 px-[5%] flex justify-center items-center bg-[#F5F5F7]'>
            <form action="" className='w-full md:w-[40vw] p-5 bg-white rounded-xl'>
                <h2 className='text-3xl font-semibold text-center'>Reset your Password</h2>
                <CustomInput type="password" placeholder='Password'  />
                <CustomInput type="password" placeholder='Confirm Password' />
                  <div className='flex flex-col items-center justify-center mt-5'>
                    <button className='uppercase bg-[#232F3E] hover:bg-amber-500 text-white px-7 py-3 rounded-[30px]'>Reset Password</button> <br />
                  </div>
            </form>
        </div>
    </>
  )
}

export default ResetPassword