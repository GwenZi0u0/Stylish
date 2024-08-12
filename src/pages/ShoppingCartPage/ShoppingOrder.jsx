import styled from "styled-components";
import { theme } from "../../theme";

const ShoppingCartPage = () => {
  return (
    <>
      <OrderInformation action="" method="post">
        <OrderFormTitle>訂購資料</OrderFormTitle>
        <OrderItem>
          <ItemName htmlFor="name">收件人姓名</ItemName>
          <ItemInput type="text" name="[Name]" required />
        </OrderItem>
        <OrderNote>務必填寫完整收件人姓名，避免包裹無法順利簽收</OrderNote>
        <OrderItem>
          <ItemName htmlFor="phone">手機</ItemName>
          <ItemInput type="tel" name="[Phone]" required />
        </OrderItem>
        <OrderItem>
          <ItemName htmlFor="address">地址</ItemName>
          <ItemInput type="text" name="[Post Address]" required />
        </OrderItem>
        <OrderItem>
          <ItemName htmlFor="email">Email</ItemName>
          <ItemInput type="email" name="[Email]" required />
        </OrderItem>
        <OrderItem>
          <ItemName>配送時間</ItemName>
          <ItemRadios htmlFor="time">
            <ItemRadio>
              <Radio type="radio" name="morning" />
              08:00-12:00
            </ItemRadio>
            <ItemRadio>
              <Radio type="radio" name="afternoon" />
              14:00-18:00
            </ItemRadio>
            <ItemRadio>
              <Radio type="radio" name="anytime" />
              不指定
            </ItemRadio>
          </ItemRadios>
        </OrderItem>
      </OrderInformation>
      <OrderInformation action="" method="post">
        <OrderFormTitle>付款資料</OrderFormTitle>
        <OrderItem>
          <ItemName htmlFor="payment">信用卡號碼</ItemName>
          <ItemInput type="tel" name="credit_card" maxLength="16" />
        </OrderItem>
        <OrderItem>
          <ItemName htmlFor="expirydate">有效期限</ItemName>
          <ItemInput type="date" />
        </OrderItem>
        <OrderItem>
          <ItemName htmlFor="cardpassword">安全碼</ItemName>
          <ItemInput type="password" maxLength="3" />
        </OrderItem>
      </OrderInformation>
    </>
  );
};
export default ShoppingCartPage;

const OrderInformation = styled.form`
  padding-top: 50px;
  @media screen and (max-width: 1279.9px) {
    padding-top: 0;
  }
`;

const OrderFormTitle = styled.div`
  line-height: 19px;
  font-size: 16px;
  font-weight: 700;
  border-bottom: 1px solid ${theme.colors.blankTextColor};
  margin-bottom: -5px;
  padding-bottom: 15px;
  @media screen and (max-width: 1279.9px) {
    margin-bottom: 0;
    padding-bottom: 8px;
  }
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  padding-top: 30.5px;
  @media screen and (max-width: 1279.9px) {
    padding-top: 20px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ItemName = styled.label`
  width: 120px;
  line-height: 19px;
  font-size: 16px;
  @media screen and (max-width: 1279.9px) {
    width: 70px;
    line-height: 17px;
    font-size: 14px;
    padding-bottom: 10px;
  }
`;

const ItemInput = styled.input`
  display: inline-block;
  width: 576px;
  height: 32px;
  border-radius: 8px;
  padding: 0 8px;
  border: 1px solid ${theme.colors.greyBorderColor};
  @media screen and (max-width: 1279.9px) {
    width: 432px;
  }
`;

const OrderNote = styled.p`
  margin: 10px 0 0 344px;
  color: ${theme.colors.brownColor};
  @media screen and (max-width: 1279.9px) {
    font-size: 14px;
    margin: 6px 0 0 0;
  }
`;

const ItemRadios = styled.div`
  display: flex;
  align-items: center;
`;

const ItemRadio = styled.label`
  display: flex;
  align-items: center;
  margin: 0 32px 0 0;
  @media screen and (max-width: 1279.9px) {
    font-size: 14px;
    margin: 0 26px 18px 0;
  }
`;

const Radio = styled.input`
  width: 16px;
  height: 16px;
  margin: 5px 8px 5px 0;
  @media screen and (max-width: 1279.9px) {
    margin: 5px 6px 5px 0;
  }
`;
