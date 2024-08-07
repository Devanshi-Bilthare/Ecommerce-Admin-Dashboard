import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,Button} from "@nextui-org/react";
import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { AiOutlineBgColors, AiOutlineDashboard, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { SiBrandfolder } from 'react-icons/si';
import { BiCategoryAlt } from 'react-icons/bi';
import { FaBloggerB, FaClipboardList } from 'react-icons/fa';
import { RiCouponLine } from 'react-icons/ri';
import { ImBlog } from 'react-icons/im';
import { IoIosNotifications } from 'react-icons/io';
const { Header, Sider, Content } = Layout;



const MainLayOut = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const items = [
    {
      key: "view",
      label: "Veiw Profile",
    },
    {
      key: "changepassword",
      label: "Change Password",
    },
    {
      key: "signout",
      label: "Sign Ouit",
    },
  ];

  const navigate = useNavigate()
  return (
    <Layout className='min-h-[100vh] '>
      <Sider trigger={null} collapsible collapsed={collapsed} className={`${collapsed ? 'hidden md:block' : 'block'}`}>
        <h2 className='text-white w-full py-5 text-xl flex justify-center items-center logo'>
          <span className='lg-logo'>Digitic</span>
        <span className='sm-logo'>DC</span>
        </h2>
        
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({ key }) => {
            if (key == "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: '',
              icon: <AiOutlineDashboard />,
              label: 'DashBoard',
            },
            {
              key: 'customers',
              icon: <AiOutlineUser />,
              label: 'Customers',
            },
            {
              key: 'catalog',
              icon: <AiOutlineDashboard />,
              label: 'Catalog',
              children:[
                {
                  key: 'product',
                  icon: <AiOutlineShoppingCart />,
                  label: 'Add Product',
                },
                {
                  key: "list-product",
                  icon: <AiOutlineShoppingCart className="text-xl" />,
                  label: 'Product List',
                },
                {
                  key: "brand",
                  icon: <SiBrandfolder  />,
                  label: "Brand",
                },
                {
                  key: "list-brand",
                  icon: <SiBrandfolder  />,
                  label: "Brand List ",
                },
                {
                  key: "category",
                  icon: <BiCategoryAlt  />,
                  label: "Category",
                },
                {
                  key: "list-category",
                  icon: <BiCategoryAlt  />,
                  label: "Category List",
                },
                {
                  key: "color",
                  icon: <AiOutlineBgColors  />,
                  label: "Color",
                },
                {
                  key: "list-color",
                  icon: <AiOutlineBgColors  />,
                  label: "Color List",
                },
              ],
              
            },

            {
              key: "orders",
              icon: <FaClipboardList />,
              label: "Orders",
            },
            {
              key: "marketing",
              icon: <RiCouponLine />,
              label: "Marketing",
              children: [
                {
                  key: "coupon",
                  icon: <ImBlog />,
                  label: "Add Coupon",
                },
                {
                  key: "coupon-list",
                  icon: <RiCouponLine />,
                  label: "Coupon List",
                },
              ],
            },
            {
              key: "blogs",
              icon: <FaBloggerB />,
              label: "Blogs",
              children: [
                {
                  key: "blog",
                  icon: <ImBlog />,
                  label: "Add Blog",
                },
                {
                  key: "blog-list",
                  icon: <FaBloggerB />,
                  label: "Blog List",
                },
                {
                  key: "blog-category",
                  icon: <ImBlog />,
                  label: "Add Blog Category",
                },
                {
                  key: "blog-category-list",
                  icon: <FaBloggerB />,
                  label: "Blog Category List",
                },
              ],
            },
            {
              key: "enquiries",
              icon: <FaClipboardList />,
              label: "Enquiries",
            },

          ]}
        />
      </Sider>
      <Layout>
      <Header
          className="flex justify-between px-5"
          style={{
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed) ,
            }
          )}
          <div className="flex gap-4 items-center">
            <div className="relative">
              <IoIosNotifications className="text-2xl" />
              <span className="-right-3 -top-3 bg-red-400 h-6 w-6 rounded-full flex items-center justify-center absolute">
                3
              </span>
            </div>

            <div className="flex items-center gap-2">
                <img
                  className='h-10'
                  src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg"
                  alt=""
                />
              <div>
              <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="bordered" 
        >
          devanshi@gmail.com
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" className="bg-white rounded-xl" items={items}>
        {(item) => (
          <DropdownItem
            className="hover:bg-gray-100 rounded-xl"
            key={item.key}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>

              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            borderRadius: borderRadiusLG,
          }}
        > 
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="light"
        />
        <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayOut;