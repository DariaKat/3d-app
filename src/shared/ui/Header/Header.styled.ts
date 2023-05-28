import styled from "styled-components";

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
