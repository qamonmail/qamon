import { createGlobalStyle, GlobalStyleComponent } from "styled-components";
import { px2rem } from "../common/lib";
import theme1 from "./themes/theme1";
import theme2 from "./themes/theme2";
import theme3 from "./themes/theme3";
import theme4 from "./themes/theme4";
import theme5 from "./themes/theme5";
import { transparentize } from "polished";

const GlobalStyle: GlobalStyleComponent<any, any> = createGlobalStyle`
  ${theme1}
  ${theme2}
  ${theme3}
  ${theme4}
  ${theme5}
  *,
  *::before,
  *::after {
    font-family: "Roboto", sans-serif !important;
    outline: none !important;
    box-sizing: border-box !important;
    padding: 0;
    margin: 0;
    color: var(--active-color);
  }

  html {
    --active-color: #202020;
    --inactive-color: #F7F7EE;
    --green-color: #5AA862;
    --red-color: #D31A1A;
    --orange-color: #FF8D4C;
    --border-color: ${transparentize(.9, "#202020")};
    font-size: 14px;
    font-weight: 300;
  }

  body {
    background: radial-gradient(54.7% 64.58% at 50% 50%, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%),
    radial-gradient(56.95% 85.42% at 100% 0%, var(--shine-2) 0%, rgba(238, 137, 255, 0) 100%),
    radial-gradient(38.55% 57.83% at 0% 100%, var(--shine-1) 0%, rgba(131, 255, 210, 0) 100%), var(--inactive-color);
  }

  img {
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }

  a {
    text-decoration: none;
  }

  #nprogress {
    position: absolute !important;
    z-index: 1000 !important;

    .bar {
      background-color: var(--active-color);
    }

    .peg {
      box-shadow: 0 0 10px var(--active-color), 0 0 5px var(--active-color);
    }
  }

  #__next {
    display: flex;
    flex-direction: column;
    background-repeat: no-repeat;
    min-height: 100vh;
  }

  [data-mobile="true"] {
    display: flex;

    @media (min-width: 992px) {
      display: none;
    }
  }

  [data-mobile="false"] {
    display: none;

    @media (min-width: 992px) {
      display: flex;
    }
  }

  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-scrollbar {
    width: ${px2rem(4)};
    height: ${px2rem(4)};
  }

  ::-webkit-scrollbar-track {
    background-color: ${transparentize(.97, "#202020")};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${transparentize(.9, "#202020")};
    border: none;
    border-radius: ${px2rem(2)};
  }
`;

export default GlobalStyle;
