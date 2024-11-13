import React, { useState } from 'react';
import "../assets/styles/Productpage.css";
import CustomNavbar from '../common/Navbar';
import Sidebar from './Sidebar';
import Productview from './Productview';
import Createproduct from './Createproduct';

const Productpage = () => {
  const [activeSegment, setActiveSegment] = useState("product");

  return (
    <>
      <section>
        <CustomNavbar></CustomNavbar>
        <div className='productpage-alignment'>
          <Sidebar activeSegment={activeSegment} setActiveSegment={setActiveSegment} />
          <div className='w-100 p-5'>
            {activeSegment === "product" && <Productview />}
            {activeSegment === "product/create" && <Createproduct />}
          </div>
        </div>
      </section>
    </>
  );
}

export default Productpage;
