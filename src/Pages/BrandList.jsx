import { Modal, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {deleteBrand, getBrands} from '../features/brand/brandSlice'
import CustomModal from '../Component/CustomModal';


const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

 
const BrandList = () => {
  const [open, setOpen] = useState(false);
  const [brandId,setBrandId] = useState("")
  const showModal = (id) => {
    setOpen(true);
    setBrandId(id)
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrands());
  }, []);

  const brandState = useSelector((state) => state.brand.brands);
  const data1 = [];

  for (let i = 0; i < brandState.length; i++) {
    data1.push({
      key: i + 1,
      name: brandState[i].title,
      action: (
        <div className='text-xl text-red-500 flex gap-2'>
          <Link to={`/admin/brand/${brandState[i]._id}`}>
            <BiEdit />
          </Link>
          <button onClick={() => showModal(brandState[i]._id)}>
            <AiFillDelete />
          </button>
        </div>
      ),
  
    });
  }

  const delBrand = (id)=>{
    dispatch(deleteBrand(id))
    setOpen(false)
    setTimeout(() => {
      dispatch(getBrands())  
    },100);
  }
  return (
    <div>
        <h3 className="mb-4 text-2xl font-semibold">Brands</h3>
        <div>
        <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal hideModal={hideModal} open={open} title="Are you sure you want to delete this brand?" performAction={() => delBrand(brandId) }/>
    </div>
  )
}

export default BrandList