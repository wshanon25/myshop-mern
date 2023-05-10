import { Badge } from "@material-ui/core";
import {
  AccountCircleOutlined,
  LockOpenRounded,
  Search,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import LockOpenRoundedIcon from "@material-ui/icons/LockOpenRounded";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import logo from "../assets/logobloom.jpg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 60px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 2;
  text-align: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 100px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const LogoDiv = styled.div`
  background-image: url(${logo});
  width: 80px;
  height: 60px;
  padding: 0 45px;
  top: 0;
  margin-right: 100px;
  background-position: right top;
  background-size: contain;
  background-repeat: no-repeat;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <Container>
      <Wrapper>
        <Left>
          <LogoDiv />
          {/* <img src={logo} /> */}
          {/* <Language>EN</Language> */}
          {/* </Logo> */}
        </Left>
        <Center>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Center>
        <Right>
          {/* lockeopenicon is for user to register */}
          <MenuItem>
            <LockOpenRounded />
          </MenuItem>
          {/* Accountcircleicon is for user log-in/ sign-in */}
          <MenuItem>
            <AccountCircleOutlined />
          </MenuItem>
          {/* use can add his favourits clicking this favourite icon  */}
          <MenuItem>
            <FavoriteBorderRoundedIcon />
          </MenuItem>
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
