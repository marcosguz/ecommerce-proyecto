import React, { useEffect, useState } from "react";
import "../App.css";
import {
  filterTitleThunk,
  getProductsThunk,
  filterCategoryThunk,
} from "../store/slices/products.slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Row,
  Card,
  Col,
  InputGroup,
  Form,
  Button,
  ListGroup,
} from "react-bootstrap";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const [categories, setCategories] = useState([]);
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductsThunk());

    axios
      .get(
        "https://ecommerce-api-react.herokuapp.com/api/v1/products/categories"
      )
      .then((response) => setCategories(response.data.data.categories));
  }, []);
  console.log(products);
  return (
    <Row>
      <Col lg={3} md={3} className="mb-3">
        <ListGroup>
          {categories.map((categorie) => (
            <ListGroup.Item
              hover
              key={categorie.id}
              onClick={() => dispatch(filterCategoryThunk(categorie.id))}
              style={{ cursor: "pointer" }}
            >
              {categorie.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
      <Col>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Recipient's username"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <Button
            variant="outline-secondary"
            onClick={() => dispatch(filterTitleThunk(searchValue))}
          >
            Button
          </Button>
        </InputGroup>

        <Row xs={1} md={2} xl={3} className="mt-3 g-4">
          {products.map((product) => (
            <Col key={product.id}>
              <Card
                onClick={() => navigate(`/products/${product.id}`)}
                className="mb-1 p-4"
                style={{ height: "27rem", cursor: "pointer" }}
              >
                <Card.Img
                  variant="top"
                  className="mb-2"
                  src={product.productImgs[0]}
                  style={{ objectFit: "contain", height: "200px" }}
                />
                <Card.Body
					style={{height:'80px'}} 
				>
                  <Card.Title style={{height:'70px'}}>{product.title}</Card.Title>
                  <Card.Text className="prices mb-5 mt-3" style={{height:'30px'}}><span className="price">Price:</span> ${product.price}</Card.Text>
                  <div>
					<div className="divIconCart">
						<i class="fa-solid fa-cart-shopping"></i>
					</div>
				  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default Home;
