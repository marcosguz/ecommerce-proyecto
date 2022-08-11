import React, { useEffect } from "react";
import { Card, Offcanvas, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { buyCart, getCartThunk } from "../store/slices/cart.slice";
import "../styles/cart.css";

const Cart = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cart);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCartThunk());
  }, []);

  const getTotal = () => {
    let total = 0;
    carts.forEach((product) => {
      total += Number(product.price) * product.productsInCart.quantity;
    });
    return total;
  };

  const buy = () => {
    dispatch(buyCart());
    navigate("/purchaces");
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement={"end"}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Your Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Card style={{ border: "none", boxShadow: "none" }}>
          {carts.map((cart) => (
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted">
                <p className="cart-brand">{cart.brand}</p>
              </Card.Subtitle>
              <div className="cart-title-quantity">
				<Card.Link href="#" className="cart-title">
					{cart.title}
				</Card.Link>
				<p className="cart-quantity">Quantity: <span className="quantity">{cart.productsInCart.quantity}</span></p>
			  </div>
              <Card.Text className="text-cart">
                <p className="total">Total:</p>
                <p className="total-price">
                  $ {cart.price * cart.productsInCart.quantity}
                </p>
              </Card.Text>
            </Card.Body>
          ))}
        </Card>
        <div style={{ height: ".1rem", background: "black" }}></div>
        <p className="cart-total">
          Total: <span className="getTotal">${getTotal()}</span>
        </p>
        <Button className="check" onClick={buy}>
          Checkout
        </Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
