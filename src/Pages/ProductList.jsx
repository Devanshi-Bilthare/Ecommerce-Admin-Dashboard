import { Table } from 'antd'
import React, { useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { getProducts } from '../features/product/productSlice';
import { Link } from 'react-router-dom';
import {BiEdit} from 'react-icons/bi'
import {AiFillDelete} from 'react-icons/ai'
import { deleteProduct } from '../features/product/productSlice';

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ProductList = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getProducts())
  },[])

  const deletedProduct = (id)=>{
    dispatch(deleteProduct(id))
  }

  const productState = useSelector((state)=> state.product.products)
  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    
      data1.push({
        key: i + 1,
        title: productState[i].title,
        brand: productState[i].brand,
        category: productState[i].category,
        // color: productState[i].color,
        price: `${productState[i].price}`,
        action: (
          <div className='text-xl text-red-500 flex gap-2'>
            <Link to="/">
              <BiEdit />
            </Link>
            <Link>
              <AiFillDelete onClick={()=> deletedProduct(productState[i]._id)}/>
            </Link>
          </div>
        ),
    
      });
    
  }
  return (
    <div>
        <h3 className="mb-4 text-2xl font-semibold">Products</h3>
        <div>
        <Table columns={columns} dataSource={data1} />
        </div>
    </div>
  )
}

export default ProductList