import React from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import {useDispatch} from 'react-router-dom'

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
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "staus",
  },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    staus: `London, Park Lane no. ${i}`,
  });
}

const DashBoard = () => {

  const dispatch = useDispatch()
  const 
    const data = [
        {
          type: "Jan",
          sales: 38,
        },
        {
          type: "Feb",
          sales: 52,
        },
        {
          type: "Mar",
          sales: 61,
        },
        {
          type: "Apr",
          sales: 145,
        },
        {
          type: "May",
          sales: 48,
        },
        {
          type: "Jun",
          sales: 38,
        },
        {
          type: "July",
          sales: 38,
        },
        {
          type: "Aug",
          sales: 38,
        },
        {
          type: "Sept",
          sales: 38,
        },
        {
          type: "Oct",
          sales: 38,
        },
        {
          type: "Nov",
          sales: 38,
        },
        {
          type: "Dec",
          sales: 38,
        },
      ];
      const config = {
        data,
        xField: "type",
        yField: "sales",
        color: ({ type }) => {
          return "#ffd333";
        },
        label: {
          position: "top",
          style: {
            fill: "#FFFFFF",
            opacity: 1,
          },
        },
        xAxis: {
          label: {
            autoHide: true,
            autoRotate: false,
          },
        },
        meta: {
          type: {
            alias: "Month",
          },
          sales: {
            alias: "Income",
          },
        },
      };
      return (
        <div>
          <h3 className="mb-4 text-2xl font-semibold">Dashboard</h3>
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="flex w-full justify-between items-end bg-white p-3 py-5 md:w-[30vw] rounded-xl">
              <div>
                <p className="text-xl text-gray-400">Total</p>
                <h4 className="text-3xl font-semibold">$1100</h4>
              </div>
              <div className="flex flex-col items-end">
                <h6 className="text-green-400 flex gap-2 items-center">
                  <BsArrowDownRight /> 32%
                </h6>
                <p className="text-gray-400">Compared To April 2022</p>
              </div>
            </div>
            <div className="flex w-full justify-between items-end bg-white p-3 py-5 md:w-[30vw] rounded-xl">
              <div>
                <p className="text-xl text-gray-400">Total</p>
                <h4 className="text-3xl font-semibold">$1100</h4>
              </div>
              <div className="flex flex-col items-end">
                <h6 className="text-green-400 flex gap-2 items-center">
                  <BsArrowDownRight /> 32%
                </h6>
                <p className="text-gray-400">Compared To April 2022</p>
              </div>
            </div>
            <div className="flex w-full justify-between items-end bg-white p-3 py-5 md:w-[30vw] rounded-xl">
              <div>
                <p className="text-xl text-gray-400">Total</p>
                <h4 className="text-3xl font-semibold">$1100</h4>
              </div>
              <div className="flex flex-col items-end">
                <h6 className="text-green-400 flex gap-2 items-center">
                  <BsArrowDownRight /> 32%
                </h6>
                <p className="text-gray-400">Compared To April 2022</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-4 text-2xl font-semibold">Income Statics</h3>
            <div>
              <Column {...config} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-4 text-2xl font-semibold">Recent Orders</h3>
            <div>
              <Table columns={columns} dataSource={data1} />
            </div>
          </div>
        </div>
      );
    
}

export default DashBoard