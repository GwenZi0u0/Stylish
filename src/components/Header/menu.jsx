import styled from "styled-components";
import { theme } from "../../theme";

const Categories = styled.ul`
  display: flex;
  flex-direction: row;
  border: 1px solid transparent;
  height: 28px;
  margin: 43px 0 0 15px;
  color: ${theme.colors.blankTextColor};

  @media screen and (max-width: 1279.9px) {
    width: 100%;
    height: 50px;
    background-color: ${theme.colors.secondaryColor};
    margin: 52px 0 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${theme.colors.grayTextColor};
  }
`;

const CategoryItem = styled.a`
  text-align: center;
  width: 150px;
  height: 28px;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: 30px;
  color: ${theme.colors.blankTextColor};
  cursor: pointer;
  position: relative;

  &:hover,
  &:focus {
    color: ${theme.colors.brownColor};
  }

  &::before {
    content: "|";
    color: ${theme.colors.blankTextColor};
    position: absolute;
    left: -18px;
    top: -3.5px;
  }

  &:first-child::before {
    content: "";
  }

  @media screen and (max-width: 1279.9px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100% / 3);
    height: 16px;
    font-size: 15px;
    line-height: 16px;
    letter-spacing: 0;
    color: ${theme.colors.grayTextColor};

    &:hover,
    &:focus {
      color: ${theme.colors.primaryColor};
    }

    &::before {
      color: ${theme.colors.grayTextColor};
      font-size: 15px;
      left: -1px;
      top: -1px;
    }

    &:first-child::before {
      content: "";
    }
  }
`;

const Menu = () => {
  return (
    <Categories>
      <CategoryItem href="./index?category=women">女裝</CategoryItem>
      <CategoryItem href="./index?category=men">男裝</CategoryItem>
      <CategoryItem href="./index?category=accessories">配件</CategoryItem>
    </Categories>
  );
};

export default Menu;
