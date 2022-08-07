import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "boxicons";

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand
          href="#/"
          className="navBarTitle"
        >
          Ecommerce App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navBarIcons">
            <Nav.Link href="#login">
              <i className="bx bx-user" id="user-icon"></i>
            </Nav.Link>
            <Nav.Link href="#purchaces">
              <i className="bx bx-heart" id="heart-icon"></i>
            </Nav.Link>
            <Nav.Link href="#cart">
              <i className="bx bx-cart" id="cart-icon"></i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
