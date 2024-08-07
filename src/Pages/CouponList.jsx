import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCoupon, getCoupons } from '../features/coupon/couponSlice';
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
        title: "Discount",
        dataIndex: "discount",
        sorter: (a, b) => a.discount - b.discount,
      },
      {
        title: "Expiry",
        dataIndex: "expiry",
        sorter: (a, b) => a.name.length - b.name.length,
      },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  
const CouponList = () => {
  const [open, setOpen] = useState(false);
  const [couponId,setCouponId] = useState("")
  const showModal = (id) => {
    setOpen(true);
    setCouponId(id)
  };
  const hideModal = () => {
    setOpen(false);
  };
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getCoupons());
    }, []);
  
    const couponState = useSelector((state) => state.coupon.coupons);
    const data1 = [];
  
    for (let i = 0; i < couponState.length; i++) {
      data1.push({
        key: i + 1,
        name: couponState[i].name,
        discount:couponState[i].discount,
        expiry: new Date(couponState[i].expiry).toLocaleString(),
        action: (
          <div className='text-xl text-red-500 flex gap-2'>
            <Link to={`/admin/coupon/${couponState[i]._id}`}>
              <BiEdit />
            </Link>
            <button onClick={() => showModal(couponState[i]._id)}>
            <AiFillDelete />
          </button>
          </div>
        ),
    
      });
    }

    const delCoupon = (id)=>{
      dispatch(deleteCoupon(id))
      setOpen(false)
      setTimeout(() => {
        dispatch(getCoupons())  
      },100);
    }
    return (
      <div>
          <h3 className="mb-4 text-2xl font-semibold">Coupons</h3>
          <div>
          <Table columns={columns} dataSource={data1} />
          </div>
          <CustomModal hideModal={hideModal} open={open} title="Are you sure you want to delete this Coupon?" performAction={() => delCoupon(couponId) }/>
      </div>
    )
}

export default CouponList