import React from 'react';
import "../assets/styles/Navbar.css";
import logo from "../assets/images/logo.png";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { MdOutlineNotificationsActive } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";

const CustomNavbar = () => {
  return (
    <Navbar expand="lg" className='main-navbar'>
      <Container fluid className="navbar-alignment">
        <Navbar.Brand href="#">
          <img src={logo} alt="main-logo" className="img-fluid" width={150} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href="#" aria-label="Notifications" className="navlink">
              <MdOutlineNotificationsActive />
            </Nav.Link>
            <Nav.Link href="#" aria-label="Contact" className="navlink">
              <FaCircleUser />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
