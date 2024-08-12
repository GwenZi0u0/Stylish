/* eslint-disable react/prop-types */
import styled from "styled-components";
import { theme } from "../../theme";
import Trash from "../../assets/icon/trash.png";
import { useEffect, useState } from "react";

const ShoppingProduct = ({ getItems }) => {
  const [apiData, setApiData] = useState(null);
  const [isStoreData, setStoreData] = useState([]);

  const variantColors = (itemColor) => {
    const color = [...apiData.map((v) => v.colors)];
    const mappingTable = color.flat().reduce((acc, item) => {
      acc[item.code] = item.name;
      return acc;
    }, {});
    return mappingTable[itemColor];
  };

  const handleDropdownChange = (pid,dropdownValue) => {
    // 取得現有的 formData
    const formData = JSON.parse(localStorage.getItem("formData")) || [];

    // 更新 formData 中對應項目的數量
    formData.forEach((item) => {
      if (
        item.id === pid
      ) {
        item.quantity = dropdownValue;
      }
    });
    // 將更新後的 formData 存回 localStorage
    localStorage.setItem("formData", JSON.stringify(formData));

    // 呼叫主函數來處理庫存更新
    updateFormDataQuantity(apiData);
  };

  const updateFormDataQuantity = (ori_products) => {
    const products = JSON.parse(JSON.stringify(ori_products));
    const formData = JSON.parse(localStorage.getItem("formData")) || [];
    let pids = [...new Set(products.map((value) => value.id))];
    products.forEach((p) => {
      let colors = [...new Set(p.variants.map((value) => value.color_code))];
      let sizes = [...new Set(p.variants.map((value) => value.size))];
      pids.forEach((pid) => {
        colors.forEach((color) => {
          sizes.forEach((size) => {
            const totalQuantity = formData
              .filter(
                (item) =>
                  item.id === pid && item.color === color && item.size === size
              )
              .reduce((sum, item) => sum + item.quantity, 0);

            const variant = p.variants.find(
              (v) => v.color_code === color && v.size === size
            );

            variant.stock -= totalQuantity;
            formData
              .filter(
                (item) =>
                  item.id === pid && item.color === color && item.size === size
              )
              .forEach((item) => {
                item.stock = variant.stock;
              });
          });
        });
      });
    });
    localStorage.setItem("formData", JSON.stringify(formData));
    setStoreData(formData);
  };

  const handleDelete = (key) => {
    const data = localStorage.getItem("formData");
    const formData = data ? JSON.parse(data) : [];
    let newData = formData.filter((cardItem) => cardItem.key !== key);
    setStoreData(newData);
    console.log(newData);
    localStorage.setItem("formData", JSON.stringify(newData));
    getItems();
    alert("已刪除商品");
  };

  useEffect(() => {
    fetch(`https://api.appworks-school.tw/api/1.0/products/all`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`"response , ERROR `);
        }
        return response.json();
      })
      .then((data) => {
        data = data.data;
        setApiData(data);
        updateFormDataQuantity(data);
      })
      .catch((error) => console.error("fetch error", error));
  }, []);

  return (
    <>
      <CartHeader>
        <CardHeaderNumber>購物車</CardHeaderNumber>
        <CardHeaderQuantity>數量</CardHeaderQuantity>
        <CardHeaderPrice>單價</CardHeaderPrice>
        <CartHeaderSubtotal>小計</CartHeaderSubtotal>
        <CartHeaderDeleteButton></CartHeaderDeleteButton>
      </CartHeader>
      <CarItems>
        {isStoreData.length > 0 ? (
          isStoreData.map((data, index) => (
            <CardItem $borderProp={true} key={index}>
              <CardItemImage src={data.image} />
              <CardItemDetailed name="[Product Name]">
                <CardItemTitle>{data.title}</CardItemTitle>
                <CardItemId name="[Product ID]">{data.id}</CardItemId>
                <CardItemColor name="[Product Variant Color Name]|[Product Variant Color HexCode]">
                  {"顏色"}&nbsp;| &nbsp;{variantColors(data.color)}
                </CardItemColor>
                <CardItemSize name="[Product Variant Size]">
                  {"尺寸 "}&nbsp;| &nbsp;{data.size}
                </CardItemSize>
              </CardItemDetailed>
              <CardItemQuantity>
                <QuantityTitle>數量</QuantityTitle>
                <QuantitySelector
                  name="[Quantity]"
                  onChange={() => handleDropdownChange(data.id,event.target.value)}
                  value={data.quantity}
                >
                  {Array.from(
                    { length: data.quantity + data.stock },
                    (_, i) => i + 1
                  ).map((quantity) => (
                    <Option key={quantity} value={quantity}>
                      {quantity}
                    </Option>
                  ))}
                </QuantitySelector>
              </CardItemQuantity>
              <CardItemPrice>
                <PriceTitle>單價</PriceTitle>
                <PriceContent name="[Product Unit Price]">
                  TWD.{data.price}
                </PriceContent>
              </CardItemPrice>
              <CardItemSub>
                <SubTitle>小計</SubTitle>
                <SubContent>TWD.{data.price * data.quantity}</SubContent>
              </CardItemSub>
              <CarItemDeletButton onClick={() => handleDelete(data.key)} />
            </CardItem>
          ))
        ) : (
          <CardItem></CardItem>
        )}
      </CarItems>
    </>
  );
};
export default ShoppingProduct;

const CartHeader = styled.div`
  display: flex;
  height: auto;

  @media screen and (max-width: 1279.9px) {
    padding-bottom: 12px;
    border-bottom: 1px solid ${theme.colors.blankTextColor};
  }
`;

const CardHeaderNumber = styled.div`
  flex-grow: 1;
  @media screen and (max-width: 1279.9px) {
    font-weight: 700;
  }
`;

const CardHeaderQuantity = styled.div`
  width: 190px;
  padding-left: 18px;
  @media screen and (max-width: 1279.9px) {
    display: none;
  }
`;

const CardHeaderPrice = styled.div`
  width: 190px;
  padding-left: 20.5px;
  @media screen and (max-width: 1279.9px) {
    display: none;
  }
`;

const CartHeaderSubtotal = styled.div`
  width: 190px;
  padding-left: 21px;
  @media screen and (max-width: 1279.9px) {
    display: none;
  }
`;

const CartHeaderDeleteButton = styled.div`
  width: 70px;
  @media screen and (max-width: 1279.9px) {
    display: none;
  }
`;

const CarItems = styled.div`
  padding: 40px 30px 10px 30px;
  margin-top: 18px;
  border: 1px solid ${theme.colors.greyBorderColor};
  @media screen and (max-width: 1279.9px) {
    padding: 0;
    margin-top: 0px;
    border: none;
    font-size: 14px;
    line-height: 17px;
  }
`;

const CardItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0 30px 0;
  @media screen and (max-width: 1279.9px) {
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 20px 0 20px 0;
    border-top: ${(props) =>
      props.$borderProp ? `1px solid ${theme.colors.blankTextColor}` : "none"};
  }
`;

const CardItemImage = styled.img`
  width: 114px;
  @media screen and (max-width: 1279.9px) {
    order: 1;
  }
`;

const CardItemDetailed = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  width: 310px;
  margin-left: 16px;
  flex-grow: 1;
  @media screen and (max-width: 1279.9px) {
    width: calc(100% - 176px);
    order: 1;
    margin-left: 10px;
  }
`;

const CardItemTitle = styled.span`
  margin-top: 1px;
`;

const CardItemId = styled.span`
  margin-top: 22px;
`;

const CardItemColor = styled.span`
  margin: 25px 0 0 0.5px;
  @media screen and (max-width: 1279.9px) {
    margin: 22px 0 0 0;
    font-size: 14px;
    line-height: 17px;
  }
`;

const CardItemSize = styled.span`
  margin: 12px 0 0 -1px;
  @media screen and (max-width: 1279.9px) {
    font-size: 14px;
    line-height: 17px;
  }
`;

const CardItemQuantity = styled.div`
  display: flex;
  width: 190px;
  @media screen and (max-width: 1279.9px) {
    order: 2;
    flex-direction: column;
    width: calc(100% / 3);
    align-items: center;
    padding: 20px 42px 0 0;
  }
`;

const QuantityTitle = styled.span`
  display: none;
  @media screen and (max-width: 1279.9px) {
    display: block;
    padding-bottom: 12px;
  }
`;

const QuantitySelector = styled.select`
  width: 81px;
  height: 31px;
  font-size: 14px;
  padding-left: 12px;
  border-radius: 8px;
  border: 1px solid ${theme.colors.greyBorderColor};
  background-color: ${theme.colors.whiteBgcColor};
  text-rendering: auto;
  text-align: start;
  cursor: default;
`;

const Option = styled.option`
  display: block;
  padding-block-start: 0;
  padding-block-end: 4px;
  min-block-size: 1.2em;
  padding-inline: 2px;
  white-space: nowrap;
`;

const CardItemPrice = styled.div`
  display: flex;
  width: 191px;
  padding: 1px 0 0 10px;
  @media screen and (max-width: 1279.9px) {
    order: 2;
    flex-direction: column;
    width: calc(100% / 3);
    align-items: center;
    padding: 20px 0 0 0;
  }
`;

const PriceTitle = styled.div`
  display: none;
  @media screen and (max-width: 1279.9px) {
    display: block;
  }
`;

const PriceContent = styled.span`
  text-align: center;
  @media screen and (max-width: 1279.9px) {
    padding-top: 18px;
  }
`;

const CardItemSub = styled.div`
  display: flex;
  width: 191px;
  padding: 1px 0 0 10px;
  @media screen and (max-width: 1279.9px) {
    order: 2;
    flex-direction: column;
    width: calc(100% / 3);
    align-items: center;
    padding: 20px 0 0 40px;
  }
`;

const SubTitle = styled.div`
  display: none;
  @media screen and (max-width: 1279.9px) {
    display: block;
  }
`;

const SubContent = styled.span`
  text-align: center;
  @media screen and (max-width: 1279.9px) {
    padding-top: 18px;
  }
`;

const CarItemDeletButton = styled.div`
  width: 44px;
  height: 44px;
  background-image: url(${Trash});
  cursor: pointer;
  @media screen and (max-width: 1279.9px) {
    order: 1;
    background-position: 0 1px;
  }
`;
