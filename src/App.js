import React, { useContext, useEffect } from 'react'
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Brands from './components/Brands/Brands';
import Categories from './components/Categories/Categories';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import NotFound from './components/NotFound/NotFound';
import Products from './components/Products/Products';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import  { UserContext } from './Context/userContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from './Context/cartContext';
import  { Toaster } from 'react-hot-toast';
import Profile from './components/Profile/Profile';
import Payment from './components/Payment/Payment';
import Orders from './components/Orders/Orders';
import WishList from './components/WishList/WishList';
import WishListContextProvider from './Context/wishListContext';
import SpecificSubCategory from './components/SpecificSubCategory/SpecificSubCategory';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';

let routers = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index:true, element: <ProtectedRoute> <Home /> </ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute> <Brands /> </ProtectedRoute> },
      { path: '/E-commerce', element: <ProtectedRoute> <Home /> </ProtectedRoute> },
      { path: '', element: <ProtectedRoute> <Home /> </ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute> <Categories /> </ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute> <Cart /> </ProtectedRoute> },
      { path: 'wishlist', element: <ProtectedRoute> <WishList /> </ProtectedRoute> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgetPassword', element: <ForgetPassword /> },
      { path: 'resetPassword', element: <ResetPassword /> },
      { path: 'products', element: <ProtectedRoute> <Products /> </ProtectedRoute> },
      { path: 'productDetails/:id', element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute> },
      { path: 'specificSubCategory/:id', element: <ProtectedRoute> <SpecificSubCategory /> </ProtectedRoute> },
      { path: 'payment', element: <ProtectedRoute> <Payment /> </ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute> <Orders /> </ProtectedRoute> },
      { path: 'profile', element: <ProtectedRoute> <Profile /> </ProtectedRoute> },
      { path: '*', element: <NotFound /> },
    ]
  }
])
export default function App() {
  let { setUserToken } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      setUserToken({ token: localStorage.getItem("userToken") });
    }
  }, []);
  return (
    <div>
      <CartContextProvider>
        <WishListContextProvider>
          <RouterProvider router={routers}></RouterProvider>
          <Toaster />
        </WishListContextProvider>
      </CartContextProvider>
    </div>
  )
}
