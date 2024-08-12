/* eslint-disable react/prop-types */
import styled from "styled-components";
import { theme } from "../../theme";
import Product from "./Product";

const ProductsPage = ({getItems}) => {
  return (
    <ProductsContainer>
      <ProductContent>
        <Product getItems={getItems} />
      </ProductContent>
    </ProductsContainer>
  );
};

export default ProductsPage;

const ProductsContainer = styled.main`
  display: flex;
  justify-content: center;
  background-color: ${theme.colors.primaryColor};
  width: 100vw;
  height: auto;
  padding-top: 140px;
  min-height: 100vh;
  @media screen and (max-width: 1279.9px) {
    padding-top: 102px;
  }
`;

const ProductContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 65px 0 49px 0;
  height: auto;
  background-color: transparent;
  gap: 50px 0;

  @media screen and (max-width: 1279.9px) {
    margin: 0 0 32px 0;
    gap: 28px 0;
  }
`;
