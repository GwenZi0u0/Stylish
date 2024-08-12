/* eslint-disable react/prop-types */
import styled from "styled-components";
import { theme } from "../../theme";
import CartDesktopSVG from "../../assets/icon/cart.svg";
import CartMobileSVG from "../../assets/icon/cart-mobile.svg";
import UserDesktopSVG from "../../assets/icon/profile.svg";
import UserMobileSVG from "../../assets/icon/profile-mobile.svg";
import { Link,} from "react-router-dom";

const UserCartion = ({ items }) => {
  return (
    <UserContainer>
      <ShoppingCartLink to="/shoppingcart">
        <Cart>
          <CartIcon src={CartDesktopSVG} />
          <CartIconWhite src={CartMobileSVG} />
          <CartNumber>{items.length}</CartNumber>
        </Cart>
        <MobileUserText>購物車</MobileUserText>
      </ShoppingCartLink>
      <LogIn>
        <UserIcon src={UserDesktopSVG} />
        <UserIconWhite src={UserMobileSVG} />
        <MobileUserText>會員</MobileUserText>
      </LogIn>
    </UserContainer>
  );
};

export default UserCartion;

const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 130px;
  height: 44px;
  margin: 28px 54px 68px 42px;

  @media screen and (max-width: 1279.9px) {
    position: fixed;
    bottom: 0;
    background-color: ${theme.colors.secondaryColor};
    color: ${theme.colors.primaryColor};
    width: 100%;
    height: 60px;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    z-index: 80;
  }
`;

const ShoppingCartLink = styled(Link)`
  @media screen and (max-width: 1279.9px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    cursor: pointer;
  }
`;

const Cart = styled.div`
  position: relative;
  width: 44px;
  height: 44px;
  cursor: pointer;
`;

const CartIcon = styled.img`
  position: absolute;
  @media screen and (max-width: 1279.9px) {
    display: none;
  }
`;

const CartIconWhite = styled.img`
  @media screen and (max-width: 1279.9px) {
    position: absolute;
  }
`;

const CartNumber = styled.div`
  position: absolute;
  background-color: ${theme.colors.brownColor};
  color: ${theme.colors.primaryColor};
  border-radius: 50px;
  text-align: center;
  width: 24px;
  height: 24px;
  right: 0;
  bottom: 0;
`;

const LogIn = styled.div`
  @media screen and (max-width: 1279.9px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    position: relative;
    cursor: pointer;

    &::before {
      content: "|";
      position: absolute;
      left: -2px;
      top: 5px;
      font-size: 20px;
      color: ${theme.colors.grayTextColor};
    }
  }
`;

const UserIcon = styled.img`
  display: block;
  width: 44px;
  height: 44px;
  cursor: pointer;

  @media screen and (max-width: 1279.9px) {
    display: none;
  }
`;

const UserIconWhite = styled.img`
  display: none;

  @media screen and (max-width: 1279.9px) {
    display: block;
    width: 44px;
    height: 44px;
  }
`;

const MobileUserText = styled.span`
  display: none;

  @media screen and (max-width: 1279.9px) {
    display: block;
    color: ${theme.colors.primaryColor};
  }
`;
