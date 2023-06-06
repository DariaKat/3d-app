import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  background: #fff;
  box-shadow: 0px 0px 20px 20px rgba(0, 0, 0, 0.1);
  border-radius: 13px;
  max-width: 700px;
  width: 100%;
  margin: 0 auto 20px;
  div {
    canvas {
      width: 100%;
      height: 100%;
      margin: 0;
    }
  }
`;

export const Time = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px 20px;
  width: 100%;
`;

export const Table = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #b3b3b3;
  padding: 0 5px;
`;
