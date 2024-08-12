import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: "Noto Sans TC", "微軟正黑體", sans-serif;
    width: 100%;
    height: auto;
    font-weight: 400;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }
  a:hover,
  a:visited,
  a:link,
  a:active {
    text-decoration: none;
  }

  &::placeholder {
    color: ${theme.colors.brownColor};

  }
`;

export default GlobalStyles;
