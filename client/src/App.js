import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Store from './store/home'
import Admin from './admin/auth';

import './App.css';


const App = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Store />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </>
  );
}
export default App; 
 