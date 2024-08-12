import {
  FooterContainer,
  FooterLinkIcons,
  FooterLinks,
  Link,
  FooterIcons,
  FooterIconsImg,
  FooterSpan,
} from "./index.styles";

import LineIcon from "../../assets/icon/line.png";
import TwitterIcon from "../../assets/icon/twitter.png";
import FacebookIcon from "../../assets/icon/facebook.png";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLinkIcons>
        <FooterLinks>
          <Link>關於 STYLiSH</Link>
          <Link>服務條款</Link>
          <Link>隱私政策</Link>
          <Link>聯絡我們</Link>
          <Link>FAQ</Link>
        </FooterLinks>
        <FooterIcons>
          <FooterIconsImg src={LineIcon} />
          <FooterIconsImg src={TwitterIcon} />
          <FooterIconsImg src={FacebookIcon} />
        </FooterIcons>
      </FooterLinkIcons>
      <FooterSpan>© 2018. All rights reserved.</FooterSpan>
    </FooterContainer>
  );
};

export default Footer;
