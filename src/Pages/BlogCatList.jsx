import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {deleteBlogCategory, getBlogCategory} from "../features/bCategory/bCategorySlice";
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

const BlogCatList = () => {
  const [open, setOpen] = useState(false);
  const [blogCatId,setBlogCatId] = useState("")
  const showModal = (id) => {
    setOpen(true);
    setBlogCatId(id)
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogCategory());
  }, []);
  const bCatState = useSelector((state) => state.bCategory.bCategories);
  const data1 = [];
  for (let i = 0; i < bCatState.length; i++) {
    data1.push({
      key: i + 1,
      name: bCatState[i].title,
      action: (
        <div className='text-xl text-red-500 flex gap-2'>
          <Link to={`/admin/blog-category/${bCatState[i]._id}`}>
            <BiEdit />
          </Link>
          <button onClick={() => showModal(bCatState[i]._id)}>
            <AiFillDelete />
          </button>
        </div>
      ),
    });
  }

  const delBCat = (id)=>{
    dispatch(deleteBlogCategory(id))
    setOpen(false)
    setTimeout(() => {
      dispatch(getBlogCategory())  
    },100);
  }

  return (
    <div>
        <h3 className="mb-4 text-2xl font-semibold">Blog Categories</h3>
        <div>
        <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal hideModal={hideModal} open={open} title="Are you sure you want to delete this Blog Category?" performAction={() => delBCat(blogCatId) }/>
    </div>
  )
}

export default BlogCatList