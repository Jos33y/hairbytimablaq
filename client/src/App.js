import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Store from './store/home'
import AdminLogin from './admin/auth';
import AdminRegister from './admin/auth/register';
import AdminDashboard from './admin/dashboard';
import PrivateRoute from './components/private-route';

import './App.css';
import ErrorPage from './store/error/error';
import Shop from './store/shop';
import ContactUs from './store/contact';
import ShopCart from './store/cart';
import AboutUs from './store/about';
import TrackOrder from './store/track';
import ProductDetails from './store/product-details';
import CheckOut from './store/checkout';
import CheckOutShipping from './store/checkout/shipping';
import CheckOutPayment from './store/checkout/payment';
import OrderConfirmation from './store/checkout/order-confirmation';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './store/components/cart-context';


const App = () => {

  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route path="/" element={<Store />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<ShopCart />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/track" element={<TrackOrder />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/checkout/shipping" element={<CheckOutShipping />} />
            <Route path="/checkout/payment" element={<CheckOutPayment />} />
            <Route path="/checkout/confirmation" element={<OrderConfirmation />} /> 
            <Route path="/shop/product/:prod_id" element={<ProductDetails />} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />

            <Route path="/admin/dashboard/:dash_url" element={<PrivateRoute />}>
              <Route path="/admin/dashboard/:dash_url" element={<AdminDashboard />} />
            </Route>
            <Route path="/admin/dashboard/product/:product_url" element={<PrivateRoute />}>
              <Route path="/admin/dashboard/product/:product_url" element={<AdminDashboard />} />
            </Route>
            <Route path="/admin/dashboard/settings/:settings_url" element={<PrivateRoute />}>
              <Route path="/admin/dashboard/settings/:settings_url" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
      <ToastContainer />
    </>
  );
}
export default App;
