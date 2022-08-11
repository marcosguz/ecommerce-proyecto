import React, { useEffect, useState } from "react";
import "../App.css";
import { setProducts } from '../store/slices/products.slice';
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

  const [ to, setTo ] =  useState(0);
  const [ from, setFrom ] =  useState(0);

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

  const [ fixedProducts, setFixedProducts ] = useState([]);
  useEffect(() => {
      axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products`)
          .then(res => setFixedProducts(res.data.data.products));
  }, [])

  // filter categories
  const filterCategory = cat => {
      setTo(0);
      setFrom(0);
  }
  
  // get all products
  const getAll = () => {
      dispatch(getProductsThunk())
      setTo(0);
      setFrom(0);
  }

  // filter prices
  const filterPrices = (to, from) => {
      if(from >= to) {
          dispatch(setProducts(fixedProducts));
          const array = [];
          for(let i = 0; i < fixedProducts.length; i++) {
              if(Number(fixedProducts[i].price) >= to && Number(fixedProducts[i].price) <= from) {
                  array.push(fixedProducts[i])
              }
          }
          dispatch(setProducts(array));
      } else {
          alert("Change ranges, please")
      }
  }


  console.log(products);
  return (
    <Row>
      <Col lg={3} md={3} className="mb-3">
            <ListGroup>
            <ListGroup.Item>
              <h4 className="accordion-header" id="panelsStayOpen-headingOne">
                  Price:
              </h4>
              </ListGroup.Item>
              <ListGroup.Item>
              <div>
                <div className="">
                <ListGroup.Item>
                  <div>
                    <label htmlFor="from">From</label>
                    <input
                      type="number"
                      min={0}
                      step="100"
                      id="from"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                    />
                  </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                  <div>
                    <label htmlFor="to">To</label>
                    <br></br>
                    <input
                      type="number"
                      min={0}
                      step="100"
                      id="to"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                    />
                  </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                  <div>
                    <button className="buttonRanges" onClick={() => filterPrices(to, from)}>
                      <i className="fa-solid fa-filter "></i> Filter price
                    </button>
                  </div>
                  </ListGroup.Item>
                </div>
              </div>
              </ListGroup.Item>
              </ListGroup>
        <ListGroup>
          {categories.map((categorie) => (
            <ListGroup.Item
              key={categorie.id}
              onClick={() => dispatch(filterCategoryThunk(categorie.id))}
              style={{ cursor: "pointer" }}
              className="list"
            >
              {categorie.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
      <Col>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Search"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <Button
            variant="outline-secondary"
            onClick={() => dispatch(filterTitleThunk(searchValue))}
          >
            Search
          </Button>
        </InputGroup>

        <Row xs={1} md={2} xl={3} className="mt-3 g-4">
          {products.map((product) => (
            <Col key={product.id}>
              <Card
                onClick={() => navigate(`/products/${product.id}`)}
                className="mb-1 p-4 card"
                style={{ height: "27rem", cursor: "pointer" }}
              >
                <Card.Img
                  variant="top"
                  className="mb-2"
                  src={product.productImgs[0]}
                  style={{ objectFit: "contain", height: "200px" }}
                />
                <Card.Body style={{ height: "80px" }}>
                  <Card.Title style={{ height: "70px" }}>
                    {product.title}
                  </Card.Title>
                  <Card.Text
                    className="prices mb-5 mt-3"
                    style={{ height: "30px" }}
                  >
                    <span className="price">Price:</span> ${product.price}
                  </Card.Text>
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
