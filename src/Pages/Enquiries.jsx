import { Table } from 'antd'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEnquiry,
  getEnquiries,
  updateEnquiry
} from "../features/enquiry/enquirySlice";
import { FaEye } from "react-icons/fa";
// import { BiArrowBack, BiEdit } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import CustomModal from '../Component/CustomModal';

const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Comment",
      dataIndex: "comment",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

const Enquiries = () => {
  const [open, setOpen] = useState(false);
  const [enquiryId,setEnquiryId] = useState("")
  const showModal = (id) => {
    setOpen(true);
    setEnquiryId(id)
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEnquiries());
  }, []);

  const enqState = useSelector((state) => state.enquiry.enquiries);

  const data1 = [];
  for (let i = 0; i < enqState.length; i++) {
    data1.push({
      key: i + 1,
      name: enqState[i].name,
      email: enqState[i].email,
      comment: enqState[i].comment,
      mobile: enqState[i].mobile,
      status:(
        <>
            <select
             name="" 
             defaultValue={enqState[i].status ? enqState[i].status : "Submitted"} 
             className='w-full p-1 text-xl outline-none border px-3  rounded-md' 
             id=""
              onChange={(e) => setEnquiryStatus(e.target.value,enqState[i]._id)}
             >
                <option value="Submitted">Submitted</option>
                <option value="Contacted" >Contacted</option> 
                <option value="In Progress" >In Progress</option>
                <option value="Resolved" >Resolved</option>
            </select>
        </>
      ),
      action: (
        <div className='text-xl text-red-500 flex gap-2'>
          <Link to={`/admin/enquiries/${enqState[i]._id}`}>
          <FaEye />
          </Link>
          <button onClick={() => showModal(enqState[i]._id)}>
            <AiFillDelete />
          </button>
        </div>
      ),
    });
  }

  const setEnquiryStatus =(e,id) => {
    const data = {
      id:id,
      enq:e
    }
    dispatch(updateEnquiry(data))
  }

  const delEnquiry = (id)=>{
    dispatch(deleteEnquiry(id))
    setOpen(false)
    setTimeout(() => {
      dispatch(getEnquiries())  
    },100);
  }
  return (
    <div>
        <h3 className="mb-4 text-2xl font-semibold">Enquiries</h3>
        <div>
        <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal hideModal={hideModal} open={open} title="Are you sure you want to delete this Enquiry?" performAction={() => delEnquiry(enquiryId) }/>

    </div>
  )
}

export default Enquiries