import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductsThunk } from "../store/slices/products.slice";
import { Container, Row, Col, Badge, Card, CardImg } from "react-bootstrap";
import '../styles/product-detail.css'

const ProductsDetail = () => {
  const allProducts = useSelector((state) => state.products);
  const [productDetail, setProductDetail] = useState({});
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductsThunk());
  }, []);

  useEffect(() => {
    const productsFind = allProducts.find(
      (productsItem) => productsItem.id === Number(id)
    );
    setProductDetail(productsFind);

    const filteredProducts = allProducts.filter(
      (newsProducts) => newsProducts.category.id === productsFind.category.id
    );
    setSuggestedProducts(filteredProducts);
  }, [allProducts, id]);

  console.log(productDetail)

  return (
    <Container>
      <Row>
	  	<div className="title" >
			<span className="home">Home</span>
			<div className="home-point"></div>
			<span className="home-title">{productDetail?.title}</span>
		</div>
        <Col lg={5} md={3} className='mt-5'>
          <img src={productDetail?.productImgs} alt="" />
        </Col>
        <Col lg={6} md={3} className='mt-5'>
			<h3 className='mb-3' text="dark">
				Description
			</h3>
			<p style={{lineHeight:'1.6', textAlign:'justify'}}>{productDetail?.description}</p>
			<div className="price-quantity">
				<div className="product-price">
					<h5>Price:</h5>
					<p><Badge>${productDetail?.price}</Badge></p>
				</div>
				<div className="quantity">
					<h5>Quantity</h5>
					<div></div>
				</div>
			</div>
			<button className="shopping">
				<p>Add to cart</p>
				<i class="fa-solid fa-cart-shopping"></i>
			</button>
		</Col>
		<h3 className="discover">Discover similar items</h3>
		<Row xs={1} md={2} xl={3} className="mt-3 g-4">
			{suggestedProducts.map((suggestedProduct) => (
			<Col key={suggestedProduct.id}>
				<Card 
					onClick={() => navigate(`/products/${suggestedProduct.id}`)}
					className="mb-1 p-4"
                	style={{ height: "27rem", cursor: "pointer" }}
				>
					<CardImg 
						variant="top"
						className="mb-2"
						src={suggestedProduct?.productImgs}
						style={{ objectFit: "contain", height: "200px" }}
					/>

					<Card.Body style={{height:'80px'}} >
						<Card.Title style={{height:'70px'}}>{suggestedProduct?.title}</Card.Title>
						<Card.Text
							className="prices mb-5 mt-3" style={{height:'30px'}}>
								<span className="price">Price:</span> ${suggestedProduct.price}
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
      </Row>
    </Container>
  );
};

export default ProductsDetail;
