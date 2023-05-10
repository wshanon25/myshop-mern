import { Add, Remove } from "@material-ui/icons";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });
        navigate(`/success`, {
          stripeData: res.data,
          products: cart,
        });
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, navigate]);
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove />
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Bloom Gallery"
              image="data:image/jpeg;base64,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"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
