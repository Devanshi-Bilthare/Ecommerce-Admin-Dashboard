import { Table } from 'antd'
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import {  getSingleOrder } from "../features/auth/authSlice";
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
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
];

const ViewOrder = () => {
    const params = useParams()
    const orderId = params.id
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleOrder(orderId));
  }, []);
  const orderState = useSelector((state) => state.auth?.singleOrder);
  const data1 = [];
  for (let i = 0; i < orderState?.orderItems?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState?.orderItems[i].product.title,
      amount: orderState?.orderItems[i].product.price,
      brand: orderState?.orderItems[i].product.brand,
      count: orderState?.orderItems[i].product.quantity,
    });
  }

  return (
    <div>
        <h3 className="mb-4 text-2xl font-semibold">ViewOrder</h3>
        <div>
        <Table columns={columns} dataSource={data1} />
        </div>
    </div>
  )
}

export default ViewOrder