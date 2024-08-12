/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import { theme } from "../../theme";
import { useEffect, useState } from "react";
import Loading from "../../assets/image/loading.gif";

const useQuery = () => {
  return new URLSearchParams(window.location.search);
};

const Product = ({ getItems }) => {
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [selectedDimensionBox, setSelectedDimensionBox] = useState(null);
  const [isQuantity, setQuantity] = useState(0);
  const [buttonText, setButtonText] = useState("請選擇顏色");
  const [product, setProduct] = useState(null);
  const [isDescription, setDescription] = useState([]);
  const [formData, setFormData] = useState({});
  const [newData, setNewData] = useState([]);

  let query = useQuery();
  let productId = query.get("id");

  const updateFormDataQuantity = (p) => {
    const formData = JSON.parse(localStorage.getItem("formData")) || [];
    let colors = p.colors.map((c) => c.code);
    let sizes = p.sizes;
    colors.forEach((color) => {
      sizes.forEach((size) => {
        const totalQuantity = formData
          .filter((item) => item.color === color && item.size === size)
          .reduce((sum, item) => sum + item.quantity, 0);
        const variant = p.variants.find(
          (v) => v.color_code === color && v.size === size
        );
        variant.stock -= totalQuantity;
      });
    });
    setProduct(p);
  };

  useEffect(() => {
    const storageData = localStorage.getItem("formData");
    if (storageData) {
      const storaData = JSON.parse(storageData).forEach((d, index) => {
        d.key = index;
      });
      setFormData(storaData);
    }

    fetch(
      `https://api.appworks-school.tw/api/1.0/products/details?id=${productId}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`"response , ERROR `);
        }
        return response.json();
      })
      .then((data) => {
        let product = data.data;
        let descriptions = product.description.split(/\r\n|\n|\r/);
        setFormData({
          key: "",
          id: product.id,
          title: product.title,
          image: product.main_image,
          price: product.price,
          color: "",
          size: "",
          quantity: "",
        });
        setNewData(product);
        updateFormDataQuantity(product);
        setDescription(descriptions);
      })
      .catch((error) => console.error("fetch error", error));
  }, [productId]);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      quantity: isQuantity,
    }));
  }, [isQuantity]);

  const changeSubmit = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitProduct = (event) => {
    event.preventDefault();
    let submitData = localStorage.getItem("formData");
    submitData = submitData ? JSON.parse(submitData) : [];
    formData.key = submitData.length
      ? submitData[submitData.length - 1].key + 1
      : submitData.length;
    submitData.push(formData);
    localStorage.setItem("formData", JSON.stringify(submitData));
  };

  const resetForm = () => {
    setSelectedBlock(null);
    setSelectedDimensionBox(null);
    setQuantity(0);
    setButtonText("請選擇顏色");
  };

  if (!product) {
    return (
      <div>
        Loading...
        <br />
        <img src={Loading} />
      </div>
    );
  }

  return (
    <>
      <CardBox>
        <CardImage $bgImage={product.main_image}></CardImage>
        <CardInformation>
          <CardHeader>
            <ProductTitle>
              <TitleSpan>{product.title}</TitleSpan>
              <SerialNumber>{product.id}</SerialNumber>
            </ProductTitle>
            <ProductPrice>
              <PriceTile>
                TWD.
                <Price>{product.price}</Price>
              </PriceTile>
            </ProductPrice>
          </CardHeader>
          <CardMain action="" method="get" onSubmit={submitProduct}>
            <ProductItems>
              <SubItemTitle $displayProp={true}>顏色</SubItemTitle>
              <ColorBlocks>
                {product.colors.map((color, index) => (
                  <ColorBlock key={index} selected={selectedBlock === index}>
                    <ColorBox
                      type="radio"
                      name="color"
                      value={color.code}
                      $bgc={`#${color.code}`}
                      selected={selectedBlock === index}
                      onClick={() => {
                        setSelectedBlock(index);
                        setButtonText("請選擇尺寸");
                        setSelectedDimensionBox(true);
                        setQuantity(0);
                      }}
                      onChange={changeSubmit}
                    />
                    <Color />
                  </ColorBlock>
                ))}
              </ColorBlocks>
            </ProductItems>
            <ProductItems>
              <SubItemTitle $displayProp={true}>尺寸</SubItemTitle>
              <DimensionsBlocks>
                {product.sizes.map((value, index) => {
                  const colors = product.colors.map((c) => c.code);
                  const selectedColor = colors[selectedBlock];
                  const variant = product.variants.find(
                    (v) => v.color_code === selectedColor && v.size === value
                  );
                  const checkStock = variant ? variant.stock > 0 : false;
                  return (
                    <DimensionsBlock
                      key={index}
                      selected={
                        checkStock ? selectedDimensionBox === index : null
                      }
                    >
                      <DimensionBox
                        selected={
                          checkStock ? selectedDimensionBox === index : null
                        }
                        type="radio"
                        name="size"
                        value={value}
                        $opacityProp={checkStock ? "1" : "0.5"}
                        $mouse={checkStock ? "pointer" : "no-drop"}
                        $text={value}
                        onClick={() => {
                          if (selectedBlock !== null && checkStock) {
                            setSelectedDimensionBox(index);
                            setButtonText("加入購物車");
                            setQuantity(0);
                          }
                        }}
                        onChange={changeSubmit}
                      />
                      <Dimension></Dimension>
                    </DimensionsBlock>
                  );
                })}
              </DimensionsBlocks>
            </ProductItems>
            <ProductItems>
              <SubItemTitle $displayProp={false}>數量</SubItemTitle>
              <QuantityBlock>
                <MinusButton
                  onClick={(e) => {
                    e.preventDefault();
                    const colors = product.colors.map((c) => c.code);
                    const sizes = product.sizes;
                    const selectedColor = colors[selectedBlock];
                    const selectedSize = sizes[selectedDimensionBox];
                    if (selectedColor && selectedSize) {
                      setQuantity((prevQuantity) =>
                        Math.max(prevQuantity - 1, 0)
                      );
                      return;
                    }
                  }}
                >
                  -
                </MinusButton>
                <Quantity name="quantity">{isQuantity}</Quantity>
                <PlusButton
                  onClick={(e) => {
                    e.preventDefault();
                    const colors = product.colors.map((c) => c.code);
                    const sizes = product.sizes;
                    const selectedColor = colors[selectedBlock];
                    const selectedSize = sizes[selectedDimensionBox];
                    const selectedProduct = product.variants.find(
                      (product) =>
                        product.color_code === selectedColor &&
                        product.size === selectedSize
                    );
                    if (selectedColor && selectedSize) {
                      setQuantity((prevQuantity) =>
                        Math.min(prevQuantity + 1, selectedProduct.stock)
                      );
                    }
                  }}
                >
                  +
                </PlusButton>
              </QuantityBlock>
            </ProductItems>
            <ShoppingCartButton
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                if (selectedBlock === null) {
                  alert("請選擇顏色");
                  return;
                }
                if (selectedDimensionBox === true) {
                  alert("請選擇尺寸");
                  setButtonText("請選擇尺寸");
                  return;
                }
                if (isQuantity === 0) {
                  alert("請選擇數量");
                  return;
                }
                if (e) {
                  alert("已加入購物車");
                  submitProduct(e);
                  getItems();
                  updateFormDataQuantity(newData);
                  resetForm();
                  return;
                }
              }}
            >
              <ButtonSpan>{buttonText}</ButtonSpan>
            </ShoppingCartButton>
          </CardMain>
          <CardFooter>
            <ProductCueWords>{product.note}</ProductCueWords>
            <ProductMaterial>
              <ProductCueWords>{product.texture}</ProductCueWords>
              <ProductCueWords>
                {isDescription.map((desc, index) => (
                  <React.Fragment key={index}>
                    {desc}
                    {index < isDescription.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </ProductCueWords>
            </ProductMaterial>
            <ProductMaterial>
              <ProductCueWords>
                清洗：
                <WordsValue>{product.wash}</WordsValue>
              </ProductCueWords>
              <ProductCueWords>
                產地：
                <WordsValue>{product.place}</WordsValue>
              </ProductCueWords>
            </ProductMaterial>
          </CardFooter>
        </CardInformation>
      </CardBox>
      <MoreProductInformation>
        <InformationTitle>
          <InformationName>更多產品資訊</InformationName>
        </InformationTitle>
        <InformationText>{product.story}</InformationText>
        {[...new Set(product.images)].map((image, index) => (
          <InformationImage key={index} $bgimg={image} />
        ))}
      </MoreProductInformation>
    </>
  );
};

export default Product;

const CardBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0 40px;

  @media screen and (max-width: 1279.9px) {
    flex-direction: column;
    gap: 17px 0;
  }
`;

const CardImage = styled.div`
  width: 560px;
  height: 746.67px;
  background-image: url("${(props) => props.$bgImage}");
  background-repeat: no-repeat;
  background-size: cover;

  @media screen and (max-width: 1279.9px) {
    width: 100%;
    height: 640px;
  }

  @media screen and (max-width: 479.9px) {
    width: 100vw;
    height: 480px;
  }
`;

const CardInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 360px;

  @media screen and (max-width: 1279.9px) {
    padding: 0 24px;
    width: auto;
  }
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  border-color: ${theme.colors.blankTextColor};
  border-bottom: 1px solid ${theme.colors.blankTextColor};
  width: 100%;
`;

const ProductTitle = styled.div`
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1279.9px) {
    padding-bottom: 20px;
  }
`;

const TitleSpan = styled.span`
  color: ${theme.colors.blankTextColor};
  font-size: 32px;
  line-height: 38px;
  letter-spacing: 6.4px;

  @media screen and (max-width: 1279.9px) {
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 4px;
  }
`;

const SerialNumber = styled.p`
  color: ${theme.colors.graySpanColor};
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 4px;
  padding-top: 16px;

  @media screen and (max-width: 1279.9px) {
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 3.2px;
    padding-top: 10px;
  }
`;

const ProductPrice = styled.div`
  color: ${theme.colors.blankTextColor};
  display: flex;
  flex-direction: row;
  font-size: 30px;
  line-height: 36px;
  padding: 0 0 20px 0;

  @media screen and (max-width: 1279.9px) {
    font-size: 20px;
    line-height: 24px;
    padding: 0 0 8px 0;
  }
`;

const PriceTile = styled.div`
  text-align: center;
`;

const Price = styled.span`
  text-align: center;
`;

const CardMain = styled.form`
  display: flex;
  flex-direction: column;
  padding: 30px 0 40px 0;
  color: ${theme.colors.blankTextColor};
  font-size: 20px;
  line-height: 24px;
  gap: 30px 0;

  @media screen and (max-width: 1279.9px) {
    font-size: 14px;
    line-height: auto;
    padding: 30px 0 28px 0;
    gap: 10px 0;
  }
`;

const ProductItems = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0 19px;

  @media screen and (max-width: 1279.9px) {
    gap: 0 12px;
    padding-bottom: 20px;
  }
`;

const SubItemTitle = styled.span`
  letter-spacing: 4px;
  &::after {
    content: "|";
    padding: 0 8px;
  }

  @media screen and (max-width: 1279.9px) {
    display: ${(props) => (props.$displayProp ? "flex" : "none")};
    line-height: 17px;
    letter-spacing: 2.8px;
    &::after {
      padding: 0 5px;
    }
  }
`;

const ColorBlocks = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0 16px;
`;

const ColorBlock = styled.label`
  position: relative;
  display: inline-block;
  width: 36px;
  height: 36px;
  cursor: pointer;
  border: 1px solid
    ${(props) => (props.selected ? theme.colors.greyBorderColor : "none")};
`;

const ColorBox = styled.input`
  position: absolute;
  opacity: 1;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  outline: none;
  cursor: pointer;

  &::after {
    content: "";
    display: inline-block;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 24px;
    height: 24px;
    background-color: ${(props) => props.$bgc};
    border: 1px solid ${theme.colors.grayItemColor};
    transform: translate(-50%, -50%);
  }
`;

const Color = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  display: inline-block;
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: 1px solid #f4f4f4;
  z-index: 1;
`;

const DimensionsBlocks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0 20px;

  @media screen and (max-width: 1279.9px) {
    gap: 0 15px;
  }
`;

const DimensionsBlock = styled.label`
  position: relative;
  display: inline-block;
  width: 36px;
  height: 36px;
  border-radius: 18px;
`;

const DimensionBox = styled.input`
  position: absolute;
  opacity: 1;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  outline: none;
  font-size: 20px;
  line-height: 36px;
  text-align: center;
  opacity: ${(props) => props.$opacityProp};
  cursor: ${(props) => props.$mouse};

  &::after {
    content: "${(props) => props.$text}";
    display: inline-block;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 36px;
    height: 36px;
    transform: translate(-50%, -50%);
    border-radius: 18px;
    color: ${(props) =>
      props.selected ? theme.colors.primaryColor : theme.colors.blankTextColor};
    background-color: ${(props) =>
      props.selected ? theme.colors.blankColor : theme.colors.grayItemColor};
  }
`;

const Dimension = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  display: inline-block;
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.greenColor};
  border-radius: 18px;
  z-index: -1;
`;

const QuantityBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border: 1px solid ${theme.colors.greyBorderColor};
  width: 160px;
  height: 44px;
  font-size: 16px;
  line-height: 32px;
  padding: 0 0 0 2px;
  margin-top: -8px;

  @media screen and (max-width: 1279.9px) {
    width: 432px;
    font-size: 20px;
    line-height: 22px;
    margin-bottom: -15px;
  }

  @media screen and (max-width: 479.9px) {
    width: 312px;
    margin-bottom: -15px;
  }
`;

const MinusButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  padding: 0 15px 0;
  border: none;
  height: 32px;
  cursor: pointer;
`;

const Quantity = styled.p`
  display: flex;
  color: ${theme.colors.brownColor};
  padding: 0 38px 0;
  cursor: text;
`;

const PlusButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  padding: 0 15px 0;
  border: none;
  height: 32px;
  cursor: pointer;
`;

const ShoppingCartButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 360px;
  height: 64px;
  margin-top: -5px;
  border: 1px solid ${theme.colors.greyBorderColor};
  background-color: ${theme.colors.blankColor};
  cursor: pointer;

  @media screen and (max-width: 1279.9px) {
    width: 432px;
    height: 44px;
  }

  @media screen and (max-width: 479.9px) {
    width: 312px;
  }
`;

const ButtonSpan = styled.span`
  display: flex;
  text-align: center;
  color: ${theme.colors.primaryColor};
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 4px;

  @media screen and (max-width: 1279.9px) {
    font-size: 16px;
    letter-spacing: 3.2px;
  }
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 20px;
  line-height: 30px;
  color: ${theme.colors.blankTextColor};
  gap: 30px 0;
  padding-left: 6px;

  @media screen and (max-width: 1279.9px) {
    font-size: 14px;
    line-height: 24px;
    gap: 24px 0;
    padding: 0;
  }
  @media screen and (max-width: 479.9px) {
    margin-top: 6px;
  }
`;

const ProductCueWords = styled.span`
  display: flex;
  flex-direction: row;
`;

const ProductMaterial = styled.div`
  display: flex;
  flex-direction: column;
`;

const WordsValue = styled.p`
  display: flex;
`;

const MoreProductInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 29.5px 0;
  width: 100vw;

  @media screen and (max-width: 1279.9px) {
    gap: 20px 0;
  }
`;

const InformationTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InformationName = styled.span`
  display: flex;
  align-items: center;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 3px;
  color: ${theme.colors.brownColor};

  &::after {
    content: "";
    background-color: ${theme.colors.blankTextColor};
    align-items: flex-end;
    height: 1px;
    width: 761px;
    margin-left: 60px;
  }

  @media screen and (max-width: 1279.9px) {
    font-size: 16px;
    letter-spacing: 3.2px;
    &::after {
      width: 285px;
      margin-left: 35px;
    }
  }

  @media screen and (max-width: 479.9px) {
    &::after {
      width: 165px;
    }
  }
`;

const InformationText = styled.p`
  width: 960px;
  font-size: 20px;
  line-height: 30px;
  color: ${theme.colors.blankTextColor};

  @media screen and (max-width: 1279.9px) {
    width: 432px;
    font-size: 14px;
    line-height: 25px;
  }

  @media screen and (max-width: 479.9px) {
    width: 312px;
    margin-top: -8px;
  }
`;

const InformationImage = styled.div`
  background-image: url("${(props) => props.$bgimg}");
  background-repeat: no-repeat;
  background-size: cover;
  width: 960px;
  height: 540px;

  @media screen and (max-width: 1279.9px) {
    width: 432px;
    height: 243px;
  }

  @media screen and (max-width: 479.9px) {
    width: 312px;
    height: 175.5px;
  }
`;
