import styled from "styled-components";
import LogoImg from "../../assets//image/logo.png";

const LogoArea = styled.a`
  display: flex;
  justify-content: center;
  cursor: pointer;

  @media screen and (max-width: 1279.9px) {
    position: relative;
    z-index: 30;
  }
`;

const LogoIcon = styled.img`
  height: 48px;
  margin: 26px 57px 66px 60px;

  @media screen and (max-width: 1279.9px) {
    display: ${(props) => (props.searchClick ? "none" : "block")};
    position: absolute;
    top: 0;
    width: 129px;
    height: 24px;
    margin: 14px;
  }
`;

const Logo = () => {
  return (
    <LogoArea href="index.html">
      <LogoIcon src={LogoImg} alt="STYLiSH" />
    </LogoArea>
  );
};

export default Logo;
