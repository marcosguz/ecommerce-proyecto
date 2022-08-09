import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "boxicons";
import { useNavigate } from "react-router-dom";


const NavBar = () => {

  const navigate = useNavigate()

    const logOut = () => {
      localStorage.setItem('token', '')
      navigate('/login')
    }

    const token = localStorage.getItem('token')

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand
          href="/#/"
          className="navBarTitle"
        >
          Ecommerce
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="navBarIcons">
            <Nav.Link href="/#/purchaces">
              <i className="bx bx-heart" id="heart-icon"></i>
            </Nav.Link>
            <Nav.Link href="/#/cart">
              <i className="bx bx-cart" id="cart-icon"></i>
            </Nav.Link>
            {
              token ? (
					<Nav.Link onClick={logOut}>
            <i className="bx bx-user" id="user-icon"></i>
          </Nav.Link>
				) : (
					<Nav.Link href="/#/login">
            <i class='bx bxs-user-x'></i>
					</Nav.Link>
				) 
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
