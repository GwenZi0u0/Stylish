import styled from "styled-components";
import { theme } from "../../theme";
import { useEffect, useState } from "react";

const ShoppingOrderTotal = () => {
  const [isTotal, setTotal] = useState(0);

  const subTotal = () => {
    const data = JSON.parse(localStorage.getItem("formData")) || [];
    const total = data.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
      0
    );
    setTotal(total);
  };

  useEffect(() => {
    subTotal();
  }, []);

  return (
    <>
      <OrderTotal>
        <TotalName>總金額</TotalName>
        <TotalNt>NT.</TotalNt>
        <TotalSub>{Math.floor(isTotal)}</TotalSub>
      </OrderTotal>
      <OrderFreight>
        <TotalName>運費</TotalName>
        <TotalNt>NT.</TotalNt>
        <TotalSub>30</TotalSub>
      </OrderFreight>
      <OrderPayable>
        <TotalName>應付金額</TotalName>
        <TotalNt>NT.</TotalNt>
        <TotalSubCash>{Math.floor(isTotal + 30)}</TotalSubCash>
      </OrderPayable>
      <Confirmation>確認付款</Confirmation>
    </>
  );
};
export default ShoppingOrderTotal;

const OrderTotal = styled.div`
  display: flex;
  align-items: center;
  width: 240px;
  margin: 40px 0 0 auto;
  @media screen and (max-width: 1279.9px) {
    margin: 24px 0 0 auto;
  }
`;

const OrderFreight = styled.div`
  display: flex;
  align-items: center;
  width: 240px;
  margin: 20px 0 0 auto;
  padding-bottom: 19px;
  border-bottom: 1px solid ${theme.colors.blankTextColor};
`;

const OrderPayable = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0 0 auto;
  width: 240px;
`;

const TotalName = styled.div`
  display: block;
  line-height: 19px;
  font-size: 16px;
  color: ${theme.colors.blankTextColor};
  text-align: center;
`;

const TotalNt = styled.div`
  margin-left: auto;
`;

const TotalSub = styled.div`
  line-height: 36px;
  margin: 0 4.5px 0 7.5px;
  font-size: 30px;
  @media screen and (max-width: 1279.9px) {
    margin-left: 10px;
  }
`;
const TotalSubCash = styled.div`
  line-height: 36px;
  margin: 0 0 0 8px;
  font-size: 30px;
  @media screen and (max-width: 1279.9px) {
    margin-left: 10px;
  }
`;

const Confirmation = styled.button`
  display: block;
  width: 240px;
  height: 60px;
  margin-top: 52px;
  background-color: ${theme.colors.blankColor};
  color: ${theme.colors.primaryColor};
  font-size: 20px;
  letter-spacing: 4px;
  margin-left: auto;
  @media screen and (max-width: 1279.9px) {
    width: 432px;
    height: 44px;
    margin-top: 36px;
    font-size: 16px;
    line-height: 30px;
    letter-spacing: 3.2px;
  }
`;
