import React, { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { purchasesThunk } from "../store/slices/purchases.slice";
import { format } from "date-fns";
import '../styles/purchases.css'

const Purchases = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const purchases = useSelector((state) => state.pruchases);

  useEffect(() => {
    dispatch(purchasesThunk());
  }, []);

  return (
      <Row xs={1} md={1} xl={1} className="mb-3 g-4">
        <div className="title">
          <span className="home">Home</span>
          <div className="home-point"></div>
          <span className="purchases-title">Purchases</span>
        </div>
        <h3 className="my-purchases">My Purchases</h3>
        {purchases.map((purchase) => (
          <Col key={purchases.id}>
            <Card className="card-purchaces">
              <Card.Header as="h5">
                {format(new Date(purchase.createdAt), "MMMM dd', 'yyyy")}
              </Card.Header>

              {purchase.cart.products.map((cartProduct) => (
                <Card.Body className="purchases">
                  <ul className="purchase-products-list">
                    <li className="product-item" onClick={() => navigate(`/products/${purchase.id}`)}>
                      <p className="name">{cartProduct.title}</p>
                      <div className="purchases-quantity">
                        <div className="card-purchases">
                            <span className="purchases-quantity-title">Quantity:</span> 
                            <div className="purchases-quantity-number">{cartProduct.productsInCart.quantity}</div>
                        </div>
                        <div className="purchases-price">
                            <span className="purchases-price__title">Total:</span>
                            <span className="purchases-price__total">${cartProduct.price}</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </Card.Body>
              ))}
            </Card>
          </Col>
        ))}
      </Row>
  );
};

export default Purchases;
