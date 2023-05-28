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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #001529;
  padding: 20px;
  color: #fff;
  a,
  span {
    color: #fff;
    text-decoration: none;
    margin: 0 10px;
    cursor: pointer;
  }
`;

export const Container = styled.div`
  display: flex;
`;

export const Spinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;
