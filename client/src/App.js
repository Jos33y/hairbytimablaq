import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Store from './store/home'
import Admin from './admin/auth';

import './App.css';
import ErrorPage from './store/error/error';
import Shop from './store/shop';
import ContactUs from './store/contact';
import ShopCart from './store/cart';
import AboutUs from './store/about';
import TrackOrder from './store/track';
import PageLoading from './store/components/loading';
import ProductDetails from './store/product-details';
import CheckOut from './store/checkout';
import CheckOutPayment from './store/checkout/payment';


const App = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Store />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<ShopCart />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/track" element={<TrackOrder />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/checkout/payment" element={<CheckOutPayment />} />
          <Route path="/product/product-name" element={<ProductDetails />} />
          <Route path="/404" element={<ErrorPage />} />
          <Route path="/loading" element={<PageLoading />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </>
  );
}
export default App; 
 