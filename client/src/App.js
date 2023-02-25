import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Store from './store/home'
import Admin from './admin/auth';

import './App.css';
import ErrorPage from './store/error/error';


const App = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Store />} />
          <Route path="/404" element={<ErrorPage />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </>
  );
}
export default App; 
 