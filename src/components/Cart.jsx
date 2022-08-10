import React, { useEffect } from "react";
import { Card, Offcanvas, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCartThunk } from "../store/slices/cart.slice";
import '../styles/cart.css'

const Cart = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cart);
  const navigate =
    useNavigate /
    useEffect(() => {
      dispatch(getCartThunk());
    }, []);

  return (
    <Offcanvas show={show} onHide={handleClose} placement={"end"}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Your Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Card style={{ border:'none', boxShadow:'none'}}>
          {
            carts.map((cart) => (
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">
                        <p className="cart-brand">{cart.brand}</p>
                    </Card.Subtitle>
                    <Card.Link href="#" className="cart-title">{cart.title}</Card.Link>
                    <Card.Text className="text-cart">
                        <p className="total">Total:</p>
                        <p className="total-price">$ {cart.price}</p>
                    </Card.Text>
                </Card.Body>
            ))
          }
        </Card>
        <div style={{height:'.1rem', background:'black'}}></div>
        <Button className="check">
            Checkout
        </Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
