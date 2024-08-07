import { Table } from 'antd'
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { getOrderByUser } from "../features/auth/authSlice";
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
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const ViewOrder = () => {
    const params = useParams()
    const userId = params.id
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderByUser(userId));
  }, []);
  const orderState = useSelector((state) => state.auth.orderByUser?.products);
  console.log(orderState)
  const data1 = [];
//   for (let i = 0; i < orderState.length; i++) {
//     data1.push({
//       key: i + 1,
//       name: orderState[i].orderby.firstname,
//       product:<Link to={`/admin/order/${orderState[i].orderby._id}`}>View User ViewOrder</Link>,
//       amount: orderState[i].paymentIntent.amount,
//       date: new Date(orderState[i].createdAt).toLocaleString(),
//       action: (
//         <div className='text-xl text-red-500 flex gap-2'>
//           <Link to="/">
//             <BiEdit />
//           </Link>
//           <Link>
//             <AiFillDelete />
//           </Link>
//         </div>
//       ),
//     });
//   }

  return (
    <div>
        <h3 className="mb-4 text-2xl font-semibold">ViewOrder</h3>
        <div>
        {/* <Table columns={columns} dataSource={data1} /> */}
        </div>
    </div>
  )
}

export default ViewOrder