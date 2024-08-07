import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, getBlogs } from '../features/blog/blogSlice';
import CustomModal from '../Component/CustomModal';

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "name",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const Blogs = () => {
  const [open, setOpen] = useState(false);
  const [blogId,setBlogId] = useState("")
  const showModal = (id) => {
    setOpen(true);
    setBlogId(id)
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  const blogState = useSelector((state) => state.blog.blogs);
  const data1 = [];
  if(blogState.allBlogs){
    for (let i = 0; i < blogState.allBlogs.length; i++) {
      data1.push({
        key: i + 1,
        name: blogState.allBlogs[i].title,
        category: blogState.allBlogs[i].category,
  
        action: (
          <div className='text-xl text-red-500 flex gap-2'>
            <Link to={`/admin/blog/${blogState.allBlogs[i]._id}`}>
            <BiEdit />
          </Link>
          <button onClick={() => showModal(blogState.allBlogs[i]._id)}>
            <AiFillDelete />
          </button>
          </div>
        ),
      });
    }
  
  }

  const delBlog = (id)=>{
    dispatch(deleteBlog(id))
    setOpen(false)
    setTimeout(() => {
      dispatch(getBlogs())  
    },100);
  }
  
  return (
    <div>
        <h3 className="mb-4 text-2xl font-semibold">Blogs</h3>
        <div>
        <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal hideModal={hideModal} open={open} title="Are you sure you want to delete this Blog?" performAction={() => delBlog(blogId) }/>
    </div>
  )
}

export default Blogs