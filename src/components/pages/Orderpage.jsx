import React, { useState } from 'react';
import CustomNavbar from '../common/Navbar';
import Sidebar from './Sidebar';
import empty from "../assets/images/empty.png"

const Orderpage = () => {
  const [activeSegment, setActiveSegment] = useState("product");

  return (
    <>
      <CustomNavbar />
      <div className="productpage-alignment">
        <Sidebar activeSegment={activeSegment} setActiveSegment={setActiveSegment} />
        <div className='w-100 p-5 text-center'>
          <img src={empty} alt="" className='img-fluid' width={500} />
        </div>
      </div>
    </>
  )
}

export default Orderpage