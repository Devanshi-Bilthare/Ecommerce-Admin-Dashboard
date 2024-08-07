import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getSingleEnquiry, resetState, updateEnquiry } from '../features/enquiry/enquirySlice'
import { BiArrowBack } from 'react-icons/bi'

const ViewEnq = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const enqId = params.id 

    useEffect(()=>{
        dispatch(getSingleEnquiry(enqId))
    },[enqId])

    const enqState = useSelector(state => state.enquiry.singleEnquiry)

    const goBack = ()=>{
        navigate(-1)
    }

    const setEnquiryStatus =(e,id) => {
        const data = {
          id:id,
          enq:e
        }
        dispatch(updateEnquiry(data))
        dispatch(resetState())
        setTimeout(() => {
            dispatch(getSingleEnquiry(enqId))
        }, 100);
      }
  return (
     <div>
        <div className='flex gap-5 items-center justify-between'>
            <h3 className="mb-4 text-2xl font-semibold">View Enquiry</h3>
            <button className='text-xl px-4 py-1 rounded-xl border-2 flex gap-2 items-center' onClick={goBack}><BiArrowBack/> Go Back</button>
        </div>
        <div className='mt-10 bg-white p-4 rounded-3 flex flex-col gap-3'>
            <div className='flex items-center gap-3 '>
                <h5 className='text-xl font-semibold'>Name :</h5>
                <p className='text-xl'>{enqState?.name}</p>
            </div>
            <div className='flex items-center gap-3 '>
                <h5 className='text-xl font-semibold'>Email :</h5>
                <a  href={`mailto:${enqState?.email}`} className='text-xl'>{enqState?.email}</a>
            </div>
            <div className='flex items-center gap-3 '>
                <h5 className='text-xl font-semibold'>Mobile :</h5>
                <a href={`tel:+91${enqState?.mobile}`}  className='text-xl'>{enqState?.mobile}</a>
            </div>
            <div className='flex items-center gap-3 '>
                <h5 className='text-xl font-semibold'>Comment :</h5>
                <p className='text-xl'>{enqState?.comment}</p>
            </div>
            <div className='flex items-center gap-3 '>
                <h5 className='text-xl font-semibold'>Status :</h5>
                <p className='text-xl'>{enqState?.status}</p>
            </div>
            <div className='flex items-center gap-3 '>
                <h5 className='text-xl font-semibold'>Change Status :</h5>
                <div>
                    <select 
                        name="" 
                        defaultValue={enqState ? enqState.status : "Submitted"}
                        className='w-full p-1 text-xl outline-none border px-3  rounded-md' 
                        id=""
                        onChange={(e) => setEnquiryStatus(e.target.value,enqId)}
                    >
                        <option value="Submitted">Submitted</option>
                        <option value="Contacted" >Contacted</option> 
                        <option value="In Progress" >In Progress</option>
                        <option value="Resolved" >Resolved</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ViewEnq