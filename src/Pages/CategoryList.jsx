import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProductCategory, getProductCategory } from '../features/pcategory/pcategorySlice';
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
const CategoryList = () => {
  const [open, setOpen] = useState(false);
  const [pCatId,setPCatId] = useState("")
  const showModal = (id) => {
    setOpen(true);
    setPCatId(id)
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductCategory());
  }, []);
  const pCatStat = useSelector((state) => state.pCategory.pCategories);
  const data1 = [];
  for (let i = 0; i < pCatStat.length; i++) {
    data1.push({
      key: i + 1,
      name: pCatStat[i].title,
      action: (
        <div className='text-xl text-red-500 flex gap-2'>
          <Link to={`/admin/category/${pCatStat[i]._id}`}>
            <BiEdit />
          </Link>
          <button onClick={()=> showModal(pCatStat[i]._id)}>
            <AiFillDelete />
          </button>
        </div>
      ),
    });
  }

  const delPCat = (id)=>{
    dispatch(deleteProductCategory(id))
    setOpen(false)
    setTimeout(() => {
      dispatch(getProductCategory())  
    },100);
  }

  return (
    <div>
        <h3 className="mb-4 text-2xl font-semibold">Product Categories</h3>
        <div>
        <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal hideModal={hideModal} open={open} title="Are you sure you want to delete this brand?" performAction={() => delPCat(pCatId) }/>
    </div>
  )
}

export default CategoryList