import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashBoard from './Pages/DashBoard'
import Login from './Pages/Login'
import ResetPassword from './Pages/ResetPassword'
import ForgetPassword from './Pages/ForgetPassword'
import MainLayOut from './Component/MainLayOut'
import Enquiries from './Pages/Enquiries'
import Blogs from './Pages/Blogs'
import BlogCatList from './Pages/BlogCatList'
import Orders from './Pages/Orders'
import Customers from './Pages/Customers'
import ColorList from './Pages/ColorList'
import CategoryList from './Pages/CategoryList'
import BrandList from './Pages/BrandList'
import ProductList from './Pages/ProductList'
import AddBlog from './Pages/AddBlog'
import AddBlogCat from './Pages/AddBlogCat'
import AddColor from './Pages/AddColor'
import AddCat from './Pages/AddCat'
import AddBrand from './Pages/AddBrand'
import AddProduct from './Pages/AddProduct'
import AddCoupon from './Pages/AddCoupon'
import CouponList from './Pages/CouponList'
import ViewEnq from './Pages/ViewEnq'
import ViewOrder from './Pages/ViewOrder'
import Signup from './Pages/SignUp'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/reset-password' element={<ResetPassword/>} />
        <Route path='/forgot-password' element={<ForgetPassword/>}/>
        <Route path='/admin' element={<MainLayOut/>}>
          <Route index element={<DashBoard/>}/>
          <Route path='enquiries' element={<Enquiries/>}/>
          <Route path='enquiries/:id' element={<ViewEnq/>}/>
          <Route path='blog-list' element={<Blogs/>}/>
          <Route path='blog' element={<AddBlog/>}/>
          <Route path='blog/:id' element={<AddBlog/>}/>
          <Route path='blog-category-list' element={<BlogCatList/>}/>
          <Route path='blog-category' element={<AddBlogCat/>}/>
          <Route path='blog-category/:id' element={<AddBlogCat/>}/>
          <Route path='orders' element={<Orders/>}/>
          <Route path='order/:id' element={<ViewOrder/>}/>
          <Route path='customers' element={<Customers/>}/>
          <Route path='list-color' element={<ColorList/>}/>
          <Route path='color' element={<AddColor/>}/>
          <Route path='color/:id' element={<AddColor/>}/>
          <Route path='list-category' element={<CategoryList/>}/>
          <Route path='category' element={<AddCat/>}/>
          <Route path='category/:id' element={<AddCat/>}/>
          <Route path='list-brand' element={<BrandList/>}/>
          <Route path='brand' element={<AddBrand/>}/>
          <Route path='brand/:id' element={<AddBrand/>}/>
          <Route path='list-product' element={<ProductList/>}/>
          <Route path='product' element={<AddProduct/>}/>
          <Route path='coupon' element={<AddCoupon/>}/>
          <Route path='coupon/:id' element={<AddCoupon/>}/>
          <Route path='coupon-list' element={<CouponList/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App