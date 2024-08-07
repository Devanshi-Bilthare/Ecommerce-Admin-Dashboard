import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { deleteColor, getColors } from "../features/color/colorSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
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
    title: "Action",
    dataIndex: "action",
  },
];

const ColorList = () => {
  const [open, setOpen] = useState(false);
  const [colorId,setColorId] = useState("")
  const showModal = (id) => {
    setOpen(true);
    setColorId(id)
  };
  const hideModal = () => {
    setOpen(false);
  };
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getColors());
  }, []);

  const colorState = useSelector((state) => state.color.colors);
  const data1 = [];

  for (let i = 0; i < colorState.length; i++) {
    data1.push({
      key: i + 1,
      name: colorState[i].title,
      action: (
        <div className='text-xl text-red-500 flex gap-2'>
          <Link to={`/admin/color/${colorState[i]._id}`}>
            <BiEdit />
          </Link>
          <button onClick={() => showModal(colorState[i]._id)}>
            <AiFillDelete />
          </button>
        </div>
      ),
  
    });
  }

  const delColor = (id)=>{
    dispatch(deleteColor(id))
    setOpen(false)
    setTimeout(() => {
      dispatch(getColors())  
    },100);
  }
  return (
    <div>
        <h3 className="mb-4 text-2xl font-semibold">Colors</h3>
        <div>
        <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal hideModal={hideModal} open={open} title="Are you sure you want to delete this Color?" performAction={() => delColor(colorId) }/>
    </div>
  )
}

export default ColorList