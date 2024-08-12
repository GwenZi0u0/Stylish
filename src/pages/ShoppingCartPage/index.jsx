/* eslint-disable react/prop-types */
import styled from "styled-components";
import { theme } from "../../theme";
import ShoppingProduct from "./ShoppingProduct";
import ShoppingOrder from "./ShoppingOrder";
import ShoppingOrderTotal from "./ShoppingOrderTotal";

const ShoppingCartPage = ({ getItems }) => {
  return (
    <CardContanier>
      <ShoppingProduct getItems={getItems} />
      <ShoppingOrder />
      <ShoppingOrderTotal  />
    </CardContanier>
  );
};
export default ShoppingCartPage;

const CardContanier = styled.main`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.primaryColor};
  width: 100vw;
  max-width: 1160px;
  min-height: 100vh;
  height: auto;
  margin: 0 auto 0;
  padding: 191px 0 148px;
  line-height: 16px;
  color: ${theme.colors.blankTextColor};
  font-size: 16px;

  @media screen and (max-width: 1279.9px) {
    padding-top: 102px;
    padding: 122px 24px 28px;
    margin: 0;
  }
`;
