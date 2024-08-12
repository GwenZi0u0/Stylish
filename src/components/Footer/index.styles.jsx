import styled from "styled-components";
import { theme } from "../../theme";

export const FooterContainer = styled.footer`
  width: 100%;
  height: 115px;
  background-color: ${theme.colors.secondaryColor};
  color: ${theme.colors.primaryColor};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1279.9px) {
    flex-direction: column;
    margin: 0 0 60px 0;
    height: 146px;
    color: ${theme.colors.grayItemColor};
  }
`;

export const FooterLinkIcons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media screen and (max-width: 1279.9px) {
    display: flex;
    flex-direction: row;
    align-items: start;
    height: 76px;
  }
`;

export const FooterLinks = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 0 3px 0;

  @media screen and (max-width: 1279.9px) {
    flex-wrap: wrap;
    flex-direction: column;
    align-items: start;
    margin: -5px -12px 0 0;
    height: 88px;
  }
`;

export const Link = styled.a`
  color: ${theme.colors.whiteColor};
  font-size: 16px;
  line-height: 22px;
  width: 134px;
  text-align: center;
  padding: 0 2px 0 0;
  position: relative;
  cursor: pointer;

  &::before {
    content: "|";
    color: ${theme.colors.whiteColor};
    font-size: 12px;
    position: absolute;
    left: -2px;
  }

  &:first-child::before {
    content: "";
  }

  @media screen and (max-width: 1279.9px) {
    color: ${theme.colors.grayItemColor};
    font-size: 14px;
    line-height: 20px;
    width: auto;
    display: flex;
    justify-content: start;
    padding: 0 36px 8px 0;

    &::before {
      content: "";
    }
  }
`;

export const FooterIcons = styled.div`
  width: 210px;
  height: 50px;
  display: flex;
  justify-content: space-around;
  margin: 0 30px 0 83.5px;

  @media screen and (max-width: 1279.9px) {
    width: auto;
    height: 76px;
    margin: 12px -6px 0 0;
    align-items: start;
  }
`;

export const FooterIconsImg = styled.img`
  width: 50px;
  height: 50px;
  margin: 0 15px;
  cursor: pointer;

  @media screen and (max-width: 1279.9px) {
    width: 20px;
    height: 20px;
    margin: 0 7px;
  }
`;

export const FooterSpan = styled.span`
  font-size: 12px;
  line-height: 17.38px;
  color: ${theme.colors.grayTextColor};
  padding-left: 15px;
  height: 17px;

  @media screen and (max-width: 1279.9px) {
    font-size: 10px;
    line-height: 14px;
    height: 14px;
    padding: 7.5px 0 0 0;
  }
`;
