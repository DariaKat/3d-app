import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export const Header = styled.header`
  background: #001529;
  padding: 20px;

  a {
    color: #fff;
    text-decoration: none;
    margin: 0 10px;
  }
`;
