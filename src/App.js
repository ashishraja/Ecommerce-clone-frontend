import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import WebFont from "webfontloader";
import "./App.css"
import Header from "./components/layout/header/Header.js";
import UserOptions from "./components/layout/header/UserOptions.js";
import Home from "./components/HomePage/Home.js";
import Products from "./components/Product/Products.js";
import Search from "./components/Product/Search.js";
import ProductDetails from "./components/Product/ProductDetails.js";
import LoginSignUp from "./components/User/LoginSignUp";
import Cart from "./components/Cart/Cart.js";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Payment from "./components/Cart/Payment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from "./components/User/Profile";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import About from "./components/layout/About/About.js";
import Contact from "./components/layout/Contact/Contact.js";
import store from "./store.js";
import { loadUser } from "./actions/userAction";

import ProtectedRoute from "./components/Route/ProtectedRoute"
import OrderSuccess from "./components/Cart/OrderSuccess.js";
import MyOrders from "./components/Order/MyOrders.js";
import OrderDetails from "./components/Order/OrderDetails.js";
import Dashboard from "./components/Admin/Dashboard.js";
import ProductList from "./components/Admin/ProductList";
import OrderList from "./components/Admin/OrderList";
import UsersList from "./components/Admin/UsersList";
import ProductReviews from "./components/Admin/ProductReviews";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UpdateUser from "./components/Admin/UpdateUser";
import NotFound from "./components/layout/NotFound/NotFound";
import Loader from "./components/layout/Loading/Loader";
import Footer from "./components/layout/footer/Footer";
import Cookies from 'js-cookie';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [loadingUser, setLoadingUser] = useState(true);

  localStorage.removeItem("shippingInfo");
  useEffect(() => {

    WebFont.load({
      google: {
        families: ["Roboto", "Montserrat"],
      },
    });

    // const token = Cookies.get('userToken');
    // if (token) {
      store.dispatch(loadUser()).then(() => setLoadingUser(false));
    // } else {
      // setLoadingUser(false);
    // }
  }, []);

  if (loadingUser) {
    <Loader />
  }


  return (
    <>
      <Router>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/search" element={<Search />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute element={Dashboard} isAdmin={true} />} />
          <Route path="/admin/orders" element={<ProtectedRoute element={OrderList} isAdmin={true} />} />
          <Route path="/admin/users" element={<ProtectedRoute element={UsersList} isAdmin={true} />} />
          <Route path="/admin/reviews" element={<ProtectedRoute element={ProductReviews} isAdmin={true} />} />
          <Route path="/admin/product/:id" element={<ProtectedRoute element={UpdateProduct} isAdmin={true} />} />
          <Route path="/admin/order/:id" element={<ProtectedRoute element={ProcessOrder} isAdmin={true} />} />
          <Route path="/admin/products" element={<ProtectedRoute element={ProductList} isAdmin={true} />} />
          <Route path="/admin/product" element={<ProtectedRoute element={NewProduct} isAdmin={true} />} />
          <Route path="/admin/user/:id" element={<ProtectedRoute element={UpdateUser} isAdmin={true} />} />
          <Route path="/login/shipping" element={<ProtectedRoute element={Shipping} />} />
          <Route path="/order/confirm" element={<ProtectedRoute element={ConfirmOrder} />} />
          <Route path="/process/payment" element={<ProtectedRoute element={Payment} />} />
          <Route path="/success" element={<ProtectedRoute element={OrderSuccess} />} />
          <Route path="/orders" element={<ProtectedRoute element={MyOrders} />} />
          <Route path="/order/:id" element={<ProtectedRoute element={OrderDetails} isAdmin={false} />} />
          <Route path="/account" element={<ProtectedRoute element={Profile} />} />
          <Route path="/me/update" element={<ProtectedRoute element={UpdateProfile} />} />
          <Route path="/password/update" element={<ProtectedRoute element={UpdatePassword} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      </Router>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;


