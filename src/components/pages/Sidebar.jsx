import React, { useState } from 'react';
import { AiOutlineProduct } from "react-icons/ai";
import { BsBorderStyle } from "react-icons/bs";
import { TbLogout2 } from "react-icons/tb";
import StickyBox from "react-sticky-box";
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [activeSegment, setActiveSegment] = useState("product");
  

  const sidebardata = [
    {
      Segment: "product",
      title: "Products",
      icon: <AiOutlineProduct />,
      link: "/products"
    },
    {
      Segment: "orders",
      title: "Orders",
      icon: <BsBorderStyle />,
      link: "/orders"
    },
    {
      Segment: "logout",
      title: "Logout",
      icon: <TbLogout2 />,
      link: "/logout"
    }

  ];
  return (
    <>
      <StickyBox className='sidebar-content'>
        {sidebardata.map((data, index) => (
          <ul className='sidebar-list' key={index}>
            <li>
              <Link
                to={data.link}
                aria-label={data.title}
                className={`sidebar-link ${activeSegment === data.Segment ? 'active' : ''}`}
                onClick={() => setActiveSegment(data.Segment)}>
                <span>{data.icon}</span>
                <span>{data.title}</span>
              </Link>
            </li>
          </ul>
        ))}
      </StickyBox>
    </>
  )
}

export default Sidebar