import React, { useState } from "react";
import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap";
import "boxicons";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import Cart from "./Cart";

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
		if (token) {
			setShow(true);
		} else {
			navigate('/login')
		}
	}

  const logOut = () => {
    localStorage.setItem("token", "");
    navigate("/login");
  };

  

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/#/" className="navBarTitle">
            Ecommerce
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="navBarIcons navbar__menu">
              <Nav.Link href="/#/purchaces">
                <i className="bx bx-heart" id="heart-icon"></i>
              </Nav.Link>
              {token ? (
                <Nav.Link onClick={logOut}>
                  <i className="bx bx-user" id="user-icon"></i>
                </Nav.Link>
              ) : (
                <Nav.Link href="/#/login">
                  <i className="bx bxs-user-x"></i>
                </Nav.Link>
              )}
              <Nav.Link onClick={handleShow}>
                <i className="bx bx-cart" id="cart-icon"></i>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Cart show={show} handleClose = {handleClose}/>
    </>
  );
};

export default NavBar;
