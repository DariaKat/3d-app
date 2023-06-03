import styled from "styled-components";

export const Form = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  max-width: 700px;
  background: #ffffff;
  box-shadow: 0px 0px 20px 20px rgba(0, 0, 0, 0.1);
  border-radius: 13px;
  padding: 20px;
  margin: 16px;

  .avatar-uploader {
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    flex-basis: 30%;
  }

  @media only screen and (min-width: 768px) {
    margin: 20px auto;
  }
`;

export const Block = styled.div`
  margin: 10px 0;
  width: 100%;
`;

export const TextForm = styled.div`
  flex-basis: 70%;
`;
