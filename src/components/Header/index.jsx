/* eslint-disable react/prop-types */
import styled from "styled-components";
import { theme } from "../../theme";
import Logo from "./Logo";
import Menu from "./menu";
import Search from "./search";
import UserCartion from "./userCartion";

const Header = ({items}) => {
  return (
    <HeaderContainer>
      <Nav>
        <Logo />
        <Menu />
      </Nav>
      <Nav>
        <Search />
        <UserCartion items={items} />
      </Nav>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  background-color: ${theme.colors.primaryColor};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 140px;
  border-bottom: 40px solid ${theme.colors.secondaryColor};
  position: fixed;
  z-index: 100;

  @media screen and (max-width: 1279.9px) {
    flex-direction: column;
    border: none;
    height: 52px;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 1279.9px) {
    flex-direction: column;
    align-items: center;
  }
`;
