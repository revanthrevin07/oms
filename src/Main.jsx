import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Loginpage from './components/pages/Loginpage';
import Productpage from './components/pages/Productpage';
import Createproduct from './components/pages/Createproduct';
import Updateproduct from './components/pages/Updateproduct';
import Editpage from './components/pages/Editpage';
import Orderpage from './components/pages/Orderpage';

const Main = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/products" element={<Productpage />} />
        <Route path="/products/create" element={<Createproduct />} />
        <Route path="/products/update" element={<Updateproduct />} />
        <Route path="/products/update/edit" element={<Editpage />} />
        <Route path="/orders" element={<Orderpage />} />
      </Routes>
    </Router>
  );
};

export default Main;
